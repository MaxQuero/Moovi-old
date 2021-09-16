import {HttpException, HttpService, Injectable} from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {catchError, map} from "rxjs/operators";
import {MovieDto} from "./dto/movie.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {MovieInterface} from "./interfaces/movie.interface";

@Injectable()
export class MovieService {
    allMovies: MovieInterface[];

    constructor(
      @InjectModel('Movie') private readonly movieModel: Model<MovieInterface>,
      private httpService: HttpService
    ) {
      this.movieModel.find().then
      (res => {
        this.allMovies = res;
        return res;
      });

    }



    getPopularMovies(sessionId: string) {
        const movieUrl = `${AppConstants.API_DEFAULT}/movie/popular?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr-FR&append_to_response=account_state`;
        return this.httpService.get(movieUrl)
            .pipe(
                map(response => {
                    return response.data.results.map((movie,i) => {

                      return this.processData(movie);
                    });
                })
            ).toPromise();
    }

  getMovieDetailsFromId(movieId: string, sessionId: string) {
    const movieUrl = `${AppConstants.API_DEFAULT}/movie/${movieId}?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr-FR&append_to_response=videos,credits,recommendations,translations,account_states&include_video_language=fr,en`;
    console.log('movieUrl', movieUrl);
    return this.httpService.get(movieUrl)
      .pipe(
        map(response => {
          console.log('allMovies', this.allMovies);

          return this.processData(response.data);

        })
      );
  }

   rateMovie(movieId, note, sessionId ?:string) {

      let rateMovieUrl = `${AppConstants.API_DEFAULT}/movie/${movieId}/rating?api_key=${AppConstants.API_KEY}&session_id=${sessionId}`;
      rateMovieUrl += sessionId ? "&session_id=" + sessionId : ''

      return this.httpService.post(rateMovieUrl,
        { value: note },
        {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .pipe(
          map(response => {
            console.log('data', response.data);
              return response.data;
          }),
          catchError(e => {
              throw new HttpException(e.response.data, e.response.status);
          }),
      ).toPromise();
  }

  processData(movie): MovieDto {
      const trailer = video => (video.site === "Youtube" && (video.type === "Trailer" && video.iso_639_1 === "fr") || video.type === "Trailer");
      const directors = crewPeople => crewPeople.job === "Director";
      const translation = movie.translations && movie?.translations?.translations.find((movieTranslation) => {
        return movieTranslation.name === "English";
      }).data;

    let movieRating = movie.rating;


    if (!movie.rating) {
      const movieDb = this.allMovies.find(el => el.id === movie.id)
      movieRating = movieDb && movieDb.rating;
    } else {
      movieRating = movie?.account_states?.rated?.value
    }


    return {
          id: movie.id,
          genres: movie.genres,
          originalTitle: movie.original_title,
          title: movie.title,
          releaseDate: movie.release_date,
          runtime: movie.runtime,
          status: movie.status,
          tagline: movie.tagline || translation?.tagline,
          poster: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path,
          popularity: movie.popularity,
          voteAverage: Math.round(movie.vote_average * 10) / 10,
          voteCount: movie.vote_count,
          synopsis: movie.overview || translation?.overview,
          backdropCover: 'https://image.tmdb.org/t/p/t/p/w1920_and_h800_multi_faces' + movie.backdrop_path,
          trailer: movie?.videos?.results && movie?.videos.results.find(trailer),
          actors: movie?.credits?.cast,
          directors: movie?.credits?.crew && movie.credits.crew.filter(directors),
          recommendations: movie?.recommendations?.results && movie.recommendations.results.map(movie => this.processData(movie)),
          rating: movieRating,
          favorite: movie?.account_states?.favorite,
          watchlist: movie?.account_states?.watchList
        };
  }

  async saveRating(movie, rating) {
    movie.rating = rating;
    const movieExists = await this.movieModel.findOne(({ id: movie.id } )).exec();
    if (!movieExists) {
      const newMovie = await new this.movieModel(movie);
      await newMovie.save();
    } else {
      movieExists.rating = rating;
      await movieExists.save();
    }
    this.movieModel.find().then
    (res => {
      console.log('new all movies', res);
      this.allMovies = res;
      return res;
    });

  }
}

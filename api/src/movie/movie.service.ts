import {HttpException, HttpService, Injectable} from '@nestjs/common';
import {AppConstants} from "../app.constants";
import { catchError, map, switchAll, switchMap } from 'rxjs/operators';
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



    async getPopularMovies() {
      const movieUrl = `${AppConstants.API_DEFAULT}/movie/popular?api_key=${AppConstants.API_KEY}&language=fr-FR`;
      const res = await this.httpService.get(movieUrl).toPromise();
      return await Promise.all(res.data.results.map( async (movie,i) => {
        const movieImagesUrl = `${AppConstants.API_DEFAULT}/movie/${movie.id}/images?api_key=${AppConstants.API_KEY}&language=fr&include_image_language=fr,en`;

        const response = await this.httpService.get(movieImagesUrl).toPromise()
        movie.images = response.data;
        console.log('processdata', this.processData(movie));
        return this.processData(movie);
      }));
    }

  async getMovieDetailsFromId(movieId: string, sessionId: string) {
    const movieUrl = `${AppConstants.API_DEFAULT}/movie/${movieId}?api_key=${AppConstants.API_KEY}&session_id=${sessionId}&language=fr&append_to_response=videos,credits,recommendations,translations,account_states,images&include_video_language=fr,en&include_image_language=fr,en`;
     const res = await this.httpService.get(movieUrl).toPromise();
     return this.processData(res.data)
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


  processData(movie): any {
      const trailer = (language) => (video) => (video.site === "Youtube" && (video.type === "Trailer" && video.iso_639_1 === language));
      const directors = crewPeople => crewPeople.job === "Director";
      const translation = movie.translations && movie?.translations?.translations.find((movieTranslation) => {
        return movieTranslation.name === "English";
      }).data;
      const logo = (language) => (logo) => logo.iso_639_1 === language;

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
          trailer: movie?.videos?.results && (movie?.videos.results.find(trailer('fr')) || movie?.videos.results.find(trailer('en'))),
          actors: movie?.credits?.cast,
          directors: movie?.credits?.crew && movie.credits.crew.filter(directors),
          recommendations: movie?.recommendations?.results && movie.recommendations.results.map(movie => this.processData(movie)),
          rating: movieRating,
          favorite: movie?.account_states?.favorite,
          watchlist: movie?.account_states?.watchList,
          logo: movie?.images?.logos.find(logo('fr')) ||  movie?.images?.logos.find(logo('en'))
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

  searchMovies(query: string, page = 1) {
    const searchMoviesUrl = `${AppConstants.API_DEFAULT}/search/movie?api_key=${AppConstants.API_KEY}&language=fr-FR&query=${query}&page=${page}`;
    return this.httpService.get(searchMoviesUrl)
      .pipe(
        map(response => {
          return response.data.results.map((movie,i) => {
            return this.processData(movie);
          });
        })
      );
  }
}

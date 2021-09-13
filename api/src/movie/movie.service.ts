import {HttpException, HttpService, Injectable} from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {catchError, map} from "rxjs/operators";
import {MovieDto} from "./dto/movie.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {MovieInterface} from "./interfaces/movie.interface";

@Injectable()
export class MovieService {
    constructor(
        @InjectModel('Movie') private favModel: Model<MovieInterface>,

        private httpService: HttpService
    ) {
    }

    getPopularMovies() {
        const movieUrl = AppConstants.API_DEFAULT + '/movie/popular?api_key=' + AppConstants.API_KEY + '&language=fr-FR';
        return this.httpService.get(movieUrl)
            .pipe(
                map(response => {
                    return response.data.results.map((movie,i) => {
                        return this.processData(movie);
                    });
                })
            );
    }

  getMovieDetailsFromId(movieId: string) {
    const movieUrl = AppConstants.API_DEFAULT + '/movie/' + movieId + '?api_key=' + AppConstants.API_KEY + '&language=fr-FR&append_to_response=videos,credits,similar_movies&include_video_language=fr,en';
    console.log('movieUrl', movieUrl);

    return this.httpService.get(movieUrl)
      .pipe(
        map(response => {
          return this.processData(response.data);

        })
      );
  }


   rateMovie(movie, note, sessionId) {
      const rateMovieUrl = AppConstants.API_DEFAULT + '/movie/' + movie.id + '/rating?api_key=' + AppConstants.API_KEY +
      '&session_id=' + sessionId;

      return this.httpService.post(rateMovieUrl, {value: note}, {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
          }
      })
          .pipe(
              map(response => {
                  return response.data;
              }),
              catchError(e => {
                  throw new HttpException(e.response.data, e.response.status);
              }),
          );
  }


  processData(movie): MovieDto {
      const trailer = video => (video.site === "Youtube" && (video.type === "Trailer" && video.iso_639_1 === "fr") || video.type === "Trailer");
      const directors = crewPeople => crewPeople.job === "Director"
    console.log('movie', movie);
    return {
        id: movie.id,
        genres: movie.genres,
        originalTitle: movie.original_title,
        title: movie.title,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        status: movie.status,
        tagline: movie.tagline,
        poster: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path,
        popularity: movie.popularity,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        synopsis: movie.overview,
        backdropCover: 'https://image.tmdb.org/t/p/t/p/w1920_and_h800_multi_faces' + movie.backdrop_path,
        trailer: movie?.videos?.results && movie?.videos.results.find(trailer),
        actors: movie?.credits?.cast,
        directors: movie?.credits?.crew && movie.credits.crew.filter(directors),
        similarMovies: movie?.similar_movies?.results && movie.similar_movies.results
      };
  }
}

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

    getMovies() {
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

    processData(movie): MovieDto{
       return {
           _id: movie.id,
           title: movie.title,
           cover: 'https://image.tmdb.org/t/p/w185/' + movie.poster_path,
           popularity: movie.popularity,
           releaseDate: movie.release_data,
           voteAverage: movie.vote_average,
           synopsis: movie.overview
       };
    }

     rateMovie(movie, note, sessionId) {
        const rateMovieUrl = AppConstants.API_DEFAULT + '/movie/' + movie._id + '/rating?api_key=' + AppConstants.API_KEY +
        '&session_id=' + sessionId;

        console.log('movie', note);

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
}

import {HttpService, Injectable } from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {map} from "rxjs/operators";
import {MovieDto} from "./dto/movie.dto";

@Injectable()
export class MovieService {
    constructor(
        private httpService: HttpService
    ) {
    }

    getMovies() {
         return this.httpService.get(AppConstants.API_DEFAULT + '/movie/popular?api_key=' + AppConstants.API_KEY)
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
           id: movie.id,
           title: movie.original_title,
           cover: movie.poster_path,
           popularity: movie.popularity,
           releaseDate: movie.release_data,
           note: movie.vote_average,
           synopsis: movie.overview
       };
    }
}

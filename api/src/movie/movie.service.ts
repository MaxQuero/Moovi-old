import {HttpService, Injectable } from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {map} from "rxjs/operators";
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
           cover: 'https://image.tmdb.org/t/p/w185/' + movie.poster_path,
           popularity: movie.popularity,
           releaseDate: movie.release_data,
           voteAverage: movie.vote_average,
           synopsis: movie.overview
       };
    }
}

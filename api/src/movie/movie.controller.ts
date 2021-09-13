import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {MovieService} from "./movie.service";

@Controller('movie')
export class MovieController {
    constructor(
        private movieService: MovieService
    ) { }

    // Fetch a particular post using ID
    @Get('popular')
    getPopularMoviesAction() {
        return this.movieService.getPopularMovies();
    }

    // Fetch a particular post using ID
    @Get(':id')
    getMovieDetails(@Param() params) {
        console.log('parmas', params);
        return this.movieService.getMovieDetailsFromId(params.id);
    }

    @Post('rate')
    rateMovieAction(@Body() body) {
        const {movie, note, sessionId} = body;
       return this.movieService.rateMovie(movie, note, sessionId);
    }
}

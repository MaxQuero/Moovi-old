import {Body, Controller, Get, Post} from '@nestjs/common';
import {MovieService} from "./movie.service";

@Controller('movie')
export class MovieController {
    constructor(
        private movieService: MovieService
    ) { }

    // Fetch a particular post using ID
    @Get('list')
    getMoviesAction() {
        return this.movieService.getMovies();
    }

    @Post('rate')
    rateMovieAction(@Body() body) {

        const {movie, note, sessionId} = body;
       return this.movieService.rateMovie(movie, note, sessionId);
    }
}

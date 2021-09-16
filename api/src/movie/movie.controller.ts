import { Body, Controller, Param, Post } from '@nestjs/common';
import {MovieService} from "./movie.service";

@Controller('movie')
export class MovieController {
    constructor(
      private movieService: MovieService
    ) { }

    // Fetch a particular post using ID
    @Post('popular')
    async getPopularMoviesAction(@Body() body) {
        const {sessionId} = body;
        const popularMovies = await this.movieService.getPopularMovies(sessionId);
        return popularMovies;
    }

    // Fetch a particular post using ID
    @Post(':id')
    getMovieDetails(@Body() body, @Param() params) {
        const {sessionId} = body;
        return this.movieService.getMovieDetailsFromId(params.id, sessionId);
    }


    @Post(':id/rate')
    rateMovieAction(@Body() body, @Param() params) {
        const { rating, sessionId, movie } = body;
        const movieId = params.id;
        return this.movieService.rateMovie(movieId, rating, sessionId)
          .then(
            (res) => {
                this.movieService.saveRating(movie, rating);
                return JSON.stringify(res);
            }
          )
          .catch( err => err.message);


    }
}

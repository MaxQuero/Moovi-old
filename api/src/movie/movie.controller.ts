import {Controller, Get} from '@nestjs/common';
import {MovieService} from "./movie.service";

@Controller('movie')
export class MovieController {
    constructor(
        private movieService: MovieService
    ) { }

    // Fetch a particular post using ID
    @Get('list')
    getMovies() {
        return this.movieService.getMovies();
    }

}

import {Controller, Get, HttpService, HttpStatus, NotFoundException, Res, UseInterceptors} from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {MovieService} from "./movie.service";

@Controller('movie')
export class MovieController {
    constructor(
        private movieService: MovieService
    ) { }

    // Fetch a particular post using ID
    @Get('list')
      getMovies() {
        return this.getMovies();
    }

}

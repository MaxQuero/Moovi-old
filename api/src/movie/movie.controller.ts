import {Controller, Get, HttpService, HttpStatus, NotFoundException, Res} from '@nestjs/common';
import {AppConstants} from "../app.constants";
import {MovieService} from "./movie.service";

@Controller('movie')
export class MovieController {
    constructor(
        private movieService: MovieService
    ) { }

    // Fetch a particular post using ID
    @Get('list')
    async getMovies(@Res() res) {
        const movies = await this.movieService.getMovies();
        return res.status(HttpStatus.OK).send(movies);
    }

}

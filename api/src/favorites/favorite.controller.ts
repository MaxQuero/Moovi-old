import {Controller, Post} from '@nestjs/common';
import {FavoriteService} from "./favorite.service";
import {MovieInterface} from "../movie/interfaces/movie.interface";

@Controller('favorites')
export class FavoriteController {
    constructor(
        private favoritesService: FavoriteService
    ) { }

    @Post('add')
    addMovieToFav(movie: MovieInterface) {
        //return this.favoritesService.addMovieToFav(movie);
    }

}

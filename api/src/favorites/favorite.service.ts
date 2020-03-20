import {Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {FavoriteInterface} from "./interfaces/favorite.interface";
import {MovieDto} from "../movie/dto/movie.dto";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectModel('Favorite') private favModel: Model<FavoriteInterface>,
    ) {

    }

    addMovieToFav(favorites: MovieDto) {
        const createdFav = new this.favModel(favorites);
        return createdFav.save();
    }


}

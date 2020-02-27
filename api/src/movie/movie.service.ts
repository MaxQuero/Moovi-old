import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {MovieInterface} from './interfaces/movie.interface';
import {InjectModel} from "@nestjs/mongoose";
import {CreateMovieDTO} from "./dto/create-movie.dto";

@Injectable()
export class MovieService {
    constructor(
        @InjectModel('Movie') private readonly  movieModel: Model<MovieInterface>
    ) {
    }

    async addMovie(createMovieDTO: CreateMovieDTO): Promise<MovieInterface> {
        const newMovie = await this.movieModel(createMovieDTO);
        return newMovie.save();
    }

    async getMovie(movieId): Promise<MovieInterface> {
        const movie = await this.movieModel
            .findById(movieId)
            .exec();
        return movie;
    }

    async getMovies(): Promise<MovieInterface[]> {
        const movies = await this.movieModel.find().exec();
        return movies;
    }
}

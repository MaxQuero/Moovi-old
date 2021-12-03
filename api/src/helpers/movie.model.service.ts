import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieInterface } from '../movie/interfaces/movie.interface';

@Injectable()
export class MovieModelService {
  constructor( @InjectModel('Movie') private readonly movieModel: Model<MovieInterface>) {
  }

  /**
   * Get all the movies in database
   */
  async getAllMovies() {
    const res = await this.movieModel.find();
    return res;
  }

  /**
   * Save ratings to database
   */
  async saveRatings(movie: MovieInterface, rating: number) {
    movie.rating = rating;
    const movieExists = await this.movieModel.findOne(({ id: movie.id } )).exec();
    if (!movieExists) {
      const newMovie = await new this.movieModel(movie);
      await newMovie.save();
    } else {
      movieExists.rating = rating;
      await movieExists.save();
    }
  }

  /**
   * SAve favorites to database
   */
  async saveFavorites(movie: MovieInterface, isFavorite: boolean) {
    movie.favorite = isFavorite;
    const movieExists = await this.movieModel.findOne(({ id: movie.id } )).exec();
    if (!movieExists) {
      const newMovie = await new this.movieModel(movie);
      await newMovie.save();
    } else {
      movieExists.favorite = isFavorite;
      await movieExists.save();
    }
  }


  /**
   * SAve isWAtchlsit prop to database
   */
  async saveIsWatchlist(movie: MovieInterface, isWatchlisted: boolean) {
    movie.watchlist = isWatchlisted;
    const movieExists = await this.movieModel.findOne(({ id: movie.id } )).exec();
    if (!movieExists) {
      const newMovie = await new this.movieModel(movie);
      await newMovie.save();
    } else {
      movieExists.watchlist = isWatchlisted;
      await movieExists.save();
    }
  }
}

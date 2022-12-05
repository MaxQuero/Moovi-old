import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../movie/models/movie.model';

@Injectable()
export class MovieModelService {
  constructor( @InjectModel('Movie') private readonly movieModel: Model<Movie>) {
  }

  /**
   * Get all the movies in database
   */
  getAllMoviesFromDb(): Promise<Movie[]>{
    return this.movieModel.find().exec();
  }

  /**
   * Save ratings to database
   */
  async saveRatings(media) {
    const movieExists = await this.movieModel.findOne(({ id: media.id } )).exec()
    if (!movieExists) {
      const newMovie = await new this.movieModel(media);
      await newMovie.save();
    } else {
      movieExists.rating = media.rating;
      await movieExists.save();
    }
  }

  /**
   * SAve favorites to database
   */
  async saveFavorites(media: Movie) {
    const movieExists = await this.movieModel.findOne(({ id: media.id } )).exec();
    if (!movieExists) {
      const newMovie = await new this.movieModel(media);
      await newMovie.save();
    } else {
      movieExists.favorite = media.favorite;
      await movieExists.save();
    }
  }


  /**
   * SAve isWAtchlsit prop to database
   */
  async saveIsWatchlist(media: Movie) {
    const movieExists = await this.movieModel.findOne(({ id: media.id } )).exec();
    if (!movieExists) {
      const newMovie = await new this.movieModel(media);
      await newMovie.save();
    } else {
      movieExists.watchlist = media.watchlist;
      await movieExists.save();
    }
  }
}

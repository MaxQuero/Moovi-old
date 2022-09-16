import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TvShowInterface } from '../tvShow/interfaces/tvShow.interface';

@Injectable()
export class TvShowModelService {
  constructor( @InjectModel('TvShow') private readonly tvShowModel: Model<TvShowInterface>) {
  }

  /**
   * Get all the tvShows in database
   */
  getAllTvShowsFromDb(): Promise<TvShowInterface[]>{
    return this.tvShowModel.find().exec();
  }

  /**
   * Save ratings to database
   */
  async saveRatings(tvShow: TvShowInterface, rating: number) {
    const tvShowExists = await this.tvShowModel.findOne(({ id: tvShow.id } )).exec();
    if (!tvShowExists) {
      tvShow.rating = rating;
      const newTvShow = await new this.tvShowModel(tvShow);
      await newTvShow.save();
    } else {
      tvShowExists.rating = rating;
      await tvShowExists.save();
    }
  }

  /**
   * SAve favorites to database
   */
  async saveFavorites(tvShow: TvShowInterface, isFavorite: boolean) {
    const tvShowExists = await this.tvShowModel.findOne(({ id: tvShow.id } )).exec();
    if (!tvShowExists) {
      tvShow.favorite = isFavorite;
      const newTvShow = await new this.tvShowModel(tvShow);
      await newTvShow.save();
    } else {
      tvShowExists.favorite = isFavorite;
      await tvShowExists.save();
    }
  }

  /**
   * SAve isWAtchlsit prop to database
   */
  async saveIsWatchlist(tvShow: TvShowInterface, isWatchlisted: boolean) {
    const tvShowExists = await this.tvShowModel.findOne(({ id: tvShow.id } )).exec();
    if (!tvShowExists) {
      tvShow.watchlist = isWatchlisted;
      const newTvShow = await new this.tvShowModel(tvShow);
      await newTvShow.save();
    } else {
      tvShowExists.watchlist = isWatchlisted;
      await tvShowExists.save();
    }
  }
}

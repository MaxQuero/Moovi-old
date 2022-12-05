import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TvShowInterface } from '../tvShow/interfaces/tvShow.interface';
import { TvShow } from '../tvShow/models/tvShow.model';
import { TvShowService } from '../tvShow/tvShow.service';

@Injectable()
export class TvShowModelService {
  constructor( @InjectModel('TvShow') private readonly tvShowModel: Model<TvShow>) {
  }

  /**
   * Get all the tvShows in database
   */
  getAllTvShowsFromDb(): Promise<TvShow[]>{
    return this.tvShowModel.find().exec();
  }

  /**
   * Save ratings to database
   */
  async saveRatings(tvShow: TvShow) {
    const tvShowExists = await this.tvShowModel.findOne(({ id: tvShow.id } )).exec();
    if (!tvShowExists) {
      const newTvShow = await new this.tvShowModel(tvShow);
      await newTvShow.save();
    } else {
      tvShowExists.rating = tvShow.rating;
      await tvShowExists.save();
    }
  }

  /**
   * SAve favorites to database
   */
  async saveFavorites(tvShow: TvShow) {
    const tvShowExists = await this.tvShowModel.findOne(({ id: tvShow.id } )).exec();
    if (!tvShowExists) {
      const newTvShow = await new this.tvShowModel(tvShow);
      await newTvShow.save();
    } else {
      tvShowExists.favorite = tvShow.favorite;
      await tvShowExists.save();
    }
  }

  /**
   * SAve isWAtchlsit prop to database
   */
  // TODO: refacto en faisant une seule fonction pour wathclist rating et favorite (et refacto tvshow et movie => quasi les memes fonctions)
  async saveIsWatchlist(tvShow: TvShow) {
    const tvShowExists = await this.tvShowModel.findOne(({ id: tvShow.id } )).exec();
    if (!tvShowExists) {
      const newTvShow = await new this.tvShowModel(tvShow);
      await newTvShow.save();
    } else {
      tvShowExists.watchlist = tvShow.watchlist;
      await tvShowExists.save();
    }
  }
}

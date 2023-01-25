import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Episode } from '../episode/models/episode.model';

@Injectable()
export class EpisodeModelService {
  constructor( @InjectModel('Episode') private readonly episodeModel: Model<Episode>) {
  }

  /**
   * Get all the tvShows in database
   */
  getAllEpisodesFromDb(): Promise<Episode[]> {
    return this.episodeModel.find().exec();
  }

  /**
   * Save ratings to database
   */
  async saveEpisodeRatings(episodeId: string, seasonNumber: number, episodeNumber: number, rating: number) {
    const episodeExists = await this.episodeModel.findOne(({ id: episodeId } )).exec();
    if (!episodeExists) {
      const newEpisode = await new this.episodeModel({ id: episodeId, season: seasonNumber, episode: episodeNumber, rating: rating });
      await newEpisode.save();
    } else {
     episodeExists.rating = rating;
      await episodeExists.save();
    }
  }

  set(obj, path, val) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj, key) =>
        obj[key] = obj[key] || {},
      obj);
    lastObj[lastKey] = val;
    return lastObj
  };
}

import { Injectable } from '@nestjs/common';
import { TvShowInterface } from './interfaces/tvShow.interface';
import { TvShowModelService } from '../helpers/tvShow.model.service';
import { TvShow } from './models/tvShow.model';

@Injectable()
export class TvShowService {
  allTvShows: TvShow[];

  constructor(
    private tvShowModelService: TvShowModelService
  ) {}

  async getAllTvShowsFromDb() {
    if(!this.allTvShows || this.allTvShows.length === 0){
      this.allTvShows = await this.tvShowModelService.getAllTvShowsFromDb();
    }
    return this.allTvShows;
  }

  setOrUpdateTvShowToList(allTvShows: TvShow[], media: TvShow) {
    const tvShowIndex = allTvShows.findIndex((tvShow: TvShow)=> tvShow.id === media.id)
    if (tvShowIndex !== -1) {
      allTvShows[tvShowIndex] = media
    } else {
      allTvShows.push(media)
    }

    return allTvShows
  }
}

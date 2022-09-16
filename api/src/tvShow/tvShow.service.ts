import { Injectable } from '@nestjs/common';
import { TvShowInterface } from './interfaces/tvShow.interface';
import { TvShowModelService } from '../helpers/tvShow.model.service';

@Injectable()
export class TvShowService {
  allTvShows: TvShowInterface[];

  constructor(
    private tvShowModelService: TvShowModelService
  ) {}

  async getAllTvShowsFromDb() {
    if(!this.allTvShows || this.allTvShows.length === 0){
      this.allTvShows = await this.tvShowModelService.getAllTvShowsFromDb();
    }
    return this.allTvShows;
  }

  setOrUpdateTvShowToList(allTvShows: TvShowInterface[], media: TvShowInterface) {
    const tvShowIndex = allTvShows.findIndex((tvShow: TvShowInterface)=> tvShow.id === media.id)
    if (!!tvShowIndex) {
      allTvShows[tvShowIndex] = media
    } else {
      allTvShows.push(media)
    }

    return allTvShows
  }
}

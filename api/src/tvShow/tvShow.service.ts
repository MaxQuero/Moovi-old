import { HttpService, Injectable } from '@nestjs/common';
import { TvShowInterface } from './interfaces/tvShow.interface';
import { TvShowModelService } from '../helpers/tvShow.model.service';

@Injectable()
export class TvShowService {
  allTvShows: TvShowInterface[];

  constructor(
    private httpService: HttpService,
    private tvShowModelService: TvShowModelService
  ) {
  }

  async getAllTvShows() {
    let allTvShows;
    if(!this.allTvShows || this.allTvShows.length === 0){
      allTvShows = await this.tvShowModelService.getAllTvShows();
    }
    return allTvShows;
  }

  setAllTvShows(allTvShows) {
    return [...allTvShows];
  }
}

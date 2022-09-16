import { Injectable } from '@nestjs/common';
import { EpisodeInterface } from './interfaces/episode.interface';
import { EpisodeModelService } from '../helpers/episode.model.service';

@Injectable()
export class EpisodeService {
  allEpisodes: EpisodeInterface[];

  constructor(
    private episodeModelService: EpisodeModelService
  ) {}

  async getAllEpisodesFromDb() {
    if(!this.allEpisodes || this.allEpisodes.length === 0){
      this.allEpisodes = await this.episodeModelService.getAllEpisodesFromDb();
    }
    return this.allEpisodes;
  }

  setOrUpdateEpisodeToList(allEpisodes: EpisodeInterface[], episode: EpisodeInterface) {
    const episodeIndex = allEpisodes.findIndex((ep: EpisodeInterface) => ep.id === episode.id)
    if (!!episodeIndex) {
      allEpisodes[episodeIndex] = episode
    } else {
      allEpisodes.push(episode)
    }
    return allEpisodes
  }
}

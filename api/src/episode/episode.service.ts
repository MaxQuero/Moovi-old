import { Injectable } from '@nestjs/common';
import { EpisodeModelService } from '../helpers/episode.model.service';
import { Episode } from './models/episode.model';

@Injectable()
export class EpisodeService {
  allEpisodes: Episode[];

  constructor(
    private episodeModelService: EpisodeModelService
  ) {}

  async getAllEpisodesFromDb() {
    if(!this.allEpisodes || this.allEpisodes.length === 0){
      this.allEpisodes = await this.episodeModelService.getAllEpisodesFromDb();
    }
    return this.allEpisodes;
  }

  setOrUpdateEpisodeToList(allEpisodes: Episode[], episode: Episode) {
    const episodeIndex = allEpisodes.findIndex((ep: Episode) => ep.id === episode.id)
    if (episodeIndex  !== -1) {
      allEpisodes[episodeIndex] = episode
    } else {
      allEpisodes.push(episode)
    }
    return allEpisodes
  }
}

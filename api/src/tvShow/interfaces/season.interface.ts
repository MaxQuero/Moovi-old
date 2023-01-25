import { Episode } from '../../episode/models/episode.model';

export interface SeasonInterface {
    loading: boolean;
    airDate: Date,
    episodeCount: number,
    id: string,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number,
    episodes: Episode[]
}
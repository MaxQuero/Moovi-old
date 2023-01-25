import { SeasonInterface } from './season.interface';
import { TvShow } from '../models/tvShow.model';
import { Movie } from '../../movie/models/movie.model';

export class TvShowInterface extends Movie {
    readonly recommendations: TvShow[];
    seasons: SeasonInterface[];
}
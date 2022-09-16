import { MovieInterface } from '../../movie/interfaces/movie.interface';
import { SeasonInterface } from './season.interface';

export class TvShowInterface extends MovieInterface {
    readonly recommendations: TvShowInterface[];
    seasons: SeasonInterface[];
}
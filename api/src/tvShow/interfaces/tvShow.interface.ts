import { MovieInterface } from '../../movie/interfaces/movie.interface';
import { SeasonDetailsInterface } from './SeasonDetails.interface';

export class TvShowInterface extends MovieInterface {
    readonly recommendations: TvShowInterface[];
    readonly seasons: SeasonDetailsInterface[];
}
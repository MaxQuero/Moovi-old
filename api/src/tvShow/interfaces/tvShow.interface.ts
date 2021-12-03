import { MovieInterface } from '../../movie/interfaces/movie.interface';

export class TvShowInterface extends MovieInterface {
    readonly recommendations: TvShowInterface[];
    readonly seasons: any[];
}
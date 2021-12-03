import { TvShowInterface } from '../../tvShow/interfaces/tvShow.interface';
import { MovieInterface } from '../../movie/interfaces/movie.interface';

export class MediaDto {
    media: TvShowInterface | MovieInterface;
    mediaType: MediaEnum
}

export enum MediaEnum {
    Movie = "movie",
    Tv = "tv",
    All = "all"
}
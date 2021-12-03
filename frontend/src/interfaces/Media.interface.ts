import {TvShowInterface} from "./TvShow.interface";
import {MovieInterface} from "./Movie.interface";

export enum MediaEnum {
    Movie = "movie",
    Tv = "tv",
    All = "all"
}

export interface MediaInterface {
    movie: MovieInterface[]
    tv: TvShowInterface[]
    all?: [],
    loading: boolean
}

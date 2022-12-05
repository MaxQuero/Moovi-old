import {Movie, TvShow} from "../generated/graphql";

export enum MediaEnum {
  Movie = 'movie',
  Tv = 'tv',
  All = 'all',
}

export interface MediaInterface {
  movie: Movie[];
  tv: TvShow[];
  all?: [];
  loading: boolean;
}

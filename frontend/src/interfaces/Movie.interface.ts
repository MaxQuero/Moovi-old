import { MediaEnum } from './Media.interface';

export interface MovieInterface {
  readonly id: number;
  readonly type: MediaEnum;
  readonly genres: { id: string; name: string }[];
  readonly originalTitle: string;
  readonly title: string;
  readonly runtime: number;
  readonly status: string;
  readonly tagline: string;
  readonly popularity: string;
  readonly poster: string;
  readonly voteAverage: number;
  readonly voteCount: number;
  readonly synopsis: string;
  readonly releaseDate: string;
  readonly backdropCover: string;
  readonly trailer: object;
  readonly actors: object[];
  readonly directors: object[];
  readonly recommendations: MovieInterface[];
  readonly logo: any;
  rating: number;
  favorite: boolean;
  watchlist: boolean;
  loading: boolean;
}

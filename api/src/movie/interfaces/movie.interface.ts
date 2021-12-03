import {Document} from "mongoose";
import { MovieDto } from '../dto/movie.dto';
import { MediaEnum } from '../../media/dto/media.dto';

export class MovieInterface extends Document {
    readonly id: number;
    readonly type: MediaEnum;
    readonly genres: {id: number, name: string}[];
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
    readonly trailer: object[];
    readonly actors: object[];
    readonly directors: object[];
    readonly recommendations: MovieInterface[];
    readonly logo: object;
    rating: number;
    favorite: boolean;
    watchlist: boolean;
}
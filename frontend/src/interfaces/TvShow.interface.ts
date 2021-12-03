import {MovieInterface} from "./Movie.interface";

export interface TvShowInterface extends MovieInterface{
    readonly recommendations: TvShowInterface[];
    readonly seasons: any[];
}
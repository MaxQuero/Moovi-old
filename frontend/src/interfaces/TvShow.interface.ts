import {MovieInterface} from "./Movie.interface";
import {SeasonDetailsInterface} from "./SeasonDetails.interface";

export interface TvShowInterface extends MovieInterface{
    readonly recommendations: TvShowInterface[];
    seasons: SeasonDetailsInterface[];
}
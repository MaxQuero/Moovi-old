import {Document} from "mongoose";

export class MovieInterface extends Document {
    readonly _id: string;
    readonly popularity: string;
    readonly cover: string;
    readonly title: string;
    readonly voteAverage: string;
    readonly synopsis: string;
    readonly releaseDate: string;
}
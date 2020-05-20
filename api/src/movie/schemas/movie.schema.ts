import * as mongoose from "mongoose";

const Schema = mongoose.Schema;


export const MovieSchema = new Schema({
    _id: String,
    popularity: String,
    cover: String,
    title: String,
    voteAverage: String,
    synopsis: String,
    releaseDate: String
});

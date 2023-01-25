import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const EpisodeSchema = new Schema({
    id: String,
    season: Number,
    episode: Number,
    rating: Number,
});
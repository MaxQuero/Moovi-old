import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const EpisodeSchema = new Schema({
    id: Number,
    season: Number,
    episode: Number,
    rating: Number,
});
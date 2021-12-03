import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TvShowSchema = new Schema({
    id: Number,
    popularity: String,
    cover: String,
    title: String,
    voteAverage: Number,
    synopsis: String,
    releaseDate: String,
    genres: [{ id: Number, name: String }],
    originalTitle: String,
    runtime: Number,
    status: String,
    tagline: String,
    poster: String,
    voteCount: Number,
    backdropCover: String,
    trailer: [Object],
    actors: [Object],
    directors: [Object],
    recommendations: [Object],
    logo: Object,
    rating: Number,
    favorite: Boolean,
    watchlist: Boolean
});

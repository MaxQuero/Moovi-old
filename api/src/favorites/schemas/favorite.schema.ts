import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const FavoriteSchema = new Schema({
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    movie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

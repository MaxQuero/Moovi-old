import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MovieSchema = new Schema({
    id: Number,
    rating: Number
});
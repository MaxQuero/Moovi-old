import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
    title: String,
    description: String,
    synopsis: String,
    director: String,
    datePosted: String,
});
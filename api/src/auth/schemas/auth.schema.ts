import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
    id: String,
    expiresAt: String
});
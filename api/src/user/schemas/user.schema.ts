import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    expiresAt: String
});
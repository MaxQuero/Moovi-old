import { Document } from 'mongoose';

export class EpisodeInterface extends Document {
    id: number;
    season: number;
    episode: number;
    rating: number
}
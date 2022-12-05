import { Document } from 'mongoose';
import { ObjectType } from '@nestjs/graphql';

export class EpisodeInterface extends Document {
    id: number;
    season: number;
    episode: number;
    rating: number
}
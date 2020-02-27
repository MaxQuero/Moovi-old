import { Document } from 'mongoose';

export interface MovieInterface extends Document {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly author: string;
    readonly datePosted: string;
}
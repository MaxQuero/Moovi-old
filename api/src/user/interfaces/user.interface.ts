import { Document } from 'mongoose';

export interface UserInterface extends Document {
    readonly id: string;
    readonly sessionId: string;
    readonly username: string;
}
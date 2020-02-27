import { Document } from 'mongoose';

export interface AuthInterface extends Document {
    readonly id: string;
    readonly expiresAt: string;
}
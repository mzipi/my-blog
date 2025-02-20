import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    role: string;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    username: String,
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

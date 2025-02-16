import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    content: string;
    userId: mongoose.Schema.Types.ObjectId;
}

const commentSchema: Schema = new Schema({
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);
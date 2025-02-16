import mongoose, { Schema, Document } from 'mongoose';

interface IEntry extends Document {
    title: string;
    content: string;
    tags: string[];
}

const entrySchema = new Schema<IEntry>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
}, { timestamps: true });

const Entry = mongoose.models.Entry || mongoose.model<IEntry>('Entry', entrySchema);

export { Entry };
import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  user: string;
  content: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);
export default Comment;

import mongoose, { Schema } from "mongoose";

const UserBlogHistorySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogHistory: [
    {
      blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
      },
      clickedTime: {
        type: Date,
        default: Date.now, 
      },
    },
  ],
}, { timestamps: true });

export const UserBlogHistory = mongoose.model("UserBlogHistory", UserBlogHistorySchema);

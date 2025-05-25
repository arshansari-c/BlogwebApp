import mongoose, { Schema } from "mongoose";

const blogCommentSchema = new Schema({
  blogId: {
    type: mongoose.Schema.ObjectId,
    ref: "Blog",
    required: true,
  },
  comments: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      userComment: {
        type: String,
        required: true,
      },
      bloggerHearted: {
        type: Boolean,
        default: false,
      },
      commentUserId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      likes: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        }
      ],
      dislikes: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        }
      ],
      replies: [  
        {
          replyUserId: { 
            type: mongoose.Schema.ObjectId,
            ref: "User",
          },
          replyComment: { 
            type: String,
          }
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
}, { timestamps: true });

export const BlogComment = mongoose.model("BlogComment", blogCommentSchema);

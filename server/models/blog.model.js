import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: "news",
    enum: [
      "news",
      "gaming",
      "food",
      "entertainment", // fixed typo
      "tech",
      "animal",
      "anime",
      "k-pop"
    ],
  },
  tags: {
    type: String,
  },
  likes:[{
    type : mongoose.Schema.ObjectId,
    ref : "User"
  }],
  dislikes:[{
    type : mongoose.Schema.ObjectId,
    ref : "User"
  }],
  creatorId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);

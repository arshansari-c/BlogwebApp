import mongoose, { Schema } from "mongoose";

const bloggerFollowersSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    channelName: {
        type: String,
        required: true
    },
    followers: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    totalFollowers:{
        type : Number
    }
}, { timestamps: true });

export const BloggerFollowers = mongoose.model("BloggerFollowers", bloggerFollowersSchema);

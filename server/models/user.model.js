import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        select : false,
        lowercase: true, 
    },
    password: {
        type: String,
        select : false,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedOtp: {
        type: Number,
        select : false,
    },
    verifiedOtpExpire: {
        type: Date,
        select : false,
    },
    resetPasswordOtp: {
        type: Number,
        select : false,
    },
    resetPasswordOtpExpire: {
        type: Date, 
        select : false,
    },
    userImage: {
        public_url: {
            type: String,
            default: "none"
        },
        url: {
            type: String,
            default: "none"
        }
    },
    channelName :{
        type : String,
        trim : true,
    },
    role: {
        type: String,
        enum: ["blogger", "user"],
        default: "user"
    },
    savedblog:[{
        type : mongoose.Schema.ObjectId,
        ref : "Blog"
    }],
    likedblog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
      }],
      dislikedBlog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
      }],
      followingBloggers: [{
        userId: {
          type: mongoose.Schema.ObjectId,
          ref: "User"
        }
      }], 
      blogSearchingHistory:[{
        searchingTitle : {
            type : "String"
        }
      }]     
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

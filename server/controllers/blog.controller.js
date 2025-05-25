import { v2 as cloudinary } from 'cloudinary';
import { Blog } from '../models/blog.model.js';
import fs from 'fs'
import { User } from '../models/user.model.js';
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET
});
export const uploadBlog = async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Check file exists
      if (!req.files || !req.files.blogImage) {
        return res.status(400).json({ message: "Blog image is required" });
      }
  
      const blogImage = req.files.blogImage;
  
      
      const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({ message: "Only png, jpg, jpeg, webp are allowed" });
      }
  
      const { blogTitle, category, description, tags } = req.body;
  
      
      if (!blogTitle || !category || !description) {
        return res.status(400).json({ message: "blogTitle, category, and description are required" });
      }
  
      
      if (description.length < 222) {
        return res.status(400).json({ message: "Description must be at least 222 characters" });
      }
  
      
      const cloud = await cloudinary.uploader.upload(blogImage.tempFilePath);
  
      
      const newBlog = new Blog({
        blogTitle,
        description,
        category,
        blogImage: {
          public_id: cloud.public_id,
          url: cloud.secure_url
        },
        creatorId: userId,
        tags
      });
  
      await newBlog.save();
  
      res.status(200).json({ message: "Blog created successfully" });
      await fs.promises.unlink(blogImage.tempFilePath);
  
    } catch (error) {
      console.error("Upload blog error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const updateBlog = async (req, res) => {
    try {
      const userId = req.user._id;
      const {blogImage} = req.files
      const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({ message: "Only png, jpg, jpeg, webp are allowed" });
      }
      const { blogId } = req.params;
      const { blogTitle, description, category } = req.body;
  
      
      if (!blogTitle || !description || !category) {
        return res.status(400).json({ message: "blogTitle, description and category are required" });
      }
      const cloud = await cloudinary.uploader.upload(blogImage.tempFilePath);
    
      const updatedBlog = await Blog.findOneAndUpdate(
        { _id: blogId, creatorId: userId },
        { blogTitle, description, category ,blogImage:{
            public_id : cloud.public_id,
            url : cloud.secure_url
        }},
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found or unauthorized" });
      }
  
      res.status(200).json({ message: "Blog updated successfully", updatedBlog });
      await fs.promises.unlink(blogImage.tempFilePath);
    } catch (error) {
      console.error("Update blog error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const deleteBlog = async (req, res) => {
    try {
      const userId = req.user._id;
      const { blogId } = req.params;
  
      const deletedBlog = await Blog.findOneAndDelete({
        _id: blogId,
        creatorId: userId,
      });
  
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found or unauthorized" });
      }
  
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      console.log("Delete blog error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const bloglike = async (req, res) => {
    try {
      const { blogId } = req.params;
      const userId = req.user._id;
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      
      const findUser = await User.findById(userId);
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (findBlog.likes.includes(userId)) {
        return res.status(400).json({ message: "Already liked this blog" });
      }
  
      // ✅ Add like to blog
      findBlog.likes.push(userId);
  
      // ✅ Add blogId to user's likedblog
      findUser.likedblog.push(blogId);
  
      // ✅ Remove from dislikes (if present)
      findBlog.dislikes = findBlog.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
      findUser.dislikedBlog = findUser.dislikedBlog.filter(
        (id) => id.toString() !== blogId.toString()
      );
  
      await findBlog.save();
      await findUser.save();
  
      res.status(200).json({ message: "Blog liked successfully" });
  
    } catch (error) {
      console.log("Blog like error:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  };

  export const blogDislike = async (req, res) => {
    try {
      const { blogId } = req.params;
      const userId = req.user._id;
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      const findUser = await User.findById(userId);
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (findBlog.dislikes.includes(userId)) {
        return res.status(400).json({ message: "Already disliked this blog" });
      }
  
      
      findBlog.dislikes.push(userId);
  
      
      if (!findUser.dislikedBlog.includes(blogId)) {
        findUser.dislikedBlog.push(blogId);
      }
  
      
      findBlog.likes = findBlog.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
  
      
      findUser.likedblog = findUser.likedblog.filter(
        (id) => id.toString() !== blogId.toString()
      );
  
      await findBlog.save();
      await findUser.save();
  
      res.status(200).json({ message: "Blog disliked successfully" });
  
    } catch (error) {
      console.log("Blog dislike error:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  
  
  export const deletebloglike = async (req, res) => {
    try {
      const { blogId } = req.params;
      const userId = req.user._id;
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      const findUser = await User.findById(userId)
      if(!findUser){
        return res.status(444).json({message:"User not found"})
      }
      if (!findBlog.likes.includes(userId)) {
        return res.status(400).json({ message: "You have not liked this blog" });
      }
  
      
      findBlog.likes = findBlog.likes.filter(
        (id) => id.toString() !== userId.toString()
      );

      findUser.likedblog = findUser.likedblog.filter(
        (id) => id.toString() !== blogId.toString()
      );
      await findBlog.save();
      await findUser.save()
      res.status(200).json({ message: "Blog like removed successfully" });
  
    } catch (error) {
      console.log("Delete blog like error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const deleteblogdislike = async (req, res) => {
    try {
      const { blogId } = req.params;
      const userId = req.user._id;
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      const findUser = await User.findById(userId)
      if(!findUser){
        return res.status().json({message:"User not found"})
      }

      if (!findBlog.dislikes.includes(userId)) {
        return res.status(400).json({ message: "You have not dislike this blog" });
      }
  
     
      findBlog.dislikes = findBlog.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );

      findUser.dislikedBlog = findUser.dislikedBlog.filter(
        (id) => id.toString() !== blogId.toString()
      );
  
      await findBlog.save();
      await findUser.save();
  
      res.status(200).json({ message: "Blog dislike removed successfully" });
  
    } catch (error) {
      console.log("Delete blog like error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const checkbloglikeordislike = async (req, res) => {
    try {
      const { blogId } = req.params;
      const userId = req.user._id;
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      if (findBlog.likes.includes(userId)) {
        return res.status(200).json({
          message: "You liked this blog",
          liked: true,
          disliked: false,
          none: false
        });
      }
  
      if (findBlog.dislikes.includes(userId)) {
        return res.status(200).json({
          message: "You disliked this blog",
          liked: false,
          disliked: true,
          none: false
        });
      }
  
      return res.status(200).json({
        message: "You have neither liked nor disliked this blog",
        liked: false,
        disliked: false,
        none: true
      });
  
    } catch (error) {
      console.log("Check blog like/dislike error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const savedblog = async (req, res) => {
    try {
      const { blogId } = req.params;
      const userId = req.user._id; 
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      const findUser = await User.findById(userId);
      if (!findUser) {
        return res.status(404).json({ message: "Invalid user" });
      }
  
      if (findUser.savedblog.includes(blogId)) {
        return res.status(400).json({ message: "You already saved this blog" });
      }
  
      findUser.savedblog.push(blogId);
      await findUser.save();
  
      res.status(200).json({ message: "Blog saved successfully" });
    } catch (error) {
      console.log("Saved blog error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const unsavedblog = async (req, res) => {
    try {
      const { blogId } = req.params;
      const userId = req.user._id;
  
      const findBlog = await Blog.findById(blogId);
      if (!findBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      const findUser = await User.findById(userId);
      if (!findUser) {
        return res.status(404).json({ message: "Invalid user" });
      }
  
      if (!findUser.savedblog.includes(blogId)) {
        return res.status(400).json({ message: "You haven't saved this blog" });
      }
  
      
      findUser.savedblog = findUser.savedblog.filter((id) => id.toString() !== blogId.toString());
  
      await findUser.save();
      res.status(200).json({ message: "Blog unsaved successfully" });
    } catch (error) {
      console.log("Unsaved blog error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const singleBlog = async (req, res) => {
    try {
      const { blogId } = req.params;
  
      // Assuming 'userId' is the reference field in Blog schema
      const findblog = await Blog.findById(blogId).populate("creatorId", "channelName userImage");
  
      if (!findblog) {
        return res.status(400).json({ message: "Blog not found" });
      }
  
      res.status(200).json({
        message: "Blog fetched successfully",
        findblog
      });
    } catch (error) {
      console.log("single blog error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const fetchAllLikedBlogs = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if liked blogs exist
    if (!user.likedblog || user.likedblog.length === 0) {
      return res.status(404).json({ message: "No liked blogs found" });
    }

    // Fetch all liked blogs
    const likedBlogs = await Blog.find({ _id: { $in: user.likedblog } })
      .populate("creatorId", "username userImage");

    return res.status(200).json({
      message: "Liked blogs fetched successfully",
      likedBlogs,
    });
  } catch (error) {
    console.error("fetchAllLikedBlogs error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fatchAllDislikeBlog = async(req,res)=>{
  try {
        const userId = req.user._id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if liked blogs exist
    if (!user.dislikedBlog || user.dislikedBlog.length === 0) {
      return res.status(404).json({ message: "No Dislike blogs found" });
    }

    // Fetch all liked blogs
    const DislikedBlogs = await Blog.find({ _id: { $in: user.dislikedBlog } })
      .populate("creatorId", "username userImage");

    return res.status(200).json({
      message: "Disliked blogs fetched successfully",
      DislikedBlogs,
    });
  } catch (error) {
    console.log("FatchAllDislikeBlog error",error)
    return res.status(500).json({message:"Internal server error"})
  }
}
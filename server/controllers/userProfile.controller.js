import { Blog } from "../models/blog.model.js"
import { UserBlogHistory } from "../models/blogHistory.model.js"
import { User } from "../models/user.model.js"

export const userProfile = async(req,res)=>{
    try {
        const userId = req.user._id
        const findUser = await User.findById(userId)
        if(!findUser){
            return res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:"Profile fatch succefully",findUser})
    } catch (error) {
        console.log("user profile error",error)
        return res.status().json({message:"Internal server error"})
    }
}

export const userAllSavedBlog = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const findUser = await User.findById(userId);
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!findUser.savedblog || findUser.savedblog.length === 0) {
        return res.status(200).json({ message: "You have not saved any blogs", blogs: [] });
      }
  
      
      const savedBlogs = await Blog.find({
        _id: { $in: findUser.savedblog },
      }).populate("creatorId","username userImage");
  
      res.status(200).json({ message: "Saved blogs fetched successfully", blogs: savedBlogs });
  
    } catch (error) {
      console.log("User all saved blog error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const userAllLikedBlog = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const findUser = await User.findById(userId);
      if (!findUser) {
        return res.status(400).json({ message: "User not found" });
      }
  
    
      if (!findUser.likedblog || findUser.likedblog.length === 0) {
        return res.status(400).json({ message: "You haven't liked any blogs yet" });
      }
  
      
      const likedBlogs = await Blog.find({ _id: { $in: findUser.likedblog } });
  
      return res.status(200).json({
        message: "Liked blogs fetched successfully",
        blogs: likedBlogs,
      });
  
    } catch (error) {
      console.log("User all liked blog error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const userBlogHistory = async (req, res) => {
    try {
      const userId = req.user._id;
      const { blogId } = req.params;
  
      let historyDoc = await UserBlogHistory.findOne({ userId });
  
      if (!historyDoc) {
        
        const blogHistory = new UserBlogHistory({
          userId,
          blogHistory: [
            {
              blogId,
              clickedTime: Date.now(),
            },
          ],
        });
        await blogHistory.save();
      } else {
        
        const existingEntry = historyDoc.blogHistory.find(
          (entry) => entry.blogId.toString() === blogId.toString()
        );
  
        if (existingEntry) {
          existingEntry.clickedTime = Date.now();
        } else {
          historyDoc.blogHistory.push({
            blogId,
            clickedTime: Date.now(),
          });
        }
  
        await historyDoc.save();
      }
  
      return res.status(200).json({ message: "History updated successfully" });
    } catch (error) {
      console.log("User blog history error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  export const userBlogHistoryFatch = async (req, res) => {
    try {
      const userId = req.user._id;
      const findHistory = await UserBlogHistory.findOne({ userId });
  
      if (!findHistory || findHistory.blogHistory.length === 0) {
        return res.status(400).json({ message: "History not found" });
      }
  
      
      const sortedHistory = findHistory.blogHistory
        .sort((a, b) => b.clickedTime - a.clickedTime);
  
      
      const blogIds = sortedHistory.map((entry) => entry.blogId);
  
      
      const historyBlog = await Blog.find({ _id: { $in: blogIds } }).populate("creatorId","userImage username");
  
      res.status(200).json({
        message: "History fetched successfully",
        history: historyBlog,
      });
    } catch (error) {
      console.log("UserBlogHistoryFatch error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
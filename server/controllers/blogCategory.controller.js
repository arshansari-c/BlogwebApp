import { Blog } from "../models/blog.model.js";


export const Allblogs = async (req, res) => {
  try {
    const findblog = await Blog.find()
      .populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
      .exec();

    return res.status(200).json({ blogs: findblog });

  } catch (error) {
    console.log("All blog error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const todayBlog = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); 

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); 

    const blogs = await Blog.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
    .exec();
    
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found today" });
    }

    return res.status(200).json({ blog: blogs });
  } catch (error) {
    console.log("today blog error", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const newsBlog = async(req,res)=>{
    try {
        const findblog = await Blog.find({category:"news"}).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
        .exec();
        if(!findblog){
          return res.status(400).json({message:"blog not found"})
        }
        res.status(200).json({findblog})
    } catch (error) {
        console.log("newsblog error",error)
        return res.status().json({message:"Internal server error"})
    }
}


export const gamingBlog = async(req,res)=>{
  try {
      const findblog = await Blog.find({category:"gaming"}).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
      .exec();
      if(!findblog){
        return res.status(400).json({message:"blog not found"})
      }
      res.status(200).json({findblog})
  } catch (error) {
      console.log("newsblog error",error)
      return res.status().json({message:"Internal server error"})
  }
}



export const foodBlog = async(req,res)=>{
  try {
      const findblog = await Blog.find({category:"food"}).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
      .exec();
      if(!findblog){
        return res.status(400).json({message:"blog not found"})
      }
      res.status(200).json({findblog})
  } catch (error) {
      console.log("newsblog error",error)
      return res.status().json({message:"Internal server error"})
  }
}


export const entertainmentBlog = async(req,res)=>{
  try {
      const findblog = await Blog.find({category:"entertainment"}).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
      .exec();
      if(!findblog){
        return res.status(400).json({message:"blog not found"})
      }
      res.status(200).json({findblog})
  } catch (error) {
      console.log("newsblog error",error)
      return res.status().json({message:"Internal server error"})
  }
}


export const techBlog = async(req,res)=>{
  try {
      const findblog = await Blog.find({category:"tech"}).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
      .exec();
      if(!findblog){
        return res.status(400).json({message:"blog not found"})
      }
      res.status(200).json({findblog})
  } catch (error) {
      console.log("newsblog error",error)
      return res.status().json({message:"Internal server error"})
  }
}


export const animalBlog = async(req,res)=>{
  try {
      const findblog = await Blog.find({category:"animal"}).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
      .exec();
      if(!findblog){
        return res.status(400).json({message:"blog not found"})
      }
      res.status(200).json({findblog})
  } catch (error) {
      console.log("newsblog error",error)
      return res.status().json({message:"Internal server error"})
  }
}


export const animeBlog = async(req,res)=>{
  try {
      const findblog = await Blog.find({category:"anime"}).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
      .exec();
      if(!findblog){
        return res.status(400).json({message:"blog not found"})
      }
      res.status(200).json({findblog})
  } catch (error) {
      console.log("newsblog error",error)
      return res.status().json({message:"Internal server error"})
  }
}



export const kpop = async(req,res)=>{
  try {
      const findblog = await Blog.find({category:"k-pop"}).populate("creatorId", "userImage channelName") // Fetch specific fields from the User model
      .exec();
      if(!findblog){
        return res.status(400).json({message:"blog not found"})
      }
      res.status(200).json({findblog})
  } catch (error) {
      console.log("newsblog error",error)
      return res.status().json({message:"Internal server error"})
  }
}
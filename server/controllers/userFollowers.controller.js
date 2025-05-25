
import { Blog } from "../models/blog.model.js"
import { User } from "../models/user.model.js"
import { BloggerFollowers } from "../models/userFollowers.model.js"

export const followBlogger = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        const blog = await Blog.findById(blogId).select("+creatorId");
        if (!blog) {
            return res.status(400).json({ message: "Blog not found" });
        }

        const creatorId = blog.creatorId;
        const creator = await User.findById(creatorId).select("+channelName");
        const user = await User.findById(userId);

        if (!creator) {
            return res.status(400).json({ message: "Creator not found" });
        }

        const channelName = creator.channelName;

        let bloggerDoc = await BloggerFollowers.findOne({ userId: creatorId });

        if (!bloggerDoc) {
            bloggerDoc = new BloggerFollowers({
                userId: creatorId,
                channelName,
                followers: [{ userId }]
            });

            if (!user.followingBloggers.some(b => b.creatorId.toString() === creatorId.toString())) {
                user.followingBloggers.push({userId: creatorId });
            }
            bloggerDoc.totalFollowers =  bloggerDoc.followers.length
            await bloggerDoc.save();
            await user.save();

            return res.status(200).json({ message: "You successfully followed this blogger (new doc created)" });
        }

        const alreadyFollowing = bloggerDoc.followers.some(f => f.userId.toString() === userId.toString());
        if (alreadyFollowing) {
            return res.status(400).json({ message: "You already follow this blogger" });
        }

        bloggerDoc.followers.push({ userId });
        bloggerDoc.totalFollowers =  bloggerDoc.followers.length
        if (!user.followingBloggers.some(b => b.creatorId.toString() === creatorId.toString())) {
            user.followingBloggers.push({ userId :  creatorId });
        }
      
        await bloggerDoc.save();
        await user.save();

        res.status(200).json({ message: "You successfully followed this blogger" });

    } catch (error) {
        console.log("followBlogger error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const unfollowBlogger = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        const blog = await Blog.findById(blogId).select("+creatorId");
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const creatorId = blog.creatorId;
        const user = await User.findById(userId);
        const followersDoc = await BloggerFollowers.findOne({ userId: creatorId });

        if (!followersDoc) {
            return res.status(400).json({ message: "This blogger has no followers" });
        }

        const isFollowing = followersDoc.followers.some(f => f.userId.toString() === userId.toString());
        if (!isFollowing) {
            return res.status(400).json({ message: "You do not follow this blogger" });
        }

        
        followersDoc.followers = followersDoc.followers.filter(f => f.userId.toString() !== userId.toString());
        followersDoc.totalFollowers =  followersDoc.followers.length
        
        user.followingBloggers = user.followingBloggers.filter(f => f.userId.toString() !== creatorId.toString());
        

        await followersDoc.save();
        await user.save();

        return res.status(200).json({ message: "Successfully unfollowed the blogger" });

    } catch (error) {
        console.log("unfollowBlogger error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const checkBloggerFollowOrUnfollow = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        
        const blog = await Blog.findById(blogId).select("+creatorId");
        if (!blog) {
            return res.status(400).json({ message: "Blog not found" });
        }

        const creatorId = blog.creatorId;

        
        const followDoc = await BloggerFollowers.findOne({ userId: creatorId });
        if (!followDoc) {
            return res.status(200).json({ message: "You do not follow this blogger", following: false });
        }

        
        const isFollowing = followDoc.followers.some(f => f.userId.toString() === userId.toString());

        if (!isFollowing) {
            return res.status(200).json({ message: "You do not follow this blogger", following: false });
        }

        return res.status(200).json({ message: "Yes, you follow this blogger", following: true });

    } catch (error) {
        console.log("checkBloggerFollowOrUnfollow error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const fatchUserFollowingBlogger = async (req, res) => {
    try {
        const userId = req.user._id;

        
        const user = await User.findById(userId).select("followingBloggers");

        if (!user || !user.followingBloggers || user.followingBloggers.length === 0) {
            return res.status(200).json({ message: "You are not following any bloggers", bloggers: [] });
        }

    
        const bloggerIds = user.followingBloggers.map(b => b.userId);

        
        const bloggers = await User.find({ _id: { $in: bloggerIds } }).select("username userImage channelName");

        return res.status(200).json({ message: "Following bloggers fetched successfully", bloggers });

    } catch (error) {
        console.log("fatchUserFollowingBlogger error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

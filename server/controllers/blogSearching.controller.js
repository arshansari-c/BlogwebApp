import { Blog } from "../models/blog.model.js";
import {User} from "../models/user.model.js"

export const searchBlog = async (req, res) => {
    try {
        const { search } = req.body;
        const userId = req.user._id;

        if (!search || typeof search !== "string") {
            return res.status(400).json({ message: "Search term is required" });
        }

        const trimmedSearch = search.trim();
        if (!trimmedSearch) {
            return res.status(400).json({ message: "Search term cannot be empty" });
        }

        const findUser = await User.findById(userId);
        
        // Create case-insensitive regex for exact phrase matching
        const regex = new RegExp(trimmedSearch, 'i');
        
        // Search for blogs with title matching the exact phrase
        const blogs = await Blog.find({
            blogTitle: { $regex: regex }
        });

        // Check if search term exists in history (case-insensitive comparison)
        const alreadyExists = findUser.blogSearchingHistory.some(t => 
            t.searchingTitle.toLowerCase() === trimmedSearch.toLowerCase()
        );

        if (!alreadyExists) {
            findUser.blogSearchingHistory.push({ searchingTitle: trimmedSearch });
            await findUser.save();
        }

        return res.status(200).json({ blogs });
    } catch (error) {
        console.log("searchBlog error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteSearchhistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { searchId } = req.params;

        const findUser = await User.findById(userId);

        
        const exists = findUser.blogSearchingHistory.some(
            t => t._id.toString() === searchId.toString()
        );

        if (!exists) {
            return res.status(400).json({ message: "This is not added in search history" });
        }

        
        findUser.blogSearchingHistory = findUser.blogSearchingHistory.filter(
            item => item._id.toString() !== searchId.toString()
        );

        await findUser.save(); 

        return res.status(200).json({ message: "Search deleted successfully" });
    } catch (error) {
        console.log("delete search history error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

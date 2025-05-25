import { User } from "../models/user.model.js"; // make sure the path is correct

export const checkBlogger = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const findUser = await User.findById(userId);

        if (findUser.role !== "blogger") {
            return res.status(403).json({ message: "Sorry, you are not a blogger" });
        }

        next(); 
    } catch (error) {
        console.log("check blogger error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

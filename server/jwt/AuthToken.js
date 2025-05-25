import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const authCookie = async ({userId,res}) => {
    try {
        const secret = process.env.AUTH_SECRET_TOKEN;
        if (!secret) {
            return res.status(500).json({ message: "Secret auth token not found in .env file" });
        }

        const token = jwt.sign({ userId }, secret, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,             // must be true if using https or in production
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        
    } catch (error) {
        console.log("AuthCookie error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.AUTH_SECRET_TOKEN); 
        const userId = decoded.userId;

        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(401).json({ message: "Invalid User" });
        }

        req.user = findUser;
        next(); 
    } catch (err) {
        return res.status(500).json({ message: "Auth failed", error: err.message });
    }
}

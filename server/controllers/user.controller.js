import bcrypt from "bcryptjs"
import { User } from "../models/user.model.js"
import { sendEmail } from "../util/emailTransporter.js"
import { authCookie } from "../jwt/AuthToken.js";
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { resetPasswordToken } from "../jwt/resetPasswordCookie.js";
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET
});

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        
        const findUser = await User.findOne({ email }).select("+isVerified +verifiedOtp");

        if (findUser) {
            if (findUser.isVerified === true) {
                return res.status(400).json({ message: "User already exists" });
            } else if(findUser.isVerified===false){
                findUser.verifiedOtpExpire = Date.now() + 7 * 60 * 1000; 
                await findUser.save()
               await sendEmail({email:email,otp:findUser.verifiedOtp,category:"Register"})
                return res.status(409).json({ message: "User registered but not verified" });
                
            }
        }

        
        const hashPassword = await bcrypt.hash(password, 7);
        const otp = Math.floor(100000 + Math.random() * 900000); 
        const otpExpired = Date.now() + 7 * 60 * 1000; 

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            verifiedOtp: otp,
            verifiedOtpExpire: otpExpired
        });

        await newUser.save();

        
        await sendEmail({email:newUser.email,otp:newUser.verifiedOtp,category:"Register"});

        return res.status(200).json({ message: "Registration completed successfully" });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const verifyAccount = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const findUser = await User.findOne({ email }).select("+verifiedOtp +verifiedOtpExpire +isVerified +_id");

        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }
        if(findUser.isVerified==true){
            return res.status(200).json({message:"Already verify"})
        }
        if(otp!==findUser.verifiedOtp){
            return res.status(400).json({message:"Invalid otp"})
        }
        if(Date.now()>findUser.verifiedOtpExpire){
            return res.status(400).json({message:"Otp is expired"})
        }
        findUser.verifiedOtp = undefined
        findUser.verifiedOtpExpire = undefined
        findUser.isVerified = true
        await findUser.save()
        await authCookie({userId:findUser._id,res})
        res.status(222).json({message:"Verify succesfully"})
    } catch (error) {
        console.log("verifyAccount error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const forgetPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const resetPasswordOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const resetPasswordOtpExpire = Date.now() + 7 * 60 * 1000; // 7 minutes

        await sendEmail({
            email: email,
            otp: resetPasswordOtp,
            category: "Forget Password"
        });

        findUser.resetPasswordOtp = resetPasswordOtp;
        findUser.resetPasswordOtpExpire = resetPasswordOtpExpire;

        await findUser.save();

        return res.status(200).json({ message: "Forget password OTP sent successfully" });

    } catch (error) {
        console.log("ForgetPassword error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const resetPassword = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email }).select("+resetPasswordOtp +resetPasswordOtpExpire +_id");

        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (otp !== user.resetPasswordOtp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > user.resetPasswordOtpExpire) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // Clear OTP fields
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpire = undefined;
        await user.save();

        // Log the user in (set token)
        await resetPasswordToken({ userId: user._id, res });

        res.status(200).json({ message: "OTP verified" });

    } catch (error) {
        console.log("OTP login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const setNewPassword = async (req, res) => {
    try {
        const token = req.cookies.resetpassword;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        const decode = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN);
        if (!decode) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const userId = decode.userId;
        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        if (password.length < 7 || password.length > 22) {
            return res.status(400).json({ message: "Password must be 7 to 22 characters" });
        }
        const hashpassword = await bcrypt.hash(password,7)

        findUser.password = hashpassword;
        await findUser.save();

        res.clearCookie("resetpassword", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).json({ message: "New password saved successfully" });

    } catch (error) {
        console.log("setNewPassword error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({message:"Email and password is required"})
        }
        const findUser = await User.findOne({email}).select("+password +_id")
        if(!findUser){
            return res.status(400).json({message:"Invalid Email"})
        }
        const compare = await bcrypt.compare(password,findUser.password)
        if(!compare){
            return res.status(400).json({message:"Invalid password"})
        }
        await authCookie({userId:findUser._id,res})
        res.status(200).json({message:"Login succesfully"})
    } catch (error) {
        console.log("login error",error)
        return res.status().json({message:"Internal server error"})
    }
}

export const logout = async (req, res) => {
    try {
        // Check if token exists
        if (!req.cookies || !req.cookies.token) {
            return res.status(400).json({ message: "Token not found" });
        }

        
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        console.log("logout error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const ConverInBlogger = async (req, res) => {
    try {
        const userId = req.user._id;
        const findUser = await User.findById(userId).select("+role");

        if (findUser.role === "blogger") {
            return res.status(400).json({ message: "User already a blogger" });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "Blog image is required" });
        }
        const { userImage } = req.files;
        const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(userImage.mimetype)) {
            return res.status(400).json({ message: "Only png, jpg, jpeg, webp are allowed" });
        }
        
        if (!userImage) {
            return res.status(400).json({ message: "User image is required" });
        }

        const { channelName } = req.body;
        if (!channelName) {
            return res.status(400).json({ message: "Channel name is required" });
        }

        const cloud = await cloudinary.uploader.upload(userImage.tempFilePath);

        findUser.role = "blogger";
        findUser.channelName = channelName;
        findUser.userImage = {
            public_id: cloud.public_id,
            url: cloud.secure_url
        };

        await findUser.save();
        res.status(200).json({ message: "Successfully converted to blogger" });
        await fs.promises.unlink(userImage.tempFilePath);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}

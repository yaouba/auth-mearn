import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("Please provide all the required fields");
        }

        const user = await User.findOne({ email });

        if (user) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const newUser = await User({ 
            email, 
            password: hashedPassword, 
            name,
            verificationToken,
            verificationTokenExpires: Date.now() + 3600 * 1000
        });

        await newUser.save();

        generateTokenAndSetCookie(res, newUser._id);

        sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).json({ success: true, message: "User created successfully",
            user: {
                ...newUser._doc,
                password: undefined,
            }
         });
        
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            throw new Error("Invalid verification code");
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpires = null;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const login = (req, res) => {
    console.log(req.body);
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const forgotPassword = (req, res) => {
    console.log(req.body);
}

export const resetPassword = (req, res) => {
    console.log(req.body);
}
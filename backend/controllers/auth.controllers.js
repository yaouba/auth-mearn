import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/user.model.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";

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

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("Please provide all the required field")
        }


        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date()
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const forgotPassword = async(req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }


        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600 * 1000;
        await user.save();

        sendResetPasswordEmail(user.email, resetUrl);

        return res.status(200).json({ success: true, message: "Password reset email sent successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
   try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }
        
        const user = await User.findOne({ 
            resetPasswordToken: token, 
            resetPasswordExpires: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        return res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ success: true, message: "User is authenticated", user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
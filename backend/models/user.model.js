import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordExpires: {
        type: Date,
        default: null,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    verificationTokenExpires: {
        type: Date,
        default: null,
    }
}, { timestamps: true });

const User = model("User", UserSchema);

export default User;
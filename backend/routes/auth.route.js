import { Router } from "express";
import { forgotPassword, resetPassword, logout, verifyEmail, login, signup } from "../controllers/auth.controllers.js";

const router = Router();


router.post('/register', signup);

router.post('/login', login);

router.post('/logout', logout)

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

router.post('/verify-email', verifyEmail);

export default router;
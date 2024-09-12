import { Router } from "express";
import { forgotPassword, verifyEmail, login, signup } from "../controllers/auth.controllers.js";

const router = Router();


router.post('/register', signup);

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/verify-email', verifyEmail);

export default router;
import { Router } from "express";
import { 
    forgotPassword, 
    resetPassword, 
    verifyEmail, 
    checkAuth,
    logout,  
    login, 
    signup 
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = Router();


router.post('/register', signup);

router.post('/login', login);

router.get('/check-auth', verifyToken, checkAuth);

router.post('/logout', logout)

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

router.post('/verify-email', verifyEmail);

export default router;
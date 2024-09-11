import { Router } from "express";
import { forgotPassword, login, signup } from "../controllers/auth.controllers.js";

const router = Router();


router.post('/register', signup);

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', async (req, res) => {
    console.log(req.body);
})

export default router;
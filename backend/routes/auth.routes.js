import express from "express";
import { Signup , Login, Logout, sendverificationOtp, verifyEmail, isAuthenticated, resetPasswordOtp, resetPassword } from "../controllers/auth.controllers.js";
import protectRoute from "../middlewares/auth.middleware.js"
const router=express.Router();

router.post("/register",Signup);
router.post("/login",Login);
router.post("/logout",Logout);
router.post("/send-verify-otp", protectRoute, sendverificationOtp);
router.post("/verify-account", protectRoute, verifyEmail);
router.post("/is-auth", protectRoute, isAuthenticated);
router.post("/send-reset-otp", resetPasswordOtp);
router.post("/reset-password", resetPassword);


export default router;
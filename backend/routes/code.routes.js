import express from "express";
import protectRoute from "../middlewares/auth.middleware.js"
const router=express.Router();
import { runCode } from "../controllers/code.controllers.js";
router.post("/run-code", protectRoute, runCode);


export default router;
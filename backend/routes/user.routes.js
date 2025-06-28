import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import { getUserData, analyzeInputController, generateEvaluationController, evaluateAnswersController, suggestProjectsController, getHintsController, revealSolutionController } from "../controllers/user.controller.js";

const router=express.Router();

router.get("/getdata",protectRoute,getUserData);
router.post("/analyze-input",protectRoute, analyzeInputController);
router.post("/generate-evaluation", protectRoute, generateEvaluationController);
router.post("/evaluate-answers", protectRoute, evaluateAnswersController);
router.post("/suggest-projects", protectRoute, suggestProjectsController);
router.post("/get-hints", protectRoute, getHintsController);
router.post("/reveal-solution", protectRoute, revealSolutionController);

export default router;
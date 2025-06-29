import express from "express";
import { generateFromGemini } from "../utils/geminiClient.js";

const router = express.Router();

router.post("/generate-projects", async (req, res) => {
  const { input } = req.body;
  let promptText = "";

  
    promptText = `You are an AI assistant helping a student who is stuck while building a project.
    They are facing the following issue or question: "${input}".
    

    Give a clear, simple solution or suggestion to move forward. Include:
    - Step by step guide
    - GitHub links or articles if relevant
    - Beginner-friendly explanation, no emojis.
    Provide the complete Responce in Markdown format
    `;
  


  try {
    const result = await generateFromGemini(promptText);
    res.json({ result });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({ error: "Failed to generate ideas" });
  }
});

export default router;

import express from "express";
import { generateFromGemini } from "../utils/geminiClient.js";

const router = express.Router();

router.post("/generate-projects", async (req, res) => {
  const { input, skillLevel, domain, mode } = req.body;
  let promptText = "";

  if (mode === "ideas") {
    promptText = `You are an AI assistant that helps students generate creative and personalized DIY project ideas.
    The user is interested in the topic: "${input}".
    Skill Level: ${skillLevel}.
    Domain: ${domain}.

    Generate 2-3 helpful project ideas. For each idea, include:
    - Title
    - Simple explanation
    - Suggested tools or technologies
    - Helpful links from GitHub, YouTube, or articles
    - A high-level step-by-step plan for complete feature in simple language

      At the end tell the these are the [Internship-Ready], [Job-Ready], [Portfolio] ready project ideas
      Don't include emojis or code. Make sure the response is simple and easy to understand like a human teacher.
      Provide the complete Responce in Markdown format
      `;
  } else {
        promptText = `You are an AI assistant helping a student who is stuck while building a project.
    They are facing the following issue or question: "${input}".
    Skill Level: ${skillLevel}.
    Domain: ${domain}.

    Give a clear, simple solution or suggestion to move forward. Include:
    - Suggestions in plain English
    - GitHub links or articles if relevant
    - Beginner-friendly explanation, no emojis.
    Provide the complete Responce in Markdown format
    `;
  }


  try {
    const result = await generateFromGemini(promptText);
    res.json({ result });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({ error: "Failed to generate ideas" });
  }
});

export default router;

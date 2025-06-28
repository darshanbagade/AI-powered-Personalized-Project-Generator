import fetch from "node-fetch"; 

export async function generateFromGemini(promptText) {
  const apiKey = process.env.GEMINI_API_KEY2;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  console.log("Gemini response:", data); // Debug log

  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0].content.parts[0].text;
  } else {
    throw new Error(JSON.stringify(data)); // Show detailed error
  }
}

import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function revealSolutionService({ projectTitle, userLevel }) {
    const prompt = `You are an expert programming mentor. Provide a detailed, educational solution for the project "${projectTitle}" tailored for a ${userLevel} level developer.

IMPORTANT: Provide a step-by-step solution that:
- Explains the reasoning behind each step
- Encourages understanding and creativity
- Is NOT a complete copy-paste solution
- Helps the user learn and think critically

Format the response as JSON:

{
  "solution": {
    "overview": "Brief overview of the approach",
    "steps": [
      {
        "step": 1,
        "title": "Step Title",
        "description": "Detailed explanation of what to do and why",
        "keyPoints": ["Key point 1", "Key point 2"]
      }
    ],
    "finalNotes": "Important considerations and next steps"
  }
}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 1024,
            }
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', errorText);
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    try {
        // Clean the content to extract only JSON
        let jsonContent = content.trim();
        jsonContent = jsonContent.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
        
        const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No JSON found in response');
        }
        
        const parsed = JSON.parse(jsonMatch[0]);
        
        if (!parsed.solution) {
            throw new Error('Invalid solution format');
        }
        
        return parsed.solution;
    } catch (parseError) {
        console.error('Failed to parse solution JSON:', parseError);
        console.error('Raw response:', content);
        
        // Return fallback solution
        return {
            overview: "Here's a general approach to solve this project:",
            steps: [
                {
                    step: 1,
                    title: "Understand the Requirements",
                    description: "Start by clearly understanding what the project needs to accomplish. Break down the requirements into smaller, manageable tasks.",
                    keyPoints: ["Identify core features", "Define success criteria"]
                },
                {
                    step: 2,
                    title: "Plan Your Approach",
                    description: "Design the overall architecture and choose appropriate technologies. Consider the user level and complexity requirements.",
                    keyPoints: ["Choose appropriate tools", "Design system architecture"]
                },
                {
                    step: 3,
                    title: "Implement Step by Step",
                    description: "Build the project incrementally, testing each component as you go. This helps catch issues early and makes debugging easier.",
                    keyPoints: ["Build incrementally", "Test frequently"]
                }
            ],
            finalNotes: "Remember to test thoroughly and consider edge cases. Don't be afraid to refactor and improve your code as you learn more."
        };
    }
} 
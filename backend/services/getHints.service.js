import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function getHintsService({ concept, projectTitle }) {
    const prompt = `You are an expert programming mentor. Generate 3 progressive hints for the project "${projectTitle}" related to the concept "${concept}".

Generate exactly 3 hints in increasing difficulty:
- Hint 1: A gentle nudge in the right direction
- Hint 2: More specific guidance about approach
- Hint 3: Detailed technical guidance

IMPORTANT: Return ONLY valid JSON without any additional text.

{
  "hints": [
    {
      "id": "hint1",
      "text": "First hint text",
      "difficulty": "Easy"
    },
    {
      "id": "hint2", 
      "text": "Second hint text",
      "difficulty": "Medium"
    },
    {
      "id": "hint3",
      "text": "Third hint text", 
      "difficulty": "Hard"
    }
  ]
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
                temperature: 0.3,
                maxOutputTokens: 512,
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
        
        if (!parsed.hints || !Array.isArray(parsed.hints)) {
            throw new Error('Invalid hints format');
        }
        
        return parsed.hints;
    } catch (parseError) {
        console.error('Failed to parse hints JSON:', parseError);
        console.error('Raw response:', content);
        
        // Return fallback hints
        return [
            {
                id: "hint1",
                text: "Start by understanding the basic requirements of the project.",
                difficulty: "Easy"
            },
            {
                id: "hint2", 
                text: "Break down the problem into smaller, manageable components.",
                difficulty: "Medium"
            },
            {
                id: "hint3",
                text: "Consider the best data structures and algorithms for your use case.",
                difficulty: "Hard"
            }
        ];
    }
} 
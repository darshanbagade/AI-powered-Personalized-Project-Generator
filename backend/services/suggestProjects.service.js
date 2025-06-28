import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function suggestProjectsService({ level, domain, concept }) {
    const prompt = `You are an expert project advisor. Suggest projects for a ${level} level user learning ${concept} in the ${domain} domain.

Generate exactly:
1. 2-3 project ideas with titles and descriptions
2. One starter boilerplate code snippet
3. 3 relevant existing GitHub repositories 

IMPORTANT: Return ONLY valid JSON without any additional text or formatting.

{
  "projects": [
    {
      "title": "Project Title",
      "description": "Brief project description",
      "difficulty": "Easy"
    }
  ],
  "boilerplate": {
    "name": "Starter Template",
    "description": "Brief description of the boilerplate",
    "code": "// Starter code snippet here",
    "language": "JavaScript"
  },
  "repositories": [
    {
      "name": "Repo Name",
      "description": "Brief description",
      "url": "https://github.com/username/repo",
      "stars": "1.2k"
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
        
        // Validate required fields
        if (!parsed.projects || !parsed.boilerplate || !parsed.repositories) {
            throw new Error('Missing required fields in response');
        }
        
        return parsed;
    } catch (parseError) {
        console.error('Failed to parse suggestions JSON:', parseError);
        console.error('Raw response:', content);
        
        // Return fallback data if parsing fails
        return {
            projects: [
                {
                    title: "Sample Project",
                    description: "A sample project to get you started",
                    difficulty: "Easy"
                }
            ],
            boilerplate: {
                name: "Basic Starter",
                description: "A basic starter template",
                code: "// Your code here\nconsole.log('Hello World!');",
                language: "JavaScript"
            },
            repositories: [
                {
                    name: "Sample Repo",
                    description: "A sample repository for learning",
                    url: "https://github.com/example/sample",
                    stars: "100"
                }
            ]
        };
    }
} 
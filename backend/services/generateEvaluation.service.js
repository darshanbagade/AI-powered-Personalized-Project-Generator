import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateEvaluationService({ concept, domains, summary }) {
    const prompt = `You are an expert education assistant. Generate a quiz for the concept "${concept}" in the domain(s): ${domains.join(', ')}.
    
Summary: ${summary}

Generate exactly:
1. 4 easy multiple choice questions (MCQs) with 4 options each and correct answers
2. 3 medium difficulty multiple choice questions (MCQs) with 4 options each and correct answers
3. 3 difficult multiple choice questions (MCQs) with 4 options each and correct answers

For medium and difficult level Ask the question inside the given concept . For ex, if user enter python then ask the questions inside the python like exception handling, Opps concept and all. do this for all the

Return ONLY valid JSON without any additional text or formatting:

{
  "mcqs": [
    {
      "id": "mcq1",
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correct": "A",
      "explanation": "Brief explanation of why this is correct"
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
    console.log(response);
    
    const data = await response.json();
    console.log(data);
    
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    try {
        // Clean the content to extract only JSON
        let jsonContent = content.trim();
        
        // Remove any markdown formatting
        jsonContent = jsonContent.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
        
        // Find JSON object
        const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error('No JSON found in response:', content);
            throw new Error('No JSON found in response');
        }
        
        const parsed = JSON.parse(jsonMatch[0]);
        
        // Validate required fields
        if (!parsed.mcqs || !parsed.fillBlanks || !parsed.realWorld) {
            throw new Error('Missing required fields in response');
        }
        
        return parsed;
    } catch (parseError) {
        console.error('Failed to parse quiz JSON:', parseError);
        console.error('Raw response:', content);
        
        // Return fallback quiz data
        return {
            mcqs: [
                {
                    id: "mcq1",
                    question: "What is the basic concept of " + concept + "?",
                    options: ["Option A", "Option B", "Option C", "Option D"],
                    correct: "Option A",
                    explanation: "This is the fundamental concept."
                },
                {
                    id: "mcq2",
                    question: "Which domain does " + concept + " primarily belong to?",
                    options: ["Coding", "Hardware", "Design", "Research"],
                    correct: domains[0] || "Coding",
                    explanation: "This concept is primarily used in " + (domains[0] || "Coding") + "."
                }
            ],
            fillBlanks: [
                {
                    id: "fill1",
                    question: "Fill in the blank: " + concept + " is used for _____.",
                    correct: "problem solving",
                    explanation: "This concept helps in solving problems."
                },
                {
                    id: "fill2",
                    question: "The main purpose of " + concept + " is to _____.",
                    correct: "improve efficiency",
                    explanation: "It improves the efficiency of the process."
                }
            ],
            realWorld: {
                id: "real1",
                question: "How would you apply " + concept + " in a real-world scenario?",
                expectedAnswer: "Apply the concept to solve practical problems in " + domains.join(", "),
                explanation: "This concept can be applied to various real-world scenarios."
            }
        };
    }
} 
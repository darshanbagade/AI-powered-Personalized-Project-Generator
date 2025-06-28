import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateEvaluationService({ concept, domains, summary }) {
    const prompt = `You are an expert education assistant. Generate a quiz for the concept "${concept}" in the domain(s): ${domains.join(', ')}.

Summary: ${summary}

Generate exactly 7 multiple choice questions (MCQs) with 4 options each and correct answers. The difficulty level should be:
- 2 easy MCQs
- 3 medium MCQs
- 2 hard MCQs

Return ONLY valid JSON with the following format and no additional text:

{
  "mcqs": [
    {
      "id": "mcq1",
      "difficulty": "easy",
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correct": "A",
      "explanation": "Brief explanation"
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
        let jsonContent = content.trim();
        jsonContent = jsonContent.replace(/```json\s*/g, '').replace(/```\s*$/g, '');

        const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error('No JSON found in response:', content);
            throw new Error('No JSON found in response');
        }

        const parsed = JSON.parse(jsonMatch[0]);

        if (!parsed.mcqs || parsed.mcqs.length !== 7) {
            throw new Error('Missing or insufficient MCQs in response');
        }

        return parsed;
    } catch (parseError) {
        console.error('Failed to parse quiz JSON:', parseError);
        console.error('Raw response:', content);

        // Fallback: 2 easy, 3 medium, 2 hard
        const fallbackMcqs = [
            ...Array.from({ length: 2 }, (_, i) => ({
                id: `mcq_easy_${i + 1}`,
                difficulty: 'easy',
                question: `Sample easy question ${i + 1} on ${concept}?`,
                options: ['A', 'B', 'C', 'D'],
                correct: 'A',
                explanation: 'Easy question explanation.'
            })),
            ...Array.from({ length: 3 }, (_, i) => ({
                id: `mcq_medium_${i + 1}`,
                difficulty: 'medium',
                question: `Sample medium question ${i + 1} on ${concept}?`,
                options: ['A', 'B', 'C', 'D'],
                correct: 'B',
                explanation: 'Medium question explanation.'
            })),
            ...Array.from({ length: 2 }, (_, i) => ({
                id: `mcq_hard_${i + 1}`,
                difficulty: 'hard',
                question: `Sample hard question ${i + 1} on ${concept}?`,
                options: ['A', 'B', 'C', 'D'],
                correct: 'C',
                explanation: 'Hard question explanation.'
            })),
        ];

        return { mcqs: fallbackMcqs };
    }
}

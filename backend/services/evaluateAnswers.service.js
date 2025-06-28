import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Simple fuzzy matching function
function fuzzyMatch(userAnswer, correctAnswer) {
    if (!userAnswer || !correctAnswer) return false;
    
    const user = userAnswer.toLowerCase().trim();
    const correct = correctAnswer.toLowerCase().trim();
    
    // Exact match
    if (user === correct) return true;
    
    // Contains match
    if (user.includes(correct) || correct.includes(user)) return true;
    
    // Word overlap (at least 50% of words match)
    const userWords = user.split(/\s+/);
    const correctWords = correct.split(/\s+/);
    const commonWords = userWords.filter(word => correctWords.includes(word));
    
    return commonWords.length >= Math.min(userWords.length, correctWords.length) * 0.5;
}

export async function evaluateAnswersService({ quiz, answers }) {
    let totalScore = 0;
    let maxScore = 0;
    
    // Evaluate MCQs (2 points each)
    quiz.mcqs.forEach(mcq => {
        maxScore += 2;
        if (answers[mcq.id] === mcq.correct) {
            totalScore += 2;
        }
    });
    
    // Evaluate Fill-in-the-blanks (2 points each)
    quiz.fillBlanks.forEach(fill => {
        maxScore += 2;
        if (fuzzyMatch(answers[fill.id], fill.correct)) {
            totalScore += 2;
        }
    });
    
    // Evaluate Real-world question (1 point)
    if (quiz.realWorld) {
        maxScore += 1;
        if (fuzzyMatch(answers[quiz.realWorld.id], quiz.realWorld.expectedAnswer)) {
            totalScore += 1;
        }
    }
    
    // Calculate percentage
    const percentage = (totalScore / maxScore) * 100;
    
    // Determine level based on percentage
    let level;
    if (percentage >= 80) {
        level = "Advanced";
    } else if (percentage >= 60) {
        level = "Intermediate";
    } else {
        level = "Beginner";
    }
    
    // Use Gemini for additional evaluation if needed
    try {
        const prompt = `You are an expert education evaluator. Based on the following quiz results, provide a final assessment.

Quiz Questions and Correct Answers:
${JSON.stringify(quiz, null, 2)}

User Answers:
${JSON.stringify(answers, null, 2)}

Score: ${totalScore}/${maxScore} (${percentage.toFixed(1)}%)

Current Level Assessment: ${level}

Please confirm if this level assessment is appropriate or suggest a different level (Beginner, Intermediate, Advanced). Consider the quality of answers, not just correctness.

Return only the level: "Beginner", "Intermediate", or "Advanced"`;

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
                    temperature: 0.2,
                    maxOutputTokens: 50,
                }
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            
            // Extract level from response
            const levelMatch = content.match(/(Beginner|Intermediate|Advanced)/i);
            if (levelMatch) {
                level = levelMatch[1];
            }
        }
    } catch (error) {
        console.error('Gemini evaluation error:', error);
        // Use the calculated level if Gemini fails
    }
    
    return level;
} 
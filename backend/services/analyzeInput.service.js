import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function analyzeInputService({ concept, transcript, domains }) {
    // console.log({ concept, transcript, domains });
    
    let prompt = `You are an expert education assistant. Given the following input, summarize the concept and extract the most important keywords for evaluation.\n`;
    prompt += `Concept: ${concept}\n`;
    if (transcript && transcript.trim().length > 0) {
        prompt += `Transcript: ${transcript}\n`;
    }
    prompt += `Domains: ${domains.join(', ')}\n`;
    prompt += `\nReturn a short summary and a comma-separated list of keywords. Format:\nSummary: ...\nKeywords: ...`;

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
                temperature: 0.5,
                maxOutputTokens: 512,
            }
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', errorText);
        throw new Error('Gemini API error');
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const summaryMatch = content.match(/Summary:(.*?)(?:\n|$)/i);
    const keywordsMatch = content.match(/Keywords:(.*?)(?:\n|$)/i);

    return {
        summary: summaryMatch ? summaryMatch[1].trim() : '',
        keywords: keywordsMatch ? keywordsMatch[1].split(',').map(k => k.trim()) : [],
        raw: content,
    };
}

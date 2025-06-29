import axios from 'axios';
import fetch from 'node-fetch';
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
const JUDGE0_HEADERS = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Replace with your actual RapidAPI key or keep in .env
};

const languageMap = {
  javascript: 63, // Node.js
  python: 71,
  java: 62,
  cpp: 54,
};
export async function runCode(req, res) {
    const { code, language } = req.body;

  if (!code || !language || !languageMap[language]) {
    return res.status(400).json({ error: 'Invalid language or code missing.' });
  }

  try {
    const submissionRes = await axios.post(
      JUDGE0_API_URL,
      {
        source_code: code,
        language_id: languageMap[language],
        stdin: '',
      },
      {
        headers: JUDGE0_HEADERS,
      }
    );

    const output = submissionRes.data.stdout || submissionRes.data.stderr || submissionRes.data.compile_output || 'No output';

    res.json({ output });
  } catch (err) {
    console.error('Code execution error:', err.message);
    res.status(500).json({ error: 'Failed to execute code. Please try again.' });
  }
}
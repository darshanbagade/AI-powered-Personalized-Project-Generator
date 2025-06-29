import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjectSuggestions } from '../services/projectService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TabbedProjectView from '../components/TabbedProjectView';
import TrueFocus from '../components/Loader';
import ChatBotWidget from '../components/ChatBotWidget';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const LANGUAGE_OPTIONS = [
  { label: 'JavaScript', value: 'javascript', default: `console.log('Hello, World!'); `},
  { label: 'Python', value: 'python', default: `print('Hello, World!')` },
  { label: 'Java', value: 'java', default: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}` },
  { label: 'C++', value: 'cpp', default: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}` },
];


const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { level, domain, concept } = location.state || {};
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorLanguage, setEditorLanguage] = useState(LANGUAGE_OPTIONS[0].value);
  const [editorCode, setEditorCode] = useState(LANGUAGE_OPTIONS[0].default);
  const [runOutput, setRunOutput] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!level || !domain || !concept) {
      toast.error('Missing project context.');
      navigate('/input');
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      const res = await getProjectSuggestions({ level, domain, concept });
      if (res.success) {
        setSuggestions(res.suggestions);
      } else {
        toast.error(res.message || 'Failed to load project suggestions.');
      }
      setLoading(false);
    };
    fetchSuggestions();
    // eslint-disable-next-line
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setEditorLanguage(lang);
    const langObj = LANGUAGE_OPTIONS.find(l => l.value === lang);
    setEditorCode(langObj.default);
    setRunOutput('');
  };

  const handleRunCode = async () => {
    setRunning(true);
    setRunOutput('');
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.post(`${API_BASE_URL}/code/run-code`, {
        code: editorCode,
        language: editorLanguage,
      });
      setRunOutput(res.data.output || res.data.error || 'No output');
    } catch (err) {
      setRunOutput(err?.response?.data?.error || 'Error running code');
    }
    setRunning(false);
  };

  const downloadBoilerplate = () => {
    if (!suggestions?.boilerplate?.code) return;
    const blob = new Blob([suggestions.boilerplate.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${suggestions.boilerplate.name}.${suggestions.boilerplate.language?.toLowerCase() || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Boilerplate downloaded!');
  };

  const openInEditor = () => {
    if (!suggestions?.boilerplate?.code) return;
    const encodedCode = encodeURIComponent(suggestions.boilerplate.code);
    const language = suggestions.boilerplate.language?.toLowerCase() || 'javascript';
    const url = `https://replit.com/new/${language}?code=${encodedCode}`;
    window.open(url, '_blank');
  };

  if (loading) return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#000000] via-[#12001eea] to-[#000104]">
    {/* loader */}
    <TrueFocus 
    sentence="Generating projects"
    manualMode={false}
    blurAmount={5}
    borderColor="white"
    animationDuration={1}
    pauseBetweenAnimations={0.7}
    />
  </div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#12001eea] to-[#000104] p-6">
      <ToastContainer />
      <ChatBotWidget/>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Concept To Create</h1>
          <p className="text-gray-300">Based on your <span className='border-b-2 font-bold text-blue-500'>{level} level</span> in {domain} - {concept}</p>
        </div>

        {/* Tabbed Project Suggestions */}
        <div className="mb-8 py-8">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Recommended Projects</h2>
          <TabbedProjectView
            projects={suggestions?.projects || []}
            concept={concept}
            userLevel={level}
          />
        </div>

        {/* Boilerplate */}
        {suggestions?.boilerplate && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">Starter Boilerplate</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{suggestions.boilerplate.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={downloadBoilerplate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Download
                  </button>
                  <button
                    onClick={openInEditor}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Open in Editor
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{suggestions.boilerplate.description}</p>
              <div className="bg-gray-100 rounded p-4">
                <pre className="text-sm overflow-x-auto">{suggestions.boilerplate.code}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Code Editor */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Try Your Code Live</h2>
          <div className="bg-[#181c2f] rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <label className="text-gray-300 font-semibold">Language:</label>
              <select
                value={editorLanguage}
                onChange={handleLanguageChange}
                className="bg-[#23294a] text-white rounded-lg px-4 py-2"
              >
                {LANGUAGE_OPTIONS.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-700 mb-4">
              <Editor
                height="300px"
                theme="vs-dark"
                language={editorLanguage === 'cpp' ? 'cpp' : editorLanguage}
                value={editorCode}
                onChange={value => setEditorCode(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  fontFamily: 'Fira Mono, monospace',
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'on',
                  scrollbar: { vertical: 'auto' },
                  lineNumbers: 'on',
                  theme: 'vs-dark',
                }}
              />
            </div>
            <button
              onClick={handleRunCode}
              disabled={running}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition mb-4"
            >
              {running ? 'Running...' : 'Run'}
            </button>
            <div className="bg-black/80 text-green-400 rounded-lg p-4 min-h-[60px] font-mono text-base mt-2">
              {runOutput || 'Output will appear here.'}
            </div>
          </div>
        </div>


        {/* GitHub Repositories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">GitHub Repositories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions?.repositories?.map((repo, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{repo.name}</h3>
                  <span className="text-sm text-gray-500">⭐ {repo.stars}</span>
                </div>
                <p className="text-gray-600 mb-4">{repo.description}</p>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
                >
                  View Repository
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects; 
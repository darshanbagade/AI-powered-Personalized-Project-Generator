import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { analyzeInput } from '../services/analyzeInput';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, FileText } from 'lucide-react';

const DOMAIN_OPTIONS = [
  'Coding', 'Hardware', 'Research', 'Design', 'Finance',
  'Commerce', 'Arts', 'Science', 'Cybersecurity', 'Data Science'
];

const Input = () => {
  const [concept, setConcept] = useState('');
  const [transcript, setTranscript] = useState('');
  const [domains, setDomains] = useState([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showDomains, setShowDomains] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [blurInput, setBlurInput] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleVoiceInput = () => {
    toast.info('Voice input not implemented yet.');
  };

  const handleDomainSelect = (domain) => {
    setDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  // Initial submit – triggers the popup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!concept.trim() || domains.length === 0) {
      toast.error('Please enter a concept and select at least one domain.');
      return;
    }
    setBlurInput(true);
    setTimeout(() => setShowPopup(true), 400); // show popup after blur
  };

  // Submit for quiz route
  const handleQuizStart = async () => {
    setLoading(true);
    try {
      const res = await analyzeInput({ concept, transcript, domains });
      if (res.success) {
        toast.success('Input submitted successfully!');
        navigate('/quiz', { state: { concept, domains, summary: res.summary } });
      } else {
        toast.error(res.message || 'Submission failed.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  // Submit for project suggestion route
  const handleProjectSuggest = async (level) => {
    setSelectedLevel(level);
    setSubmitting(true);
    try {
      const res = await analyzeInput({ concept, transcript, domains });
      if (res.success) {
        toast.success('Project suggestion fetched!');
        navigate('/projects', {
          state: {
            level,
            domain: domains[0],
            concept
          }
        });
      } else {
        toast.error(res.message || 'Failed to fetch project.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to fetch project.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#533483] relative">
      <ToastContainer />

      {/* Input Card */}
      <div className={`w-full max-w-2xl p-8 rounded-3xl shadow-2xl glass-card transition-all duration-500 ${blurInput ? 'blur-sm pointer-events-none' : ''} relative z-10`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Share Your Learning</h2>

          {/* Search Field */}
          <div className="flex items-center bg-[#18192b] rounded-xl px-4 py-3 shadow-inner focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="text-gray-400 mr-3 w-6 h-6" />
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-400"
              placeholder="Type your concept name..."
              value={concept}
              onChange={e => setConcept(e.target.value)}
              disabled={blurInput}
              required
            />
            <button
              type="button"
              aria-label="Switch input type"
              className="ml-3 p-2 rounded-full bg-[#23294a] hover:bg-[#2d325a] transition"
              onClick={() => setShowTranscript(prev => !prev)}
            >
              {showTranscript ? <Mic className="w-5 h-5 text-blue-400" /> : <FileText className="w-5 h-5 text-pink-400" />}
            </button>
          </div>

          {/* Transcript Box */}
          {showTranscript && (
            <textarea
              className="w-full px-4 py-3 bg-[#23294a] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 min-h-[100px]"
              placeholder="Paste YouTube lecture transcript here..."
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              disabled={blurInput}
            />
          )}

          {/* Domain Selection */}
          <div>
            <button
              type="button"
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition mb-3 shadow-md"
              onClick={() => setShowDomains(prev => !prev)}
              disabled={blurInput}
            >
              {showDomains ? 'Hide Domains' : 'Select Domains'}
            </button>
            {showDomains && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-2">
                {DOMAIN_OPTIONS.map(domain => (
                  <button
                    key={domain}
                    type="button"
                    className={`px-4 py-2 rounded-xl font-medium text-white transition border-2 border-transparent shadow-md
                      ${domains.includes(domain)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-pink-400 scale-105'
                        : 'bg-[#23294a] hover:bg-[#2d325a] opacity-80'}
                    `}
                    onClick={() => handleDomainSelect(domain)}
                    aria-pressed={domains.includes(domain)}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition shadow-lg"
            disabled={loading || blurInput}
          >
            {loading ? 'building...' : "Let's build"}
          </button>
        </form>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowPopup(false); setBlurInput(false); }} />
          {/* Modal */}
          <div className="relative bg-[#18192b] rounded-2xl shadow-2xl glass-card p-8 flex flex-col md:flex-row gap-8 w-[90vw] max-w-2xl z-40 border border-white/10">
            {/* Quiz */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Evaluate Yourself</h3>
              <button
                className="privacy-gradient text-white px-6 py-3 rounded-lg font-semibold text-lg hover:scale-105 transition shadow-md"
                onClick={handleQuizStart}
                disabled={loading}
              >
                {loading ? 'Loading Quiz...' : 'Take a Quiz'}
              </button>
            </div>

            {/* Divider */}
            <div className="w-[2px] bg-gradient-to-b from-blue-400 to-pink-400 mx-2 hidden md:block rounded-full" />

            {/* Project Suggestions */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-white/5">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Give me projects according to the selected Level</h3>
              <div className="flex flex-col gap-3 w-full">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <button
                    key={level}
                    className={`w-full px-4 py-2 rounded-lg font-semibold text-lg transition shadow-md
                      ${selectedLevel === level
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-105'
                        : 'bg-[#23294a] hover:bg-[#2d325a] text-white opacity-90'}
                    `}
                    onClick={() => handleProjectSuggest(level)}
                    disabled={submitting}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;

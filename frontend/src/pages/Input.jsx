import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { analyzeInput } from '../services/analyzeInput';
import { useNavigate } from 'react-router-dom';

const DOMAIN_OPTIONS = [
  'Coding',
  'Hardware',
  'Design',
  'Research',
];

const Input = () => {
  const [concept, setConcept] = useState('');
  const [transcript, setTranscript] = useState('');
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDomainChange = (domain) => {
    setDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!concept.trim() || domains.length === 0) {
      toast.error('Please enter a concept and select at least one domain.');
      return;
    }
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#000000] via-[#12001eea] to-[#000104]">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-[#060027] border-1 border-gray-600 p-10 rounded-2xl shadow-xl w-full max-w-lg flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Share Your Learning</h2>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-medium">Concept Name *</label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-[#23294a] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            placeholder="Enter the concept name"
            value={concept}
            onChange={e => setConcept(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-medium">Lecture Transcript (optional)</label>
          <textarea
            className="w-full px-4 py-3 bg-[#23294a] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 min-h-[120px]"
            placeholder="Paste YouTube lecture transcript here..."
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-medium mb-1">Domain(s) *</label>
          <div className="flex flex-wrap gap-4">
            {DOMAIN_OPTIONS.map((domain) => (
              <label key={domain} className="flex items-center gap-2 text-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={domains.includes(domain)}
                  onChange={() => handleDomainChange(domain)}
                  className="accent-white bg-black w-4 h-4"
                />
                {domain}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Input; 
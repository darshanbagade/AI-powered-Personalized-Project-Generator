import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuiz, evaluateQuiz } from '../services/quizService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrueFocus from '../components/Loader';
const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { concept, domains, summary } = location.state || {};
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!concept || !domains || !summary) {
      toast.error('Missing quiz context.');
      navigate('/input');
      return;
    }
    const fetchQuiz = async () => {
      setLoading(true);
      const res = await getQuiz({ concept, domains, summary });
      console.log(res);
      
      if (res.success) {
        setQuiz(res.quiz);
      } else {
        toast.error(res.message || 'Failed to load quiz.');
      }
      setLoading(false);
    };
    fetchQuiz();
    // eslint-disable-next-line
  }, []);

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await evaluateQuiz({ quiz, answers });
    if (res.success) {
      setResult(res.level);
      setTimeout(() => {
        navigate('/projects', { 
          state: { 
            level: res.level, 
            domain: domains[0],
            concept 
          } 
        });
      }, 2000);
    } else {
      toast.error(res.message || 'Evaluation failed.');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-[#000304] to-black p-6">
    {/* LOADER */}
     <TrueFocus 
        sentence="Generating Quiz"
        manualMode={false}
        blurAmount={5}
        borderColor="white"
        animationDuration={1}
        pauseBetweenAnimations={0.7}
        />
  </div>;

  if (result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0e7ff] to-[#c7d2fe]">
        <ToastContainer />
        <div className="bg-[#181c2f] p-10 rounded-2xl shadow-xl w-full max-w-lg flex flex-col gap-6 items-center">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Your Level</h2>
          <div className="text-2xl text-blue-400 font-semibold mb-4">{result}</div>
          <button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:opacity-90 transition">Go to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#000000] via-[#12001eea] to-[#000104] py-8">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-[#181c2f] p-10  border-1 border-gray-600 rounded-2xl shadow-xl w-full max-w-lg flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Quiz: {concept}</h2>
        {/* MCQs */}
        {quiz?.mcqs?.map((q, idx) => (
          <div key={q.id} className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">{idx + 1}. {q.question}</label>
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2 text-gray-200 cursor-pointer">
                <input
                  type="radio"
                  name={`mcq-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                  className="accent-blue-500 w-4 h-4"
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        {/* Fill in the blanks */}
        {quiz?.fillBlanks?.map((q, idx) => (
          <div key={q.id} className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">{quiz.mcqs.length + idx + 1}. {q.question}</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-[#23294a] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              value={answers[q.id] || ''}
              onChange={e => handleChange(q.id, e.target.value)}
              required
            />
          </div>
        ))}
        {/* Real-world use-case */}
        {quiz?.realWorld && (
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">{quiz.mcqs.length + quiz.fillBlanks.length + 1}. {quiz.realWorld.question}</label>
            <textarea
              className="w-full px-4 py-3 bg-[#23294a] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 min-h-[80px]"
              value={answers[quiz.realWorld.id] || ''}
              onChange={e => handleChange(quiz.realWorld.id, e.target.value)}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Answers'}
        </button>
      </form>
    </div>
  );
};

export default Quiz; 
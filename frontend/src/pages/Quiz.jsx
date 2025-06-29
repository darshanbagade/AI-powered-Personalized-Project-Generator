import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuiz, evaluateQuiz } from '../services/quizService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css';
import TrueFocus from '../components/Loader';

const OPTION_COLORS = [
  'bg-yellow-400',
  'bg-purple-400',
  'bg-orange-400',
  'bg-cyan-400',
  'bg-pink-400',
  'bg-green-400',
];

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { concept, domains, summary } = location.state || {};
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(30);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef();

  // Fetch quiz on mount
  useEffect(() => {
    if (!concept || !domains || !summary) {
      toast.error('Missing quiz context.');
      navigate('/input');
      return;
    }
    const fetchQuiz = async () => {
      setLoading(true);
      const res = await getQuiz({ concept, domains, summary });
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

  useEffect(() => {
    if (quiz && (!Array.isArray(quiz.mcqs) || quiz.mcqs.length === 0)) {
      toast.error('Quiz could not be generated. Please try again.');
    }
  }, [quiz]);

  // Timer logic
  useEffect(() => {
    if (!quiz || current >= quiz.mcqs.length) return;
    setTimer(30);
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleNext(null); // auto-advance
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [quiz, current]);

  // Animate question transitions
  const handleNext = (selected) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      if (selected !== null) {
        setAnswers((prev) => ({ ...prev, [quiz.mcqs[current].id]: selected }));
      }
      if (current < quiz.mcqs.length - 1) {
        setCurrent((prev) => prev + 1);
      } else {
        handleSubmitQuiz(selected);
      }
    }, 400); // Animation duration
  };

  // Submit answers at the end
  const handleSubmitQuiz = async (lastSelected) => {
    setSubmitting(true);
    let finalAnswers = { ...answers };
    if (lastSelected !== null) {
      finalAnswers[quiz.mcqs[current].id] = lastSelected;
    }
    if (!quiz || !Array.isArray(quiz.mcqs)) {
      throw new Error('Quiz data is invalid or incomplete.');
    }
    const res = await evaluateQuiz({ quiz, answers: finalAnswers });
    if (res.success) {
      navigate('/projects', {
        state: {
          level: res.level,
          domain: domains[0],
          concept,
        },
      });
    } else {
      toast.error(res.message || 'Evaluation failed.');
    }
    setSubmitting(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-[#000304] to-black p-6">
      <TrueFocus 
        sentence="Generating Quiz"
        manualMode={false}
        blurAmount={5}
        borderColor="white"
        animationDuration={1}
        pauseBetweenAnimations={0.7}
      />
    </div>
  );

  if (quiz && (!Array.isArray(quiz.mcqs) || quiz.mcqs.length === 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0025] via-[#2d0036] to-[#3a0ca3] py-8">
        <ToastContainer />
        <div className="bg-black/60 rounded-2xl shadow-2xl p-8 w-full max-w-xl flex flex-col items-center mb-8">
          <div className="text-white text-2xl font-bold text-center mb-2">
            Quiz could not be generated. Please try again.
          </div>
          <button
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) return null;

  const q = quiz.mcqs[current];
  const progress = `${current + 1} / ${quiz.mcqs.length}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0025] via-[#2d0036] to-[#3a0ca3] py-8 relative">
      <ToastContainer />
      {/* Progress & Timer */}
      <div className="flex items-center justify-between w-full max-w-xl mb-6 px-2">
        <div className="text-white text-lg font-bold bg-black/30 px-4 py-2 rounded-xl shadow">{progress}</div>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">⏰</span>
          <span
            className={`text-2xl font-bold ${timer <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}
          >
            {timer}s
          </span>
        </div>
      </div>
      {/* Question Card */}
      <div
        className={`transition-all duration-500 w-full max-w-xl flex flex-col items-center ${
          animating
            ? 'opacity-0 scale-95 translate-x-10'
            : 'opacity-100 scale-100 translate-x-0'
        }`}
      >
        <div className="bg-black/60 rounded-2xl shadow-2xl p-8 w-full flex flex-col items-center mb-8 animate-fade-in border-white border-1">
          <div className="text-white  text-lg font-bold text-center mb-2">{q.question}</div>
        </div>
        {/* Option Cards */}
        <div className="grid grid-cols-1 gap-6 w-full">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`h-28 rounded-2xl flex flex-col text-lg items-center justify-center font-bold text-white shadow-lg transition-all duration-1000 transform hover:scale-105 focus:scale-105 focus:outline-none ${OPTION_COLORS[i % OPTION_COLORS.length]} ${submitting ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => handleNext(opt)}
              disabled={submitting}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
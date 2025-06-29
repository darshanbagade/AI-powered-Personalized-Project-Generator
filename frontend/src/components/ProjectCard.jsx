import React, { useState } from 'react';
import { getHints, revealSolution } from '../services/hintsService';
import { toast } from 'react-toastify';
import HintSlider from './HintSlider';

const ProjectCard = ({ project, concept, userLevel }) => {
  const [hints, setHints] = useState([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetHints = async () => {
    if (hints.length > 0) {
      // Show next hint
      setCurrentHintIndex(prev => Math.min(prev + 1, hints.length - 1));
      return;
    }

    setLoading(true);
    try {
      const res = await getHints({ concept, projectTitle: project.title });
      if (res.success) {
        setHints(res.hints);
        setCurrentHintIndex(0);
        toast.success('Hint 1 revealed!');
      } else {
        toast.error(res.message || 'Failed to get hints.');
      }
    } catch (err) {
      toast.error('Failed to get hints.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevealSolution = async () => {
    setLoading(true);
    try {
      const res = await revealSolution({ projectTitle: project.title, userLevel });
      if (res.success) {
        setSolution(res.solution);
        toast.success('Solution revealed!');
      } else {
        toast.error(res.message || 'Failed to reveal solution.');
      }
    } catch (err) {
      toast.error('Failed to reveal solution.');
    } finally {
      setLoading(false);
    }
  };

  const handleHintChange = (index) => {
    setCurrentHintIndex(index);
  };

  const handleReset = () => {
    setSolution(null);
    setHints([]);
    setCurrentHintIndex(-1);
  };

  return (
    <div className="w-100% max-w-5xl min-h-[320px] mx-auto bg-[#212121] border border-gray-400 rounded-3xl shadow-2xl p-10 flex flex-col justify-center transition">
      <h3 className="text-3xl font-bold text-white mb-2"><u>{project.title}</u></h3>
      <p className="text-gray-200 mb-4 text-lg">{project.description}</p>
      <div>
         <span className={`relative right-0  px-4 py-1 rounded-full text-base font-semibold mb-4
        ${project.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
          project.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
            'bg-[#510000] text-white border-1 '
        }`}>
        {project.difficulty}
      </span>
      </div>
      

      {/* Unified Carousel for Hints and Solution */}
      {hints.length > 0 && (
        <div className="mt-6">
          <HintSlider
            hints={hints}
            currentHintIndex={currentHintIndex}
            onHintChange={handleHintChange}
            onRevealSolution={handleRevealSolution}
            solution={solution}
            loading={loading}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex gap-2">
        {solution ? null : hints.length === 0 ? (
          // No hints yet - show initial hint button
          <button
            onClick={handleGetHints}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Stuck? Get Hints'}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard; 
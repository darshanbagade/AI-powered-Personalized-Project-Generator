import React, { useState } from 'react';
import { getHints, revealSolution } from '../services/hintsService';
import { toast } from 'react-toastify';

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

  return (
    <div className="bg-[#212121] border-1 border-gray-400 rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-100 mb-2"><u>{project.title}</u></h3>
      <p className="text-gray-100 mb-3">{project.description}</p>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        project.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
        project.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {project.difficulty}
      </span>

      {/* Hints Section */}
      {hints.length > 0 && (
        <div className="mt-4 p-4 bg-[#4e555476] rounded-lg">
          <h4 className="font-semibold text-blue-700 mb-2"><u>Hints</u>:</h4>
          {hints.slice(0, currentHintIndex + 1).map((hint, idx) => (
            <div key={hint.id} className="mb-2">
              <span className="font-medium text-blue-700">Hint {idx + 1}:</span>
              <span className="text-blue-600 ml-2">{hint.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Solution Section */}
      {solution && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Solution:</h4>
          <div className="text-green-700">
            <p className="mb-3"><strong>Overview:</strong> {solution.overview}</p>
            {solution.steps?.map((step) => (
              <div key={step.step} className="mb-3">
                <h5 className="font-medium">Step {step.step}: {step.title}</h5>
                <p className="text-sm mb-1">{step.description}</p>
                {step.keyPoints && (
                  <ul className="text-sm list-disc list-inside">
                    {step.keyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {solution.finalNotes && (
              <p className="mt-3 text-sm"><strong>Final Notes:</strong> {solution.finalNotes}</p>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        {currentHintIndex < hints.length - 1 && hints.length > 0 ? (
          <button
            onClick={handleGetHints}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : `Show Hint ${currentHintIndex + 2}`}
          </button>
        ) : hints.length > 0 && !solution ? (
          <button
            onClick={handleRevealSolution}
            disabled={loading}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Reveal Solution'}
          </button>
        ) : (
          <button
            onClick={handleGetHints}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Stuck? Get Hints'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 
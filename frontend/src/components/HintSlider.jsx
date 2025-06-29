import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HintSlider = ({ hints, currentHintIndex, onHintChange, onRevealSolution, solution, loading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  // Calculate total slides (hints + solution slide)
  const totalSlides = hints.length + 1; // +1 for solution slide
  
  // Determine current slide based on state
  const getCurrentSlide = () => {
    if (solution) {
      return totalSlides; // Always show solution slide when solution is revealed
    }
    return Math.min(currentHintIndex + 1, totalSlides);
  };
  
  const currentSlide = getCurrentSlide();

  // Debug logging
  useEffect(() => {
    console.log('HintSlider State:', {
      currentHintIndex,
      currentSlide,
      totalSlides,
      solution: !!solution,
      hintsLength: hints.length
    });
  }, [currentHintIndex, currentSlide, totalSlides, solution, hints.length]);

  // Auto-scroll to current slide
  useEffect(() => {
    if (sliderRef.current && currentSlide >= 1) {
      const slideElement = sliderRef.current.children[currentSlide - 1];
      if (slideElement) {
        slideElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentSlide]);

  const handleNextSlide = () => {
    console.log('handleNextSlide called. Current:', currentSlide, 'Total:', totalSlides);
    
    if (currentSlide >= totalSlides) return;
    
    const nextSlide = currentSlide + 1;
    console.log('Moving to next slide:', nextSlide);
    
    if (nextSlide <= hints.length) {
      // Moving to a hint slide
      onHintChange(nextSlide - 1);
    } else if (nextSlide === totalSlides && !solution) {
      // Moving to solution slide but solution not revealed yet
      // Ensure we're on the last hint
      if (currentHintIndex < hints.length - 1) {
        onHintChange(hints.length - 1);
      }
    }
    // If solution is already revealed, we're already on the solution slide
  };

  const handlePrevSlide = () => {
    console.log('handlePrevSlide called. Current:', currentSlide, 'Total:', totalSlides);
    
    if (currentSlide <= 1) return;
    
    const prevSlide = currentSlide - 1;
    console.log('Moving to previous slide:', prevSlide);
    
    if (prevSlide <= hints.length) {
      // Moving to a hint slide
      onHintChange(prevSlide - 1);
    }
    // If moving from solution slide back to hints, we need to go to the last hint
    else if (solution && prevSlide === hints.length) {
      onHintChange(hints.length - 1);
    }
  };

  const handleSlideClick = (slideNumber) => {
    console.log('handleSlideClick called with:', slideNumber);
    
    if (slideNumber <= hints.length) {
      onHintChange(slideNumber - 1);
    } else if (slideNumber === totalSlides && !solution) {
      // Clicking on solution slide but solution not revealed
      if (currentHintIndex < hints.length - 1) {
        onHintChange(hints.length - 1);
      }
    }
  };

  if (!hints || hints.length === 0) return null;

  return (
    <div className="w-full">
      {/* Current Hint/Solution Display */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-xl mb-6">
        {solution ? (
          // Solution Display
          <div className="text-green-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{totalSlides}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Solution</h4>
                  <p className="text-xs text-gray-400">Complete solution revealed</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
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
        ) : currentHintIndex >= 0 && hints[currentHintIndex] ? (
          // Current Hint Display
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentHintIndex + 1}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Hint {currentHintIndex + 1}</h4>
                  <p className="text-xs text-gray-400">Hint {currentHintIndex + 1} of {hints.length}</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">{hints[currentHintIndex].text}</p>
              
              {/* Code Snippet (if available) */}
              {hints[currentHintIndex].code && (
                <div className="bg-gray-950 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 font-mono">Code Snippet</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(hints[currentHintIndex].code);
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="text-sm text-green-400 overflow-x-auto">
                    <code>{hints[currentHintIndex].code}</code>
                  </pre>
                </div>
              )}

              {/* Additional Info (if available) */}
              {hints[currentHintIndex].additionalInfo && (
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                  <p className="text-sm text-blue-300">{hints[currentHintIndex].additionalInfo}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // No hint selected
          <div className="text-center text-gray-400">
            <p>Click "Get Hints" to start</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4">
        {/* Previous Button */}
        {currentHintIndex > 0 && (
          <button
            onClick={handlePrevSlide}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Hint
          </button>
        )}

        {/* Next Button or Reveal Solution Button */}
        {currentHintIndex < hints.length - 1 ? (
          <button
            onClick={handleNextSlide}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Next Hint
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : currentHintIndex === hints.length - 1 && !solution ? (
          <button
            onClick={onRevealSolution}
            disabled={loading}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Reveal Solution'}
          </button>
        ) : null}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {hints.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentHintIndex ? 'bg-blue-500 scale-125' : 
                idx < currentHintIndex ? 'bg-green-500' : 'bg-gray-600'
              }`}
            />
          ))}
          {solution && (
            <div className="w-3 h-3 rounded-full bg-orange-500 scale-125"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HintSlider; 
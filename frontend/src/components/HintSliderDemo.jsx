import React, { useState } from 'react';
import HintSlider from './HintSlider';

const HintSliderDemo = () => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample hints data
  const sampleHints = [
    {
      id: 1,
      text: "Start by understanding the basic structure of a React component. Think about what props you might need and how to organize your state.",
      code: `function MyComponent({ title, description }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="component">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}`,
      additionalInfo: "Remember to import React and useState from 'react'"
    },
    {
      id: 2,
      text: "Consider using conditional rendering to show/hide elements based on user interactions. You can use the ternary operator or logical AND operator.",
      code: `{isVisible && <div>This content is visible!</div>}

{condition ? <ComponentA /> : <ComponentB />}`,
      additionalInfo: "Conditional rendering helps create dynamic user interfaces"
    },
    {
      id: 3,
      text: "Don't forget to handle user events properly. Use event handlers to respond to clicks, form submissions, and other interactions.",
      code: `const handleClick = () => {
  console.log('Button clicked!');
  setIsVisible(!isVisible);
};

<button onClick={handleClick}>
  Toggle Visibility
</button>`,
      additionalInfo: "Event handlers should be defined inside your component"
    }
  ];

  // Sample solution data
  const sampleSolution = {
    overview: "A complete React component with state management, conditional rendering, and event handling.",
    steps: [
      {
        step: 1,
        title: "Component Structure",
        description: "Create the basic component structure with props and state.",
        keyPoints: ["Import React and useState", "Define component function", "Set up initial state"]
      },
      {
        step: 2,
        title: "Conditional Rendering",
        description: "Add conditional rendering based on state changes.",
        keyPoints: ["Use logical AND operator", "Implement ternary operators", "Handle dynamic content"]
      },
      {
        step: 3,
        title: "Event Handling",
        description: "Add event handlers for user interactions.",
        keyPoints: ["Define event handler functions", "Connect handlers to elements", "Update state in handlers"]
      }
    ],
    finalNotes: "This component demonstrates fundamental React patterns that you'll use in most applications."
  };

  const handleHintChange = (index) => {
    setCurrentHintIndex(index);
  };

  const handleRevealSolution = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSolution(sampleSolution);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setSolution(null);
    setCurrentHintIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Unified Carousel Demo</h1>
          <p className="text-gray-300 text-lg">
            Shared carousel with labeled slides: Hints (1-3) → Solution (4)
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            React Component Building Guide
          </h2>
          
          <HintSlider
            hints={sampleHints}
            currentHintIndex={currentHintIndex}
            onHintChange={handleHintChange}
            onRevealSolution={handleRevealSolution}
            solution={solution}
            loading={loading}
          />

          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentHintIndex(0)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                First Hint
              </button>
              <button
                onClick={() => setCurrentHintIndex(sampleHints.length - 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Last Hint
              </button>
              {solution && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                  Reset Demo
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p><strong>Carousel Flow:</strong> Slide 1-3: Hints → Slide 4: Solution Reveal</p>
          <p className="mt-2">Features: Swipe gestures, arrow navigation, smooth animations, dark theme</p>
          <p className="mt-1">Responsive design for mobile and desktop</p>
        </div>
      </div>
    </div>
  );
};

export default HintSliderDemo; 
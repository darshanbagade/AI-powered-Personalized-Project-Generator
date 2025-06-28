import React from 'react';
import { Code, Lightbulb } from 'lucide-react';

const ProjectsSection = () => {
  const projectRecommendations = [
    {
      title: "Iris Flower Classification System",
      description: "Develop a machine learning model to classify Iris flowers based on sepal and petal measurements. This foundational project introduces supervised learning concepts using the renowned Iris dataset, implementing classification algorithms such as Logistic Regression or Decision Trees.",
      difficulty: "Beginner",
      hints: [
        "Consider the fundamental concept of supervised learning: how can an algorithm learn patterns from labeled training data to make predictions on new, unseen data?",
        "Explore classification algorithms like k-Nearest Neighbors (k-NN) or Decision Trees, which are intuitive and well-suited for this type of multi-class classification problem.",
        "The Iris dataset is clean, well-structured, and readily available in machine learning libraries like scikit-learn, making it ideal for beginners to focus on core concepts."
      ]
    },
    {
      title: "Handwritten Digit Recognition",
      description: "Build an intelligent system to recognize handwritten digits using the MNIST dataset. This project introduces computer vision and image classification concepts, implementing algorithms ranging from K-Nearest Neighbors to Neural Networks.",
      difficulty: "Beginner",
      hints: [
        "Think about pattern recognition: how can a computer system learn to identify visual patterns and shapes that represent different digits?",
        "Consider how digital images are represented as numerical data (pixel intensities) and how this can serve as input features for machine learning models.",
        "Start with simpler approaches like k-Nearest Neighbors for baseline performance, then explore more advanced techniques like neural networks for improved accuracy."
      ]
    },
    {
      title: "Intelligent Movie Recommendation Engine",
      description: "Create a sophisticated recommendation system that suggests movies based on user preferences and viewing history. This project explores collaborative filtering and content-based filtering techniques used by major streaming platforms.",
      difficulty: "Intermediate",
      hints: [
        "Understand the two main recommendation approaches: collaborative filtering (finding users with similar preferences) and content-based filtering (recommending similar items).",
        "Consider how to measure similarity between users or items, and explore techniques like cosine similarity or Pearson correlation coefficients.",
        "Start with a simple collaborative filtering approach using user-item matrices, then explore hybrid methods that combine multiple recommendation strategies."
      ]
    }
  ];

  return (
    <section id="samples" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-full mb-6">
            <Code className="h-5 w-5 text-blue-400 mr-3" />
            <span className="text-slate-200 font-medium">Project Portfolio</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Recommended Projects
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-6 font-light">
            Curated for Beginner Level in Machine Learning & Data Science
          </p>
          <div className="text-2xl font-semibold text-blue-400">
            Personalized Recommendations
          </div>
        </div>

        <div className="grid gap-8 max-w-5xl mx-auto">
          {projectRecommendations.map((project, index) => (
            <div 
              key={index} 
              className="group bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className="px-4 py-2 bg-blue-600/20 backdrop-blur-md rounded-full text-sm text-blue-300 border border-blue-500/30 font-medium">
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 relative z-10 text-lg font-light">{project.description}</p>
                
                <div className="bg-slate-900/40 backdrop-blur-md rounded-xl p-6 relative z-10 border border-slate-700/30">
                  <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Learning Guidance:
                  </h4>
                  <div className="space-y-4">
                    {project.hints.map((hint, hintIndex) => (
                      <div key={hintIndex} className="text-slate-300 leading-relaxed border-l-2 border-blue-500/30 pl-4 font-light">
                        <span className="text-blue-400 font-semibold">Insight {hintIndex + 1}:</span> {hint}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
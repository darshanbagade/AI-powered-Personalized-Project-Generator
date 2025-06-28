import React from 'react';
import { BookOpen, Search, Lightbulb, Code, Target } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Input Analysis",
      description: "Submit your learning topic through text or voice input, with optional YouTube transcript integration for comprehensive analysis.",
      icon: BookOpen
    },
    {
      number: "02",
      title: "AI Assessment",
      description: "Our advanced AI analyzes the concept and generates personalized assessments to evaluate your current understanding level.",
      icon: Search
    },
    {
      number: "03",
      title: "Project Matching",
      description: "Receive three carefully curated project recommendations tailored to your skill level and learning objectives.",
      icon: Lightbulb
    },
    {
      number: "04",
      title: "Guided Development",
      description: "Build projects with intelligent AI guidance, progressive hints, and comprehensive visual learning resources.",
      icon: Code
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-full mb-6">
            <Target className="h-5 w-5 text-blue-400 mr-3" />
            <span className="text-slate-200 font-medium">Learning Process</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            How It Works
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light">
            Streamlined four-step process from concept to implementation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold group-hover:shadow-xl transition-all transform group-hover:scale-110">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transform -translate-y-0.5 opacity-30"></div>
                )}
              </div>
              <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 group-hover:transform group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <step.icon className="h-8 w-8 text-blue-400 mx-auto mb-4 relative z-10" />
                <h3 className="text-xl font-bold mb-3 text-white relative z-10">{step.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed relative z-10 font-light">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
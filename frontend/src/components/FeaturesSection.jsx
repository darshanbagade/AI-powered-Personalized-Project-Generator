import React from 'react';
import { Brain, Target, Lightbulb, MessageCircle, BarChart3, Mic, Zap } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Intelligent Analysis",
      description: "Advanced AI-powered analysis of learning concepts from text or video transcripts to extract key knowledge and learning objectives.",
      color: "blue"
    },
    {
      icon: Target,
      title: "Adaptive Assessment",
      description: "Personalized quizzes that dynamically adapt to your skill level and learning pace for precise knowledge evaluation.",
      color: "indigo"
    },
    {
      icon: Lightbulb,
      title: "Project Intelligence",
      description: "AI-driven recommendations for tailored project ideas based on your understanding level and chosen learning domains.",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "Expert Guidance",
      description: "24/7 AI assistant providing progressive hints, detailed explanations, and complete solutions to overcome challenges.",
      color: "indigo"
    },
    {
      icon: BarChart3,
      title: "Visual Learning",
      description: "Dynamic flowcharts and interactive visual explanations for enhanced understanding and knowledge retention.",
      color: "blue"
    },
    {
      icon: Mic,
      title: "Voice Integration",
      description: "Seamless voice input capabilities for transcript entry and hands-free interaction with the learning platform.",
      color: "indigo"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-full mb-6">
            <Zap className="h-5 w-5 text-blue-400 mr-3" />
            <span className="text-slate-200 font-medium">Platform Capabilities</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Enterprise Features
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light">
            Advanced AI-powered learning tools designed for professional development and skill advancement
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color === 'blue' ? 'from-blue-600 to-blue-700' : 'from-indigo-600 to-indigo-700'} flex items-center justify-center mb-6 group-hover:shadow-xl transition-all relative z-10`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed relative z-10 font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
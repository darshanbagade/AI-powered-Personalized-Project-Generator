import React, { useEffect, useState } from 'react';
import { Brain, ArrowRight, Play } from 'lucide-react';
import ProfessionalTextAnimation from './ProfessionalTextAnimation';
import {Link} from 'react-router-dom'

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const professionalTexts = ["Learn", "Build", "Create", "Innovate"];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-full mb-8">
            <Brain className="h-5 w-5 text-blue-400 mr-3" />
            <span className="text-slate-200 font-medium"> Build Smarter with AI</span>
          </div>
          
          <h1 className="text-5xl md:text-5xl font-bold mb-6 text-white leading-tight tracking-tight">
            Concept To Create
          </h1>
          
          <div className=" items-center justify-center space-x-4 text-3xl md:text-4xl font-medium mb-8">
            <span className="text-slate-300">Where</span>
            <ProfessionalTextAnimation texts={professionalTexts} />
            <span className="text-slate-300">Meets Intelligence</span>
          </div>
        </div>
        
        <p className="text-sm md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Transform your learning journey with enterprise-grade AI technology. Bridge the gap between theoretical knowledge and practical application through intelligent concept analysis and personalized project recommendations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/input">
            <button className="group relative bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center space-x-3 shadow-xl">
            <span className="relative z-10">Try Now</span>
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
          </Link>
          <Link to='/suggest-project'>
            <button className="group border-2 border-slate-600 hover:border-blue-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-slate-800/50 flex items-center space-x-3">
              <Play className="h-5 w-5" />
              <span>Explore Real World</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
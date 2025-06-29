import React from 'react';
import MinimalisticMovingBackground from '../components/MinimalisticMovingBackground';
import ProfessionalSidebar from '../components/ProfessionalSidebar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ProjectsSection from '../components/ProjectsSection';
import ProcessSection from '../components/ProcessSection';
import Footer from '../components/Footer';

const HomeComp = () => {
  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      <MinimalisticMovingBackground />
      <ProfessionalSidebar />
      <div className="lg:ml-80">
        <HeroSection />
        <FeaturesSection />
        <ProjectsSection />
        <ProcessSection />
        <Footer />
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomeComp;
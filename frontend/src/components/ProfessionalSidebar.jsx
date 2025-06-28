import React, { useEffect, useState } from 'react';
import { Home, Zap, Code, Target, Menu, X,Brain } from 'lucide-react';

const ProfessionalSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'features', label: 'Features', icon: Zap, href: '#features' },
    { id: 'samples', label: 'Projects', icon: Code, href: '#samples' },
    { id: 'how-it-works', label: 'Process', icon: Target, href: '#how-it-works' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    setActiveSection(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-3 hover:bg-slate-800/80 transition-all duration-300 shadow-xl"
      >
        {isOpen ? <X className="h-6 w-6 text-slate-200" /> : <Menu className="h-6 w-6 text-slate-200" />}
      </button>

      <div className={`fixed left-0 top-0 h-full w-80 bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-slate-700/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                DIY
              </h1>
              <p className="text-sm text-slate-400 font-medium">AI Learning Platform</p>
            </div>
          </div>
        </div>

        <nav className="p-6">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  activeSection === item.id
                    ? 'bg-blue-600/20 border border-blue-500/30 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                }`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute right-3 w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ProfessionalSidebar;
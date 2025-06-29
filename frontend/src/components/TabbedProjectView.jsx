import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

const TabbedProjectView = ({ projects, concept, userLevel }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No projects available</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const tabVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 0.95,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  };

  const tabButtonVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "rgba(55, 65, 81, 0.3)",
      borderColor: "rgba(75, 85, 99, 0.5)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    active: { 
      scale: 1.05,
      backgroundColor: "rgba(59, 130, 246, 0.9)",
      borderColor: "rgba(59, 130, 246, 1)",
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      backgroundColor: "rgba(59, 130, 246, 0.7)",
      borderColor: "rgba(59, 130, 246, 0.8)",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const indicatorVariants = {
    inactive: {
      scale: 1,
      opacity: 0.4,
      backgroundColor: "rgb(75, 85, 99)"
    },
    active: {
      scale: 1.3,
      opacity: 1,
      backgroundColor: "rgb(59, 130, 246)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-5 justify-center px-4">
          {projects.map((project, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              variants={tabButtonVariants}
              initial="inactive"
              animate={activeTab === index ? "active" : "inactive"}
              whileHover={activeTab !== index ? "hover" : "active"}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-medium text-white border-2 shadow-lg backdrop-blur-sm min-w-max"
            >
              <span className="flex items-center gap-2">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {index + 1}
                </span>
                {project.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <div className="max-w-4xl mx-auto px-4">
              <ProjectCard
                project={projects[activeTab]}
                concept={concept}
                userLevel={userLevel}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tab Indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            variants={indicatorVariants}
            initial="inactive"
            animate={index === activeTab ? "active" : "inactive"}
            whileHover={{ scale: 1.2 }}
            className="w-3 h-3 rounded-full cursor-pointer"
          />
        ))}
      </div>

      {/* Project Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-400">
          Project {activeTab + 1} of {projects.length}
        </span>
      </div>
    </motion.div>
  );
};

export default TabbedProjectView; 
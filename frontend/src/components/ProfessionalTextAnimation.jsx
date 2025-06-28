import React, { useEffect, useState } from 'react';

const ProfessionalTextAnimation = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span className="inline-block min-w-[200px] text-center">
      <span
        key={currentIndex}
        className="inline-block animate-fade-in-up text-blue-400 font-medium"
      >
        {texts[currentIndex]}
      </span>
    </span>
  );
};

export default ProfessionalTextAnimation;
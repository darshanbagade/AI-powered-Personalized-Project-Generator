import React, { useEffect, useState } from 'react';

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / 100;
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.min(prev + increment, target);
      });
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{Math.floor(count)}{suffix}</span>;
};

export default AnimatedCounter;
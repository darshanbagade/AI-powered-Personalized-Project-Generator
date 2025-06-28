import React, { useEffect, useRef } from 'react';

const MinimalisticMovingBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(99, 102, 241, '
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.002;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time) * 50,
        canvas.height * 0.3 + Math.cos(time * 0.7) * 30,
        0,
        canvas.width * 0.3 + Math.sin(time) * 50,
        canvas.height * 0.3 + Math.cos(time * 0.7) * 30,
        canvas.width * 0.4
      );
      gradient1.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      gradient1.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)');
      gradient1.addColorStop(1, 'rgba(16, 24, 40, 0.02)');

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.5) * 60,
        canvas.height * 0.6 + Math.sin(time * 0.8) * 40,
        0,
        canvas.width * 0.7 + Math.cos(time * 0.5) * 60,
        canvas.height * 0.6 + Math.sin(time * 0.8) * 40,
        canvas.width * 0.3
      );
      gradient2.addColorStop(0, 'rgba(79, 70, 229, 0.06)');
      gradient2.addColorStop(0.5, 'rgba(67, 56, 202, 0.03)');
      gradient2.addColorStop(1, 'rgba(30, 41, 59, 0.01)');

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'source-over';

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.opacity + ')';
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let i = 0; i < 5; i++) {
        const x1 = (canvas.width / 5) * i + Math.sin(time + i) * 20;
        const y1 = 0;
        const x2 = (canvas.width / 5) * i + Math.sin(time + i) * 20;
        const y2 = canvas.height;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
};

export default MinimalisticMovingBackground;
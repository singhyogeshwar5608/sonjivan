import { useEffect, useState } from 'react';

const Fireworks = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createFirework = () => {
      const x = Math.random() * 100;
      const y = Math.random() * 60 + 20;
      const id = Date.now() + Math.random();
      
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: `${id}-${i}`,
        x,
        y,
        angle: (i * 360) / 30,
        delay: Math.random() * 0.2,
      }));

      setParticles(prev => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles(prev => prev.filter(p => !p.id.startsWith(id.toString())));
      }, 2000);
    };

    const interval = setInterval(createFirework, 1500);
    createFirework();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1.5 h-1.5 bg-white rounded-full animate-firework"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.angle}deg)`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Fireworks;

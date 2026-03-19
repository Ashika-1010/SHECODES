import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let stars = [];
    let raf;

    function resize() {
      cv.width  = window.innerWidth;
      cv.height = window.innerHeight;
    }

    function init() {
      resize();
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.004 + 0.001,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const t = Date.now() / 1000;
      stars.forEach(s => {
        const alpha = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${alpha * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }} />;
}

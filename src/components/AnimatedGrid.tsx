import React, { useEffect, useRef } from "react";

const AnimatedGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const gridSize = 20;
    const rippleRadius = 200;
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      // Background base
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      const t = time * 0.001; // Current time in seconds

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Base opacity for the grid line
          let opacity = 0.12;

          // Mouse ripple effect
          if (dist < rippleRadius) {
            const force = 1 - dist / rippleRadius;
            opacity += force * 0.4;
          }

          // Ambient pulse effect
          const pulse = Math.sin(x * 0.01 + y * 0.01 + t) * 0.05;
          opacity += pulse;

          ctx.strokeStyle = `rgba(34, 211, 238, ${Math.max(0, opacity)})`; // Cyan color
          ctx.lineWidth = 0.5;
          
          // Draw small intersection dots
          ctx.beginPath();
          ctx.arc(x, y, 0.5, 0, Math.PI * 2);
          ctx.stroke();

          // Draw grid lines (short segments for performance/look)
          ctx.beginPath();
          ctx.moveTo(x - 1, y);
          ctx.lineTo(x + 1, y);
          ctx.moveTo(x, y - 1);
          ctx.lineTo(x, y + 1);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#050505" }}
    />
  );
};

export default AnimatedGrid;

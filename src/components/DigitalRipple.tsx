import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export default function DigitalRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        alpha: 1.0, 
      });
    };
    window.addEventListener("click", handleClick);

    let animationFrameId: number;
    const CELL_SIZE = 35; // Grid spacing

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeRipples: Ripple[] = [];
      const cols = Math.ceil(canvas.width / CELL_SIZE);
      const rows = Math.ceil(canvas.height / CELL_SIZE);

      for (const ripple of ripplesRef.current) {
        ripple.radius += 6; // Expansion speed
        ripple.alpha -= 0.012; // Fade speed

        if (ripple.alpha > 0) {
          activeRipples.push(ripple);
          
          const waveWidth = 60; // How thick the wave is

          for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
              const cellX = i * CELL_SIZE;
              const cellY = j * CELL_SIZE;
              
              const dx = cellX - ripple.x;
              const dy = cellY - ripple.y;
              // Manhattan distance for a square grid ripple
              const distance = Math.max(Math.abs(dx), Math.abs(dy));

              if (Math.abs(distance - ripple.radius) < waveWidth) {
                const intensity = 1 - (Math.abs(distance - ripple.radius) / waveWidth);
                const finalAlpha = ripple.alpha * intensity;
                
                if (finalAlpha > 0.05) {
                  ctx.fillStyle = `rgba(34, 211, 238, ${finalAlpha * 0.5})`;
                  ctx.fillRect(cellX - 1, cellY - 1, 3, 3);
                }
              }
            }
          }
        }
      }
      ripplesRef.current = activeRipples;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}

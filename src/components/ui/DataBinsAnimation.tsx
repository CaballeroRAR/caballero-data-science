import { useEffect, useState } from "react";

const DataBinsAnimation = () => {
  const [bins, setBins] = useState<number[]>([40, 65, 30, 80, 55, 45, 70, 35, 60, 50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prev => prev.map(() => Math.floor(Math.random() * 60) + 20));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 h-24 flex items-end gap-1 px-2">
      {bins.map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-foreground/60 transition-all duration-500 ease-out"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};

export default DataBinsAnimation;

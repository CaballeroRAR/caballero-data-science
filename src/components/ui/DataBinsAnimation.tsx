import { useEffect, useState } from "react";

const dataFragments = [
  "0x3F", "NULL", "∑", "μ", "σ²", "42", "π", "∞", "λ", "Δ",
  "1.618", "0b101", "NaN", "[]", "{}", "=>", "++", "&&", "||",
  "0.95", "p<.05", "n=100", "R²", "β", "α", "χ²", "df=3", "η²"
];

const DataBinsAnimation = () => {
  const [bins, setBins] = useState<number[]>([40, 65, 30, 80, 55, 45, 70, 35, 60, 50]);
  const [cloudItems, setCloudItems] = useState<{ text: string; opacity: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Initialize cloud items
    const items = Array.from({ length: 16 }, () => ({
      text: dataFragments[Math.floor(Math.random() * dataFragments.length)],
      opacity: Math.random() * 0.5 + 0.1,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setCloudItems(items);

    const binsInterval = setInterval(() => {
      setBins(prev => prev.map(() => Math.floor(Math.random() * 60) + 20));
    }, 800);

    const cloudInterval = setInterval(() => {
      setCloudItems(prev => prev.map(item => ({
        text: Math.random() > 0.7 ? dataFragments[Math.floor(Math.random() * dataFragments.length)] : item.text,
        opacity: Math.random() * 0.5 + 0.1,
        x: item.x + (Math.random() - 0.5) * 10,
        y: item.y + (Math.random() - 0.5) * 8,
      })));
    }, 1200);

    return () => {
      clearInterval(binsInterval);
      clearInterval(cloudInterval);
    };
  }, []);

  return (
    <div className="mt-6">
      {/* Data bins */}
      <div className="h-24 flex items-end gap-1 px-2">
        {bins.map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-foreground/60 transition-all duration-500 ease-out"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      {/* Data cloud */}
      <div className="relative h-20 mt-4 overflow-hidden">
        {cloudItems.map((item, i) => (
          <span
            key={i}
            className="absolute font-mono text-xs text-foreground transition-all duration-1000 ease-out"
            style={{
              left: `${Math.min(Math.max(item.x, 5), 90)}%`,
              top: `${Math.min(Math.max(item.y, 5), 85)}%`,
              opacity: item.opacity,
            }}
          >
            {item.text}
          </span>
        ))}
        {/* Fade gradient at bottom to hint scrolling */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
};

export default DataBinsAnimation;

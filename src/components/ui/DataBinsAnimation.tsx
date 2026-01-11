import { useEffect, useState, useCallback } from "react";

const dataFragments = [
  "0x3F", "NULL", "undefined", "μ", "σ²", "0", "π", "$_", "λ", "0.3",
  "1.618", "0b101", "NaN", "[", "{", "=>", "++", "&&", "||", "0xFF",
  "0.95", "p<.05", "n=100", "R²", "β", "α", "χ²", "df=3", "η²"
];

const glitchChars = "!@#$^&*()_+-=:\",./<>?`~░▒▓█▪▫";

type CloudItem = {
  id: number;
  text: string;
  displayText: string;
  x: number;
  y: number;
  phase: "appear" | "reveal" | "disappear";
  opacity: number;
};

let itemIdCounter = 0;

const DataBinsAnimation = () => {
  const [bins, setBins] = useState<number[]>([40, 65, 10, 80, 55, 45, 70, 35, 60, 50]);
  const [cloudItems, setCloudItems] = useState<CloudItem[]>([]);

  const createItem = useCallback((): CloudItem => {
    return {
      id: itemIdCounter++,
      text: dataFragments[Math.floor(Math.random() * dataFragments.length)],
      displayText: "",
      x: Math.random() * 85 + 5,
      y: Math.random() * 85 + 5,
      phase: "appear",
      opacity: 0,
    };
  }, []);

  useEffect(() => {
    // Initialize items
    const initialItems = Array.from({ length: 12 }, createItem);
    setCloudItems(initialItems);

    // Bins animation
    const binsInterval = setInterval(() => {
      setBins(prev => prev.map(() => Math.floor(Math.random() * 60) + 20));
    }, 800);

    // Phase progression
    const phaseInterval = setInterval(() => {
      setCloudItems(prev => {
        const updated = prev.map(item => {
          switch (item.phase) {
            case "appear":
              // Fade in, show real text
              if (item.opacity >= 0.6) {
                return { ...item, phase: "reveal" as const, displayText: item.text };
              }
              return { ...item, opacity: item.opacity + 0.15, displayText: item.text };
            
            case "reveal":
              // Show real text for a bit
              if (Math.random() > 0.7) {
                return { ...item, phase: "disappear" as const };
              }
              return { ...item, displayText: item.text };
            
            case "disappear":
              // Fade out
              if (item.opacity <= 0) {
                return createItem(); // Respawn new item
              }
              return { ...item, opacity: item.opacity - 0.15 };
            
            default:
              return item;
          }
        });
        return updated;
      });
    }, 120);

    return () => {
      clearInterval(binsInterval);
      clearInterval(phaseInterval);
    };
  }, [createItem]);

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

      {/* Data cloud with glitch animation */}
      <div className="relative h-40 mt-4 overflow-hidden">
        {cloudItems.map((item) => (
          <span
            key={item.id}
            className={`absolute font-mono text-xs text-foreground transition-all duration-100`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              opacity: item.opacity,
            }}
          >
            {item.displayText}
          </span>
        ))}
        {/* Fade gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
};

export default DataBinsAnimation;

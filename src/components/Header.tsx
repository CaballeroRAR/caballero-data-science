import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-foreground"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20">
          <div className="font-display text-xl tracking-tight">
            <span className="text-foreground">DS</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-mono text-sm text-muted-foreground ml-1">ARCHITECT</span>
          </div>

          <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
            {["about", "projects", "skills", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <div className="font-mono text-xs text-muted-foreground hidden lg:block">
            <span className="inline-block w-2 h-2 bg-foreground mr-2" />
            AVAILABLE FOR WORK
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

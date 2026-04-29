import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = ["about", "projects", "skills", "certifications", "contact"];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-foreground/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="font-display text-lg md:text-xl tracking-tight">
            <span className="text-foreground">DS</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-mono text-xs md:text-sm text-muted-foreground ml-1">
              Gabriel_Caballero
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-widest">
            {navItems.map((item) => (
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

          {/* Availability badge - desktop only */}
          <div className="font-mono text-xs text-muted-foreground hidden lg:flex items-center">
            <span className="inline-block w-2 h-2 bg-foreground mr-2" />
            AVAILABLE FOR WORK
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-foreground"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-foreground/20 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="w-full text-left px-4 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors duration-200"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Availability badge in mobile menu */}
          <div className="mt-4 px-4 py-3 border-t border-foreground/10 font-mono text-xs text-muted-foreground flex items-center">
            <span className="inline-block w-2 h-2 bg-foreground mr-2" />
            AVAILABLE FOR WORK
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
const Footer = () => {
  return (
    <footer className="py-8 md:py-12 border-t border-foreground/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          {/* Logo/Name */}
          <div className="font-display text-base md:text-lg">
            <span className="text-foreground">DS</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-mono text-[10px] md:text-xs text-muted-foreground ml-1">
              Gabriel_Caballero
            </span>
          </div>

          {/* Copyright */}
          <div className="font-mono text-[10px] md:text-xs text-muted-foreground order-3 md:order-2">
            © {new Date().getFullYear()} — DESIGNED WITH PRECISION
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[10px] md:text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 order-2 md:order-3"
          >
            BACK TO TOP
            <span className="inline-block rotate-[-90deg]">→</span>
          </button>
        </div>

        {/* Bottom architectural line */}
        <div className="mt-8 md:mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-foreground/10" />
          <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-foreground/20" />
          <div className="flex-1 h-px bg-foreground/10" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
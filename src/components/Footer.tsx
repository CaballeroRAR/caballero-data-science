const Footer = () => {
  return (
    <footer className="py-12 border-t border-foreground/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Logo/Name */}
          <div className="font-display text-lg">
            <span className="text-foreground">DS</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-mono text-xs text-muted-foreground ml-1">ARCHITECT</span>
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} — DESIGNED WITH PRECISION
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2"
          >
            BACK TO TOP
            <span className="inline-block rotate-[-90deg]">→</span>
          </button>
        </div>

        {/* Bottom architectural line */}
        <div className="mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-foreground/10" />
          <div className="w-2 h-2 bg-foreground/20" />
          <div className="flex-1 h-px bg-foreground/10" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

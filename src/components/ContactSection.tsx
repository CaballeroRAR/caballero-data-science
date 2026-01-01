import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative">
      {/* Blueprint number */}
      <div className="absolute right-8 top-32 font-mono text-8xl text-muted/30 hidden lg:block">
        05
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            Contact
          </span>
          <div className="flex-1 h-px bg-foreground/20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - CTA */}
          <div>
            <h2 className="text-4xl md:text-6xl font-display mb-8 leading-tight">
              Let's Build
              <br />
              Something
              <br />
              <span className="text-muted-foreground">Together</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-md mb-8">
              Whether you're looking to optimize your data infrastructure, 
              build predictive models, or architect ML systems—I'd love to hear about your project.
            </p>
            <Button variant="default" size="lg" asChild>
              <a href="mailto:hello@datascientist.com">
                Start a Conversation
              </a>
            </Button>
          </div>

          {/* Right - Contact info */}
          <div className="lg:pt-8">
            <div className="space-y-8">
              {/* Email */}
              <div className="group">
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Email
                </div>
                <a
                  href="mailto:hello@datascientist.com"
                  className="font-body text-lg hover:text-muted-foreground transition-colors duration-200"
                >
                  hello@datascientist.com
                </a>
              </div>

              {/* Location */}
              <div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Based In
                </div>
                <div className="font-body text-lg">Berlin, Germany</div>
                <div className="font-mono text-sm text-muted-foreground mt-1">
                  Available for remote work worldwide
                </div>
              </div>

              {/* Social links */}
              <div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                  Connect
                </div>
                <div className="flex gap-4">
                  {["LinkedIn", "GitHub", "Twitter"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-4 py-2 border border-foreground/30 font-mono text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors duration-300"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability status */}
            <div className="mt-16 p-6 border border-foreground">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-foreground animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Currently Available
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground">
                Open to consulting engagements, advisory roles, and select full-time opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

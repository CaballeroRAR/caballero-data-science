import { Button } from "@/components/ui/button";
import { SectionNumber } from "./ui/SectionNumber";
import SectionTitle from "./ui/SectionTitle";
import CVDownloadDialog from "./CVDownloadDialog";

const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/datacaballero" },
  { name: "GitHub", url: "https://github.com/CaballeroRAR" },
  { name: "Kaggle", url: "https://www.kaggle.com/datacaballero" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:flex justify-end pt-8">
            <SectionNumber number="05" className="text-muted/80" />
          </div>

          <div>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <SectionTitle>Contact</SectionTitle>
              <div className="flex-1 h-px bg-foreground/20" />
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24">
              {/* Left - CTA */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display mb-6 md:mb-8 leading-tight">
                  Let's Find
                  <br />
                  Something
                  <br />
                  <span className="text-muted-foreground">Together</span>
                </h2>
                <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-md mb-6 md:mb-8">
                  Whether you need regression modeling for process optimization, forecasting
                  solutions for demand planning, or data-driven insights to support
                  decision-making. I'd love to discuss how I can help.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                  <Button variant="default" size="lg" asChild className="w-full sm:w-auto">
                    <a href="mailto:caballero.data.scientist@gmail.com">Start a Conversation</a>
                  </Button>
                  <CVDownloadDialog />
                </div>
              </div>

              {/* Right - Contact info */}
              <div className="lg:pt-8">
                <div className="space-y-6 md:space-y-8">
                  {/* Email */}
                  <div className="group">
                    <div className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">
                      Email
                    </div>
                    <a
                      href="mailto:caballero.data.scientist@gmail.com"
                      className="font-body text-sm md:text-base lg:text-lg hover:text-muted-foreground transition-colors duration-200 break-all"
                    >
                      caballero.data.scientist@gmail.com
                    </a>
                  </div>

                  {/* Location */}
                  <div>
                    <div className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">
                      Based In
                    </div>
                    <div className="font-body text-sm md:text-base lg:text-lg">
                      Mexico City, Mexico
                    </div>
                    <div className="font-mono text-xs md:text-sm text-muted-foreground mt-1">
                      Available for remote work worldwide
                    </div>
                  </div>

                  {/* Social links */}
                  <div>
                    <div className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-3 md:mb-4">
                      Connect
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 md:px-4 py-1.5 md:py-2 border border-foreground/30 font-mono text-[10px] md:text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors duration-300"
                        >
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Availability status */}
                <div className="mt-10 md:mt-16 p-4 md:p-6 border border-foreground">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-2 md:w-3 h-2 md:h-3 bg-foreground animate-pulse" />
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider">
                      Currently Available
                    </span>
                  </div>
                  <p className="font-body text-xs md:text-sm text-muted-foreground">
                    Open to consulting engagements, advisory roles, and select full-time
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
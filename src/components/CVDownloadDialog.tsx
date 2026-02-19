import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileText, Loader2 } from "lucide-react";

const CVDownloadDialog = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleVerify = async (language: "english" | "spanish") => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("log-cv-download", {
        body: { email, language },
      });

      if (fnError) throw fnError;

      if (data?.success) {
        setVerified(true);
        // Trigger download based on language
        const cvUrl = language === "english" 
          ? "/cv/Data_Scientist_Gabriel_Caballero_CV_en_NO-PHONE.pdf" 
          : "/cv/Data_Scientist_Gabriel_Caballero_CV_es_NO-PHONE.pdf";
        
        const link = document.createElement("a");
        link.href = cvUrl;
        link.download = language === "english" ? "Data_Scientist_Gabriel_Caballero_CV_en_NO-PHONE.pdf" : "Data_Scientist_Gabriel_Caballero_CV_es_NO-PHONE.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset after download
        setTimeout(() => {
          setOpen(false);
          setEmail("");
          setVerified(false);
        }, 1500);
      }
    } catch (err: any) {
      console.error("Download error:", err);
      setError(err.message || "Failed to verify email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg" 
          className="mt-4 border-foreground/30 hover:bg-foreground hover:text-background"
        >
          <FileText className="w-4 h-4 mr-2" />
          Download CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-foreground/20 bg-background">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Download CV</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground font-body">
            Enter your email to download my CV. Choose your preferred language.
          </p>
          
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="bg-background border-foreground/30 focus:border-foreground"
            disabled={loading || verified}
          />
          
          {error && (
            <p className="text-sm text-destructive font-mono">{error}</p>
          )}

          {verified ? (
            <div className="flex items-center gap-2 text-sm text-foreground font-mono">
              <Download className="w-4 h-4 animate-pulse" />
              Downloading...
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={() => handleVerify("english")}
                disabled={loading || !email}
                className="flex-1"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    English
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleVerify("spanish")}
                disabled={loading || !email}
                variant="outline"
                className="flex-1 border-foreground/30 hover:bg-foreground hover:text-background"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Español
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVDownloadDialog;
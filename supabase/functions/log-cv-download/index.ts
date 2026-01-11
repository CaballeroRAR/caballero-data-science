import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS - restricts which domains can call this function
const allowedOrigins = [
  "https://ujyfdclttbnspnwzbhcd.lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
];

// In-memory rate limiting (per edge function instance)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_IP = 5;

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && allowedOrigins.some(allowed => 
    origin === allowed || origin.endsWith('.lovable.app')
  );
  
  return {
    "Access-Control-Allow-Origin": isAllowed && origin ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  return allowedOrigins.some(allowed => 
    origin === allowed || origin.endsWith('.lovable.app')
  );
}

function checkRateLimit(clientKey: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(clientKey) || [];
  const recentRequests = requests.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_IP) {
    return false; // Rate limited
  }
  
  recentRequests.push(now);
  rateLimitMap.set(clientKey, recentRequests);
  return true;
}

interface DownloadRequest {
  email: string;
  language: "english" | "spanish";
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

serve(async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Check origin for non-preflight requests
  if (!isOriginAllowed(origin)) {
    console.log("Blocked request from unauthorized origin:", origin);
    return new Response(
      JSON.stringify({ error: "Origin not allowed" }),
      { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    // Get client IP for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || "unknown";

    // Check rate limit
    if (!checkRateLimit(ipAddress)) {
      console.log("Rate limit exceeded for IP:", ipAddress);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again in a minute." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { email, language }: DownloadRequest = await req.json();

    // Validate email
    if (!email || !emailRegex.test(email)) {
      console.log("Invalid email attempt:", email);
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate language
    if (!language || !["english", "spanish"].includes(language)) {
      console.log("Invalid language:", language);
      return new Response(
        JSON.stringify({ error: "Invalid language selection" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check for recent download from same email (database-level rate limit)
    const { data: recentLog } = await supabase
      .from("cv_download_logs")
      .select("downloaded_at")
      .eq("email", email.toLowerCase().trim())
      .gte("downloaded_at", new Date(Date.now() - RATE_LIMIT_WINDOW).toISOString())
      .maybeSingle();

    if (recentLog) {
      console.log("Duplicate download attempt for email:", email);
      return new Response(
        JSON.stringify({ error: "You recently downloaded the CV. Please wait a minute before trying again." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get request metadata
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Log the download request
    const { error: insertError } = await supabase
      .from("cv_download_logs")
      .insert({
        email: email.toLowerCase().trim(),
        language,
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`CV download logged - Email: ${email}, Language: ${language}, IP: ${ipAddress}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email verified successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in log-cv-download:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});

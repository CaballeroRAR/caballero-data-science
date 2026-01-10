-- Create table to log CV download requests
CREATE TABLE public.cv_download_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('english', 'spanish')),
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Enable RLS (admin-only access, public can insert)
ALTER TABLE public.cv_download_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for logging downloads)
CREATE POLICY "Anyone can log CV downloads"
ON public.cv_download_logs
FOR INSERT
WITH CHECK (true);

-- No public read access (only you via backend/dashboard)
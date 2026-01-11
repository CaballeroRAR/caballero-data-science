-- Create a restrictive SELECT policy that denies all reads via API
-- Only the service role key (used by edge functions) can read the logs
-- This protects visitor PII (emails, IPs) from API access
CREATE POLICY "No public read access" 
ON public.cv_download_logs 
FOR SELECT 
USING (false);
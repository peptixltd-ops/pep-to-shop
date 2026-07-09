
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  discount_code TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'popup',
  ip_hash TEXT,
  user_agent TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  code_used_at TIMESTAMPTZ,
  metadata JSONB
);
CREATE INDEX newsletter_subscribers_email_idx ON public.newsletter_subscribers (lower(email));
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages newsletter subscribers"
  ON public.newsletter_subscribers
  FOR ALL
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

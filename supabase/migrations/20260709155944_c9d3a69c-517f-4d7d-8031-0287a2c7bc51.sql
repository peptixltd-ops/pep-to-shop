ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS phone TEXT;
CREATE INDEX IF NOT EXISTS newsletter_subscribers_phone_idx ON public.newsletter_subscribers (NULLIF(lower(phone), ''));
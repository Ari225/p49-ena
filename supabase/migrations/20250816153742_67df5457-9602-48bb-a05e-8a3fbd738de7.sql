-- Add missing columns to existing tables
ALTER TABLE public.happy_events 
ADD COLUMN IF NOT EXISTS custom_category text;

ALTER TABLE public.retirement_departures 
ADD COLUMN IF NOT EXISTS custom_category text;

ALTER TABLE public.difficult_events
ADD COLUMN IF NOT EXISTS custom_category text;

-- Add category column to retirement_departures if it doesn't exist
ALTER TABLE public.retirement_departures 
ADD COLUMN IF NOT EXISTS category text DEFAULT 'retraite';
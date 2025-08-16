-- Fix remaining security warnings - Set search_path for all functions

-- Fix search_path for existing functions
ALTER FUNCTION public.get_member_directory() SET search_path = 'public';
ALTER FUNCTION public.get_member_details(text, text) SET search_path = 'public';
ALTER FUNCTION public.get_user_role(uuid) SET search_path = 'public';
ALTER FUNCTION public.get_current_user_role() SET search_path = 'public';
ALTER FUNCTION public.sp_inserer_membre(character varying, character varying, date, character varying, text, character, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying) SET search_path = 'public';
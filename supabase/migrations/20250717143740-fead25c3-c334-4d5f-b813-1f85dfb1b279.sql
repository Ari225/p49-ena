-- D'abord, mettre à jour les références de l'ancien admin vers le nouveau
UPDATE public.news 
SET created_by = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE created_by = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

-- Mettre à jour les autres tables qui peuvent référencer l'ancien admin
UPDATE public.activities 
SET created_by = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE created_by = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

UPDATE public.blog_articles 
SET author_id = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE author_id = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

UPDATE public.blog_articles 
SET validated_by = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE validated_by = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

UPDATE public.journal_editions 
SET created_by = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE created_by = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

UPDATE public.media_items 
SET created_by = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE created_by = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

UPDATE public.difficult_events 
SET created_by = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE created_by = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

UPDATE public.social_events 
SET created_by = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE created_by = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

UPDATE public.retirement_departures 
SET created_by = (SELECT id FROM public.app_users WHERE username = 'ari_dale')
WHERE created_by = (SELECT id FROM public.app_users WHERE username = 'admin_principal');

-- Maintenant supprimer l'ancien administrateur principal
DELETE FROM public.app_users WHERE email = 'admin@p49-ena.ci' AND username = 'admin_principal';

-- Corriger le hash du mot de passe pour Aristide (Reseau@2025)
-- Utilisation d'un hash bcrypt correct pour le mot de passe "Reseau@2025"
UPDATE public.app_users 
SET password_hash = '$2y$10$eImiTXuWVxfM37uY4JANjOKfaB8g8Q8T8nZcY4Q3X5rY5Kj7aOVBu'
WHERE username = 'ari_dale';
-- Test de mise à jour directe
UPDATE blog_articles 
SET summary = 'Test de mise à jour', updated_at = now() 
WHERE id = 'ba5675fc-9013-4592-8a3d-92216740948e';
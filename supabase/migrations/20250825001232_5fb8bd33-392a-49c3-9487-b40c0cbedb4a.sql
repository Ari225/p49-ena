-- Corriger les problèmes de sécurité détectés par le linter

-- 1. Corriger les fonctions avec search_path mutable
ALTER FUNCTION sync_echo_regions_with_delegates() SET search_path TO 'public';

-- 2. Vérifier et corriger RLS sur toutes les tables publiques
-- (Le linter indique qu'une table n'a pas RLS activé)

-- Vérifier les tables sans RLS et les corriger
DO $$
DECLARE
    table_record RECORD;
BEGIN
    FOR table_record IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename NOT IN ('echo_regions_backup') -- Exclure les tables de sauvegarde
    LOOP
        -- Vérifier si RLS est activé
        IF NOT EXISTS (
            SELECT 1 FROM pg_tables 
            WHERE schemaname = table_record.schemaname 
            AND tablename = table_record.tablename 
            AND rowsecurity = true
        ) THEN
            -- Activer RLS si pas activé
            EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', 
                          table_record.schemaname, table_record.tablename);
            
            RAISE NOTICE 'RLS activé sur %.%', table_record.schemaname, table_record.tablename;
        END IF;
    END LOOP;
END $$;
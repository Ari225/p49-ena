-- Ajouter un + devant tous les numéros WhatsApp qui n'en ont pas déjà
UPDATE members 
SET "WhatsApp" = CASE 
  WHEN "WhatsApp" IS NOT NULL AND "WhatsApp"::text NOT LIKE '+%' 
  THEN ('+' || "WhatsApp"::text)::bigint
  ELSE "WhatsApp"
END
WHERE "WhatsApp" IS NOT NULL;
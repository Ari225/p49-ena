-- Ajouter des politiques RLS pour permettre aux utilisateurs authentifiés de créer des citations et statistiques

-- Politique pour permettre aux utilisateurs authentifiés d'insérer des citations
CREATE POLICY "Utilisateurs authentifiés peuvent créer des citations" 
ON career_quotes 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

-- Politique pour permettre aux utilisateurs authentifiés d'insérer des statistiques  
CREATE POLICY "Utilisateurs authentifiés peuvent créer des statistiques"
ON career_statistics
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());
-- Créer table pour les likes des commentaires
CREATE TABLE blog_comment_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES blog_article_comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  visitor_ip TEXT,
  like_type TEXT NOT NULL CHECK (like_type IN ('like', 'dislike')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(comment_id, user_id),
  UNIQUE(comment_id, visitor_ip)
);

-- Ajouter colonne pour les réponses aux commentaires
ALTER TABLE blog_article_comments 
ADD COLUMN parent_comment_id UUID REFERENCES blog_article_comments(id) ON DELETE CASCADE;

-- Index pour les performances
CREATE INDEX idx_blog_comment_likes_comment_id ON blog_comment_likes(comment_id);
CREATE INDEX idx_blog_article_comments_parent_id ON blog_article_comments(parent_comment_id);

-- Activer RLS sur la table des likes de commentaires
ALTER TABLE blog_comment_likes ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les likes des commentaires
CREATE POLICY "Tout le monde peut voir les likes de commentaires" 
ON blog_comment_likes FOR SELECT 
USING (true);

CREATE POLICY "Tout le monde peut créer des likes de commentaires" 
ON blog_comment_likes FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Utilisateurs peuvent supprimer leurs likes de commentaires" 
ON blog_comment_likes FOR DELETE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR 
  (auth.uid() IS NULL AND visitor_ip IS NOT NULL)
);

-- Trigger pour la publication temps réel
ALTER TABLE blog_comment_likes REPLICA IDENTITY FULL;
ALTER TABLE blog_article_comments REPLICA IDENTITY FULL;

-- Ajouter les tables aux publications temps réel
ALTER PUBLICATION supabase_realtime ADD TABLE blog_comment_likes;
ALTER PUBLICATION supabase_realtime ADD TABLE blog_article_comments;
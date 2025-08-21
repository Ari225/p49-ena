-- Créer les tables pour les likes et commentaires des articles de blog

-- Table pour les likes d'articles
CREATE TABLE public.blog_article_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  visitor_ip TEXT,
  like_type TEXT NOT NULL CHECK (like_type IN ('like', 'dislike')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Contrainte pour éviter les doublons (un utilisateur ou IP ne peut liker qu'une fois)
  CONSTRAINT unique_like_per_article UNIQUE (article_id, user_id, visitor_ip)
);

-- Table pour les commentaires d'articles
CREATE TABLE public.blog_article_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_role TEXT DEFAULT 'Visiteur',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur les tables
ALTER TABLE public.blog_article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_article_comments ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les likes
CREATE POLICY "Tout le monde peut voir les likes"
ON public.blog_article_likes
FOR SELECT
USING (true);

CREATE POLICY "Tout le monde peut créer des likes"
ON public.blog_article_likes
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Utilisateurs peuvent supprimer leurs likes"
ON public.blog_article_likes
FOR DELETE
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND visitor_ip IS NOT NULL)
);

-- Politiques RLS pour les commentaires
CREATE POLICY "Tout le monde peut voir les commentaires"
ON public.blog_article_comments
FOR SELECT
USING (true);

CREATE POLICY "Tout le monde peut créer des commentaires"
ON public.blog_article_comments
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins peuvent gérer tous les commentaires"
ON public.blog_article_comments
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM app_users 
    WHERE id = auth.uid() 
    AND role IN ('admin_principal', 'admin_secondaire')
  )
);

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_blog_comments_updated_at
BEFORE UPDATE ON public.blog_article_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
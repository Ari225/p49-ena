import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CommentFormProps {
  articleId: string;
  parentCommentId?: string;
  onCommentAdded: () => void;
  onCancel?: () => void;
  placeholder?: string;
  showCancel?: boolean;
}

const CommentForm = ({ 
  articleId, 
  parentCommentId, 
  onCommentAdded, 
  onCancel, 
  placeholder = "Écrivez votre commentaire...",
  showCancel = false 
}: CommentFormProps) => {
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [userAuth, setUserAuth] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const getUserAuth = async () => {
      const { data: user } = await supabase.auth.getUser();
      setUserAuth(user);
    };
    getUserAuth();
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    // Vérification du nom obligatoire pour les visiteurs non connectés
    if (!userAuth?.user && !commenterName.trim()) {
      toast.error('Veuillez saisir votre nom');
      return;
    }

    setLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      let authorName = '';

      // Si l'utilisateur est connecté, utiliser son display name de l'authentification
      if (user.user) {
        authorName = user.user.user_metadata?.display_name || 
                    user.user.user_metadata?.full_name || 
                    `${user.user.user_metadata?.first_name || ''} ${user.user.user_metadata?.last_name || ''}`.trim() ||
                    'Utilisateur';
      } else {
        // Pour les visiteurs non connectés, utiliser le nom saisi
        authorName = commenterName.trim();
      }

      const { error } = await supabase
        .from('blog_article_comments')
        .insert({
          article_id: articleId,
          parent_comment_id: parentCommentId,
          user_id: user.user?.id,
          author_name: authorName,
          author_role: user.user ? 'Membre connecté' : authorName,
          content: newComment
        });

      if (error) throw error;

      setNewComment('');
      setCommenterName('');
      onCommentAdded();
      if (onCancel) onCancel();
      toast.success('Commentaire ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      toast.error('Erreur lors de l\'ajout du commentaire');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <Textarea
        placeholder={placeholder}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="mb-3"
      />
      {!userAuth?.user && (
        <Input
          placeholder="Votre nom *"
          value={commenterName}
          onChange={(e) => setCommenterName(e.target.value)}
          className="mb-3"
          required
        />
      )}
      <div className="flex gap-2">
        <Button 
          onClick={handleAddComment} 
          size="sm" 
          className="flex items-center gap-2"
          disabled={loading}
        >
          <Send className="h-4 w-4" />
          {parentCommentId ? 'Répondre' : 'Publier le commentaire'}
        </Button>
        {showCancel && onCancel && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCancel}
          >
            Annuler
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
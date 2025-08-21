import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, MessageCircle, Edit, Trash2, Check, X, Reply } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import CommentForm from './CommentForm';

interface CommentProps {
  comment: any;
  userAuth: any;
  onCommentUpdated: () => void;
  level?: number;
}

const Comment = ({ comment, userAuth, onCommentUpdated, level = 0 }: CommentProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentLikes, setCommentLikes] = useState({ likes: 0, dislikes: 0 });
  const [userCommentLike, setUserCommentLike] = useState<string | null>(null);
  const [replies, setReplies] = useState<any[]>([]);

  useEffect(() => {
    fetchCommentLikes();
    fetchReplies();
  }, [comment.id]);

  const fetchCommentLikes = async () => {
    try {
      const { data: likesData } = await supabase
        .from('blog_comment_likes')
        .select('like_type, user_id, visitor_ip')
        .eq('comment_id', comment.id);

      if (likesData) {
        const likesCount = likesData.filter(like => like.like_type === 'like').length;
        const dislikesCount = likesData.filter(like => like.like_type === 'dislike').length;
        setCommentLikes({ likes: likesCount, dislikes: dislikesCount });

        // Vérifier si l'utilisateur a déjà liké
        const userLikeData = likesData.find(like => 
          like.user_id === userAuth?.user?.id
        );
        if (userLikeData) {
          setUserCommentLike(userLikeData.like_type);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des likes:', error);
    }
  };

  const fetchReplies = async () => {
    try {
      const { data: repliesData } = await supabase
        .from('blog_article_comments')
        .select('*')
        .eq('parent_comment_id', comment.id)
        .order('created_at', { ascending: true });

      if (repliesData) {
        setReplies(repliesData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses:', error);
    }
  };

  const handleCommentLike = async (likeType: 'like' | 'dislike') => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      // Supprimer le like précédent s'il existe
      if (userCommentLike) {
        await supabase
          .from('blog_comment_likes')
          .delete()
          .eq('comment_id', comment.id)
          .eq(user.user ? 'user_id' : 'visitor_ip', user.user?.id || 'visitor');
      }

      // Ajouter le nouveau like seulement s'il est différent
      if (userCommentLike !== likeType) {
        const { error } = await supabase
          .from('blog_comment_likes')
          .insert({
            comment_id: comment.id,
            user_id: user.user?.id,
            visitor_ip: user.user ? null : 'visitor',
            like_type: likeType
          });

        if (error) throw error;
        setUserCommentLike(likeType);
      } else {
        setUserCommentLike(null);
      }

      fetchCommentLikes();
    } catch (error) {
      console.error('Erreur lors du like:', error);
      toast.error('Erreur lors de l\'enregistrement de votre réaction');
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editingContent.trim()) return;

    try {
      const { error } = await supabase
        .from('blog_article_comments')
        .update({ content: editingContent })
        .eq('id', commentId);

      if (error) throw error;

      setEditingCommentId(null);
      setEditingContent('');
      onCommentUpdated();
      toast.success('Commentaire modifié avec succès');
    } catch (error) {
      console.error('Erreur lors de la modification du commentaire:', error);
      toast.error('Erreur lors de la modification du commentaire');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_article_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      onCommentUpdated();
      toast.success('Commentaire supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
      toast.error('Erreur lors de la suppression du commentaire');
    }
  };

  const startEditComment = (comment: any) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const canEditOrDeleteComment = (comment: any) => {
    if (userAuth?.user && comment.user_id === userAuth.user.id) {
      return true;
    }
    return userAuth?.user && userAuth.userData?.role && 
           ['admin_principal', 'admin_secondaire'].includes(userAuth.userData.role);
  };

  const handleReplyAdded = () => {
    fetchReplies();
    setShowReplyForm(false);
    onCommentUpdated();
  };

  const marginLeft = level * 32; // 32px par niveau

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4" style={{ marginLeft: `${marginLeft}px` }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{comment.author_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {new Date(comment.created_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
          {canEditOrDeleteComment(comment) && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => startEditComment(comment)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteComment(comment.id)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {editingCommentId === comment.id ? (
        <div className="space-y-2">
          <Textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleEditComment(comment.id)}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Sauvegarder
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={cancelEdit}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-3">{comment.content}</p>
          
          {/* Actions du commentaire */}
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant={userCommentLike === 'like' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleCommentLike('like')}
              className="flex items-center gap-1 h-8 px-2 text-xs"
            >
              <ThumbsUp className="h-3 w-3" />
              {commentLikes.likes}
            </Button>
            <Button
              variant={userCommentLike === 'dislike' ? 'destructive' : 'ghost'}
              size="sm"
              onClick={() => handleCommentLike('dislike')}
              className="flex items-center gap-1 h-8 px-2 text-xs"
            >
              <ThumbsDown className="h-3 w-3" />
              {commentLikes.dislikes}
            </Button>
            {level < 2 && ( // Limiter à 2 niveaux de réponses
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1 h-8 px-2 text-xs"
              >
                <Reply className="h-3 w-3" />
                Répondre
              </Button>
            )}
          </div>

          {/* Formulaire de réponse */}
          {showReplyForm && (
            <div className="mb-4">
              <CommentForm
                articleId={comment.article_id}
                parentCommentId={comment.id}
                onCommentAdded={handleReplyAdded}
                onCancel={() => setShowReplyForm(false)}
                placeholder="Écrivez votre réponse..."
                showCancel={true}
              />
            </div>
          )}

          {/* Réponses */}
          {replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  userAuth={userAuth}
                  onCommentUpdated={onCommentUpdated}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
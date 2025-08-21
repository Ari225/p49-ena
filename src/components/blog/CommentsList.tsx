import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Comment from './Comment';
import CommentForm from './CommentForm';

interface CommentsListProps {
  articleId: string;
}

const CommentsList = ({ articleId }: CommentsListProps) => {
  const [comments, setComments] = useState<any[]>([]);
  const [userAuth, setUserAuth] = useState<any>(null);

  useEffect(() => {
    const getUserAuth = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        const { data: userData } = await supabase
          .from('app_users')
          .select('role')
          .eq('id', user.user.id)
          .maybeSingle();
        setUserAuth({ user: user.user, userData });
      } else {
        setUserAuth(user);
      }
    };
    getUserAuth();
  }, []);

  useEffect(() => {
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const fetchComments = async () => {
    try {
      // Récupérer seulement les commentaires de niveau racine (pas de parent)
      const { data: commentsData } = await supabase
        .from('blog_article_comments')
        .select('*')
        .eq('article_id', articleId)
        .is('parent_comment_id', null)
        .order('created_at', { ascending: true });

      if (commentsData) {
        setComments(commentsData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
    }
  };

  const handleCommentUpdated = () => {
    fetchComments();
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2" />
        Commentaires ({comments.length})
      </h3>

      {/* Formulaire d'ajout de commentaire */}
      <div className="mb-6">
        <CommentForm
          articleId={articleId}
          onCommentAdded={handleCommentUpdated}
        />
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            userAuth={userAuth}
            onCommentUpdated={handleCommentUpdated}
          />
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            Aucun commentaire pour le moment. Soyez le premier à commenter !
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
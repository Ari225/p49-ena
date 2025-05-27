
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Check, X, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PendingArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  author_id: string;
  created_at: string;
  author: {
    first_name: string;
    last_name: string;
  };
}

const DashboardPendingArticles = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [articles, setArticles] = useState<PendingArticle[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchPendingArticles();
  }, []);

  const fetchPendingArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select(`
          id,
          title,
          content,
          summary,
          author_id,
          created_at,
          author:app_users!author_id (
            first_name,
            last_name
          )
        `)
        .eq('status', 'en_attente')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching pending articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateArticle = async (articleId: string) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .update({
          status: 'valide',
          validated_by: user.id,
          published_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', articleId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Article validé avec succès"
      });

      fetchPendingArticles();
    } catch (error) {
      console.error('Error validating article:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la validation",
        variant: "destructive"
      });
    }
  };

  const handleRejectArticle = async (articleId: string) => {
    try {
      const { error } = await supabase
        .from('blog_articles')
        .update({
          status: 'refuse',
          validated_by: user.id
        })
        .eq('id', articleId);

      if (error) throw error;

      toast({
        title: "Article refusé",
        description: "L'article a été refusé"
      });

      fetchPendingArticles();
    } catch (error) {
      console.error('Error rejecting article:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du refus",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Articles en Attente</h1>
            <p className="text-gray-600 mt-2">Valider ou refuser les articles soumis</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Articles en attente de validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {articles.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Aucun article en attente de validation
                </p>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{article.title}</h3>
                        <p className="text-sm text-gray-600">
                          Par {article.author?.first_name} {article.author?.last_name} - 
                          {new Date(article.created_at).toLocaleDateString('fr-FR')}
                        </p>
                        {article.summary && (
                          <p className="text-sm text-gray-700 mt-2">{article.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleValidateArticle(article.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleRejectArticle(article.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPendingArticles;

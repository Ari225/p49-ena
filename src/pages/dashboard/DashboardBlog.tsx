
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, Clock, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  published_date: string;
  app_users: {
    first_name: string;
    last_name: string;
  };
}

const DashboardBlog = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchValidatedArticles();
  }, []);

  const fetchValidatedArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_articles')
        .select(`
          id,
          title,
          summary,
          published_date,
          app_users (
            first_name,
            last_name
          )
        `)
        .eq('status', 'valide')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Articles Blog</h1>
            <p className="text-gray-600 mt-2">Gérer les articles de blog du site</p>
          </div>

          <div className="mb-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/dashboard/pending-articles">
                <Clock className="mr-2 h-4 w-4" />
                Articles en attente
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenTool className="mr-2 h-5 w-5" />
                Articles de Blog Validés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucun article validé
                  </p>
                ) : (
                  articles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{article.title}</h3>
                        <p className="text-sm text-gray-600">
                          Par {article.app_users?.first_name} {article.app_users?.last_name} - 
                          Publié le {new Date(article.published_date).toLocaleDateString('fr-FR')}
                        </p>
                        {article.summary && (
                          <p className="text-sm text-gray-700 mt-2">{article.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Publié</span>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardBlog;

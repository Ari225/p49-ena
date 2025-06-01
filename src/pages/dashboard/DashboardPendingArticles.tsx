
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Check, X, Eye } from 'lucide-react';

interface PendingArticle {
  id: string;
  title: string;
  summary: string;
  author: string;
  submitted_date: string;
  category: string;
}

const DashboardPendingArticles = () => {
  const { user } = useAuth();
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
      setLoading(true);
      // Mock data instead of Supabase
      const mockArticles: PendingArticle[] = [
        {
          id: '1',
          title: 'Article en attente de validation',
          summary: 'Ceci est un résumé d\'un article en attente de validation.',
          author: 'Rédacteur Test',
          submitted_date: '2024-01-15',
          category: 'Formation'
        }
      ];
      setArticles(mockArticles);
    } catch (error) {
      console.error('Error fetching pending articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (articleId: string) => {
    try {
      // Mock approval - in a real app, this would update the article status
      console.log('Approving article:', articleId);
      setArticles(prev => prev.filter(article => article.id !== articleId));
    } catch (error) {
      console.error('Error approving article:', error);
    }
  };

  const handleReject = async (articleId: string) => {
    try {
      // Mock rejection - in a real app, this would update the article status
      console.log('Rejecting article:', articleId);
      setArticles(prev => prev.filter(article => article.id !== articleId));
    } catch (error) {
      console.error('Error rejecting article:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="text-center">Chargement...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Articles en Attente</h1>
            <p className="text-gray-600 mt-2">Valider les articles soumis par les rédacteurs</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Articles à Valider ({articles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucun article en attente de validation
                  </p>
                ) : (
                  articles.map((article) => (
                    <div key={article.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{article.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Par {article.author} • {article.category} • Soumis le {new Date(article.submitted_date).toLocaleDateString('fr-FR')}
                          </p>
                          {article.summary && (
                            <p className="text-sm text-gray-700 mt-2">{article.summary}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(article.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleReject(article.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
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

export default DashboardPendingArticles;

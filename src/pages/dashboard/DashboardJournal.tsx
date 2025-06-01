
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Eye, Download, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

const DashboardJournal = () => {
  const { user } = useAuth();
  const [editions, setEditions] = useState<JournalEdition[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      setLoading(true);
      // Mock data instead of Supabase
      const mockEditions: JournalEdition[] = [
        {
          id: '1',
          title: 'Perspectives 49 - Janvier 2024',
          summary: 'Édition de janvier 2024 du journal Perspectives 49',
          cover_image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
          pdf_url: '/lovable-uploads/sample.pdf',
          publish_date: '2024-01-15',
          page_count: 24,
          status: 'published'
        }
      ];
      setEditions(mockEditions);
    } catch (error) {
      console.error('Error fetching journal editions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Publié</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Brouillon</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">{status}</span>;
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
            <h1 className="text-3xl font-bold text-primary">Gestion du Journal</h1>
            <p className="text-gray-600 mt-2">Gérer les éditions du journal Perspectives 49</p>
          </div>

          <div className="mb-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/dashboard/add-journal">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle édition
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Éditions du Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {editions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune édition créée
                  </p>
                ) : (
                  editions.map((edition) => (
                    <div key={edition.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={edition.cover_image_url} 
                          alt={edition.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{edition.title}</h3>
                          <p className="text-sm text-gray-600">
                            {edition.page_count} pages - Publié le {new Date(edition.publish_date).toLocaleDateString('fr-FR')}
                          </p>
                          {edition.summary && (
                            <p className="text-sm text-gray-700 mt-1">{edition.summary}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(edition.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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

export default DashboardJournal;

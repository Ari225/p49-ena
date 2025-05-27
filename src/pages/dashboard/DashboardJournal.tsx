
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Edit, Eye, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  publish_date: string;
  page_count: number;
  status: string;
}

const DashboardJournal = () => {
  const { user } = useAuth();
  const [editions, setEditions] = useState<JournalEdition[]>([]);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_editions')
        .select('*')
        .order('publish_date', { ascending: false });

      if (error) throw error;
      setEditions(data || []);
    } catch (error) {
      console.error('Error fetching journal editions:', error);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'publie':
        return 'Publié';
      case 'brouillon':
        return 'Brouillon';
      case 'archive':
        return 'Archivé';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'publie':
        return 'bg-green-100 text-green-800';
      case 'brouillon':
        return 'bg-yellow-100 text-yellow-800';
      case 'archive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion du Journal</h1>
            <p className="text-gray-600 mt-2">Gérer les éditions du journal "Perspectives"</p>
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
                <BookOpen className="mr-2 h-5 w-5" />
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
                      <div className="flex-1">
                        <h3 className="font-medium">{edition.title}</h3>
                        <p className="text-sm text-gray-600">
                          Publié le {new Date(edition.publish_date).toLocaleDateString('fr-FR')} 
                          {edition.page_count && ` - ${edition.page_count} pages`}
                        </p>
                        {edition.summary && (
                          <p className="text-sm text-gray-700 mt-1">{edition.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(edition.status)}`}>
                          {getStatusLabel(edition.status)}
                        </span>
                        {edition.status === 'publie' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
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

export default DashboardJournal;

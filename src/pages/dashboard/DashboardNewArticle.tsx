
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Save, Send } from 'lucide-react';

const DashboardNewArticle = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!user) {
    return <div>Non autorisé</div>;
  }

  const handleSaveDraft = () => {
    console.log('Sauvegarde du brouillon:', { title, content });
  };

  const handleSubmit = () => {
    console.log('Soumission de l\'article:', { title, content });
  };

  return (
    <Layout>
      <div className="flex">
        <EditorSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Nouvel Article</h1>
            <p className="text-gray-600 mt-2">Créer un nouvel article</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Rédaction d'article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titre de l'article</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Saisissez le titre de votre article"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contenu</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Rédigez votre article ici..."
                  className="w-full min-h-[400px]"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder le brouillon
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleSubmit}>
                  <Send className="mr-2 h-4 w-4" />
                  Soumettre pour révision
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardNewArticle;

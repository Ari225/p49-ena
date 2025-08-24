import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, Calendar, User, Tag, AlertCircle, X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface Suggestion {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  description: string;
  priority: string;
  created_at: string;
  status?: string;
}

const DashboardSuggestions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchSuggestions();
  }, [user, navigate]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des suggestions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les suggestions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuggestion = async (suggestionId: string) => {
    try {
      const { error } = await supabase
        .from('suggestions')
        .delete()
        .eq('id', suggestionId);

      if (error) throw error;

      setSuggestions(suggestions.filter(s => s.id !== suggestionId));
      toast({
        title: "Succès",
        description: "Suggestion supprimée avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la suggestion",
        variant: "destructive",
      });
    }
  };

  const handleValidateSuggestion = async (suggestionId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('suggestions')
        .update({ 
          status: `Attribuée à ${user.firstName} ${user.lastName}` 
        })
        .eq('id', suggestionId);

      if (error) throw error;

      setSuggestions(suggestions.map(s => 
        s.id === suggestionId 
          ? { ...s, status: `Attribuée à ${user.firstName} ${user.lastName}` }
          : s
      ));

      toast({
        title: "Succès",
        description: "Suggestion validée avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      toast({
        title: "Erreur",
        description: "Impossible de valider la suggestion",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'elevé':
      case 'élevé':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moyen':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'faible':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-teal-100 text-teal-800 border-teal-200',
    ];
    const index = category.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  // Render mobile layout
  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary whitespace-nowrap">Suggestions</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les suggestions soumises</p>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-800">Liste des suggestions ({suggestions.length})</h2>
            </div>
          </div>

          <div className="space-y-4">
            {suggestions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune suggestion</h3>
                  <p className="text-muted-foreground text-center">
                    Aucune suggestion n'a été soumise pour le moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{suggestion.subject}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getPriorityColor(suggestion.priority)}>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {suggestion.priority}
                        </Badge>
                        <Badge className={getCategoryColor(suggestion.category)}>
                          <Tag className="h-3 w-3 mr-1" />
                          {suggestion.category}
                        </Badge>
                      </div>
                      <CardDescription className="space-y-1 text-sm">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{suggestion.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(suggestion.created_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {suggestion.description}
                        </p>
                      </div>
                      
                      <div className="space-y-2 pt-3 border-t">
                        <div className="text-sm">
                          <span className="font-medium">Email:</span>{' '}
                          <a href={`mailto:${suggestion.email}`} className="text-primary hover:underline">
                            {suggestion.email}
                          </a>
                        </div>
                        {suggestion.phone && (
                          <div className="text-sm">
                            <span className="font-medium">Téléphone:</span>{' '}
                            <a href={`tel:${suggestion.phone}`} className="text-primary hover:underline">
                              {suggestion.phone}
                            </a>
                          </div>
                        )}
                       </div>
                       
                       {suggestion.status && suggestion.status !== 'en_attente' ? (
                         <div className="pt-3 border-t">
                           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                             {suggestion.status}
                           </Badge>
                         </div>
                       ) : (
                         <div className="flex gap-2 pt-3 border-t">
                           <Button
                             size="sm"
                             variant="destructive"
                             onClick={() => handleDeleteSuggestion(suggestion.id)}
                             className="h-8 w-8 p-0"
                           >
                             <X className="h-4 w-4" />
                           </Button>
                           <Button
                             size="sm"
                             variant="default"
                             onClick={() => handleValidateSuggestion(suggestion.id)}
                             className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                           >
                             <Check className="h-4 w-4" />
                           </Button>
                         </div>
                       )}
                     </div>
                   </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        <EditorSidebar />
      </Layout>
    );
  }

  // Render tablet layout  
  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Suggestions</h1>
            <p className="text-gray-600 mt-2">Gérer les suggestions soumises par les utilisateurs</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-gray-800">Liste des suggestions ({suggestions.length})</h2>
            </div>
          </div>

          <div className="space-y-6">
            {suggestions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune suggestion</h3>
                  <p className="text-muted-foreground text-center">
                    Aucune suggestion n'a été soumise pour le moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{suggestion.subject}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{suggestion.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(suggestion.created_at).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </CardDescription>
                      </div>
                       <div className="flex flex-col space-y-2">
                         <Badge className={getPriorityColor(suggestion.priority)}>
                           <AlertCircle className="h-3 w-3 mr-1" />
                           {suggestion.priority}
                         </Badge>
                         <Badge className={getCategoryColor(suggestion.category)}>
                           <Tag className="h-3 w-3 mr-1" />
                           {suggestion.category}
                         </Badge>
                       </div>
                     </div>
                     {suggestion.status && suggestion.status !== 'en_attente' ? (
                       <div className="mt-3">
                         <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                           {suggestion.status}
                         </Badge>
                       </div>
                     ) : (
                       <div className="flex gap-2 mt-3">
                         <Button
                           size="sm"
                           variant="destructive"
                           onClick={() => handleDeleteSuggestion(suggestion.id)}
                           className="h-8 w-8 p-0"
                         >
                           <X className="h-4 w-4" />
                         </Button>
                         <Button
                           size="sm"
                           variant="default"
                           onClick={() => handleValidateSuggestion(suggestion.id)}
                           className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                         >
                           <Check className="h-4 w-4" />
                         </Button>
                       </div>
                     )}
                   </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {suggestion.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 pt-4 border-t">
                        <div className="text-sm">
                          <span className="font-medium">Email:</span>{' '}
                          <a href={`mailto:${suggestion.email}`} className="text-primary hover:underline">
                            {suggestion.email}
                          </a>
                        </div>
                        {suggestion.phone && (
                          <div className="text-sm">
                            <span className="font-medium">Téléphone:</span>{' '}
                            <a href={`tel:${suggestion.phone}`} className="text-primary hover:underline">
                              {suggestion.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        <EditorSidebar />
      </Layout>
    );
  }

  // Render desktop layout
  return (
    <Layout>
      <div className="flex">
        <EditorSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Suggestions</h1>
            <p className="text-gray-600 mt-2">Gérer les suggestions soumises par les utilisateurs</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-gray-800">Liste des suggestions ({suggestions.length})</h2>
            </div>
          </div>

          <div className="space-y-6">
            {suggestions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune suggestion</h3>
                  <p className="text-muted-foreground text-center">
                    Aucune suggestion n'a été soumise pour le moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{suggestion.subject}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{suggestion.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(suggestion.created_at).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </CardDescription>
                      </div>
                       <div className="flex flex-col space-y-2">
                         <Badge className={getPriorityColor(suggestion.priority)}>
                           <AlertCircle className="h-3 w-3 mr-1" />
                           {suggestion.priority}
                         </Badge>
                         <Badge className={getCategoryColor(suggestion.category)}>
                           <Tag className="h-3 w-3 mr-1" />
                           {suggestion.category}
                         </Badge>
                       </div>
                     </div>
                     {suggestion.status && suggestion.status !== 'en_attente' ? (
                       <div className="mt-3">
                         <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                           {suggestion.status}
                         </Badge>
                       </div>
                     ) : (
                       <div className="flex gap-2 mt-3">
                         <Button
                           size="sm"
                           variant="destructive"
                           onClick={() => handleDeleteSuggestion(suggestion.id)}
                           className="h-8 w-8 p-0"
                         >
                           <X className="h-4 w-4" />
                         </Button>
                         <Button
                           size="sm"
                           variant="default"
                           onClick={() => handleValidateSuggestion(suggestion.id)}
                           className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                         >
                           <Check className="h-4 w-4" />
                         </Button>
                       </div>
                     )}
                   </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {suggestion.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 pt-4 border-t">
                        <div className="text-sm">
                          <span className="font-medium">Email:</span>{' '}
                          <a href={`mailto:${suggestion.email}`} className="text-primary hover:underline">
                            {suggestion.email}
                          </a>
                        </div>
                        {suggestion.phone && (
                          <div className="text-sm">
                            <span className="font-medium">Téléphone:</span>{' '}
                            <a href={`tel:${suggestion.phone}`} className="text-primary hover:underline">
                              {suggestion.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardSuggestions;
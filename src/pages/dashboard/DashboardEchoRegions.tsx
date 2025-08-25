import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Upload, MapPin, Users, Clock, Calendar, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useImageUpload } from '@/hooks/useImageUpload';

interface EchoRegion {
  id: string;
  image_url?: string;
  region: string;
  delegue: string;
  membres: number;
  derniere_activite?: string;
  actualites_recentes?: any;
  delegue_id: number;
  created_at: string;
  updated_at: string;
}

const DashboardEchoRegions = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const userIsAdmin = isAdmin(user);
  const { uploadImage, uploading } = useImageUpload();

  const [echoRegions, setEchoRegions] = useState<EchoRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEcho, setEditingEcho] = useState<EchoRegion | null>(null);
  const [formData, setFormData] = useState({
    image_url: '',
    membres: 0,
    derniere_activite: '',
    actualites_recentes: [] as string[]
  });
  
  const [newActualite, setNewActualite] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    initializeEchoRegions();
  }, []);

  const initializeEchoRegions = async () => {
    try {
      setLoading(true);
      
      // Synchroniser avec les délégués régionaux
      await supabase.rpc('sync_echo_regions_with_delegates');
      
      // Récupérer les données
      await fetchEchoRegions();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const fetchEchoRegions = async () => {
    try {
      const { data, error } = await supabase
        .from('echo_regions')
        .select('*')
        .order('region');

      if (error) throw error;
      setEchoRegions(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des échos des régions');
    }
  };

  const handleImageUpload = async (file: File) => {
    const imageUrl = await uploadImage(file, 'echo-regions');
    if (imageUrl) {
      setFormData({ ...formData, image_url: imageUrl });
      toast.success('Image téléchargée avec succès');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEcho) return;

    try {
      const updateData = {
        image_url: formData.image_url,
        membres: formData.membres,
        derniere_activite: formData.derniere_activite,
        actualites_recentes: JSON.stringify(formData.actualites_recentes),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('echo_regions')
        .update(updateData)
        .eq('id', editingEcho.id);

      if (error) throw error;
      
      toast.success('Informations mises à jour avec succès');
      resetForm();
      fetchEchoRegions();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (echo: EchoRegion) => {
    setEditingEcho(echo);
    
    let actualitesArray: string[] = [];
    
    // Gérer les différents types de actualites_recentes
    if (echo.actualites_recentes) {
      if (typeof echo.actualites_recentes === 'string') {
        try {
          actualitesArray = JSON.parse(echo.actualites_recentes);
        } catch {
          actualitesArray = [];
        }
      } else if (Array.isArray(echo.actualites_recentes)) {
        actualitesArray = echo.actualites_recentes;
      }
    }
    
    setFormData({
      image_url: echo.image_url || '',
      membres: echo.membres || 0,
      derniere_activite: echo.derniere_activite || '',
      actualites_recentes: actualitesArray
    });
    setShowForm(true);
  };

  const addActualite = () => {
    if (newActualite.trim()) {
      setFormData({
        ...formData,
        actualites_recentes: [...formData.actualites_recentes, newActualite.trim()]
      });
      setNewActualite('');
    }
  };

  const removeActualite = (index: number) => {
    setFormData({
      ...formData,
      actualites_recentes: formData.actualites_recentes.filter((_, i) => i !== index)
    });
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      membres: 0,
      derniere_activite: '',
      actualites_recentes: []
    });
    setEditingEcho(null);
    setShowForm(false);
    setSelectedFile(null);
    setNewActualite('');
  };

  const renderEchoCard = (echo: EchoRegion) => (
    <Card key={echo.id} className="hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video overflow-hidden rounded-t-lg bg-gray-100">
        {echo.image_url ? (
          <img 
            src={echo.image_url} 
            alt={echo.region} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Camera className="w-12 h-12" />
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-primary text-xl flex items-center justify-between">
          <span>{echo.region}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(echo)}
            className="ml-2"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Délégué:</span>
            <span className="font-medium text-primary">{echo.delegue}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Membres:
            </span>
            <Badge variant="secondary" className="font-bold">
              {echo.membres || 0}
            </Badge>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              Dernière activité:
            </div>
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
              {echo.derniere_activite || 'Aucune activité récente'}
            </p>
          </div>
          
          <div className="pt-2 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Actualités récentes:
            </h4>
            {(() => {
              let actualitesArray: string[] = [];
              
              if (echo.actualites_recentes) {
                if (typeof echo.actualites_recentes === 'string') {
                  try {
                    actualitesArray = JSON.parse(echo.actualites_recentes);
                  } catch {
                    actualitesArray = [];
                  }
                } else if (Array.isArray(echo.actualites_recentes)) {
                  actualitesArray = echo.actualites_recentes;
                }
              }
              
              return actualitesArray && actualitesArray.length > 0 ? (
                <div className="space-y-1">
                  {actualitesArray.slice(0, 3).map((actualite: string, index: number) => (
                    <div key={index} className="text-xs bg-blue-50 p-2 rounded border-l-2 border-blue-200">
                      {actualite}
                    </div>
                  ))}
                  {actualitesArray.length > 3 && (
                    <p className="text-xs text-gray-500 italic">
                      +{actualitesArray.length - 3} autres actualités
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">Aucune actualité récente</p>
              );
            })()}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des échos des régions...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Version mobile
  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Écho des régions</h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les actualités régionales</p>
          </div>

          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Information</h3>
              <p className="text-sm text-blue-700">
                Les régions se créent automatiquement basées sur les délégués régionaux. 
                Cliquez sur "Modifier" pour ajouter des informations.
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-primary flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Régions ({echoRegions.length})
            </h2>
          </div>

          <div className="space-y-4">
            {echoRegions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Aucune région trouvée</p>
                <p>Les régions apparaîtront automatiquement</p>
              </div>
            ) : (
              echoRegions.map(renderEchoCard)
            )}
          </div>
        </div>
        
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
      </Layout>
    );
  }

  // Version tablette
  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Écho des régions</h1>
            <p className="text-gray-600 mt-2">Gérer les actualités et informations régionales</p>
          </div>

          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Information</h3>
              <p className="text-sm text-blue-700">
                Les régions se créent automatiquement basées sur les délégués régionaux. 
                Utilisez le bouton "Modifier" sur chaque carte pour ajouter des informations.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Régions ({echoRegions.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {echoRegions.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Aucune région trouvée</p>
                <p>Les régions apparaîtront ici automatiquement</p>
              </div>
            ) : (
              echoRegions.map(renderEchoCard)
            )}
          </div>
        </div>
        
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
      </Layout>
    );
  }

  // Version desktop
  return (
    <Layout>
      <div className="flex">
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Écho des régions</h1>
            <p className="text-gray-600 mt-2">Gérer les actualités et informations régionales</p>
          </div>

          <div className="mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Information importante
              </h3>
              <p className="text-blue-700">
                Les régions se créent automatiquement basées sur les délégués régionaux de la table "instances_dir". 
                Chaque nouveau délégué régional ajouté générera automatiquement une nouvelle carte. 
                Utilisez le bouton "Modifier" sur chaque carte pour ajouter des informations spécifiques à la région.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-primary flex items-center">
              <MapPin className="mr-2 h-6 w-6" />
              Régions disponibles ({echoRegions.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {echoRegions.length === 0 ? (
              <div className="col-span-full text-center py-16 text-gray-500">
                <MapPin className="h-16 w-16 mx-auto mb-6 text-gray-300" />
                <p className="text-xl font-medium mb-2">Aucune région trouvée</p>
                <p>Les régions apparaîtront ici automatiquement lorsque des délégués régionaux seront ajoutés</p>
              </div>
            ) : (
              echoRegions.map(renderEchoCard)
            )}
          </div>
        </div>
      </div>

      {/* Dialog de modification */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Modifier les informations - {editingEcho?.region}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="image">Image de la région</Label>
              <div className="mt-2">
                {formData.image_url && (
                  <div className="mb-4">
                    <img 
                      src={formData.image_url} 
                      alt="Aperçu" 
                      className="w-full h-32 object-cover rounded border"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Upload...' : 'Choisir'}
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="membres">Nombre de membres</Label>
              <Input
                id="membres"
                type="number"
                min="0"
                value={formData.membres}
                onChange={(e) => setFormData({
                  ...formData,
                  membres: parseInt(e.target.value) || 0
                })}
              />
            </div>

            <div>
              <Label htmlFor="derniere_activite">Dernière activité</Label>
              <Textarea
                id="derniere_activite"
                value={formData.derniere_activite}
                onChange={(e) => setFormData({
                  ...formData,
                  derniere_activite: e.target.value
                })}
                rows={3}
                placeholder="Décrivez la dernière activité de la région..."
              />
            </div>

            <div>
              <Label>Actualités récentes</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newActualite}
                    onChange={(e) => setNewActualite(e.target.value)}
                    placeholder="Nouvelle actualité..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActualite())}
                  />
                  <Button type="button" onClick={addActualite}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.actualites_recentes.length > 0 && (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {formData.actualites_recentes.map((actualite, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="text-sm">{actualite}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeActualite(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={uploading}>
                Mettre à jour
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Annuler
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DashboardEchoRegions;
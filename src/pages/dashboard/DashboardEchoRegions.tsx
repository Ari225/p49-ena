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
import { Edit, MapPin, Calendar, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useDeleguesRegionaux } from '@/hooks/useDeleguesRegionaux';
import { compressImage, isValidImageFile, formatFileSize } from '@/utils/imageCompression';
import { useImageUploadToStorage } from '@/hooks/useImageUploadToStorage';

interface EchoRegion {
  id: string;
  region: string;
  delegue: string;
  delegue_id?: number;
  membres?: number;
  derniere_activite?: string;
  actualites_recentes?: any;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

const DashboardEchoRegions = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const userIsAdmin = isAdmin(user);
  const { delegues, loading: loadingDelegues } = useDeleguesRegionaux();
  
  const [echoRegions, setEchoRegions] = useState<EchoRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEcho, setEditingEcho] = useState<EchoRegion | null>(null);
  const [formData, setFormData] = useState({
    region: '',
    delegue: '',
    membres: 0,
    derniere_activite: '',
    actualites_recentes: [],
    image_url: '',
    nouvelle_actualite: ''
  });
  const [isCompressing, setIsCompressing] = useState(false);
  const { uploadImage, isUploading } = useImageUploadToStorage();

  useEffect(() => {
    fetchEchoRegions();
    // Synchroniser automatiquement les délégués avec echo_regions
    syncDelegatesWithEchoRegions();
  }, []);

  // Configurer les mises à jour en temps réel pour instances_dir
  useEffect(() => {
    const channel = supabase
      .channel('instances_dir_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'instances_dir',
          filter: 'Position=eq.delegues_regionaux'
        },
        () => {
          console.log('🔄 Changement détecté dans instances_dir - délégués régionaux');
          syncDelegatesWithEchoRegions();
          fetchEchoRegions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const syncDelegatesWithEchoRegions = async () => {
    try {
      console.log('🔄 Synchronisation des délégués avec echo_regions...');
      const { error } = await supabase.rpc('sync_echo_regions_with_delegates');
      
      if (error) {
        console.error('❌ Erreur lors de la synchronisation:', error);
        toast.error('Erreur lors de la synchronisation des délégués');
      } else {
        console.log('✅ Synchronisation réussie');
      }
    } catch (error) {
      console.error('❌ Erreur de synchronisation:', error);
    }
  };

  // Créer des cartes de fallback basées sur les délégués régionaux si echo_regions est vide
  const delegueCards = delegues.map(delegue => ({
    id: delegue.id.toString(),
    region: delegue.region,
    delegue: delegue.name,
    delegue_id: delegue.id,
    membres: 0,
    derniere_activite: 'Récemment',
    actualites_recentes: [],
    image_url: '/lovable-uploads/Pers49.webp',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: user?.id
  }));

  // Utiliser les données de echo_regions s'il y en a, sinon utiliser les cartes de délégués
  const displayCards = echoRegions.length > 0 ? echoRegions : delegueCards;

  const fetchEchoRegions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('echo_regions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEchoRegions(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des échos des régions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 Données du formulaire avant traitement:', formData);
    
    try {
      // Préparer les données pour la base de données
      const actualitesRecentes = [...(formData.actualites_recentes || [])];
      
      // Ajouter la nouvelle actualité si elle existe
      if (formData.nouvelle_actualite && formData.nouvelle_actualite.trim()) {
        actualitesRecentes.unshift({
          date: new Date().toLocaleDateString('fr-FR'),
          contenu: formData.nouvelle_actualite.trim()
        });
        
        // Garder seulement les 3 dernières actualités
        if (actualitesRecentes.length > 3) {
          actualitesRecentes.splice(3);
        }
      }
      
      // Préparer les données pour Supabase (exclure les champs non-DB)
      const dbData = {
        region: formData.region,
        delegue: formData.delegue,
        delegue_id: editingEcho?.delegue_id || null,
        membres: formData.membres,
        derniere_activite: formData.derniere_activite,
        actualites_recentes: actualitesRecentes,
        image_url: formData.image_url
      };
      
      console.log('💾 Données préparées pour la DB:', dbData);
      
      if (editingEcho) {
        const { error } = await supabase
          .from('echo_regions')
          .update({
            ...dbData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingEcho.id);
        
        if (error) {
          console.error('❌ Erreur mise à jour:', error);
          throw error;
        }
        console.log('✅ Mise à jour réussie');
        toast.success('Écho des régions mis à jour avec succès');
      } else {
        const { error } = await supabase
          .from('echo_regions')
          .insert([{
            ...dbData,
            created_by: user?.id
          }]);
        
        if (error) {
          console.error('❌ Erreur création:', error);
          throw error;
        }
        console.log('✅ Création réussie');
        toast.success('Écho des régions créé avec succès');
      }
      
      resetForm();
      fetchEchoRegions();
    } catch (error) {
      console.error('💥 Erreur complète:', error);
      toast.error(`Erreur lors de la sauvegarde: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  };

  const handleEdit = (echo: EchoRegion) => {
    console.log('✏️ Édition de:', echo);
    setEditingEcho(echo);
    setFormData({
      region: echo.region,
      delegue: echo.delegue,
      membres: echo.membres || 0,
      derniere_activite: echo.derniere_activite || '',
      actualites_recentes: echo.actualites_recentes || [],
      image_url: echo.image_url || '',
      nouvelle_actualite: '' // Toujours vide pour l'édition
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      region: '',
      delegue: '',
      membres: 0,
      derniere_activite: '',
      actualites_recentes: [],
      image_url: '',
      nouvelle_actualite: ''
    });
    setEditingEcho(null);
    setShowForm(false);
  };

  const renderDelegueCard = (delegue: any) => (
    <Card key={delegue.id} className="hover:shadow-xl transition-shadow duration-300 relative">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img 
          src="/lovable-uploads/Pers49.webp" 
          alt={delegue.region} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <CardHeader>
        <CardTitle className="text-primary text-xl">{delegue.region}</CardTitle>
        <Button
          size="sm"
          variant="outline"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={() => handleEdit(delegue)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Délégué:</span>
            <span className="font-medium text-primary">{delegue.delegue}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Membres:
            </span>
            <span className="font-bold text-secondary">{delegue.membres}</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              Dernière activité:
            </div>
            <p className="text-sm">{delegue.derniere_activite}</p>
          </div>
            <div className="pt-2 border-t">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Actualités récentes:</h4>
              {delegue.actualites_recentes && delegue.actualites_recentes.length > 0 ? (
                <div className="space-y-1">
                  {delegue.actualites_recentes.slice(0, 3).map((actualite: any, index: number) => (
                    <div key={index} className="text-sm text-gray-600 border-l-2 border-blue-200 pl-2">
                      <span className="text-xs text-gray-500">{actualite.date}</span>
                      <p>{actualite.contenu}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Aucune actualité récente</p>
              )}
            </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Écho des régions</h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les actualités régionales</p>
          </div>


          <div className="mb-4">
              <h2 className="text-lg font-semibold text-primary flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Liste des délégués régionaux ({displayCards.length})
              </h2>
          </div>

          {loadingDelegues ? (
            <div className="text-center py-8">Chargement...</div>
          ) : (
            <div className="space-y-4">
              {displayCards.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucun délégué régional trouvé
                </div>
              ) : (
                displayCards.map(renderDelegueCard)
              )}
            </div>
          )}
        </div>
        
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl mx-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEcho ? 'Modifier' : 'Créer'} un écho des régions
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="region">Région *</Label>
                <Input 
                  id="region" 
                  value={formData.region} 
                  onChange={e => setFormData({
                    ...formData,
                    region: e.target.value
                  })} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="delegue">Délégué *</Label>
                <Input 
                  id="delegue" 
                  value={formData.delegue} 
                  onChange={e => setFormData({
                    ...formData,
                    delegue: e.target.value
                  })} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="membres">Nombre de membres</Label>
                <Input 
                  id="membres" 
                  type="number" 
                  min="0"
                  value={formData.membres} 
                  onChange={e => setFormData({
                    ...formData,
                    membres: parseInt(e.target.value) || 0
                  })} 
                />
              </div>
              <div>
                <Label htmlFor="derniere_activite">Nouvelle activité</Label>
                <Textarea 
                  id="derniere_activite" 
                  value={formData.derniere_activite} 
                  onChange={e => setFormData({
                    ...formData,
                    derniere_activite: e.target.value
                  })} 
                  rows={3} 
                  placeholder="Décrivez la nouvelle activité..."
                />
              </div>
              <div>
                <Label htmlFor="nouvelle_actualite">Nouvelle actualité</Label>
                <Textarea 
                  id="nouvelle_actualite" 
                  value={formData.nouvelle_actualite || ''} 
                  onChange={e => setFormData({
                    ...formData,
                    nouvelle_actualite: e.target.value
                  })} 
                  rows={2} 
                  placeholder="Ajoutez une nouvelle actualité..."
                />
              </div>
              <div>
                <Label htmlFor="image_file">Image</Label>
                <Input 
                  id="image_file" 
                  type="file" 
                  accept="image/*"
                  disabled={isUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const imageUrl = await uploadImage(file, {
                      bucket: 'echo-regions',
                      folder: 'delegues',
                      maxWidth: 800,
                      maxHeight: 600,
                      quality: 0.8
                    });

                    if (imageUrl) {
                      setFormData({
                        ...formData,
                        image_url: imageUrl
                      });
                    }
                  }}
                />
                {isUploading && (
                  <div className="mt-2 text-sm text-blue-600 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Upload en cours...
                  </div>
                )}
                {formData.image_url && !isUploading && (
                  <div className="mt-2">
                    <img 
                      src={formData.image_url} 
                      alt="Aperçu" 
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <p className="text-xs text-gray-500 mt-1">Image uploadée et optimisée</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingEcho ? 'Mettre à jour' : 'Créer'}
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
  }

  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Écho des régions</h1>
            <p className="text-gray-600 mt-2">Gérer les actualités et informations régionales</p>
          </div>


          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Liste des délégués régionaux ({displayCards.length})
            </h2>
          </div>

          {loadingDelegues ? (
            <div className="text-center py-12">
              <div className="text-gray-500">Chargement des délégués régionaux...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayCards.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Aucun délégué régional</p>
                  <p>Les délégués régionaux apparaîtront ici automatiquement</p>
                </div>
              ) : (
                displayCards.map(renderDelegueCard)
              )}
            </div>
          )}
        </div>
        
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEcho ? 'Modifier' : 'Créer'} un écho des régions
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="region">Région *</Label>
                <Input 
                  id="region" 
                  value={formData.region} 
                  onChange={e => setFormData({
                    ...formData,
                    region: e.target.value
                  })} 
                  required 
                  placeholder="Nom de la région"
                />
              </div>
              <div>
                <Label htmlFor="delegue">Délégué *</Label>
                <Input 
                  id="delegue" 
                  value={formData.delegue} 
                  onChange={e => setFormData({
                    ...formData,
                    delegue: e.target.value
                  })} 
                  required 
                  placeholder="Nom du délégué régional"
                />
              </div>
              <div>
                <Label htmlFor="membres">Nombre de membres</Label>
                <Input 
                  id="membres" 
                  type="number" 
                  min="0"
                  value={formData.membres} 
                  onChange={e => setFormData({
                    ...formData,
                    membres: parseInt(e.target.value) || 0
                  })} 
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="derniere_activite">Nouvelle activité</Label>
                <Textarea 
                  id="derniere_activite" 
                  value={formData.derniere_activite} 
                  onChange={e => setFormData({
                    ...formData,
                    derniere_activite: e.target.value
                  })} 
                  rows={3} 
                  placeholder="Décrivez la nouvelle activité..."
                />
              </div>
              <div>
                <Label htmlFor="nouvelle_actualite">Nouvelle actualité</Label>
                <Textarea 
                  id="nouvelle_actualite" 
                  value={formData.nouvelle_actualite || ''} 
                  onChange={e => setFormData({
                    ...formData,
                    nouvelle_actualite: e.target.value
                  })} 
                  rows={2} 
                  placeholder="Ajoutez une nouvelle actualité..."
                />
              </div>
            <div>
              <Label htmlFor="image_file">Image</Label>
              <Input 
                id="image_file" 
                type="file" 
                accept="image/*"
                disabled={isUploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const imageUrl = await uploadImage(file, {
                    bucket: 'echo-regions',
                    folder: 'delegues',
                    maxWidth: 800,
                    maxHeight: 600,
                    quality: 0.8
                  });

                  if (imageUrl) {
                    setFormData({
                      ...formData,
                      image_url: imageUrl
                    });
                  }
                }}
              />
              {isUploading && (
                <div className="mt-2 text-sm text-blue-600 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Upload en cours...
                </div>
              )}
              {formData.image_url && !isUploading && (
                <div className="mt-2">
                  <img 
                    src={formData.image_url} 
                    alt="Aperçu" 
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <p className="text-xs text-gray-500 mt-1">Image uploadée et optimisée</p>
                </div>
              )}
            </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingEcho ? 'Mettre à jour' : 'Créer'}
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

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Liste des délégués régionaux ({displayCards.length})
            </h2>
          </div>

          {loadingDelegues ? (
            <div className="text-center py-12">
              <div className="text-gray-500">Chargement des délégués régionaux...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCards.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Aucun délégué régional</p>
                  <p>Les délégués régionaux apparaîtront ici automatiquement</p>
                </div>
              ) : (
                displayCards.map(renderDelegueCard)
              )}
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEcho ? 'Modifier' : 'Créer'} un écho des régions
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="region">Région *</Label>
              <Input 
                id="region" 
                value={formData.region} 
                onChange={e => setFormData({
                  ...formData,
                  region: e.target.value
                })} 
                required 
                placeholder="Nom de la région"
              />
            </div>
            <div>
              <Label htmlFor="delegue">Délégué *</Label>
              <Input 
                id="delegue" 
                value={formData.delegue} 
                onChange={e => setFormData({
                  ...formData,
                  delegue: e.target.value
                })} 
                required 
                placeholder="Nom du délégué régional"
              />
            </div>
            <div>
              <Label htmlFor="membres">Nombre de membres</Label>
              <Input 
                id="membres" 
                type="number" 
                min="0"
                value={formData.membres} 
                onChange={e => setFormData({
                  ...formData,
                  membres: parseInt(e.target.value) || 0
                })} 
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="derniere_activite">Nouvelle activité</Label>
              <Textarea 
                id="derniere_activite" 
                value={formData.derniere_activite} 
                onChange={e => setFormData({
                  ...formData,
                  derniere_activite: e.target.value
                })} 
                rows={3} 
                placeholder="Décrivez la nouvelle activité..."
              />
            </div>
            <div>
              <Label htmlFor="nouvelle_actualite">Nouvelle actualité</Label>
              <Textarea 
                id="nouvelle_actualite" 
                value={formData.nouvelle_actualite || ''} 
                onChange={e => setFormData({
                  ...formData,
                  nouvelle_actualite: e.target.value
                })} 
                rows={2} 
                placeholder="Ajoutez une nouvelle actualité..."
              />
            </div>
            <div>
              <Label htmlFor="image_file">Image</Label>
              <Input 
                id="image_file" 
                type="file" 
                accept="image/*"
                disabled={isUploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const imageUrl = await uploadImage(file, {
                    bucket: 'echo-regions',
                    folder: 'delegues',
                    maxWidth: 800,
                    maxHeight: 600,
                    quality: 0.8
                  });

                  if (imageUrl) {
                    setFormData({
                      ...formData,
                      image_url: imageUrl
                    });
                  }
                }}
              />
              {isUploading && (
                <div className="mt-2 text-sm text-blue-600 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Upload en cours...
                </div>
              )}
              {formData.image_url && !isUploading && (
                <div className="mt-2">
                  <img 
                    src={formData.image_url} 
                    alt="Aperçu" 
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <p className="text-xs text-gray-500 mt-1">Image uploadée et optimisée</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingEcho ? 'Mettre à jour' : 'Créer'}
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
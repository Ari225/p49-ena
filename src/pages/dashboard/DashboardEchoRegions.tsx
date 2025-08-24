import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, MapPin, Calendar, Eye, Users, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EchoRegion {
  id: string;
  image?: string;
  region: string;
  delegue?: string;
  members_count?: number;
  last_activity?: string;
  recent_news?: Array<{title: string; date: string}>;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

const DashboardEchoRegions = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const userIsAdmin = isAdmin(user);
  
  const [echoRegions, setEchoRegions] = useState<EchoRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);
  const [editingEcho, setEditingEcho] = useState<EchoRegion | null>(null);
  
  const [formData, setFormData] = useState({
    image: '',
    region: '',
    delegue: '',
    members_count: 0,
    last_activity: '',
    recent_news: [] as Array<{title: string; date: string}>
  });

  const [activityData, setActivityData] = useState({
    activity_title: '',
    activity_date: new Date().toISOString().split('T')[0],
    news_title: '',
    news_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchEchoRegions();
  }, []);

  const fetchEchoRegions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('echo_regions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Parse recent_news JSON
      const processedData = (data || []).map(item => ({
        ...item,
        recent_news: typeof item.recent_news === 'string' 
          ? JSON.parse(item.recent_news) 
          : item.recent_news || []
      }));
      
      setEchoRegions(processedData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des échos des régions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEcho) {
        const { error } = await supabase
          .from('echo_regions')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingEcho.id);
        
        if (error) throw error;
        toast.success('Écho des régions mis à jour avec succès');
      } else {
        const { error } = await supabase
          .from('echo_regions')
          .insert([{
            ...formData,
            created_by: user?.id
          }]);
        
        if (error) throw error;
        toast.success('Écho des régions créé avec succès');
      }
      resetForm();
      fetchEchoRegions();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEcho) return;
    
    try {
      const { error } = await supabase
        .from('echo_regions')
        .update({
          image: formData.image,
          region: formData.region,
          delegue: formData.delegue,
          members_count: formData.members_count,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingEcho.id);
      
      if (error) throw error;
      toast.success('Informations mises à jour avec succès');
      setShowUpdateForm(false);
      setEditingEcho(null);
      fetchEchoRegions();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEcho) return;
    
    try {
      const newRecentNews = [
        { title: activityData.news_title, date: activityData.news_date },
        ...(editingEcho.recent_news || []).slice(0, 4) // Garder seulement les 4 dernières
      ];
      
      const { error } = await supabase
        .from('echo_regions')
        .update({
          last_activity: `${activityData.activity_title} - ${activityData.activity_date}`,
          recent_news: newRecentNews,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingEcho.id);
      
      if (error) throw error;
      toast.success('Activité ajoutée avec succès');
      setShowAddActivityForm(false);
      setEditingEcho(null);
      setActivityData({
        activity_title: '',
        activity_date: new Date().toISOString().split('T')[0],
        news_title: '',
        news_date: new Date().toISOString().split('T')[0]
      });
      fetchEchoRegions();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'ajout de l\'activité');
    }
  };

  const handleEdit = (echo: EchoRegion) => {
    setEditingEcho(echo);
    setFormData({
      image: echo.image || '',
      region: echo.region,
      delegue: echo.delegue || '',
      members_count: echo.members_count || 0,
      last_activity: echo.last_activity || '',
      recent_news: echo.recent_news || []
    });
    setShowForm(true);
  };

  const handleUpdate = (echo: EchoRegion) => {
    setEditingEcho(echo);
    setFormData({
      image: echo.image || '',
      region: echo.region,
      delegue: echo.delegue || '',
      members_count: echo.members_count || 0,
      last_activity: echo.last_activity || '',
      recent_news: echo.recent_news || []
    });
    setShowUpdateForm(true);
  };

  const handleAddActivityClick = (echo: EchoRegion) => {
    setEditingEcho(echo);
    setShowAddActivityForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet écho des régions ?')) {
      return;
    }
    try {
      const { error } = await supabase.from('echo_regions').delete().eq('id', id);
      if (error) throw error;
      toast.success('Écho des régions supprimé avec succès');
      fetchEchoRegions();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setFormData({
      image: '',
      region: '',
      delegue: '',
      members_count: 0,
      last_activity: '',
      recent_news: []
    });
    setEditingEcho(null);
    setShowForm(false);
    setShowUpdateForm(false);
  };

  const renderRegionCard = (region: EchoRegion) => (
    <Card key={region.id} className="hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img 
          src={region.image || '/lovable-uploads/Pers49.webp'} 
          alt={region.region} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <CardHeader>
        <CardTitle className="text-primary text-xl">{region.region}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Délégué:</span>
            <span className="font-medium text-primary">{region.delegue || 'Non assigné'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Membres:
            </span>
            <span className="font-bold text-secondary">{region.members_count || 0}</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              Dernière activité:
            </div>
            <p className="text-sm font-medium text-primary">
              {region.last_activity || 'Aucune activité récente'}
            </p>
          </div>
          <div className="pt-2 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Actualités récentes:</h4>
            <ul className="space-y-1">
              {region.recent_news && region.recent_news.length > 0 ? (
                region.recent_news.slice(0, 3).map((news, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {news.title} - {news.date}
                  </li>
                ))
              ) : (
                <li className="text-xs text-gray-600 flex items-start">
                  <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Aucune actualité récente
                </li>
              )}
            </ul>
          </div>
          
          {/* Boutons d'action */}
          <div className="pt-3 border-t space-y-2">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleAddActivityClick(region)}
                className="flex-1"
              >
                <Plus className="w-3 h-3 mr-1" />
                Ajouter
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleUpdate(region)}
                className="flex-1"
              >
                <Edit className="w-3 h-3 mr-1" />
                Mettre à jour
              </Button>
            </div>
            {userIsAdmin && (
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={() => handleDelete(region.id)}
                className="w-full"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Supprimer
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => (
    <>
      <div className="mb-6">
        <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle région
        </Button>
      </div>

      <div className="mb-6">
        <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-primary flex items-center`}>
          <MapPin className="mr-2 h-5 w-5" />
          Échos des régions ({echoRegions.length})
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500">Chargement des échos des régions...</div>
        </div>
      ) : (
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {echoRegions.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Aucun écho des régions</p>
              <p>Ajoutez une nouvelle région pour commencer</p>
            </div>
          ) : (
            echoRegions.map(renderRegionCard)
          )}
        </div>
      )}

      {/* Dialog pour créer/éditer une région */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className={`${isMobile ? 'max-w-[90vw]' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle>
              {editingEcho ? 'Modifier' : 'Créer'} une région
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="region">Région *</Label>
              <Input 
                id="region" 
                value={formData.region} 
                onChange={e => setFormData({ ...formData, region: e.target.value })} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="delegue">Délégué régional</Label>
              <Input 
                id="delegue" 
                value={formData.delegue} 
                onChange={e => setFormData({ ...formData, delegue: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="members_count">Nombre de membres</Label>
              <Input 
                id="members_count" 
                type="number" 
                value={formData.members_count} 
                onChange={e => setFormData({ ...formData, members_count: parseInt(e.target.value) || 0 })} 
              />
            </div>
            <div>
              <Label htmlFor="image">URL de l'image</Label>
              <Input 
                id="image" 
                type="url" 
                value={formData.image} 
                onChange={e => setFormData({ ...formData, image: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="last_activity">Dernière activité</Label>
              <Input 
                id="last_activity" 
                value={formData.last_activity} 
                onChange={e => setFormData({ ...formData, last_activity: e.target.value })} 
              />
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

      {/* Dialog pour mettre à jour les infos de base */}
      <Dialog open={showUpdateForm} onOpenChange={setShowUpdateForm}>
        <DialogContent className={`${isMobile ? 'max-w-[90vw]' : 'max-w-md'} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle>Mettre à jour les informations</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <Label htmlFor="update_image">URL de l'image</Label>
              <Input 
                id="update_image" 
                type="url" 
                value={formData.image} 
                onChange={e => setFormData({ ...formData, image: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="update_region">Région</Label>
              <Input 
                id="update_region" 
                value={formData.region} 
                onChange={e => setFormData({ ...formData, region: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="update_delegue">Délégué</Label>
              <Input 
                id="update_delegue" 
                value={formData.delegue} 
                onChange={e => setFormData({ ...formData, delegue: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="update_members_count">Nombre de membres</Label>
              <Input 
                id="update_members_count" 
                type="number" 
                value={formData.members_count} 
                onChange={e => setFormData({ ...formData, members_count: parseInt(e.target.value) || 0 })} 
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Mettre à jour</Button>
              <Button type="button" variant="outline" onClick={() => setShowUpdateForm(false)}>
                Annuler
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog pour ajouter une activité */}
      <Dialog open={showAddActivityForm} onOpenChange={setShowAddActivityForm}>
        <DialogContent className={`${isMobile ? 'max-w-[90vw]' : 'max-w-md'} max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle>Ajouter une activité</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddActivity} className="space-y-4">
            <div>
              <Label htmlFor="activity_title">Titre de l'activité *</Label>
              <Input 
                id="activity_title" 
                value={activityData.activity_title} 
                onChange={e => setActivityData({ ...activityData, activity_title: e.target.value })} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="activity_date">Date de l'activité *</Label>
              <Input 
                id="activity_date" 
                type="date" 
                value={activityData.activity_date} 
                onChange={e => setActivityData({ ...activityData, activity_date: e.target.value })} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="news_title">Titre de l'actualité *</Label>
              <Input 
                id="news_title" 
                value={activityData.news_title} 
                onChange={e => setActivityData({ ...activityData, news_title: e.target.value })} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="news_date">Date de l'actualité *</Label>
              <Input 
                id="news_date" 
                type="date" 
                value={activityData.news_date} 
                onChange={e => setActivityData({ ...activityData, news_date: e.target.value })} 
                required 
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Ajouter</Button>
              <Button type="button" variant="outline" onClick={() => setShowAddActivityForm(false)}>
                Annuler
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Écho des régions</h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les actualités régionales</p>
          </div>
          {renderContent()}
        </div>
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
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
          {renderContent()}
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
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardEchoRegions;
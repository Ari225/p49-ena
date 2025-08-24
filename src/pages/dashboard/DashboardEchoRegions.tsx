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
import { Plus, Edit, Trash2, MapPin, Calendar, Eye, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useDeleguesRegionaux } from '@/hooks/useDeleguesRegionaux';
interface EchoRegion {
  id: string;
  title: string;
  summary?: string;
  details?: string;
  image_url?: string;
  published_date: string;
  published_by?: string;
  created_at: string;
  is_visible: boolean;
  reading_time?: number;
  region?: string;
}
const DashboardEchoRegions = () => {
  const {
    user
  } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const userIsAdmin = isAdmin(user);
  const { delegues, loading: loadingDelegues } = useDeleguesRegionaux();
  const [echoRegions, setEchoRegions] = useState<EchoRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEcho, setEditingEcho] = useState<EchoRegion | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    details: '',
    image_url: '',
    published_date: new Date().toISOString().split('T')[0],
    published_by: '',
    region: '',
    is_visible: true,
    reading_time: 5
  });
  useEffect(() => {
    fetchEchoRegions();
  }, []);

  // Créer des cartes basées sur les délégués régionaux
  const delegueCards = delegues.map((delegue) => ({
    id: delegue.id.toString(),
    title: delegue.region, // Utiliser la région comme titre
    summary: `Délégué régional - ${delegue.name}`,
    details: `Informations sur ${delegue.region} représentée par ${delegue.name}`,
    image_url: '/lovable-uploads/Pers49.webp', // Image par défaut
    published_date: new Date().toISOString().split('T')[0],
    published_by: delegue.name,
    created_at: new Date().toISOString(),
    is_visible: true,
    reading_time: 5,
    region: delegue.region // Utiliser la vraie région
  }));
  const fetchEchoRegions = async () => {
    try {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from('echo_regions').select('*').order('published_date', {
        ascending: false
      });
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
    try {
      if (editingEcho) {
        const {
          error
        } = await supabase.from('echo_regions').update({
          ...formData,
          updated_at: new Date().toISOString()
        }).eq('id', editingEcho.id);
        if (error) throw error;
        toast.success('Écho des régions mis à jour avec succès');
      } else {
        const {
          error
        } = await supabase.from('echo_regions').insert([{
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
  const handleEdit = (echo: EchoRegion) => {
    setEditingEcho(echo);
    setFormData({
      title: echo.title,
      summary: echo.summary || '',
      details: echo.details || '',
      image_url: echo.image_url || '',
      published_date: echo.published_date,
      published_by: echo.published_by || '',
      region: echo.region || '',
      is_visible: echo.is_visible,
      reading_time: echo.reading_time || 5
    });
    setShowForm(true);
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet écho des régions ?')) {
      return;
    }
    try {
      const {
        error
      } = await supabase.from('echo_regions').delete().eq('id', id);
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
      title: '',
      summary: '',
      details: '',
      image_url: '',
      published_date: new Date().toISOString().split('T')[0],
      published_by: '',
      region: '',
      is_visible: true,
      reading_time: 5
    });
    setEditingEcho(null);
    setShowForm(false);
  };
  const renderDelegueCard = (delegue: any) => <Card key={delegue.id} className="hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img src="/lovable-uploads/Pers49.webp" alt={delegue.region} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <CardHeader>
        <CardTitle className="text-primary text-xl">{delegue.region}</CardTitle>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {delegue.published_by}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Représentant:</span>
            <span className="font-medium text-primary">{delegue.published_by}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Région:
            </span>
            <span className="font-bold text-secondary">{delegue.region}</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              Informations:
            </div>
            <p className="text-sm font-medium text-primary">{delegue.summary}</p>
          </div>
          <div className="pt-2 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Détails:</h4>
            <ul className="space-y-1">
              <li className="text-xs text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Délégué: {delegue.published_by}
              </li>
              <li className="text-xs text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Zone: {delegue.region}
              </li>
              <li className="text-xs text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Statut: Actif
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>;
  if (isMobile) {
    return <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Écho des régions</h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les actualités régionales</p>
          </div>

          <div className="mb-6">
            <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 w-full">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel écho des régions
            </Button>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-primary flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Liste des délégués régionaux ({delegues.length})
            </h2>
          </div>

          {loadingDelegues ? <div className="text-center py-8">Chargement...</div> : <div className="space-y-4">
              {delegues.length === 0 ? <div className="text-center py-8 text-gray-500">
                  Aucun délégué régional trouvé
                </div> : delegueCards.map(renderDelegueCard)}
            </div>}
        </div>
        
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEcho ? 'Modifier' : 'Créer'} un écho des régions
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({
                ...formData,
                title: e.target.value
              })} required />
              </div>
              <div>
                <Label htmlFor="summary">Résumé</Label>
                <Textarea id="summary" value={formData.summary} onChange={e => setFormData({
                ...formData,
                summary: e.target.value
              })} rows={3} />
              </div>
              <div>
                <Label htmlFor="details">Contenu détaillé</Label>
                <Textarea id="details" value={formData.details} onChange={e => setFormData({
                ...formData,
                details: e.target.value
              })} rows={5} />
              </div>
              <div>
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input id="image_url" type="url" value={formData.image_url} onChange={e => setFormData({
                ...formData,
                image_url: e.target.value
              })} />
              </div>
              <div>
                <Label htmlFor="published_date">Date de publication</Label>
                <Input id="published_date" type="date" value={formData.published_date} onChange={e => setFormData({
                ...formData,
                published_date: e.target.value
              })} />
              </div>
              <div>
                <Label htmlFor="published_by">Publié par (région/auteur)</Label>
                <Input id="published_by" value={formData.published_by} onChange={e => setFormData({
                ...formData,
                published_by: e.target.value
              })} />
              </div>
              <div>
                <Label htmlFor="region">Région *</Label>
                <Input id="region" value={formData.region} onChange={e => setFormData({
                ...formData,
                region: e.target.value
              })} required />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="is_visible" checked={formData.is_visible} onChange={e => setFormData({
                ...formData,
                is_visible: e.target.checked
              })} />
                <Label htmlFor="is_visible">Visible sur le site</Label>
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
      </Layout>;
  }
  if (isTablet) {
    return <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Écho des régions</h1>
            <p className="text-gray-600 mt-2">Gérer les actualités et informations régionales</p>
          </div>

          <div className="mb-6">
            <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel écho des régions
            </Button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Liste des délégués régionaux ({delegues.length})
            </h2>
          </div>

          {loadingDelegues ? <div className="text-center py-12">
              <div className="text-gray-500">Chargement des délégués régionaux...</div>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {delegues.length === 0 ? <div className="col-span-full text-center py-12 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Aucun délégué régional</p>
                  <p>Les délégués régionaux apparaîtront ici automatiquement</p>
                </div> : delegueCards.map(renderDelegueCard)}
            </div>}
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
                <Label htmlFor="title">Titre *</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({
                ...formData,
                title: e.target.value
              })} required />
              </div>
              <div>
                <Label htmlFor="summary">Résumé</Label>
                <Textarea id="summary" value={formData.summary} onChange={e => setFormData({
                ...formData,
                summary: e.target.value
              })} rows={3} placeholder="Un bref résumé de l'actualité régionale..." />
              </div>
              <div>
                <Label htmlFor="details">Contenu détaillé</Label>
                <Textarea id="details" value={formData.details} onChange={e => setFormData({
                ...formData,
                details: e.target.value
              })} rows={6} placeholder="Le contenu complet de l'écho des régions..." />
              </div>
              <div>
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input id="image_url" type="url" value={formData.image_url} onChange={e => setFormData({
                ...formData,
                image_url: e.target.value
              })} placeholder="https://exemple.com/image.jpg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="published_date">Date de publication</Label>
                  <Input id="published_date" type="date" value={formData.published_date} onChange={e => setFormData({
                  ...formData,
                  published_date: e.target.value
                })} />
                </div>
                <div>
                  <Label htmlFor="reading_time">Temps de lecture (min)</Label>
                  <Input id="reading_time" type="number" min="1" value={formData.reading_time} onChange={e => setFormData({
                  ...formData,
                  reading_time: parseInt(e.target.value)
                })} />
                </div>
              </div>
              <div>
                <Label htmlFor="published_by">Publié par (région/auteur)</Label>
                <Input id="published_by" value={formData.published_by} onChange={e => setFormData({
                ...formData,
                published_by: e.target.value
              })} placeholder="Nom de la région ou de l'auteur" />
              </div>
              <div>
                <Label htmlFor="region">Région *</Label>
                <Input id="region" value={formData.region} onChange={e => setFormData({
                ...formData,
                region: e.target.value
              })} required placeholder="Nom de la région" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="is_visible" checked={formData.is_visible} onChange={e => setFormData({
                ...formData,
                is_visible: e.target.checked
              })} />
                <Label htmlFor="is_visible">Visible sur le site</Label>
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
      </Layout>;
  }

  // Version desktop
  return <Layout>
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
              Liste des délégués régionaux ({delegues.length})
            </h2>
          </div>

          {loadingDelegues ? <div className="text-center py-12">
              <div className="text-gray-500">Chargement des délégués régionaux...</div>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {delegues.length === 0 ? <div className="col-span-full text-center py-12 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Aucun délégué régional</p>
                  <p>Les délégués régionaux apparaîtront ici automatiquement</p>
                </div> : delegueCards.map(renderDelegueCard)}
            </div>}
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
              <Label htmlFor="title">Titre *</Label>
              <Input id="title" value={formData.title} onChange={e => setFormData({
              ...formData,
              title: e.target.value
            })} required />
            </div>
            <div>
              <Label htmlFor="summary">Résumé</Label>
              <Textarea id="summary" value={formData.summary} onChange={e => setFormData({
              ...formData,
              summary: e.target.value
            })} rows={3} placeholder="Un bref résumé de l'actualité régionale..." />
            </div>
            <div>
              <Label htmlFor="details">Contenu détaillé</Label>
              <Textarea id="details" value={formData.details} onChange={e => setFormData({
              ...formData,
              details: e.target.value
            })} rows={6} placeholder="Le contenu complet de l'écho des régions..." />
            </div>
            <div>
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input id="image_url" type="url" value={formData.image_url} onChange={e => setFormData({
              ...formData,
              image_url: e.target.value
            })} placeholder="https://exemple.com/image.jpg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="published_date">Date de publication</Label>
                <Input id="published_date" type="date" value={formData.published_date} onChange={e => setFormData({
                ...formData,
                published_date: e.target.value
              })} />
              </div>
              <div>
                <Label htmlFor="reading_time">Temps de lecture (min)</Label>
                <Input id="reading_time" type="number" min="1" value={formData.reading_time} onChange={e => setFormData({
                ...formData,
                reading_time: parseInt(e.target.value)
              })} />
              </div>
            </div>
            <div>
              <Label htmlFor="published_by">Publié par (région/auteur)</Label>
              <Input id="published_by" value={formData.published_by} onChange={e => setFormData({
              ...formData,
              published_by: e.target.value
            })} placeholder="Nom de la région ou de l'auteur" />
            </div>
            <div>
              <Label htmlFor="region">Région *</Label>
              <Input id="region" value={formData.region} onChange={e => setFormData({
              ...formData,
              region: e.target.value
            })} required placeholder="Nom de la région" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="is_visible" checked={formData.is_visible} onChange={e => setFormData({
              ...formData,
              is_visible: e.target.checked
            })} />
              <Label htmlFor="is_visible">Visible sur le site</Label>
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
    </Layout>;
};
export default DashboardEchoRegions;
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Briefcase, Plus, Edit, Trash2, MapPin, Calendar } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useCareerAnnouncements, CareerAnnouncement, CareerAnnouncementFormData } from '@/hooks/useCareerAnnouncements';

const EditorCarrieres = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { announcements, loading, createAnnouncement, updateAnnouncement, deleteAnnouncement } = useCareerAnnouncements();
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<CareerAnnouncement | null>(null);
  const [formData, setFormData] = useState<CareerAnnouncementFormData>({
    title: '',
    category: '',
    description: '',
    // Formation fields
    niveau: '',
    date_debut: '',
    duree_formation: '',
    type_formation: '',
    lieu: '',
    // Renforcement des capacités fields
    points_renforcement: [''],
    // Coaching & mentorat fields
    duree_coaching: '',
    format: '',
    // Concours fields
    date_ouverture: '',
    date_limite: '',
    nombre_places: '',
    lien_concours: ''
  });

  useEffect(() => {
    console.log('EditorCarrieres - useEffect called, user:', user);
    if (!user) {
      console.log('EditorCarrieres - No user, navigating to login');
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  console.log('EditorCarrieres - Component rendering, user:', user, 'loading:', loading, 'isMobile:', isMobile, 'isTablet:', isTablet);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle annonce:', formData);
    
    const success = editingAnnouncement 
      ? await updateAnnouncement(editingAnnouncement.id, formData)
      : await createAnnouncement(formData);
    
    if (success) {
      setShowForm(false);
      resetForm();
      setEditingAnnouncement(null);
    }
  };

  const handleEdit = (announcement: CareerAnnouncement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      category: announcement.category,
      description: announcement.description,
      niveau: announcement.niveau || '',
      date_debut: announcement.date_debut || '',
      duree_formation: announcement.duree_formation || '',
      type_formation: announcement.type_formation || '',
      lieu: announcement.lieu || '',
      points_renforcement: announcement.points_renforcement || [''],
      duree_coaching: announcement.duree_coaching || '',
      format: announcement.format || '',
      date_ouverture: announcement.date_ouverture || '',
      date_limite: announcement.date_limite || '',
      nombre_places: announcement.nombre_places || '',
      lien_concours: announcement.lien_concours || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      await deleteAnnouncement(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      niveau: '',
      date_debut: '',
      duree_formation: '',
      type_formation: '',
      lieu: '',
      points_renforcement: [''],
      duree_coaching: '',
      format: '',
      date_ouverture: '',
      date_limite: '',
      nombre_places: '',
      lien_concours: ''
    });
  };

  const addPoint = () => {
    setFormData({
      ...formData,
      points_renforcement: [...formData.points_renforcement, '']
    });
  };

  const removePoint = (index: number) => {
    const newPoints = formData.points_renforcement.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      points_renforcement: newPoints.length > 0 ? newPoints : ['']
    });
  };

  const updatePoint = (index: number, value: string) => {
    const newPoints = [...formData.points_renforcement];
    newPoints[index] = value;
    setFormData({
      ...formData,
      points_renforcement: newPoints
    });
  };

  const renderCategoryFields = () => {
    switch (formData.category) {
      case 'Formations':
        return (
          <>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.niveau}
              onChange={(e) => setFormData({...formData, niveau: e.target.value})}
              required
            >
              <option value="">Niveau</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
              <option value="Expert">Expert</option>
              <option value="Tous les niveaux">Tous les niveaux</option>
            </select>
            <Input
              type="date"
              placeholder="Date de début"
              value={formData.date_debut}
              onChange={(e) => setFormData({...formData, date_debut: e.target.value})}
              required
            />
            <Input
              placeholder="Durée de formation (nombre de jours)"
              value={formData.duree_formation}
              onChange={(e) => setFormData({...formData, duree_formation: e.target.value})}
              required
            />
            <select
              className="w-full p-2 border rounded-md"
              value={formData.type_formation}
              onChange={(e) => setFormData({...formData, type_formation: e.target.value})}
              required
            >
              <option value="">Type</option>
              <option value="en ligne">En ligne</option>
              <option value="en présentiel">En présentiel</option>
            </select>
            {formData.type_formation === 'en présentiel' && (
              <Input
                placeholder="Lieu"
                value={formData.lieu}
                onChange={(e) => setFormData({...formData, lieu: e.target.value})}
                required
              />
            )}
          </>
        );
      case 'Renforcement des capacités':
        return (
          <div className={isMobile ? "" : "md:col-span-2"}>
            <label className="text-sm font-medium mb-2 block">Points de renforcement</label>
            {formData.points_renforcement.map((point, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder={`Point ${index + 1}`}
                  value={point}
                  onChange={(e) => updatePoint(index, e.target.value)}
                  required
                />
                {formData.points_renforcement.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePoint(index)}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPoint}
              className="mt-2"
            >
              + Ajouter un point
            </Button>
          </div>
        );
      case 'Coaching & mentorat':
        return (
          <>
            <Input
              placeholder="Durée (ex: 3 mois, 2 semaines)"
              value={formData.duree_coaching}
              onChange={(e) => setFormData({...formData, duree_coaching: e.target.value})}
              required
            />
            <Input
              placeholder="Format"
              value={formData.format}
              onChange={(e) => setFormData({...formData, format: e.target.value})}
              required
            />
          </>
        );
      case 'Concours':
        return (
          <>
            <Input
              type="date"
              placeholder="Date d'ouverture"
              value={formData.date_ouverture}
              onChange={(e) => setFormData({...formData, date_ouverture: e.target.value})}
              required
            />
            <Input
              type="date"
              placeholder="Date limite"
              value={formData.date_limite}
              onChange={(e) => setFormData({...formData, date_limite: e.target.value})}
              required
            />
            <Input
              placeholder="Lieu"
              value={formData.lieu}
              onChange={(e) => setFormData({...formData, lieu: e.target.value})}
              required
            />
            <Input
              placeholder="Nombre de places disponibles"
              value={formData.nombre_places}
              onChange={(e) => setFormData({...formData, nombre_places: e.target.value})}
              required
            />
            <div className={isMobile ? "" : "md:col-span-2"}>
              <Input
                placeholder="Lien du concours"
                value={formData.lien_concours}
                onChange={(e) => setFormData({...formData, lien_concours: e.target.value})}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderAnnouncementCard = (announcement: CareerAnnouncement) => (
    <Card key={announcement.id}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          {announcement.title}
        </CardTitle>
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">{announcement.category}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(announcement.published_date).toLocaleDateString('fr-FR')}
          </div>
          {announcement.lieu && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {announcement.lieu}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2">{announcement.description}</p>
        {announcement.niveau && <p className="text-sm"><strong>Niveau:</strong> {announcement.niveau}</p>}
        {announcement.duree_formation && <p className="text-sm"><strong>Durée:</strong> {announcement.duree_formation} jours</p>}
        {announcement.duree_coaching && <p className="text-sm"><strong>Durée:</strong> {announcement.duree_coaching}</p>}
        {announcement.nombre_places && <p className="text-sm"><strong>Places:</strong> {announcement.nombre_places}</p>}
        <div className="flex space-x-2 mt-4">
          <Button size="sm" variant="outline" onClick={() => handleEdit(announcement)}>
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
          <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDelete(announcement.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Render mobile layout
  if (isMobile) {
    console.log('EditorCarrieres - Rendering mobile layout, loading:', loading);
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary whitespace-nowrap">Gestion carrières+</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les annonces</p>
          </div>

          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle annonce
            </Button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div>Chargement...</div>
            ) : (
              announcements.map(renderAnnouncementCard)
            )}
          </div>
        </div>
        <EditorSidebar />

        {/* Popup pour le formulaire */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="mx-4 rounded-2xl max-w-[90vw] w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAnnouncement ? 'Modifier une annonce' : 'Ajouter une annonce'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Titre"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <select
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Catégorie</option>
                <option value="Formations">Formations</option>
                <option value="Renforcement des capacités">Renforcement des capacités</option>
                <option value="Coaching & mentorat">Coaching & mentorat</option>
                <option value="Concours">Concours</option>
              </select>
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              {renderCategoryFields()}
               <Button type="submit" className="w-full">{editingAnnouncement ? 'Mettre à jour' : 'Publier l\'annonce'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </Layout>
    );
  }

  // Render tablet layout  
  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion carrières+</h1>
            <p className="text-gray-600 mt-2">Gérer les annonces et opportunités de carrière</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle annonce
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <p className="text-center py-8 col-span-full">Chargement...</p>
            ) : (
              announcements.map(renderAnnouncementCard)
            )}
          </div>
        </div>
        <EditorSidebar />

        {/* Popup pour le formulaire */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAnnouncement ? 'Modifier une annonce' : 'Ajouter une annonce'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Titre"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <select
                className="p-2 border rounded-md"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Catégorie</option>
                <option value="Formations">Formations</option>
                <option value="Renforcement des capacités">Renforcement des capacités</option>
                <option value="Coaching & mentorat">Coaching & mentorat</option>
                <option value="Concours">Concours</option>
              </select>
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              {renderCategoryFields()}
              <div className="md:col-span-2">
                <Button type="submit" className="w-full">{editingAnnouncement ? 'Mettre à jour' : 'Publier l\'annonce'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
            <h1 className="text-3xl font-bold text-primary">Gestion carrières+</h1>
            <p className="text-gray-600 mt-2">Gérer les annonces et opportunités de carrière</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle annonce
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <p className="text-center py-8 col-span-full">Chargement...</p>
            ) : (
              announcements.map(renderAnnouncementCard)
            )}
          </div>
        </div>
      </div>

      {/* Popup pour le formulaire */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingAnnouncement ? 'Modifier une annonce' : 'Ajouter une annonce'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Titre"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <select
              className="p-2 border rounded-md"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Catégorie</option>
              <option value="Formations">Formations</option>
              <option value="Renforcement des capacités">Renforcement des capacités</option>
              <option value="Coaching & mentorat">Coaching & mentorat</option>
              <option value="Concours">Concours</option>
            </select>
            <div className="md:col-span-2">
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
            {renderCategoryFields()}
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">{editingAnnouncement ? 'Mettre à jour' : 'Publier l\'annonce'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EditorCarrieres;
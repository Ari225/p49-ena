import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CareerAnnouncement {
  id: string;
  title: string;
  category: 'Formations' | 'Renforcement des capacités' | 'Coaching & mentorat' | 'Concours';
  description: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  
  // Formation fields
  niveau?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert' | 'Tous les niveaux';
  date_debut?: string;
  duree_formation?: string;
  type_formation?: 'en ligne' | 'en présentiel';
  lieu?: string;
  
  // Renforcement des capacités fields
  points_renforcement?: string[];
  
  // Coaching & mentorat fields
  duree_coaching?: string;
  format?: string;
  
  // Concours fields
  date_ouverture?: string;
  date_limite?: string;
  nombre_places?: string;
  lien_concours?: string;
  
  // Metadata
  is_active: boolean;
  published_date: string;
}

export interface CareerAnnouncementFormData {
  title: string;
  category: string;
  description: string;
  niveau?: string;
  date_debut?: string;
  duree_formation?: string;
  type_formation?: string;
  lieu?: string;
  points_renforcement?: string[];
  duree_coaching?: string;
  format?: string;
  date_ouverture?: string;
  date_limite?: string;
  nombre_places?: string;
  lien_concours?: string;
}

export const useCareerAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<CareerAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('career_announcements')
        .select('*')
        .eq('is_active', true)
        .order('published_date', { ascending: false });

      if (error) throw error;
      setAnnouncements((data || []) as CareerAnnouncement[]);
    } catch (error) {
      console.error('Erreur lors du chargement des annonces:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les annonces',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createAnnouncement = async (formData: CareerAnnouncementFormData) => {
    if (!user) {
      toast({
        title: 'Erreur',
        description: 'Vous devez être connecté pour créer une annonce',
        variant: 'destructive'
      });
      return false;
    }

    try {
      const announcementData: any = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        created_by: user.id
      };

      // Ajouter les champs spécifiques selon la catégorie
      switch (formData.category) {
        case 'Formations':
          announcementData.niveau = formData.niveau;
          announcementData.date_debut = formData.date_debut;
          announcementData.duree_formation = formData.duree_formation;
          announcementData.type_formation = formData.type_formation;
          if (formData.type_formation === 'en présentiel') {
            announcementData.lieu = formData.lieu;
          }
          break;
        
        case 'Renforcement des capacités':
          announcementData.points_renforcement = formData.points_renforcement;
          break;
        
        case 'Coaching & mentorat':
          announcementData.duree_coaching = formData.duree_coaching;
          announcementData.format = formData.format;
          break;
        
        case 'Concours':
          announcementData.date_ouverture = formData.date_ouverture;
          announcementData.date_limite = formData.date_limite;
          announcementData.lieu = formData.lieu;
          announcementData.nombre_places = formData.nombre_places;
          announcementData.lien_concours = formData.lien_concours;
          break;
      }

      const { error } = await supabase
        .from('career_announcements')
        .insert([announcementData]);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Annonce créée avec succès'
      });

      await fetchAnnouncements();
      return true;
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer l\'annonce',
        variant: 'destructive'
      });
      return false;
    }
  };

  const updateAnnouncement = async (id: string, formData: CareerAnnouncementFormData) => {
    try {
      const announcementData: any = {
        title: formData.title,
        category: formData.category,
        description: formData.description
      };

      // Reset all category-specific fields first
      announcementData.niveau = null;
      announcementData.date_debut = null;
      announcementData.duree_formation = null;
      announcementData.type_formation = null;
      announcementData.lieu = null;
      announcementData.points_renforcement = null;
      announcementData.duree_coaching = null;
      announcementData.format = null;
      announcementData.date_ouverture = null;
      announcementData.date_limite = null;
      announcementData.nombre_places = null;
      announcementData.lien_concours = null;

      // Set category-specific fields
      switch (formData.category) {
        case 'Formations':
          announcementData.niveau = formData.niveau;
          announcementData.date_debut = formData.date_debut;
          announcementData.duree_formation = formData.duree_formation;
          announcementData.type_formation = formData.type_formation;
          if (formData.type_formation === 'en présentiel') {
            announcementData.lieu = formData.lieu;
          }
          break;
        
        case 'Renforcement des capacités':
          announcementData.points_renforcement = formData.points_renforcement;
          break;
        
        case 'Coaching & mentorat':
          announcementData.duree_coaching = formData.duree_coaching;
          announcementData.format = formData.format;
          break;
        
        case 'Concours':
          announcementData.date_ouverture = formData.date_ouverture;
          announcementData.date_limite = formData.date_limite;
          announcementData.lieu = formData.lieu;
          announcementData.nombre_places = formData.nombre_places;
          announcementData.lien_concours = formData.lien_concours;
          break;
      }

      const { error } = await supabase
        .from('career_announcements')
        .update(announcementData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Annonce mise à jour avec succès'
      });

      await fetchAnnouncements();
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour l\'annonce',
        variant: 'destructive'
      });
      return false;
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('career_announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Annonce supprimée avec succès'
      });

      await fetchAnnouncements();
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'annonce:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'annonce',
        variant: 'destructive'
      });
      return false;
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    loading,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    refetch: fetchAnnouncements
  };
};
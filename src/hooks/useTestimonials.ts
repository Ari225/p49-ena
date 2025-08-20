import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Testimonial {
  id: string;
  member_name: string;
  member_position: string;
  content: string;
  image_url: string | null;
  created_at: string;
  is_active: boolean;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des témoignages:', error);
      toast.error('Erreur lors du chargement des témoignages');
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonial = async (id: string, content: string) => {
    try {
      console.log('Tentative de modification du témoignage:', id, content);
      
      const { data, error } = await supabase.rpc('update_testimonial_secure', {
        testimonial_id: id,
        new_content: content
      });

      if (error) {
        console.error('Erreur lors de la modification:', error);
        throw error;
      }
      
      console.log('Modification réussie:', data);
      toast.success('Témoignage modifié avec succès');
      await loadTestimonials();
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la modification:', error);
      toast.error(`Erreur lors de la modification: ${error.message || 'Erreur inconnue'}`);
      return false;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      console.log('Tentative de suppression du témoignage:', id);
      
      const { data, error } = await supabase.rpc('delete_testimonial_secure', {
        testimonial_id: id
      });

      if (error) {
        console.error('Erreur lors de la suppression:', error);
        throw error;
      }
      
      console.log('Suppression réussie:', data);
      toast.success('Témoignage supprimé avec succès');
      await loadTestimonials();
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      toast.error(`Erreur lors de la suppression: ${error.message || 'Erreur inconnue'}`);
      return false;
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    loadTestimonials,
    updateTestimonial,
    deleteTestimonial
  };
};
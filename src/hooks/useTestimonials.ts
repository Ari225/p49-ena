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
      const { error } = await supabase
        .from('testimonials')
        .update({ content })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Témoignage modifié avec succès');
      await loadTestimonials();
      return true;
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      toast.error('Erreur lors de la modification du témoignage');
      return false;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Témoignage supprimé avec succès');
      await loadTestimonials();
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression du témoignage');
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
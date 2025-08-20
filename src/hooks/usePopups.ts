import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PopupItem, PopupFormData } from '@/types/popup';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export const usePopups = () => {
  const [popups, setPopups] = useState<PopupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPopups = async () => {
    try {
      const { data, error } = await supabase
        .from('popups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPopups: PopupItem[] = data.map(popup => ({
        id: popup.id,
        title: popup.title,
        message: popup.message,
        type: popup.type as 'announcement' | 'welcome' | 'alert' | 'information' | 'other',
        other_type: popup.other_type,
        isActive: popup.is_active,
        created_date: popup.created_date,
        image_url: popup.image_url,
        target_audience: popup.target_audience as 'all_visitors' | 'all_users' | 'admins_only' | 'editors_only',
        author: popup.author,
        position: popup.position
      }));

      setPopups(formattedPopups);
    } catch (error) {
      console.error('Error fetching popups:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les pop-ups",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPopup = async (formData: PopupFormData, imageUrl?: string) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour créer un pop-up",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('popups')
        .insert({
          title: formData.title,
          message: formData.message,
          type: formData.type,
          other_type: formData.other_type,
          target_audience: formData.target_audience,
          author: formData.author,
          position: formData.position,
          image_url: imageUrl,
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      const newPopup: PopupItem = {
        id: data.id,
        title: data.title,
        message: data.message,
        type: data.type as 'announcement' | 'welcome' | 'alert' | 'information' | 'other',
        other_type: data.other_type,
        isActive: data.is_active,
        created_date: data.created_date,
        image_url: data.image_url,
        target_audience: data.target_audience as 'all_visitors' | 'all_users' | 'admins_only' | 'editors_only',
        author: data.author,
        position: data.position
      };

      setPopups(prev => [newPopup, ...prev]);
      
      toast({
        title: "Pop-up créé",
        description: "Le pop-up a été ajouté avec succès"
      });

      return newPopup;
    } catch (error) {
      console.error('Error creating popup:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le pop-up",
        variant: "destructive"
      });
    }
  };

  const togglePopupStatus = async (id: string) => {
    try {
      const popup = popups.find(p => p.id === id);
      if (!popup) return;

      const { error } = await supabase
        .from('popups')
        .update({ is_active: !popup.isActive })
        .eq('id', id);

      if (error) throw error;

      setPopups(prev => prev.map(p => 
        p.id === id ? { ...p, isActive: !p.isActive } : p
      ));

      toast({
        title: "Statut modifié",
        description: `Pop-up ${!popup.isActive ? 'activé' : 'désactivé'} avec succès`
      });
    } catch (error) {
      console.error('Error toggling popup status:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut du pop-up",
        variant: "destructive"
      });
    }
  };

  const deletePopup = async (id: string) => {
    try {
      const { error } = await supabase
        .from('popups')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPopups(prev => prev.filter(p => p.id !== id));
      
      toast({
        title: "Pop-up supprimé",
        description: "Le pop-up a été supprimé avec succès"
      });
    } catch (error) {
      console.error('Error deleting popup:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le pop-up",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('popups-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'popups'
        },
        () => {
          fetchPopups();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    popups,
    loading,
    createPopup,
    togglePopupStatus,
    deletePopup,
    refreshPopups: fetchPopups
  };
};
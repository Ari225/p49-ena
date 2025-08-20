import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PopupItem } from '@/types/popup';
import { useAuth } from '@/context/AuthContext';
import { useCookieManager } from '@/hooks/useCookieManager';

export const usePopupDisplay = () => {
  const [currentPopup, setCurrentPopup] = useState<PopupItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { setCookie, getCookie } = useCookieManager();

  const shouldShowPopup = (popup: PopupItem) => {
    // Vérifier si ce popup a été marqué "ne plus revoir"
    const neverShow = getCookie(`popup_never_show_${popup.id}`);
    if (neverShow === 'true') {
      return false;
    }

    // Vérifier si le popup a été reporté
    const postponedUntil = getCookie(`popup_postponed_until_${popup.id}`);
    const sessionShown = sessionStorage.getItem(`popup_shown_${popup.id}`);
    const now = new Date().getTime();

    // Si le popup a été reporté et que la date n'est pas encore atteinte
    if (postponedUntil && now < parseInt(postponedUntil)) {
      return false;
    }

    // Si déjà montré dans cette session
    if (sessionShown) {
      return false;
    }

    // Vérifier l'audience cible
    switch (popup.target_audience) {
      case 'all_visitors':
        return true;
      case 'all_users':
        return user !== null;
      case 'admins_only':
        return user?.role === 'admin_principal' || user?.role === 'admin_secondaire';
      case 'editors_only':
        return user?.role === 'redacteur';
      default:
        return false;
    }
  };

  const fetchAndShowPopup = async () => {
    try {
      const { data, error } = await supabase
        .from('popups')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Trouver le premier popup qui doit être affiché
      const popupToShow = data?.find(popup => shouldShowPopup({
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

      if (popupToShow) {
        setCurrentPopup({
          id: popupToShow.id,
          title: popupToShow.title,
          message: popupToShow.message,
          type: popupToShow.type as 'announcement' | 'welcome' | 'alert' | 'information' | 'other',
          other_type: popupToShow.other_type,
          isActive: popupToShow.is_active,
          created_date: popupToShow.created_date,
          image_url: popupToShow.image_url,
          target_audience: popupToShow.target_audience as 'all_visitors' | 'all_users' | 'admins_only' | 'editors_only',
          author: popupToShow.author,
          position: popupToShow.position
        });
        setIsOpen(true);
        sessionStorage.setItem(`popup_shown_${popupToShow.id}`, 'true');
      }
    } catch (error) {
      console.error('Error fetching popups:', error);
    }
  };

  const handleNeverShowAgain = (popupId: string) => {
    setCookie(`popup_never_show_${popupId}`, 'true', 365); // 1 an
    setIsOpen(false);
  };

  const handleClose = (popupId: string) => {
    // Reporter le popup de 1-2 jours
    const randomDays = Math.random() < 0.5 ? 1 : 2;
    const postponeUntil = new Date().getTime() + (randomDays * 24 * 60 * 60 * 1000);
    setCookie(`popup_postponed_until_${popupId}`, postponeUntil.toString(), randomDays);
    setIsOpen(false);
  };

  useEffect(() => {
    fetchAndShowPopup();
  }, [user]);

  return {
    currentPopup,
    isOpen,
    setIsOpen,
    handleNeverShowAgain,
    handleClose
  };
};
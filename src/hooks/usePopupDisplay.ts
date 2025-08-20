import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PopupItem } from '@/types/popup';
import { useAuth } from '@/context/AuthContext';
import { useCookieManager } from '@/hooks/useCookieManager';

export const usePopupDisplay = () => {
  const [currentPopup, setCurrentPopup] = useState<PopupItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [popupQueue, setPopupQueue] = useState<PopupItem[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
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

  const fetchAndBuildQueue = async () => {
    if (isProcessingQueue) return;
    
    try {
      const { data, error } = await supabase
        .from('popups')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filtrer tous les popups qui doivent être affichés
      const popupsToShow = data?.filter(popup => shouldShowPopup({
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
      })).map(popup => ({
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
      })) || [];

      if (popupsToShow.length > 0) {
        setPopupQueue(popupsToShow);
        setIsProcessingQueue(true);
        showNextPopup(popupsToShow);
      }
    } catch (error) {
      console.error('Error fetching popups:', error);
    }
  };

  const showNextPopup = (queue: PopupItem[]) => {
    if (queue.length === 0) {
      setIsProcessingQueue(false);
      return;
    }

    const [nextPopup, ...remainingQueue] = queue;
    setCurrentPopup(nextPopup);
    setIsOpen(true);
    sessionStorage.setItem(`popup_shown_${nextPopup.id}`, 'true');
    setPopupQueue(remainingQueue);
  };

  const processNextInQueue = () => {
    if (popupQueue.length > 0) {
      // Attendre 15 secondes avant d'afficher le prochain popup
      setTimeout(() => {
        showNextPopup(popupQueue);
      }, 15000);
    } else {
      setIsProcessingQueue(false);
    }
  };

  const handleReadLater = (popupId: string) => {
    // Reporter le popup de 1 heure
    const postponeUntil = new Date().getTime() + (60 * 60 * 1000); // 1 heure
    setCookie(`popup_postponed_until_${popupId}`, postponeUntil.toString(), 1);
    setCurrentPopup(null);
    setIsOpen(false);
    processNextInQueue();
  };

  const handleClose = (popupId: string) => {
    // Reporter le popup de 1 jour
    const postponeUntil = new Date().getTime() + (24 * 60 * 60 * 1000); // 1 jour
    setCookie(`popup_postponed_until_${popupId}`, postponeUntil.toString(), 1);
    setCurrentPopup(null);
    setIsOpen(false);
    processNextInQueue();
  };

  useEffect(() => {
    fetchAndBuildQueue();
  }, [user]);

  return {
    currentPopup,
    isOpen,
    setIsOpen,
    handleReadLater,
    handleClose
  };
};
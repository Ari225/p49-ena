import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import AssembleeCard from '@/components/assemblees/AssembleeCard';
import AssembleesHeader from '@/components/assemblees/AssembleesHeader';
import { useActivities } from '@/hooks/useActivities';
import { Activity } from '@/types/activity';
import { useSupabase } from '@/context/SupabaseContext';
import MediaPopup from '@/components/MediaPopup';
import RichTextDisplay from '@/components/ui/RichTextDisplay';
interface MediaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  media_urls: string[];
  date: string;
}
const AssembleesGenerales = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedTab, setSelectedTab] = useState('prochaines');
  const {
    activities
  } = useActivities();
  const {
    selectData,
    isConnected
  } = useSupabase();

  // Media state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allMediaForPopup, setAllMediaForPopup] = useState<any[]>([]);

  // Fetch media items with category "Assemblées Générales"
  const fetchMediaItems = async () => {
    try {
      setLoadingMedia(true);
      const {
        data,
        error
      } = await selectData('media_items', '*');
      if (error) {
        console.error('Error fetching media items:', error);
        setMediaItems([]);
        return;
      }
      // Filter only "Assemblées Générales" category
      const assembleesMedia = (data || []).filter((item: MediaItem) => item.category === 'Assemblées Générales').sort((a: MediaItem, b: MediaItem) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setMediaItems(assembleesMedia);
    } catch (error) {
      console.error('Network error fetching media items:', error);
      setMediaItems([]);
    } finally {
      setLoadingMedia(false);
    }
  };
  useEffect(() => {
    if (isConnected) {
      fetchMediaItems();
    }
  }, [isConnected]);

  // Media handlers
  const handleMediaClick = (item: MediaItem, mediaIndex: number = 0) => {
    if (item.media_urls && item.media_urls.length > 0) {
      const mediaGroup = item.media_urls.map((url, index) => {
        const isVideo = url.includes('.mp4') || url.includes('.mov') || url.includes('video');
        return {
          id: index,
          src: url,
          alt: `${item.title} - ${index + 1}`,
          category: item.category,
          type: isVideo ? 'video' : 'image',
          thumbnail: isVideo ? url : undefined
        };
      });
      setCurrentIndex(mediaIndex);
      setSelectedMedia(mediaGroup[mediaIndex]);
      setAllMediaForPopup(mediaGroup);
      setIsPopupOpen(true);
    }
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedMedia(null);
  };
  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
    setSelectedMedia(allMediaForPopup[index]);
  };
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  };

  // Récupérer la dernière activité "Assemblées Générales" à venir
  const prochainAssemblee = activities.filter((activity: Activity) => activity.category === 'Assemblées Générales' && activity.status === 'À venir').sort((a: Activity, b: Activity) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  // Récupérer les activités "Assemblées Générales" passées
  const assembleesPassees = activities.filter((activity: Activity) => activity.category === 'Assemblées Générales' && activity.status === 'Terminé').sort((a: Activity, b: Activity) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const convertActivityToAssemblee = (activity: Activity) => ({
    id: parseInt(activity.id.slice(-8), 16),
    type: activity.title,
    date: new Date(activity.date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    lieu: activity.location,
    participants: 0,
    duree: activity.start_time ? activity.end_time ? `${activity.start_time} - ${activity.end_time}` : `À partir de ${activity.start_time}` : 'Heure non définie',
    president: activity.session_president || 'Non défini',
    ordreJour: activity.agenda_points || [],
    decisions: activity.status === 'Terminé' ? activity.agenda_points || [] : undefined,
    status: activity.status,
    resume: activity.brief_description || activity.description
  });

  // Media Section Component
  const MediaSection = ({
    paddingClass
  }: {
    paddingClass: string;
  }) => <section className={`py-[50px] ${paddingClass} bg-accent/30`}>
      <div className="container mx-auto px-0">
        
        
        {loadingMedia ? <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Chargement des médias...</div>
          </div> : mediaItems.length === 0 ? <div className="text-center py-12">
            <p className="text-gray-500">Aucun média disponible pour le moment.</p>
          </div> : <div className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'} gap-6`}>
            {mediaItems.map(item => <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group bg-white" onClick={() => handleMediaClick(item, 0)}>
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.media_urls[0] || "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400&h=300&fit=crop"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center text-white">
                      <Eye className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Voir les détails</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/70 text-white">
                      {item.media_urls.length} média{item.media_urls.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                  <RichTextDisplay content={item.description} className="text-gray-600 text-sm mb-3 line-clamp-2" />
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(item.date)}
                  </div>
                </div>
              </Card>)}
          </div>}
      </div>
    </section>;

  // Mobile Version
  if (isMobile) {
    return <Layout>
        <div className="min-h-screen bg-white">
          <AssembleesHeader />

          {/* Contenu principal Mobile */}
          

          {/* Media Section Mobile */}
          <MediaSection paddingClass="px-[25px]" className="bg-white" />
        </div>
        
        <MediaPopup isOpen={isPopupOpen} onClose={handleClosePopup} mediaItem={selectedMedia} allMediaItems={allMediaForPopup} currentIndex={currentIndex} onNavigate={handleNavigate} />
      </Layout>;
  }

  // Tablet Version
  if (isTablet) {
    return <Layout>
        <div className="min-h-screen bg-white">
          <AssembleesHeader />

          {/* Contenu principal Tablette */}
          

          {/* Media Section Tablet */}
          <MediaSection paddingClass="px-[50px]" className="bg-white" />
        </div>
        
        <MediaPopup isOpen={isPopupOpen} onClose={handleClosePopup} mediaItem={selectedMedia} allMediaItems={allMediaForPopup} currentIndex={currentIndex} onNavigate={handleNavigate} />
      </Layout>;
  }

  // Desktop Version
  return <Layout>
      <div className="min-h-screen bg-white">
        <AssembleesHeader />

        {/* Contenu principal Desktop */}
        

        {/* Media Section Desktop */}
        <MediaSection paddingClass="px-[100px]" className="bg-white" />
      </div>
      
      <MediaPopup isOpen={isPopupOpen} onClose={handleClosePopup} mediaItem={selectedMedia} allMediaItems={allMediaForPopup} currentIndex={currentIndex} onNavigate={handleNavigate} />
    </Layout>;
};
export default AssembleesGenerales;
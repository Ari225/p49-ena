import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ReunionsConstitutionHero from '@/components/reunions/ReunionsConstitutionHero';
import ReunionsConstitutionContent from '@/components/reunions/ReunionsConstitutionContent';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye } from 'lucide-react';
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
  created_at: string;
}
const ReunionsConstitution = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const {
    selectData,
    isConnected
  } = useSupabase();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allMediaForPopup, setAllMediaForPopup] = useState<any[]>([]);
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
      // Filtrer pour ne garder que les médias "Réunions de constitution"
      const filtered = (data || []).filter((item: MediaItem) => item.category === 'Réunions de constitution');
      // Trier par date décroissante
      filtered.sort((a: MediaItem, b: MediaItem) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setMediaItems(filtered);
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
  const MediaSection = () => <section className={`py-16 bg-white ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary mb-8`}>
          Médias des Réunions de constitution
        </h2>
        
        {loadingMedia ? <div className="text-center py-8 text-gray-500">Chargement des médias...</div> : mediaItems.length === 0 ? <div className="text-center py-8 text-gray-500">
            Aucun média disponible pour les réunions de constitution.
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
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
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
  return <Layout>
      <div className="min-h-screen bg-white">
        <ReunionsConstitutionHero />
        
        <MediaSection />
      </div>
      
      <MediaPopup isOpen={isPopupOpen} onClose={handleClosePopup} mediaItem={selectedMedia} allMediaItems={allMediaForPopup} currentIndex={currentIndex} onNavigate={handleNavigate} />
    </Layout>;
};
export default ReunionsConstitution;
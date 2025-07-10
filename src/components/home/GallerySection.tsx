
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ChevronRight, Video, Play } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MediaPopup from '../MediaPopup';
import { supabase } from '@/integrations/supabase/client';

interface MediaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  media_urls: string[];
  date: string;
  created_at: string;
}

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  type: 'image' | 'video';
  thumbnail?: string;
  mediaCount: number;
}

const GallerySection = () => {
  const isMobile = useIsMobile();
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch media items from Supabase
  const fetchMediaItems = async () => {
    try {
      console.log('Fetching media items from Supabase...');
      
      const { data, error } = await supabase
        .from('media_items')
        .select('*')
        .order('date', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Media items fetched:', data);

      const transformedItems: GalleryItem[] = (data || []).map((item: MediaItem, index: number) => {
        const firstMediaUrl = item.media_urls[0] || '';
        const isVideo = firstMediaUrl.includes('.mp4') || firstMediaUrl.includes('.mov') || firstMediaUrl.includes('video');
        
        return {
          id: index + 1,
          src: firstMediaUrl,
          alt: item.title,
          category: item.category,
          type: isVideo ? 'video' : 'image',
          thumbnail: isVideo ? firstMediaUrl : undefined,
          mediaCount: item.media_urls.length
        };
      });

      console.log('Transformed items:', transformedItems);
      setGalleryItems(transformedItems);
    } catch (error) {
      console.error('Error fetching media items:', error);
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const handleMediaClick = (item: GalleryItem) => {
    setSelectedMedia(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedMedia(null);
  };

  if (loading) {
    return (
      <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${
        // Mobile
        isMobile ? 'px-[25px]' : 
        // Tablet
        'px-8 md:px-12 ' +
        // Desktop
        'lg:px-[100px]'
      }`}>
        <div className="container mx-auto px-0">
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500 text-lg">Chargement des médias...</div>
          </div>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${
        // Mobile
        isMobile ? 'px-[25px]' : 
        // Tablet
        'px-8 md:px-12 ' +
        // Desktop
        'lg:px-[100px]'
      }`}>
        <div className="container mx-auto px-0">
          <div className={`flex items-center justify-between mb-8 md:mb-12 gap-4 ${
            // Mobile
            isMobile ? 'flex-row' : 
            // Tablet & Desktop
            'flex-col sm:flex-row'
          }`}>
            <h2 className={`font-bold text-primary flex items-center ${
              // Mobile
              isMobile ? 'text-xl' : 
              // Tablet & Desktop
              'text-2xl md:text-3xl'
            }`}>
              <Camera className="w-6 h-6 mr-2" />
              Médiathèque
            </h2>
            <Button asChild className="bg-primary text-white font-semibold hover:bg-primary rounded flex items-center text-sm md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] h-10">
              <Link to="/gallery" className="flex items-center">
                <span className="hidden sm:inline">Voir la galerie</span>
                <span className="sm:hidden">Voir plus</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500 text-center">
              <p className="text-lg mb-4">Aucun média disponible pour le moment.</p>
              <p className="text-sm">Ajoutez des médias via le tableau de bord administrateur.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${
      // Mobile
      isMobile ? 'px-[25px]' : 
      // Tablet
      'px-8 md:px-12 ' +
      // Desktop
      'lg:px-[100px]'
    }`}>
      <div className="container mx-auto px-0">
        <div className={`flex items-center justify-between mb-8 md:mb-12 gap-4 ${
          // Mobile
          isMobile ? 'flex-row' : 
          // Tablet & Desktop
          'flex-col sm:flex-row'
        }`}>
          <h2 className={`font-bold text-primary flex items-center ${
            // Mobile
            isMobile ? 'text-xl' : 
            // Tablet & Desktop
            'text-2xl md:text-3xl'
          }`}>
            <Camera className="w-6 h-6 mr-2" />
            Médiathèque
          </h2>
          <Button asChild className="bg-primary text-white font-semibold hover:bg-primary rounded flex items-center text-sm md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] h-10">
            <Link to="/gallery" className="flex items-center">
              <span className="hidden sm:inline">Voir la galerie</span>
              <span className="sm:hidden">Voir plus</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className={`grid gap-4 md:gap-6 ${
          // Mobile
          isMobile ? 'grid-cols-2' : 
          // Tablet
          'grid-cols-2 md:grid-cols-3 ' +
          // Desktop
          'lg:grid-cols-4'
        }`}>
          {galleryItems.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
              onClick={() => handleMediaClick(item)}
            >
              <CardContent className="p-0 relative">
                <div className="aspect-square overflow-hidden">
                  {item.type === 'video' ? (
                    <>
                      <img 
                        src={item.thumbnail || item.src} 
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary ml-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="flex flex-col items-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-center">
                    {item.type === 'video' && <Video className="w-4 h-4 mb-1" />}
                    <span className="px-2">{item.category}</span>
                    <span className="text-xs mt-1">{item.mediaCount} média{item.mediaCount > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <MediaPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        mediaItem={selectedMedia}
      />
    </section>
  );
};

export default GallerySection;

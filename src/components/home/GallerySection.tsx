import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Camera, ChevronRight, Video, Play } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
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
  const isTab = useIsTablet();
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [originalMediaItems, setOriginalMediaItems] = useState<MediaItem[]>([]);
  const [allMediaForPopup, setAllMediaForPopup] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      setOriginalMediaItems(data || []); // Sauvegarder les données originales
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
    // Trouver l'item original avec tous ses médias
    const originalItem = originalMediaItems.find(mediaItem => {
      const firstUrl = mediaItem.media_urls[0] || '';
      return firstUrl === item.src;
    });

    if (originalItem && originalItem.media_urls) {
      // Créer la liste des médias pour ce groupe seulement
      const mediaGroup = originalItem.media_urls.map((url, index) => {
        const isVideo = url.includes('.mp4') || url.includes('.mov') || url.includes('video');
        return {
          id: index,
          src: url,
          alt: `${originalItem.title} - ${index + 1}`,
          category: originalItem.category,
          type: isVideo ? 'video' : 'image',
          thumbnail: isVideo ? url : undefined,
        };
      });

      setCurrentIndex(0); // Toujours commencer au premier média du groupe
      setSelectedMedia(mediaGroup[0]);
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

  if (loading) {
    return (
      <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${
        isMobile ? 'px-[25px]' : 
        isTab ? 'px-[50px]' :
        'px-8 md:px-12 lg:px-[100px]' // Desktop
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
        isMobile ? 'px-[25px]' : 
        isTab ? 'px-[50px]' :
        'px-8 md:px-12 lg:px-[100px]' // Desktop
      }`}>
        <div className="container mx-auto px-0">
          <div className={`flex items-center justify-between mb-8 md:mb-12 gap-4 ${
            isMobile ? 'flex-row' : 
            isTab ? 'flex-row' :
            'flex-col sm:flex-row' // Desktop
          }`}>
            <h2 className={`font-bold text-primary flex items-center ${
              isMobile ? 'text-xl' : 
              isTab ? 'text-2xl' :
              'text-2xl md:text-3xl' // Desktop
            }`}>
              <Camera className="w-6 h-6 mr-2" />
              Médiathèque
            </h2>
            <Link to="/gallery" className={`${isMobile ? 'text-xs' : isTab ? 'text-sm' : 'text-sm md:text-sm'} bg-primary text-white hover:bg-primary rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] font-semibold`}>
              <span className="hidden sm:inline">Voir la galerie</span>
              <span className="sm:hidden">Voir plus</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-700 text-center">
              <p className="text-sm mb-4">Aucun média disponible pour le moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${
      isMobile ? 'px-[25px]' : 
      isTab ? 'px-[50px]' :
      'px-8 md:px-12 lg:px-[100px]' // Desktop
    }`}>
      <div className="container mx-auto px-0">
        <div className={`flex items-center justify-between mb-[50px] md:mb-[50px] gap-4 ${
          isMobile ? 'flex-row' : 
          isTab ? 'flex-row' :
          'flex-col sm:flex-row' // Desktop
        }`}>
          <h2 className={`font-bold text-primary flex items-center ${
            isMobile ? 'text-xl' : 
            isTab ? 'text-2xl' :
            'text-2xl md:text-3xl' // Desktop
          }`}>
            <Camera className="w-6 h-6 mr-2" />
            Médiathèque
          </h2>
          <Link to="/gallery" className={`${isMobile ? 'text-xs' : isTab ? 'text-sm' : 'text-sm md:text-sm'} bg-primary text-white hover:bg-primary rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] font-semibold`}>
            <span className="hidden sm:inline">Voir la galerie</span>
            <span className="sm:hidden">Voir plus</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <Carousel className="w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {galleryItems.map((item) => (
              <CarouselItem key={item.id} className={`pl-2 md:pl-4 ${
                isMobile ? 'basis-1/2' : 
                isTab ? 'basis-1/3' :
                'basis-1/2 md:basis-1/3 lg:basis-1/4'
              }`}>
                <Card 
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={`${isMobile ? '-left-3' : '-left-12'}`} />
          <CarouselNext className={`${isMobile ? '-right-3' : '-right-12'}`} />
        </Carousel>
      </div>

      <MediaPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        mediaItem={selectedMedia}
        allMediaItems={allMediaForPopup}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </section>
  );
};

export default GallerySection;

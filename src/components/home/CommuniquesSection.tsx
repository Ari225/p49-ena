import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const CommuniquesSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [communiques, setCommuniques] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Définition des styles de couleurs basés sur l'urgence
  const getColorStyles = (urgency: 'urgent' | 'important' | 'normal') => {
    switch (urgency) {
      case 'urgent':
        return {
          bg: 'bg-transparent',
          border: 'border-red-200',
          textTitle: 'text-red-800',
          textDesc: 'text-gray-700'
        };
      case 'important':
        return {
          bg: 'bg-transparent',
          border: 'border-orange-200',
          textTitle: 'text-orange-800',
          textDesc: 'text-gray-700'
        };
      default:
        return {
          bg: 'bg-transparent',
          border: 'border-green-200',
          textTitle: 'text-green-800',
          textDesc: 'text-gray-700'
        };
    }
  };

  // Définition des styles de texte pour chaque version
  const textStyles = {
    mobile: {
      title: 'text-base font-semibold mb-[10px]',
      description: 'text-xs font-normal'
    },
    tablet: {
      title: 'text-lg font-semibold mb-[10px]',
      description: 'text-sm font-normal'
    },
    desktop: {
      title: 'text-xl font-semibold mb-[10px]',
      description: 'text-base font-normal'
    }
  };

  const getCurrentTextStyles = () => {
    if (isMobile) return textStyles.mobile;
    if (isTab) return textStyles.tablet;
    return textStyles.desktop;
  };

  // Fetch communiques from database
  useEffect(() => {
    const fetchCommuniques = async () => {
      try {
        const { data, error } = await supabase
          .from('communiques')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching communiques:', error);
          return;
        }

        if (data && data.length > 0) {
          setCommuniques(data);
          setSelectedImage(data[0].image_url || '');
          setSelectedId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching communiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommuniques();
  }, []);

  const handleCommuniqueClick = (image: string, id: string) => {
    setSelectedImage(image);
    setSelectedId(id);
    // Find the index of the selected communique and update carousel position
    const selectedIndex = communiques.findIndex(comm => comm.id === id);
    if (selectedIndex !== -1) {
      setCurrentSlideIndex(selectedIndex);
    }
  };

  const nextSlide = () => {
    if (communiques.length === 0) return;
    const newIndex = (currentSlideIndex + 1) % communiques.length;
    setCurrentSlideIndex(newIndex);
    const currentCommunique = communiques[newIndex];
    setSelectedImage(currentCommunique.image_url || '');
    setSelectedId(currentCommunique.id);
  };

  const prevSlide = () => {
    if (communiques.length === 0) return;
    const newIndex = currentSlideIndex === 0 ? communiques.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newIndex);
    const currentCommunique = communiques[newIndex];
    setSelectedImage(currentCommunique.image_url || '');
    setSelectedId(currentCommunique.id);
  };

  const currentTextStyles = getCurrentTextStyles();

  return (
    <section className={`py-12 md:py-16 lg:py-[100px] bg-accent/30 ${
      isMobile ? 'px-[25px]' : 
      isTab ? 'px-[50px]' :
      'px-4 md:px-8 lg:px-[100px]' // Desktop
    }`}>
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between mb-[50px] md:mb-[50px]">
          <h2 className={`font-bold text-primary ${
            isMobile ? 'text-xl' : 
            isTab ? 'text-2xl' :
            'text-2xl md:text-3xl' // Desktop
          }`}>{t('home.communiques_title')}</h2>
          <Link to="/communiques" className={`${isMobile ? 'text-xs' : isTab ? 'text-sm' : 'text-sm md:text-sm'} bg-primary text-white hover:bg-primary rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] font-semibold`}>
            Voir tout <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {isMobile ? (
          // Mobile layout: Image above selected communiqué with carousel
          communiques.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">Aucun communiqué disponible pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Show image above selected communiqué with swipe functionality */}
              <div 
                className="w-full bg-transparent shadow-xl p-4 rounded-lg mb-3 px-0 py-0"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img alt="Communiqué sélectionné" src={selectedImage} className="w-full h-auto object-contain rounded-lg transition-all duration-300" />
              </div>
              
              {/* Carousel for communiqués with swipe functionality */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out" 
                    style={{
                      transform: `translateX(-${currentSlideIndex * 100}%)`
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    {communiques.map(communique => {
                      const styles = getColorStyles(communique.urgency);
                      return (
                        <div key={communique.id} className="w-full flex-shrink-0 px-0 rounded-lg">
                          <Card className={`${styles.bg} ${styles.border} rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${selectedId === communique.id ? 'ring-0 ring-primary' : ''}`} onClick={() => handleCommuniqueClick(communique.image_url || '', communique.id)}>
                            <CardContent className="p-4 px-[24px] py-[20px] text-center">
                              <h3 className={`${currentTextStyles.title} ${styles.textTitle}`}>
                                {communique.title}
                              </h3>
                              <p className={`${currentTextStyles.description} ${styles.textDesc}`}>
                                {communique.description}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <div className="flex justify-center gap-4 mt-4">
                  <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        ) : isTab ? (
          // Tablet layout: Image on top, communiqués carousel below
          communiques.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base">Aucun communiqué disponible pour le moment.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Image container with swipe functionality */}
              <div className="w-full bg-transparent flex items-center justify-center">
                <div 
                  className="w-full bg-white shadow-xl rounded-lg px-0 py-0"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <img alt="Communiqué sélectionné" src={selectedImage} className="w-full h-full object-cover rounded-lg transition-all duration-300" />
                </div>
              </div>
              
              {/* Communiqués carousel */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-in-out" style={{
                    transform: `translateX(-${(currentSlideIndex - 1) * 33.333}%)`
                  }}>
                    {communiques.map(communique => {
                      const styles = getColorStyles(communique.urgency);
                      return (
                        <div key={communique.id} className="w-1/3 flex-shrink-0 px-2">
                           <Card className={`h-32 ${styles.bg} ${styles.border} cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${selectedId === communique.id ? 'ring-0 ring-primary' : ''}`} onClick={() => handleCommuniqueClick(communique.image_url || '', communique.id)}>
                             <CardContent className="p-4 px-[16px] py-[16px] h-full flex flex-col justify-between text-center">
                               <h3 className={`${currentTextStyles.title} ${styles.textTitle} line-clamp-2`}>
                                 {communique.title}
                               </h3>
                               <p className={`${currentTextStyles.description} ${styles.textDesc} line-clamp-2`}>
                                 {communique.description}
                               </p>
                             </CardContent>
                           </Card>
                         </div>
                       );
                     })}
                   </div>
                 </div>
                 
                 {/* Navigation arrows */}
                 <div className="flex justify-center gap-4 mt-4">
                   <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                     <ChevronLeft className="h-4 w-4" />
                   </Button>
                   <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                     <ChevronRight className="h-4 w-4" />
                   </Button>
                 </div>
               </div>
             </div>
           )
         ) : (
          // Desktop layout
           <div>
             {loading ? (
               <div className="flex items-center justify-center w-full h-64">
                 <Loader2 className="h-8 w-8 animate-spin" />
               </div>
             ) : communiques.length === 0 ? (
               <div className="text-center py-16">
                 <p className="text-gray-500 text-lg">Aucun communiqué disponible pour le moment.</p>
               </div>
             ) : (
               <div className="flex gap-6">
                 {/* Image à gauche */}
                 <div className="w-1/2 flex-shrink-0">
                   <div className="bg-white shadow-xl rounded-lg overflow-hidden h-full">
                     <img 
                       alt="Communiqué sélectionné" 
                       src={selectedImage} 
                       className="w-full h-full object-cover transition-all duration-300" 
                     />
                   </div>
                 </div>
                 
                 {/* Cartes à droite */}
                 <div className="flex-1 space-y-3 md:space-y-4">
                   {communiques.map(communique => {
                     const styles = getColorStyles(communique.urgency);
                     return (
                       <Card key={communique.id} className={`${styles.bg} ${styles.border} cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${selectedId === communique.id ? 'ring-2 ring-primary' : ''}`} onClick={() => handleCommuniqueClick(communique.image_url || '', communique.id)}>
                         <CardContent className="p-4 md:p-6 px-[24px] py-[20px]">
                           <h3 className={`${currentTextStyles.title} ${styles.textTitle}`}>
                             {communique.title}
                           </h3>
                           <p className={`${currentTextStyles.description} ${styles.textDesc}`}>
                             {communique.description}
                           </p>
                         </CardContent>
                       </Card>
                     );
                   })}
                 </div>
               </div>
             )}
           </div>
         )}
      </div>
    </section>
  );
};

export default CommuniquesSection;

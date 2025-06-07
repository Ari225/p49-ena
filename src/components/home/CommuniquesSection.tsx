import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
const CommuniquesSection = () => {
  const {
    t
  } = useLanguage();
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState<string>('/lovable-uploads/cdf92e8b-3396-4192-b8a1-f94647a7b289.jpg');
  const [selectedId, setSelectedId] = useState<number>(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const communiques = [{
    id: 1,
    title: 'Communiqué urgent',
    description: 'Report de l\'événement prévu le 25 mars 2024.',
    color: 'red',
    image: '/lovable-uploads/cdf92e8b-3396-4192-b8a1-f94647a7b289.jpg'
  }, {
    id: 2,
    title: 'Nouvelle inscription',
    description: 'Ouverture des inscriptions pour la formation de mars.',
    color: 'blue',
    image: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg'
  }, {
    id: 3,
    title: 'Félicitations',
    description: 'Promotion de plusieurs membres à de nouveaux postes.',
    color: 'green',
    image: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg'
  }, {
    id: 4,
    title: 'Communiqué de presse',
    description: 'Publication des résultats du dernier concours interne.',
    color: 'purple',
    image: '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg'
  }, {
    id: 5,
    title: 'Communiqué ENA',
    description: 'Nouvelles directives pour les formations continues.',
    color: 'orange',
    image: '/lovable-uploads/b85cd7b2-67e0-481b-9dec-dd22369d51c0.png'
  }, {
    id: 6,
    title: 'Communiqué P49',
    description: 'Assemblée générale extraordinaire du réseau P49.',
    color: 'indigo',
    image: '/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png'
  }];
  const handleCommuniqueClick = (image: string, id: number) => {
    setSelectedImage(image);
    setSelectedId(id);
  };
  const nextSlide = () => {
    const newIndex = (currentSlideIndex + 1) % communiques.length;
    setCurrentSlideIndex(newIndex);
    const currentCommunique = communiques[newIndex];
    setSelectedImage(currentCommunique.image);
    setSelectedId(currentCommunique.id);
  };
  const prevSlide = () => {
    const newIndex = currentSlideIndex === 0 ? communiques.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newIndex);
    const currentCommunique = communiques[newIndex];
    setSelectedImage(currentCommunique.image);
    setSelectedId(currentCommunique.id);
  };
  return <section className={`${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'} py-12 md:py-16 lg:py-[100px] bg-accent/30`}>
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{t('home.communiques_title')}</h2>
          <Link to="/communiques" className="bg-primary text-white hover:bg-primary rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] text-sm  md:text-sm font-semibold">
            Voir tout <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {isMobile ?
      // Mobile layout: Image above selected communiqué with carousel
      <div className="space-y-3">
            {/* Show image above selected communiqué */}
            <div className="w-full bg-white shadow-xl p-4 rounded-lg mb-3">
              <img alt="Communiqué sélectionné" src={selectedImage} className="w-full h-auto object-contain rounded-lg transition-all duration-300" />
            </div>
            
            {/* Carousel for communiqués */}
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out" style={{
              transform: `translateX(-${currentSlideIndex * 100}%)`
            }}>
                  {communiques.map(communique => <div key={communique.id} className="w-full flex-shrink-0 px-2">
                      <Card className={`bg-${communique.color}-50 border-${communique.color}-200 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${selectedId === communique.id ? 'ring-2 ring-primary' : ''}`} onClick={() => handleCommuniqueClick(communique.image, communique.id)}>
                        <CardContent className="p-4 px-[24px] py-[20px]">
                          <h3 className={`font-semibold text-${communique.color}-800 mb-2 text-xl`}>
                            {communique.title}
                          </h3>
                          <p className={`text-sm text-${communique.color}-600 font-normal`}>
                            {communique.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>)}
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
          </div> :
      // Desktop layout: Original layout
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Image container */}
            <div className="w-full lg:w-[500px] bg-transparent flex items-center justify-center ">
              <div className="w-full lg:w-[500px] bg-white shadow-xl rounded-lg px-0 py-0 ">
                <img alt="Communiqué sélectionné" src={selectedImage} className="w-full h-full object-cover rounded-lg transition-all duration-300" />
              </div>
            </div>
            
            {/* Communiqués stacked */}
            <div className="flex-1 space-y-3 md:space-y-4">
              {communiques.map(communique => <Card key={communique.id} className={`bg-${communique.color}-50 border-${communique.color}-200 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]`} onClick={() => handleCommuniqueClick(communique.image, communique.id)}>
                  <CardContent className="p-4 md:p-6 px-[24px] py-[20px]">
                    <h3 className={`font-semibold text-${communique.color}-800 mb-2 text-xl md:text-xl`}>
                      {communique.title}
                    </h3>
                    <p className={`text-sm md:text-sm text-${communique.color}-600 font-normal`}>
                      {communique.description}
                    </p>
                  </CardContent>
                </Card>)}
            </div>
          </div>}
      </div>
    </section>;
};
export default CommuniquesSection;
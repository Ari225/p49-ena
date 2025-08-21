
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const JournalSection = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  const [latestEdition, setLatestEdition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestEdition = async () => {
      try {
        const { data, error } = await supabase
          .from('journal_editions')
          .select('*')
          .eq('status', 'publie')
          .order('publish_date', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Erreur lors de la récupération de l\'édition:', error);
        } else {
          setLatestEdition(data);
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestEdition();
  }, []);

  if (loading) {
    return (
      <section className={`bg-accent/30 py-12 md:py-16 lg:py-[100px] ${
        isMobile ? 'px-[25px]' : 
        isTab ? 'px-[50px]' :
        'px-8 md:px-12 lg:px-[100px]'
      }`}>
        <div className="container mx-auto px-0">
          <h2 className={`font-bold text-primary mb-[50px] ${
            isMobile ? 'text-xl text-center' : 
            isTab ? 'text-2xl text-center' :
            'text-3xl text-center lg:text-left'
          }`}>Notre journal</h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500">Chargement...</div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className={`bg-accent/30 py-12 md:py-16 lg:py-[100px] ${
      isMobile ? 'px-[25px]' : 
      isTab ? 'px-[50px]' :
      'px-8 md:px-12 lg:px-[100px]' // Desktop
    }`}>
      <div className="container mx-auto px-0">
        <h2 className={`font-bold text-primary mb-[50px] md:mb-[50px] ${
          isMobile ? 'text-xl text-center' : 
          isTab ? 'text-2xl text-center' :
          'text-3xl md:text-3xl text-center lg:text-left' // Desktop
        }`}>Notre journal</h2>
        <div className={`flex items-center ${
          isMobile ? 'flex-col space-y-6' : 
          isTab ? 'flex-col space-y-8' :
          'flex-col md:space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12' // Desktop
        }`}>
           <div className={`${
             isMobile ? 'w-full max-w-[280px]' : 
             isTab ? 'w-full max-w-[350px]' :
             'w-full md:max-w-[400px] lg:w-1/3 lg:max-w-none' // Desktop
           }`}>
             <div className="bg-white rounded-lg shadow-xl w-full h-full">
               <div className="bg-white rounded-lg p-0 py-0 px-0 mx-0 w-full h-full">
                 <img 
                   alt={latestEdition?.title || "Journal Perspectives 49"} 
                   className="w-full rounded-lg h-full object-cover" 
                   src={latestEdition?.cover_image_url || "/lovable-uploads/Pers49.webp"} 
                 />
               </div>
             </div>
           </div>
           <div className={`rounded-xl bg-transparent ${
             isMobile ? 'w-full py-0 px-0' : 
             isTab ? 'w-full py-6 px-4' :
             'w-full py-6 md:py-8 px-4 md:px-[20px] lg:w-2/3 lg:py-0' // Desktop
           }`}>
             <h3 className={`font-semibold mb-6 text-center bg-primary text-white py-2 rounded-lg ${
               isMobile ? 'text-base md:mb-10' : 
               isTab ? 'text-lg py-3 mb-8' :
               'text-xl md:text-xl py-2 md:py-[10px] md:mb-10' // Desktop
             }`}>
               {latestEdition?.title || "Perspectives 49 - Bulletin n°1"}
             </h3>
             <p className={`leading-relaxed text-justify font-normal text-gray-700 ${
               isMobile ? 'mb-6 text-xs' : 
               isTab ? 'mb-8 text-sm' :
               'mb-8 md:mb-10 text-base md:text-base md:mb-10' // Desktop
             }`}>
               {latestEdition?.summary || "Ce premier numéro de Perspectives 49 inaugure un journal d'information engagé, ancré dans les réalités locales et soucieux de valoriser les initiatives citoyennes..."}
             </p>
            <div className={`flex justify-center ${
              isMobile ? 'flex-row gap-3 w-full' : 
              isTab ? 'flex-row gap-4' :
              'flex-row gap-3 md:gap-4' // Desktop
            }`}>
              <Button asChild className={`bg-primary text-white hover:bg-primary transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                isMobile ? 'flex-1 py-3 text-xs' : 
                isTab ? 'px-6 py-3 text-sm' :
                'px-4 py-2 rounded flex items-center text-sm md:text-sm' // Desktop
              }`}>
                <Link to="/journal" className="bg-primary text-white hover:bg-primary py-[5px] px-[15px] rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
                  Dernière édition
                </Link>
              </Button>
              <Button asChild variant="outline" className={`border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 ${
                isMobile ? 'flex-1 py-3 text-xs' : 
                isTab ? 'px-6 py-3 text-sm' :
                'text-sm md:text-sm px-4 md:px-6 py-2 md:py-3' // Desktop
              }`}>
                <Link to="/journal" className="border-primary text-primary hover:bg-primary hover:text-white font-medium py-[5px] px-[15px] rounded transition-colors duration-200">
                  Archives
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;

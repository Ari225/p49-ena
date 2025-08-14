import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft, Calendar, Play, Image as ImageIcon, Video, Download } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
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
const MediaDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  useEffect(() => {
    if (id) {
      fetchMediaDetail();
    }
  }, [id]);
  const fetchMediaDetail = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('media_items').select('*').eq('id', id).single();
      if (error) throw error;
      setMedia(data);
    } catch (error) {
      console.error('Error fetching media detail:', error);
      navigate('/gallery');
    } finally {
      setLoading(false);
    }
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Événements':
        return 'bg-blue-100 text-blue-800';
      case 'Formation':
        return 'bg-green-100 text-green-800';
      case 'Archives':
        return 'bg-purple-100 text-purple-800';
      case 'Assemblées Générales':
        return 'bg-orange-100 text-orange-800';
      case 'Régionales':
        return 'bg-teal-100 text-teal-800';
      case 'Cérémonies':
        return 'bg-pink-100 text-pink-800';
      case 'Partenariats':
        return 'bg-indigo-100 text-indigo-800';
      case 'Événements Sociaux':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  };
  const isVideo = (url: string) => {
    return url.includes('.mp4') || url.includes('.mov') || url.includes('.avi') || url.includes('video');
  };
  const downloadMedia = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.click();
  };
  if (loading) {
    return <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-gray-500 text-lg">Chargement...</div>
        </div>
      </Layout>;
  }
  if (!media) {
    return <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-gray-500 text-lg">Média non trouvé</div>
        </div>
      </Layout>;
  }
  return <Layout>
      <div className={`min-h-screen bg-gray-50 ${isMobile ? 'px-[25px] py-6' : 'px-8 lg:px-[100px] py-12'}`}>
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate('/gallery')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la galerie
          </Button>
          
          <div className="mb-4">
            <Badge className={`${getCategoryColor(media.category)} mb-2`}>
              {media.category}
            </Badge>
            <h1 className={`font-bold text-primary ${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'}`}>
              {media.title}
            </h1>
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(media.date)}</span>
          </div>

          <p className="text-gray-700 leading-relaxed">{media.description}</p>
        </div>

        {/* Media Gallery */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Main Media Display */}
          <div className="relative">
            <div className={`${isMobile ? 'aspect-video' : 'aspect-[16/10]'} bg-black flex items-center justify-center`}>
              {isVideo(media.media_urls[selectedMediaIndex]) ? <video className="w-full h-full object-contain" controls src={media.media_urls[selectedMediaIndex]}>
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video> : <img src={media.media_urls[selectedMediaIndex]} alt={media.title} className="w-full h-full object-contain" />}
            </div>

            {/* Download Button */}
            
          </div>

          {/* Media Navigation */}
          {media.media_urls.length > 1 && <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Médias ({media.media_urls.length})
              </h3>
              
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {media.media_urls.map((url, index) => <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
                      <div className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedMediaIndex === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedMediaIndex(index)}>
                        {isVideo(url) ? <>
                            <video className="w-full h-full object-cover" src={url} muted />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="w-4 h-4 text-primary ml-0.5" />
                              </div>
                            </div>
                            <div className="absolute bottom-1 right-1">
                              <Video className="w-3 h-3 text-white" />
                            </div>
                          </> : <>
                            <img src={url} alt={`${media.title} ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute bottom-1 right-1">
                              <ImageIcon className="w-3 h-3 text-white" />
                            </div>
                          </>}
                      </div>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>}
        </div>
      </div>
    </Layout>;
};
export default MediaDetail;
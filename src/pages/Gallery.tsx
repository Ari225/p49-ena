import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Eye, Search, Play } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSupabase } from '@/context/SupabaseContext';
import MediaPopup from '@/components/MediaPopup';
interface MediaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  media_urls: string[];
  date: string;
  created_at: string;
}
const Gallery = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    selectData,
    isConnected
  } = useSupabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allMediaForPopup, setAllMediaForPopup] = useState<any[]>([]);

  // Fetch media items from Supabase
  const fetchMediaItems = async () => {
    try {
      setLoading(true);
      console.log('Fetching media items...');
      const {
        data,
        error
      } = await selectData('media_items', '*');
      if (error) {
        console.error('Error fetching media items:', error);
        setMediaItems([]);
        return;
      }
      console.log('Media items fetched successfully:', data?.length || 0, 'items');
      setMediaItems(data || []);
    } catch (error) {
      console.error('Network error fetching media items:', error);
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isConnected) {
      fetchMediaItems();
    }
  }, [isConnected]);
  const filteredItems = mediaItems
    .filter(item => {
      // Exclure les médias "Les Régionales"
      const isRegionales = item.title.toLowerCase().includes('les régionales') || 
                          item.category.toLowerCase().includes('les régionales');
      return !isRegionales;
    })
    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()));

  // Préparer les médias pour le popup à partir d'un item spécifique
  const handleMediaClick = (item: MediaItem, mediaIndex: number = 0) => {
    if (item.media_urls && item.media_urls.length > 0) {
      // Créer la liste des médias pour ce groupe seulement
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
      setCurrentIndex(mediaIndex); // Commencer au média cliqué
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
  return <Layout>
      <div className="bg-accent/30">
        {/* Header Section */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/media.webp" alt="Background médiathèque" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Médiathèque
            </h1>
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Revivez les moments forts de notre communauté à travers nos photos et vidéos
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className={`py-8 bg-white backdrop-blur-sm ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
          <div className="container mx-auto px-0">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input type="text" placeholder="Rechercher par titre ou catégorie..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-white/90 backdrop-blur-sm" />
            </div>
          </div>
        </section>

        {/* Connection Test (temporaire pour debug) */}
        

        {/* Gallery Grid */}
        <section className={`py-16 bg-white ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
          <div className="container mx-auto px-0">
            {loading ? <div className="flex justify-center items-center py-12">
                <div className="text-gray-500 text-lg">Chargement des médias...</div>
              </div> : <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    Nos médias
                  </h2>
                  <p className="text-gray-600">
                    {filteredItems.length} élément{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems.map(item => <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group bg-white/90 backdrop-blur-sm" onClick={() => handleMediaClick(item, 0)}>
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
                        <div className="mb-2">
                          <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(item.date)}
                        </div>
                      </div>
                    </Card>)}
                </div>
                
                {filteredItems.length === 0 && !loading && <div className="text-center py-12">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
                      <p className="text-gray-500 text-lg">
                        {searchQuery ? `Aucun résultat trouvé pour "${searchQuery}"` : 'Aucun média disponible pour le moment.'}
                      </p>
                    </div>
                  </div>}
              </>}
          </div>
        </section>
      </div>
      
      <MediaPopup isOpen={isPopupOpen} onClose={handleClosePopup} mediaItem={selectedMedia} allMediaItems={allMediaForPopup} currentIndex={currentIndex} onNavigate={handleNavigate} />
    </Layout>;
};
export default Gallery;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, Calendar, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  published_date: string;
  author: {
    first_name: string;
    last_name: string;
  };
}
const BlogSection = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const isMobile = useIsMobile();
  useEffect(() => {
    fetchBlogArticles();
  }, []);
  const fetchBlogArticles = async () => {
    // Mock data instead of Supabase
    const mockArticles: BlogArticle[] = [{
      id: '1',
      title: 'L\'avenir de l\'administration publique',
      summary: 'Réflexions sur les défis et opportunités de modernisation de l\'administration.',
      image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
      published_date: '2024-01-20',
      author: {
        first_name: 'Jean',
        last_name: 'Kouassi'
      }
    }, {
      id: '2',
      title: 'Leadership et innovation',
      summary: 'Comment développer un leadership efficace dans le secteur public.',
      image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
      published_date: '2024-01-18',
      author: {
        first_name: 'Marie',
        last_name: 'Diabaté'
      }
    }, {
      id: '3',
      title: 'Digitalisation des services',
      summary: 'Les enjeux de la transformation numérique dans l\'administration.',
      image_url: '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg',
      published_date: '2024-01-15',
      author: {
        first_name: 'Paul',
        last_name: 'Koffi'
      }
    }];
    setArticles(mockArticles);
  };
  const nextSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex + 1) % articles.length);
  };
  const prevSlide = () => {
    setCurrentSlideIndex(prevIndex => prevIndex === 0 ? articles.length - 1 : prevIndex - 1);
  };
  return <section className={`bg-gray-50 py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-primary mb-4`}>Blog</h2>
          <p className={`text-gray-700 px-4 ${isMobile ? 'text-sm' : 'text-base md:text-base'}`}>
            Découvrez les réflexions et analyses de nos membres sur les enjeux de l'administration publique
          </p>
        </div>
        
        {isMobile ? <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{
            transform: `translateX(-${currentSlideIndex * 100}%)`
          }}>
                {articles.map(article => <div key={article.id} className="w-full flex-shrink-0 px-0">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      {article.image_url && <div className="h-32 md:h-48">
                          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                        </div>}
                      <CardContent className="p-4 md:p-6">
                        <h3 className="font-semibold text-primary mb-2 md:mb-3 line-clamp-2 text-sm md:text-base">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span className="truncate">
                              {article.author?.first_name} {article.author?.last_name}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(article.published_date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>)}
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-4 mb-4">
              <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {articles.map(article => <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {article.image_url && <div className="h-32 md:h-48">
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                  </div>}
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-semibold text-primary mb-2 md:mb-3 line-clamp-2 text-sm md:text-base">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span className="truncate">
                        {article.author?.first_name} {article.author?.last_name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(article.published_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>}
        
        <div className="text-center">
          <Button asChild className={`bg-primary hover:bg-primary text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${isMobile ? 'w-full' : 'text-sm md:text-sm'}`}>
            <Link to="/blog" className="flex items-center justify-center">
              Voir tous les articles
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default BlogSection;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
}
const ActualitesSection = () => {
  const isMobile = useIsMobile();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    fetchNews();
  }, []);
  const fetchNews = async () => {
    // Mock data - additional news items for the grid
    const mockNews: NewsItem[] = [{
      id: '4',
      title: 'Séminaire de développement professionnel',
      summary: 'Un séminaire intensif pour le renforcement des capacités professionnelles.',
      category: 'Formation',
      image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
      published_date: '2024-01-20'
    }, {
      id: '5',
      title: 'Nouveau programme de mentorat',
      summary: 'Lancement du programme de mentorat pour les jeunes diplômés.',
      category: 'Programme',
      image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
      published_date: '2024-01-18'
    }, {
      id: '6',
      title: 'Conférence internationale sur la gouvernance',
      summary: 'Participation à la conférence internationale sur les bonnes pratiques.',
      category: 'Conférence',
      image_url: '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg',
      published_date: '2024-01-16'
    }];
    setNews(mockNews);
  };
  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % news.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? news.length - 1 : prevIndex - 1);
  };
  if (news.length === 0) {
    return null;
  }
  return;
};
export default ActualitesSection;
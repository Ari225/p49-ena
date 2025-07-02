import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
}
const NewsCarousel = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [news.length]);
  const fetchNews = async () => {
    // Mock data instead of Supabase
    const mockNews: NewsItem[] = [{
      id: '1',
      title: 'Nouvelle formation en leadership',
      summary: 'Une formation spécialisée en leadership pour les membres de la P49.',
      category: 'Formation',
      image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
      published_date: '2024-01-15'
    }, {
      id: '2',
      title: 'Assemblée générale annuelle',
      summary: 'L\'assemblée générale de la P49 se tiendra le mois prochain.',
      category: 'Événement',
      image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
      published_date: '2024-01-10'
    }, {
      id: '3',
      title: 'Nouveau partenariat stratégique',
      summary: 'La P49 annonce un nouveau partenariat avec une institution internationale.',
      category: 'Partenariat',
      image_url: '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg',
      published_date: '2024-01-05'
    }];
    setNews(mockNews);
  };
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % news.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + news.length) % news.length);
  };
  if (news.length === 0) {
    return null;
  }
  return;
};
export default NewsCarousel;
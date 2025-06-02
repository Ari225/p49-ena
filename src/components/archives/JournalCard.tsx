
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url?: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

interface JournalCardProps {
  journal: JournalEdition;
}

const JournalCard = ({ journal }: JournalCardProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 ${isMobile ? 'mb-4' : ''}`}>
      <CardHeader className={`${isMobile ? 'p-3' : 'p-4'}`}>
        <div className={`aspect-[3/4] mb-${isMobile ? '3' : '4'}`}>
          <img 
            src={journal.cover_image_url || "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"} 
            alt={journal.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-primary`}>
          {journal.title}
        </CardTitle>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(journal.publish_date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long'
          })}
        </div>
      </CardHeader>
      
      <CardContent className={`${isMobile ? 'p-3 pt-0' : 'p-4 pt-0'}`}>
        {journal.summary && (
          <p className={`text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'} mb-4 line-clamp-3`}>
            {journal.summary}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          {journal.page_count && (
            <span>{journal.page_count} pages</span>
          )}
        </div>

        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
          <Button 
            size={isMobile ? "sm" : "sm"} 
            className={`bg-primary hover:bg-primary/90 ${isMobile ? 'w-full justify-center' : 'flex-1'}`}
          >
            <Eye className="h-3 w-3 mr-1" />
            Lire
          </Button>
          <Button 
            size={isMobile ? "sm" : "sm"} 
            variant="outline" 
            className={`border-primary text-primary hover:bg-primary hover:text-white ${isMobile ? 'w-full justify-center' : 'flex-1'}`}
          >
            <Download className="h-3 w-3 mr-1" />
            PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalCard;

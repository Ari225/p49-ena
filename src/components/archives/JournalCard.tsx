
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Calendar } from 'lucide-react';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

interface JournalCardProps {
  journal: JournalEdition;
}

const JournalCard = ({ journal }: JournalCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="aspect-[3/4] mb-4">
          <img 
            src={journal.cover_image_url || "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"} 
            alt={journal.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <CardTitle className="text-lg text-primary">{journal.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(journal.publish_date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long'
          })}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        {journal.summary && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{journal.summary}</p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          {journal.page_count && (
            <span>{journal.page_count} pages</span>
          )}
        </div>

        <div className="flex space-x-2">
          <Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
            <Eye className="h-3 w-3 mr-1" />
            Lire
          </Button>
          <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex-1">
            <Download className="h-3 w-3 mr-1" />
            PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalCard;

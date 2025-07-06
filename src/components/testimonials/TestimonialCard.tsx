
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  content: string;
  image: string;
  date: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit?: (testimonial: Testimonial) => void;
  onDelete?: (id: string) => void;
}

const TestimonialCard = ({ testimonial, onEdit, onDelete }: TestimonialCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-primary">{testimonial.name}</h3>
            <p className="text-sm text-gray-600">{testimonial.position}</p>
          </div>
        </div>
        
        <p className="italic text-gray-700 flex-1 mb-4">"{testimonial.content}"</p>
        
        <div className="flex space-x-2 mt-auto">
          {onEdit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(testimonial)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={() => onDelete(testimonial.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import { Testimonial } from '@/hooks/useTestimonials';

interface TestimonialEditDialogProps {
  testimonial: Testimonial | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, content: string) => Promise<boolean>;
}

const TestimonialEditDialog = ({ testimonial, open, onOpenChange, onSave }: TestimonialEditDialogProps) => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (testimonial) {
      setContent(testimonial.content);
    }
  }, [testimonial]);

  const handleSave = async () => {
    if (!testimonial) return;

    setSaving(true);
    const success = await onSave(testimonial.id, content);
    setSaving(false);

    if (success) {
      onOpenChange(false);
    }
  };

  if (!testimonial) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] mx-auto rounded-lg max-h-[90vh] overflow-y-auto' : 'max-w-2xl rounded-xl border-0 shadow-2xl'}`}>
        <DialogHeader>
          <DialogTitle>Modifier le témoignage</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {testimonial.image_url && (
              <img
                src={testimonial.image_url}
                alt={testimonial.member_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold">{testimonial.member_name}</h3>
              <p className="text-sm text-gray-600">{testimonial.member_position}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu du témoignage</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-32"
              placeholder="Contenu du témoignage..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSave}
              disabled={saving || !content.trim()}
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialEditDialog;
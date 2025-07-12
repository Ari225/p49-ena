import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  image: z.any().optional(),
  urgency: z.enum(['urgent', 'important', 'normal'], {
    required_error: 'Le niveau d\'urgence est requis'
  })
});

interface CommuniqueItem {
  id: string;
  title: string;
  description: string;
  type: string;
  urgency: 'normal' | 'urgent' | 'important';
  published_date: string;
  image_url?: string;
}

interface CommuniqueFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editingCommunique?: CommuniqueItem | null;
}

const CommuniqueFormDialog: React.FC<CommuniqueFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingCommunique
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      urgency: 'normal' as 'normal' | 'urgent' | 'important'
    }
  });

  useEffect(() => {
    if (editingCommunique) {
      form.reset({
        title: editingCommunique.title,
        description: editingCommunique.description,
        urgency: editingCommunique.urgency
      });
      if (editingCommunique.image_url) {
        setImagePreview(editingCommunique.image_url);
      }
    } else {
      form.reset({
        title: '',
        description: '',
        urgency: 'normal' as 'normal' | 'urgent' | 'important'
      });
      setSelectedImage(null);
      setImagePreview(null);
    }
  }, [editingCommunique, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (data: any) => {
    const formData = {
      ...data,
      image: selectedImage,
      published_date: editingCommunique?.published_date || new Date().toISOString().split('T')[0],
      id: editingCommunique?.id
    };
    onSubmit(formData);
    form.reset();
    setSelectedImage(null);
    setImagePreview(null);
    onClose();
  };

  const handleClose = () => {
    form.reset();
    setSelectedImage(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {editingCommunique ? 'Modifier le communiqué' : 'Ajouter un communiqué'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre du communiqué" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description du communiqué" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-sm text-gray-600">
                          Cliquez pour ajouter une image
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau d'urgence</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le niveau d'urgence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="normal">Non urgent</SelectItem>
                      <SelectItem value="important">Important</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {editingCommunique ? 'Modifier' : 'Publier'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CommuniqueFormDialog;

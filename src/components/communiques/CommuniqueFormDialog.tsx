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
import { compressCommuniqueImage } from '@/utils/mediaCompression';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  image: z.boolean().refine(val => val === true, {
    message: 'Une image est requise'
  }),
  urgency: z.enum(['urgent', 'important', 'normal'], {
    required_error: 'Le niveau d\'urgence est requis'
  })
});

interface CommuniqueItem {
  id: string;
  title: string;
  description: string;
  urgency: 'normal' | 'urgent' | 'important';
  published_date: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
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
  const [isCompressing, setIsCompressing] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: false,
      urgency: 'normal' as 'normal' | 'urgent' | 'important'
    }
  });

  useEffect(() => {
    if (editingCommunique) {
      form.reset({
        title: editingCommunique.title,
        description: editingCommunique.description,
        image: !!editingCommunique.image_url,
        urgency: editingCommunique.urgency
      });
      if (editingCommunique.image_url) {
        setImagePreview(editingCommunique.image_url);
      }
    } else {
      form.reset({
        title: '',
        description: '',
        image: false,
        urgency: 'normal' as 'normal' | 'urgent' | 'important'
      });
      setSelectedImage(null);
      setImagePreview(null);
    }
  }, [editingCommunique, form]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsCompressing(true);
      try {
        const compressedFile = await compressCommuniqueImage(file);
        setSelectedImage(compressedFile);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(compressedFile);
        
        form.setValue('image', true);
        form.clearErrors('image');
        
        toast({
          title: "Image compressée",
          description: `Taille réduite de ${(file.size / 1024 / 1024).toFixed(2)}MB à ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
        });
      } catch (error) {
        console.error('Error compressing image:', error);
        toast({
          title: "Erreur de compression",
          description: "Impossible de compresser l'image",
          variant: "destructive"
        });
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    form.setValue('image', false);
  };

  const handleSubmit = (data: any) => {
    if (!selectedImage && !editingCommunique?.image_url) {
      toast({
        title: "Image requise",
        description: "Veuillez sélectionner une image",
        variant: "destructive"
      });
      return;
    }

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

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image *</FormLabel>
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
                        {isCompressing ? (
                          <div className="text-sm text-gray-600">
                            Compression en cours...
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <div className="mt-2">
                              <label htmlFor="image-upload" className="cursor-pointer">
                                <span className="text-sm text-gray-600">
                                  Cliquez pour ajouter une image *
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
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              <Button type="submit" disabled={isCompressing} className="bg-primary hover:bg-primary/90">
                {isCompressing ? 'Compression...' : (editingCommunique ? 'Modifier' : 'Publier')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CommuniqueFormDialog;

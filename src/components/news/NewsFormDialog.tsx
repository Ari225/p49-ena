
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X, Bold, Italic, Underline, List, Link } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const formSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  summary: z.string().min(1, 'Le résumé est requis'),
  details: z.string().min(1, 'Les détails sont requis'),
  category: z.string().min(1, 'La catégorie est requise'),
  reading_time: z.number().min(1, 'Le temps de lecture est requis'),
  published_date: z.string().min(1, 'La date est requise'),
  image: z.any().optional()
});

interface NewsItem {
  id?: string;
  title: string;
  summary: string;
  category: string;
  published_date: string;
  image_url?: string;
  reading_time?: number;
  published_by?: string;
  details?: string;
}

interface NewsFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editingNews?: NewsItem | null;
}

const NewsFormDialog: React.FC<NewsFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingNews
}) => {
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detailsText, setDetailsText] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const categories = ['Formation', 'Événement', 'Partenariat', 'Actualité', 'Programme', 'Conférence', 'Autre'];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      summary: '',
      details: '',
      category: '',
      reading_time: 3,
      published_date: new Date().toISOString().split('T')[0]
    }
  });

  useEffect(() => {
    if (editingNews) {
      const isCustomCategory = !categories.slice(0, -1).includes(editingNews.category);
      
      form.reset({
        title: editingNews.title,
        summary: editingNews.summary,
        details: editingNews.details || '',
        category: isCustomCategory ? 'Autre' : editingNews.category,
        reading_time: editingNews.reading_time || 3,
        published_date: editingNews.published_date
      });
      
      if (isCustomCategory) {
        setCustomCategory(editingNews.category);
        setShowCustomCategory(true);
      } else {
        setCustomCategory('');
        setShowCustomCategory(false);
      }
      
      setDetailsText(editingNews.details || '');
      if (editingNews.image_url) {
        setImagePreview(editingNews.image_url);
      }
    } else {
      form.reset({
        title: '',
        summary: '',
        details: '',
        category: '',
        reading_time: 3,
        published_date: new Date().toISOString().split('T')[0]
      });
      setDetailsText('');
      setSelectedImage(null);
      setImagePreview(null);
      setCustomCategory('');
      setShowCustomCategory(false);
    }
  }, [editingNews, form]);

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

  const applyFormatting = (format: string) => {
    const textarea = document.getElementById('details-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = detailsText.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }

    const newText = detailsText.substring(0, start) + formattedText + detailsText.substring(end);
    setDetailsText(newText);
    form.setValue('details', newText);
  };

  const handleSubmit = (data: any) => {
    const finalCategory = data.category === 'Autre' ? customCategory : data.category;
    const formData = {
      ...data,
      category: finalCategory,
      details: detailsText,
      image: selectedImage,
      id: editingNews?.id
    };
    onSubmit(formData);
    form.reset();
    setSelectedImage(null);
    setImagePreview(null);
    setDetailsText('');
    setCustomCategory('');
    setShowCustomCategory(false);
    onClose();
  };

  const handleClose = () => {
    form.reset();
    setSelectedImage(null);
    setImagePreview(null);
    setDetailsText('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-md' : 'w-[90vw] max-w-2xl'} mx-auto rounded-xl max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>
            {editingNews ? 'Modifier l\'actualité' : 'Nouvelle actualité'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="published_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reading_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temps de lecture (min)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de l'actualité" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Résumé</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Résumé de l'actualité" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Détails de l'actualité</label>
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Éditeur</TabsTrigger>
                  <TabsTrigger value="preview">Aperçu</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="space-y-2">
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('bold')}
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('italic')}
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('underline')}
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('link')}
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="details-textarea"
                    placeholder="Détails complets de l'actualité..."
                    value={detailsText}
                    onChange={(e) => {
                      setDetailsText(e.target.value);
                      form.setValue('details', e.target.value);
                    }}
                    rows={8}
                  />
                </TabsContent>
                
                 <TabsContent value="preview">
                  <div className="border rounded-md p-4 min-h-[200px] bg-gray-50">
                    <div className="prose prose-sm max-w-none">
                      {detailsText ? (
                        <div 
                          style={{ whiteSpace: 'pre-wrap' }}
                          dangerouslySetInnerHTML={{ 
                          __html: detailsText
                            .replace(/\n/g, '<br>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/__(.*?)__/g, '<u>$1</u>')
                            .replace(/\n- (.*)/g, '<ul><li>$1</li></ul>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
                        }} />
                      ) : (
                        <p className="text-gray-500">Aperçu du contenu...</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setShowCustomCategory(value === 'Autre');
                      if (value !== 'Autre') {
                        setCustomCategory('');
                      }
                    }} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showCustomCategory && (
              <FormItem>
                <FormLabel>Précisez la catégorie</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Entrez la catégorie personnalisée"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {editingNews ? 'Modifier' : 'Publier'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsFormDialog;

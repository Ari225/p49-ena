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
import { Upload, X, Bold, Italic, Underline, List, Link, Quote, ListOrdered } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  category: z.string().min(1, 'La catégorie est requise'),
  reading_time: z.number().min(1, 'Le temps de lecture est requis'),
  summary: z.string().min(1, 'Le résumé est requis'),
  content: z.string().min(1, 'Le contenu de l\'article est requis'),
  matricule: z.string().min(1, 'Le matricule est requis')
});

interface BlogArticle {
  id?: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  reading_time: number;
  matricule: string;
  image_url?: string;
  author_id?: string;
  published_date?: string;
  status?: string;
}

interface BlogFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editingArticle?: BlogArticle | null;
}

const BlogFormDialog: React.FC<BlogFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingArticle
}) => {
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [contentText, setContentText] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [imageError, setImageError] = useState('');
  const [memberData, setMemberData] = useState<{
    name: string;
    function: string;
    image: string;
  } | null>(null);
  const [matriculeError, setMatriculeError] = useState<string | null>(null);

  const categories = ['Société', 'Administration', 'Informatique', 'Politique', 'Autre'];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      summary: '',
      content: '',
      category: '',
      reading_time: 5,
      matricule: ''
    }
  });

  useEffect(() => {
    if (editingArticle) {
      const isCustomCategory = !categories.slice(0, -1).includes(editingArticle.category);
      
      form.reset({
        title: editingArticle.title,
        summary: editingArticle.summary,
        content: editingArticle.content || '',
        category: isCustomCategory ? 'Autre' : editingArticle.category,
        reading_time: editingArticle.reading_time || 5,
        matricule: editingArticle.matricule || ''
      });
      
      if (isCustomCategory) {
        setCustomCategory(editingArticle.category);
        setShowCustomCategory(true);
      } else {
        setCustomCategory('');
        setShowCustomCategory(false);
      }
      
      setContentText(editingArticle.content || '');
      if (editingArticle.image_url) {
        setImagePreview(editingArticle.image_url);
      }
    } else {
      form.reset({
        title: '',
        summary: '',
        content: '',
        category: '',
        reading_time: 5,
        matricule: ''
      });
      setContentText('');
      setSelectedImage(null);
      setImagePreview(null);
      setCustomCategory('');
      setShowCustomCategory(false);
      setImageError('');
    }
  }, [editingArticle, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageError('L\'image ne doit pas dépasser 5MB');
        return;
      }
      setImageError('');
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
    setImageError('');
  };

  const applyFormatting = (format: string) => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = contentText.substring(start, end);
    let formattedText = '';

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'list':
        formattedText = `\n• ${selectedText}`;
        break;
      case 'numbered-list':
        formattedText = `\n1. ${selectedText}`;
        break;
      case 'quote':
        formattedText = `\n> ${selectedText}`;
        break;
      case 'link':
        const url = prompt('Entrez l\'URL:');
        if (url) {
          formattedText = `[${selectedText || 'Texte du lien'}](${url})`;
        } else {
          return;
        }
        break;
      default:
        formattedText = selectedText;
    }

    const newText = contentText.substring(0, start) + formattedText + contentText.substring(end);
    setContentText(newText);
    form.setValue('content', newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + formattedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const fetchMemberData = async (matricule: string) => {
    if (!matricule.trim()) {
      setMemberData(null);
      setMatriculeError(null);
      return;
    }

    try {
      // Utiliser la fonction sécurisée get_member_details au lieu d'accéder directement à la table
      const { data, error } = await supabase
        .rpc('get_member_details', {
          member_matricule: matricule,
          verification_matricule: matricule
        });

      if (error || !data || data.length === 0) {
        setMatriculeError('Matricule non trouvé dans la base de données');
        setMemberData(null);
        return;
      }

      const member = data[0];
      const memberInfo = {
        name: `${member.prenoms} ${member.nom_famille}`,
        function: member.emploi_fonction_publique || 'Fonction non spécifiée',
        image: member.photo || ''
      };

      setMemberData(memberInfo);
      setMatriculeError(null);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du membre:', error);
      setMatriculeError('Erreur lors de la vérification du matricule');
      setMemberData(null);
    }
  };

  const handleSubmit = (data: any) => {
    if (!selectedImage && !editingArticle?.image_url) {
      setImageError('Une image est requise');
      return;
    }

    if (!memberData) {
      setMatriculeError('Veuillez entrer un matricule valide');
      return;
    }

    const finalCategory = data.category === 'Autre' ? customCategory : data.category;
    
    const submitData = {
      ...data,
      category: finalCategory,
      content: contentText,
      selectedImage: selectedImage,
      authorData: memberData
    };

    onSubmit(submitData);
  };

  const handleClose = () => {
    form.reset();
    setSelectedImage(null);
    setImagePreview(null);
    setContentText('');
    setCustomCategory('');
    setShowCustomCategory(false);
    setImageError('');
    onClose();
  };

  const handleCategoryChange = (value: string) => {
    form.setValue('category', value);
    if (value === 'Autre') {
      setShowCustomCategory(true);
    } else {
      setShowCustomCategory(false);
      setCustomCategory('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {editingArticle ? 'Modifier l\'article' : 'Nouvel article de blog'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Image de l'article *</label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="w-full h-48 object-cover rounded-lg"
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label className="cursor-pointer">
                        <span className="text-sm text-gray-600">
                          Cliquez pour télécharger une image
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {imageError && <p className="text-sm text-red-600">{imageError}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Titre */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de l'article" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Matricule */}
              <FormField
                control={form.control}
                name="matricule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matricule *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Votre matricule" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          fetchMemberData(e.target.value);
                        }}
                      />
                    </FormControl>
                    {matriculeError && (
                      <p className="text-sm text-red-600">{matriculeError}</p>
                    )}
                    {memberData && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-800">
                          <span className="font-medium">Membre trouvé:</span> {memberData.name}
                        </p>
                        <p className="text-sm text-green-700">
                          <span className="font-medium">Fonction:</span> {memberData.function}
                        </p>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Temps de lecture */}
              <FormField
                control={form.control}
                name="reading_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temps de lecture (minutes) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="60"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Catégorie */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie *</FormLabel>
                  <Select onValueChange={handleCategoryChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
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

            {/* Catégorie personnalisée */}
            {showCustomCategory && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Précisez la catégorie *</label>
                <Input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Entrez la catégorie personnalisée"
                  required
                />
              </div>
            )}

            {/* Résumé */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Résumé *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Résumé de l'article"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contenu de l'article */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Contenu de l'article *</label>
              
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Éditeur</TabsTrigger>
                  <TabsTrigger value="preview">Aperçu</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="space-y-2">
                  {/* Outils de formatage */}
                  <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-gray-50">
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
                      onClick={() => applyFormatting('numbered-list')}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('quote')}
                    >
                      <Quote className="h-4 w-4" />
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
                    id="content-textarea"
                    value={contentText}
                    onChange={(e) => {
                      setContentText(e.target.value);
                      form.setValue('content', e.target.value);
                    }}
                    placeholder="Rédigez le contenu de votre article ici..."
                    className="min-h-[300px] rounded-t-none"
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-2">
                  <div 
                    className="min-h-[300px] p-4 border rounded-md bg-white prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: contentText
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
                        .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
                        .replace(/^• (.+)$/gm, '<ul><li>$1</li></ul>')
                        .replace(/^\d+\. (.+)$/gm, '<ol><li>$1</li></ol>')
                        .replace(/\n/g, '<br>')
                    }}
                  />
                </TabsContent>
              </Tabs>
              
              {form.formState.errors.content && (
                <p className="text-sm text-red-600">{form.formState.errors.content.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {editingArticle ? 'Modifier' : 'Créer l\'article'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogFormDialog;
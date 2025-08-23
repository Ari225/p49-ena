import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Send, MessageSquare, BookOpen, Newspaper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
const Suggestions = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    description: '',
    priority: 'normale'
  });
  const categories = [{
    value: 'blog',
    label: 'Articles de Blog',
    icon: MessageSquare
  }, {
    value: 'journal',
    label: 'Journal Perspectives 49',
    icon: BookOpen
  }, {
    value: 'actualites',
    label: 'Actualités',
    icon: Newspaper
  }, {
    value: 'autre',
    label: 'Autre',
    icon: Lightbulb
  }];
  const priorities = [{
    value: 'faible',
    label: 'Faible'
  }, {
    value: 'normale',
    label: 'Normale'
  }, {
    value: 'elevee',
    label: 'Élevée'
  }, {
    value: 'urgente',
    label: 'Urgente'
  }];
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basic
    if (!formData.name || !formData.email || !formData.category || !formData.subject || !formData.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    try {
      const {
        error
      } = await supabase.from('suggestions').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        subject: formData.subject,
        description: formData.description,
        priority: formData.priority
      });
      if (error) throw error;
      toast({
        title: "Suggestion envoyée !",
        description: "Votre suggestion a été transmise avec succès. Nous vous recontacterons bientôt."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        description: '',
        priority: 'normale'
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/archives.webp" alt="Background suggestions" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${isMobile ? 'text-2xl' : 'text-6xl md:text-6xl lg:text-6xl'}`}>Faire des suggestions</h1>
            <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${isMobile ? 'text-sm' : 'text-lg md:text-lg'}`}>
              Proposez vos idées pour enrichir notre contenu éditorial
            </p>
          </div>
        </section>

        {/* Categories Overview */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-white`}>
          <div className="container mx-auto px-0">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {categories.slice(0, 3).map(category => <div key={category.value} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-white/95 backdrop-blur-sm rounded-lg h-[200px] w-full max-w-[300px] mx-auto">
                    <div className="p-6 h-full flex flex-col justify-center">
                      <div className="text-center space-y-2">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-tight">
                          {category.label}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium leading-snug px-1">
                          {category.value === 'blog' && "Proposez des thèmes d'articles de blog innovants et pertinents"}
                          {category.value === 'journal' && "Suggérez des sujets pour enrichir notre journal institutionnel"}
                          {category.value === 'actualites' && "Signalez des actualités importantes à traiter"}
                        </p>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Suggestion Form */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-0">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className={`font-bold text-primary mb-4 ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-4xl'}`}>Partagez vos Idées</h2>
                <p className={`text-gray-600 ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'}`}>
                  Votre contribution est précieuse pour enrichir notre contenu éditorial
                </p>
              </div>
              
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl text-primary text-center flex items-center justify-center gap-3">
                    <Lightbulb className="h-6 w-6" />
                    Formulaire de Suggestion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informations personnelles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <Input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="Votre nom complet" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="votre@email.com" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="+225 XX XX XX XX XX" />
                    </div>

                    {/* Catégorie et Priorité */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Catégorie *
                        </label>
                        <Select value={formData.category} onValueChange={value => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priorité
                        </label>
                        <Select value={formData.priority} onValueChange={value => handleInputChange('priority', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la priorité" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map(priority => <SelectItem key={priority.value} value={priority.value}>
                                {priority.label}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Sujet */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <Input value={formData.subject} onChange={e => handleInputChange('subject', e.target.value)} placeholder="Titre ou sujet de votre suggestion" required />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description détaillée *
                      </label>
                      <Textarea value={formData.description} onChange={e => handleInputChange('description', e.target.value)} placeholder="Décrivez votre suggestion en détail : thème, angle d'approche, objectifs, public cible..." rows={6} required />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 flex items-center mx-auto">
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer ma suggestion
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        
      </div>
    </Layout>;
};
export default Suggestions;

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Send, MessageSquare, BookOpen, Newspaper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Suggestions = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    description: '',
    priority: 'normale'
  });

  const categories = [
    { value: 'blog', label: 'Articles de Blog', icon: MessageSquare },
    { value: 'journal', label: 'Journal Perspectives 49', icon: BookOpen },
    { value: 'actualites', label: 'Actualités', icon: Newspaper },
    { value: 'autre', label: 'Autre', icon: Lightbulb }
  ];

  const priorities = [
    { value: 'faible', label: 'Faible' },
    { value: 'normale', label: 'Normale' },
    { value: 'elevee', label: 'Élevée' },
    { value: 'urgente', label: 'Urgente' }
  ];

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
        variant: "destructive",
      });
      return;
    }

    try {
      // Ici vous pourrez ajouter l'intégration avec Supabase pour enregistrer les suggestions
      console.log('Suggestion soumise:', formData);
      
      toast({
        title: "Suggestion envoyée !",
        description: "Votre suggestion a été transmise avec succès. Nous vous recontacterons bientôt.",
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
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Faire des Suggestions</h1>
            </div>
            <p className="text-xl opacity-90">
              Proposez vos idées pour enrichir notre contenu éditorial
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-6">Votre Voix Compte</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Vous avez des idées d'articles, de sujets à traiter ou de thématiques à développer ? 
                  Partagez vos suggestions avec notre équipe éditoriale. Ensemble, construisons un contenu 
                  qui répond aux attentes et besoins de notre communauté.
                </p>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {categories.slice(0, 3).map((category) => (
                  <Card key={category.value} className="text-center p-4 border-2 border-accent/20 hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <category.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold text-primary mb-2">{category.label}</h3>
                      <p className="text-sm text-gray-600">
                        {category.value === 'blog' && "Proposez des thèmes d'articles de blog"}
                        {category.value === 'journal' && "Suggérez des sujets pour notre journal"}
                        {category.value === 'actualites' && "Signalez des actualités importantes"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Suggestion Form */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-accent/10`}>
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary text-center">
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
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Votre nom complet"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>

                    {/* Catégorie et Priorité */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Catégorie *
                        </label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priorité
                        </label>
                        <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la priorité" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Sujet */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Titre ou sujet de votre suggestion"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description détaillée *
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Décrivez votre suggestion en détail : thème, angle d'approche, objectifs, public cible..."
                        rows={6}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button 
                        type="submit" 
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 flex items-center mx-auto"
                      >
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
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="bg-primary text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Autres Moyens de Contact</h2>
              <p className="mb-6 opacity-90">
                Vous pouvez également nous contacter directement par email ou téléphone
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div>Email : suggestions@perspectives49.ci</div>
                <div>|</div>
                <div>Tél : +225 XX XX XX XX XX</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Suggestions;

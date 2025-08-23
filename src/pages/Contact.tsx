
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ContactMap from '@/components/ContactMap';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insérer le message en base de données
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          ip_address: null, // Peut être ajouté côté serveur si nécessaire
          user_agent: navigator.userAgent
        });

      if (error) {
        throw error;
      }

      // Envoyer l'email de notification
      await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      });

      toast({
        title: "Message envoyé avec succès",
        description: "Nous vous répondrons dans les plus brefs délais."
      });

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className={`relative ${
        isMobile ? 'h-[30vh]' : 'h-[60vh]'
      } flex items-center justify-center text-white overflow-hidden`}>
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png" 
            alt="Background contact" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className={`relative z-10 text-center ${
          isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'
        }`}>
          <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${
            isMobile ? 'text-2xl' : 'text-6xl md:text-6xl lg:text-6xl'
          }`}>
            Contactez-nous
          </h1>
          <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${
            isMobile ? 'text-sm' : 'text-lg md:text-lg'
          }`}>
            Contactez-nous pour toute question ou suggestion. Nous sommes à l'écoute.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className={`py-16 bg-white ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
        <div className={`${isMobile ? 'mx-0 px-0' : 'container mx-auto px-4'}`}>
          {/* Service Info */}
          <div className="flex items-center justify-center space-x-8 mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center text-primary">
              <Clock className="h-6 w-6 mr-3" />
              <span className="text-lg font-medium">Réponse sous 24h</span>
            </div>
            <div className="flex items-center text-primary">
              <Users className="h-6 w-6 mr-3" />
              <span className="text-lg font-medium">Support dédié</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-tight">
                      Email
                    </h3>
                    <div className="space-y-2">
                      <a href="mailto:communication@p49-ena.ci" className="block text-gray-600 hover:text-primary transition-colors text-sm font-medium">
                        communication@p49-ena.ci
                      </a>
                      <a href="mailto:secretariat@p49-ena.ci" className="block text-gray-600 hover:text-primary transition-colors text-sm font-medium">
                        secretariat@p49-ena.ci
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-tight">
                      Téléphone
                    </h3>
                    <div className="space-y-2">
                      <a href="tel:+22501020304050" className="block text-gray-600 hover:text-primary transition-colors text-sm font-medium">
                        +225 01 02 03 04 05
                      </a>
                      <a href="tel:+22506070809000" className="block text-gray-600 hover:text-primary transition-colors text-sm font-medium">
                        +225 06 07 08 09 00
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-tight">
                      Localisation
                    </h3>
                    <ContactMap />
                    <p className="text-gray-600 text-sm font-medium mt-4">
                      Siège de la P49 ENA, Abidjan
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-primary text-2xl mb-2">Envoyez-nous un message</CardTitle>
                  <p className="text-gray-600">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">Nom complet *</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="votre.email@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700 font-medium">Sujet *</Label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        required 
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Sujet de votre message"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-medium">Message *</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        rows={8} 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        className="border-gray-300 focus:border-primary focus:ring-primary resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 w-full py-3 text-lg font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

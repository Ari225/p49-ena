
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

const Contact = () => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais."
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
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
      <div 
        style={{
          backgroundImage: 'url(/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} 
        className={`min-h-[60vh] flex items-center justify-center py-[50px] relative ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className={`font-bold text-white mb-4 ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
            Contactez-nous
          </h1>
          <p className={`text-white mb-6 ${isMobile ? 'text-base' : 'text-lg'} font-normal max-w-2xl mx-auto`}>
            Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute question ou suggestion.
          </p>
          <div className="flex items-center justify-center space-x-6 text-white">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm">Réponse sous 24h</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm">Support dédié</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`py-16 bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
        <div className="container mx-auto px-4">
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
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-secondary" />
                  </div>
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
                    <Button type="submit" className="bg-primary hover:bg-primary/90 w-full py-3 text-lg font-semibold transition-all duration-300 hover:shadow-lg">
                      <Send className="h-5 w-5 mr-2" />
                      Envoyer le message
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

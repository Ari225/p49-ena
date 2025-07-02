
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
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-primary text-xl">Email</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2">
                    <a href="mailto:communication@p49-ena.ci" className="block text-gray-700 hover:text-primary transition-colors">
                      communication@p49-ena.ci
                    </a>
                    <a href="mailto:secretariat@p49-ena.ci" className="block text-gray-700 hover:text-primary transition-colors">
                      secretariat@p49-ena.ci
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-primary text-xl">Téléphone</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2">
                    <a href="tel:+22501020304050" className="block text-gray-700 hover:text-primary transition-colors font-normal">
                      +225 01 02 03 04 05
                    </a>
                    <a href="tel:+22506070809000" className="block text-gray-700 hover:text-primary transition-colors">
                      +225 06 07 08 09 00
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-primary text-xl">Localisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactMap />
                  <p className="text-center text-gray-600 mt-4 text-sm">
                    Siège de la P49 ENA, Abidjan
                  </p>
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

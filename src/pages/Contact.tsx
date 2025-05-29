import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ContactMap from '@/components/ContactMap';
const Contact = () => {
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
  return <Layout>
      <div style={{
      backgroundImage: 'url(/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} className="min-h-[80vh] flex items-center justify-center py-[100px] relative px-[100px]">
        {/* Primary overlay */}
        <div className="absolute inset-0 bg-primary/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-bold text-white mb-4 text-5xl">Contactez-nous</h1>
            <p className="text-white text-lg font-normal">
              Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute question ou suggestion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <Mail className="h-5 w-5" />
                    <span className="text-xl font-semibold text-primary">Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">communication@p49-ena.ci</p>
                  <p className="text-gray-600">secretariat@p49-ena.ci</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <Phone className="h-5 w-5" />
                    <span>Téléphone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">+225 XX XX XX XX</p>
                  <p className="text-gray-600">+225 XX XX XX XX</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <span>Adresse</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Abidjan, Côte d'Ivoire<br />
                    Cocody, Angré
                  </p>
                </CardContent>
              </Card>

              {/* Map Container */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <span>Localisation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactMap />
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary text-xl font-semibold">Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required />
                    </div>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 w-full">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Contact;
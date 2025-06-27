
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

interface PopupItem {
  id: string;
  title: string;
  message: string;
  type: 'welcome' | 'announcement' | 'alert';
  isActive: boolean;
  created_date: string;
}

const DashboardPopups = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [popups, setPopups] = useState<PopupItem[]>([
    {
      id: '1',
      title: 'Message de bienvenue de la Présidente',
      message: 'Bienvenue sur le site du Réseau P49 ENA. Nous sommes ravis de vous accueillir...',
      type: 'welcome',
      isActive: true,
      created_date: '2024-03-20'
    }
  ]);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'announcement' as 'welcome' | 'announcement' | 'alert'
  });

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPopup: PopupItem = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      isActive: false,
      created_date: new Date().toISOString().split('T')[0]
    };

    setPopups([...popups, newPopup]);
    setFormData({ title: '', message: '', type: 'announcement' });
    setShowForm(false);
    
    toast({
      title: "Pop-up créé",
      description: "Le pop-up a été ajouté avec succès"
    });
  };

  const togglePopupStatus = (id: string) => {
    setPopups(popups.map(popup => 
      popup.id === id ? { ...popup, isActive: !popup.isActive } : popup
    ));
  };

  const deletePopup = (id: string) => {
    setPopups(popups.filter(popup => popup.id !== id));
    toast({
      title: "Pop-up supprimé",
      description: "Le pop-up a été supprimé avec succès"
    });
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'welcome':
        return <Badge className="bg-blue-100 text-blue-800">Bienvenue</Badge>;
      case 'announcement':
        return <Badge className="bg-green-100 text-green-800">Annonce</Badge>;
      case 'alert':
        return <Badge className="bg-red-100 text-red-800">Alerte</Badge>;
      default:
        return <Badge variant="secondary">Autre</Badge>;
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des<br />Pop-ups</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les pop-ups du site</p>
          </div>

          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouveau pop-up'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ajouter un pop-up</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input
                      id="title"
                      placeholder="Titre du pop-up"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Contenu du pop-up"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      className="w-full p-2 border rounded-md"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as 'welcome' | 'announcement' | 'alert'})}
                    >
                      <option value="announcement">Annonce</option>
                      <option value="welcome">Bienvenue</option>
                      <option value="alert">Alerte</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">Créer le pop-up</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {popups.map((popup) => (
              <Card key={popup.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeBadge(popup.type)}
                      <Badge variant={popup.isActive ? "default" : "secondary"}>
                        {popup.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(popup.created_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{popup.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{popup.message}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => togglePopupStatus(popup.id)}
                    >
                      {popup.isActive ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                      {popup.isActive ? 'Désactiver' : 'Activer'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 col-span-2"
                      onClick={() => deletePopup(popup.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion des Pop-ups</h1>
            <p className="text-gray-600 mt-2">Gérer les pop-ups du site</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouveau pop-up'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ajouter un pop-up</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre</Label>
                      <Input
                        id="title"
                        placeholder="Titre du pop-up"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <select
                        id="type"
                        className="w-full p-2 border rounded-md"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value as 'welcome' | 'announcement' | 'alert'})}
                      >
                        <option value="announcement">Annonce</option>
                        <option value="welcome">Bienvenue</option>
                        <option value="alert">Alerte</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Contenu du pop-up"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={4}
                    />
                  </div>
                  <Button type="submit">Créer le pop-up</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popups.map((popup) => (
              <Card key={popup.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeBadge(popup.type)}
                      <Badge variant={popup.isActive ? "default" : "secondary"}>
                        {popup.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(popup.created_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{popup.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{popup.message}</p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => togglePopupStatus(popup.id)}
                    >
                      {popup.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => deletePopup(popup.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPopups;

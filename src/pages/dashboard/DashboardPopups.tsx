
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Plus, Edit, Trash2, Eye, EyeOff, Upload, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

interface PopupItem {
  id: string;
  title: string;
  message: string;
  type: 'welcome' | 'announcement' | 'alert';
  isActive: boolean;
  created_date: string;
  image_url?: string;
  display_duration: number; // en secondes
  priority: 'low' | 'medium' | 'high';
  target_audience: 'all' | 'members' | 'admins';
  auto_close: boolean;
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
      created_date: '2024-03-20',
      display_duration: 10,
      priority: 'high',
      target_audience: 'all',
      auto_close: false
    }
  ]);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'announcement' as 'welcome' | 'announcement' | 'alert',
    display_duration: 5,
    priority: 'medium' as 'low' | 'medium' | 'high',
    target_audience: 'all' as 'all' | 'members' | 'admins',
    auto_close: true
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPopup: PopupItem = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      isActive: false,
      created_date: new Date().toISOString().split('T')[0],
      image_url: imagePreview || undefined,
      display_duration: formData.display_duration,
      priority: formData.priority,
      target_audience: formData.target_audience,
      auto_close: formData.auto_close
    };

    setPopups([...popups, newPopup]);
    setFormData({ 
      title: '', 
      message: '', 
      type: 'announcement',
      display_duration: 5,
      priority: 'medium',
      target_audience: 'all',
      auto_close: true
    });
    setSelectedImage(null);
    setImagePreview(null);
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Élevée</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Moyenne</Badge>;
      case 'low':
        return <Badge variant="secondary">Faible</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case 'all':
        return <Badge variant="outline">Tous</Badge>;
      case 'members':
        return <Badge className="bg-purple-100 text-purple-800">Membres</Badge>;
      case 'admins':
        return <Badge className="bg-orange-100 text-orange-800">Admins</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
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
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau pop-up
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un pop-up</DialogTitle>
                </DialogHeader>
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
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value: 'welcome' | 'announcement' | 'alert') => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">Annonce</SelectItem>
                        <SelectItem value="welcome">Bienvenue</SelectItem>
                        <SelectItem value="alert">Alerte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Image (optionnelle)</Label>
                    {!imagePreview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <span className="text-sm text-gray-600">Cliquez pour ajouter une image</span>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée (secondes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        max="60"
                        value={formData.display_duration}
                        onChange={(e) => setFormData({...formData, display_duration: parseInt(e.target.value)})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priorité</Label>
                      <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData({...formData, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="high">Élevée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">Public cible</Label>
                    <Select value={formData.target_audience} onValueChange={(value: 'all' | 'members' | 'admins') => setFormData({...formData, target_audience: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les utilisateurs</SelectItem>
                        <SelectItem value="members">Membres uniquement</SelectItem>
                        <SelectItem value="admins">Administrateurs uniquement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="auto-close"
                      checked={formData.auto_close}
                      onChange={(e) => setFormData({...formData, auto_close: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="auto-close" className="text-sm">Fermeture automatique</Label>
                  </div>

                  <Button type="submit" className="w-full">Créer le pop-up</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {popups.map((popup) => (
              <Card key={popup.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {getTypeBadge(popup.type)}
                      {getPriorityBadge(popup.priority)}
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
                  {popup.image_url && (
                    <img 
                      src={popup.image_url} 
                      alt={popup.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">{popup.message}</p>
                  <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    {getAudienceBadge(popup.target_audience)}
                    <Badge variant="outline">{popup.display_duration}s</Badge>
                    {popup.auto_close && <Badge variant="outline">Auto-fermeture</Badge>}
                  </div>
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
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau pop-up
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un pop-up</DialogTitle>
                </DialogHeader>
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
                      <Select value={formData.type} onValueChange={(value: 'welcome' | 'announcement' | 'alert') => setFormData({...formData, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="announcement">Annonce</SelectItem>
                          <SelectItem value="welcome">Bienvenue</SelectItem>
                          <SelectItem value="alert">Alerte</SelectItem>
                        </SelectContent>
                      </Select>
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

                  <div className="space-y-2">
                    <Label>Image (optionnelle)</Label>
                    {!imagePreview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <span className="text-sm text-gray-600">Cliquez pour ajouter une image</span>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée d'affichage (secondes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        max="60"
                        value={formData.display_duration}
                        onChange={(e) => setFormData({...formData, display_duration: parseInt(e.target.value)})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priorité</Label>
                      <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData({...formData, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="high">Élevée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="audience">Public cible</Label>
                      <Select value={formData.target_audience} onValueChange={(value: 'all' | 'members' | 'admins') => setFormData({...formData, target_audience: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les utilisateurs</SelectItem>
                          <SelectItem value="members">Membres uniquement</SelectItem>
                          <SelectItem value="admins">Administrateurs uniquement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="auto-close"
                      checked={formData.auto_close}
                      onChange={(e) => setFormData({...formData, auto_close: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="auto-close">Fermeture automatique après la durée définie</Label>
                  </div>

                  <Button type="submit" className="w-full">Créer le pop-up</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popups.map((popup) => (
              <Card key={popup.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {getTypeBadge(popup.type)}
                      {getPriorityBadge(popup.priority)}
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
                  {popup.image_url && (
                    <img 
                      src={popup.image_url} 
                      alt={popup.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <p className="text-gray-600 mb-3 text-sm line-clamp-3">{popup.message}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getAudienceBadge(popup.target_audience)}
                    <Badge variant="outline">{popup.display_duration}s</Badge>
                    {popup.auto_close && <Badge variant="outline">Auto-fermeture</Badge>}
                  </div>
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

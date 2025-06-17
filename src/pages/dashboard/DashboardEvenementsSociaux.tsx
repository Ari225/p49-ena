
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PartyPopper, Plus, Edit, Trash2, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  eventType: z.string().min(1, 'Le type d\'événement est requis'),
  category: z.string().min(1, 'La catégorie est requise'),
  title: z.string().min(1, 'L\'intitulé de l\'événement est requis'),
  memberName: z.string().min(1, 'Le nom du concerné est requis'),
  yearsOfService: z.string().optional(),
  date: z.string().min(1, 'La date est requise'),
  location: z.string().min(1, 'La localité est requise'),
  description: z.string().min(1, 'La description est requise'),
  thought: z.string().min(1, 'La pensée est requise'),
  keyword: z.string().optional(),
});

interface Event {
  id: string;
  eventType: string;
  category: string;
  title: string;
  memberName: string;
  yearsOfService?: string;
  date: string;
  location: string;
  description: string;
  thought: string;
  keyword: string;
}

const eventTypeCategories = {
  'Heureux': ['Naissances', 'Promotions', 'Distinctions', 'Autres'],
  'Retraite': ['Retraite'],
  'Malheureux': ['Décès', 'Maladies', 'Accidents', 'Autres']
};

const DashboardEvenementsSociaux = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      eventType: 'Heureux',
      category: 'Naissances',
      title: 'Naissance de bébé Marie',
      memberName: 'Famille Kouassi',
      date: '2024-01-15',
      location: 'Abidjan',
      description: 'Nous avons la joie d\'annoncer la naissance de Marie.',
      thought: 'Félicitations aux heureux parents !',
      keyword: 'Naissances'
    },
    {
      id: '2',
      eventType: 'Retraite',
      category: 'Retraite',
      title: 'Départ en retraite de M. Koffi',
      memberName: 'M. Jean Koffi',
      yearsOfService: '35 ans de service',
      date: '2024-02-01',
      location: 'Bouaké',
      description: 'Après 35 années de service dévoué, M. Koffi prend sa retraite.',
      thought: 'Nous lui souhaitons une retraite heureuse et épanouie !',
      keyword: 'Retraite'
    }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: '',
      category: '',
      title: '',
      memberName: '',
      yearsOfService: '',
      date: '',
      location: '',
      description: '',
      thought: '',
      keyword: '',
    },
  });

  const watchedEventType = form.watch('eventType');
  const watchedCategory = form.watch('category');

  // Auto-set keyword based on category
  React.useEffect(() => {
    if (watchedCategory) {
      form.setValue('keyword', watchedCategory);
    }
  }, [watchedCategory, form]);

  console.log('DashboardEvenementsSociaux rendered, user:', user);
  console.log('Events:', events);

  if (!user) {
    console.log('No user found');
    return <div>Chargement...</div>;
  }

  if (user.role !== 'admin') {
    console.log('User is not admin:', user.role);
    return <div>Non autorisé - Accès réservé aux administrateurs</div>;
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form submitted with values:', values);
    const newEvent: Event = {
      id: Date.now().toString(),
      eventType: values.eventType,
      category: values.category,
      title: values.title,
      memberName: values.memberName,
      yearsOfService: values.yearsOfService || '',
      date: values.date,
      location: values.location,
      description: values.description,
      thought: values.thought,
      keyword: values.keyword || values.category,
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
    form.reset();
    console.log('Nouvel événement social ajouté:', newEvent);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting event with id:', id);
    setEvents(events.filter(event => event.id !== id));
  };

  const renderForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de l'événement</FormLabel>
              <Select onValueChange={(value) => {
                field.onChange(value);
                form.setValue('category', ''); // Reset category when event type changes
              }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type d'événement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Heureux">Heureux</SelectItem>
                  <SelectItem value="Retraite">Retraite</SelectItem>
                  <SelectItem value="Malheureux">Malheureux</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchedEventType && (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {eventTypeCategories[watchedEventType as keyof typeof eventTypeCategories]?.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intitulé de l'événement</FormLabel>
              <FormControl>
                <Input placeholder="ex: Naissance de bébé Marie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memberName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du concerné</FormLabel>
              <FormControl>
                <Input placeholder="ex: Famille Kouassi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchedEventType === 'Retraite' && (
          <FormField
            control={form.control}
            name="yearsOfService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Années de service</FormLabel>
                <FormControl>
                  <Input placeholder="ex: 35 ans de service" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="date"
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localité</FormLabel>
              <FormControl>
                <Input placeholder="ex: Abidjan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="ex: Nous avons la joie d'annoncer la naissance de Marie." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thought"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pensée</FormLabel>
              <FormControl>
                <Textarea placeholder="ex: Félicitations aux heureux parents !" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchedCategory && (
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot-clé (automatique)</FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-gray-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">Publier l'événement</Button>
      </form>
    </Form>
  );

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion Événements<br />Sociaux</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les événements sociaux</p>
          </div>

          <div className="mb-4">
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un événement social</DialogTitle>
                </DialogHeader>
                {renderForm()}
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <PartyPopper className="w-5 h-5 mr-2" />
                    {event.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {event.memberName}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <p className="text-sm mb-1"><strong>Type:</strong> {event.eventType}</p>
                  <p className="text-sm mb-1"><strong>Catégorie:</strong> {event.category}</p>
                  {event.yearsOfService && <p className="text-sm mb-1"><strong>Années de service:</strong> {event.yearsOfService}</p>}
                  <p className="text-sm mb-1"><strong>Pensée:</strong> {event.thought}</p>
                  <p className="text-sm mb-4"><strong>Mot-clé:</strong> {event.keyword}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600"
                      onClick={() => handleDelete(event.id)}
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
            <h1 className="text-3xl font-bold text-primary">Gestion Événements Sociaux</h1>
            <p className="text-gray-600 mt-2">Gérer les événements sociaux et activités conviviales</p>
          </div>

          <div className="mb-6">
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel événement social
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un événement social</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4">
                  {renderForm()}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PartyPopper className="w-5 h-5 mr-2" />
                    {event.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {event.memberName}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <p className="text-sm mb-1"><strong>Type:</strong> {event.eventType}</p>
                  <p className="text-sm mb-1"><strong>Catégorie:</strong> {event.category}</p>
                  {event.yearsOfService && <p className="text-sm mb-1"><strong>Années de service:</strong> {event.yearsOfService}</p>}
                  <p className="text-sm mb-1"><strong>Pensée:</strong> {event.thought}</p>
                  <p className="text-sm mb-4"><strong>Mot-clé:</strong> {event.keyword}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600"
                      onClick={() => handleDelete(event.id)}
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
      </div>
    </Layout>
  );
};

export default DashboardEvenementsSociaux;

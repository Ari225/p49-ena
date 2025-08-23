import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Check, Mail } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string;
  statut?: string;
}

const DashboardMessaging = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: contactData, error: contactError } = await supabase
        .rpc('get_contact_messages');

      if (contactError) throw contactError;

      setContacts(contactData || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin(user)) {
      fetchData();
    }
  }, [user]);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const deleteContact = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir ignorer ce message ? Il sera définitivement supprimé.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Succès",
        description: "Message ignoré et supprimé"
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le message",
        variant: "destructive"
      });
    }
  };

  const markAsHandled = async (id: string) => {
    try {
      console.log('Tentative de marquage comme géré pour l\'ID:', id);
      console.log('Utilisateur actuel:', user);
      
      const { data, error } = await supabase
        .from('contacts')
        .update({ statut: 'géré' })
        .eq('id', id)
        .select();

      console.log('Résultat de l\'update:', { data, error });

      if (error) {
        console.error('Erreur détaillée:', error);
        throw error;
      }

      console.log('Data après update:', data);

      // Vérifier que la mise à jour a bien eu lieu
      const { data: checkData, error: checkError } = await supabase
        .from('contacts')
        .select('id, statut')
        .eq('id', id);
      
      console.log('Vérification après update:', { checkData, checkError });

      // Recharger toute la liste depuis la base
      await fetchData();
      
      toast({
        title: "Succès",
        description: "Message marqué comme géré"
      });
    } catch (error) {
      console.error('Error marking contact as handled:', error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer le message comme géré",
        variant: "destructive"
      });
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Messagerie
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les messages de contact</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Liste des messages ({contacts.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : (
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun message reçu</p>
                  </CardContent>
                </Card>
              ) : (
                contacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base font-semibold">{contact.name}</CardTitle>
                          <p className="text-xs text-gray-600">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-xs text-gray-600">{contact.phone}</p>
                          )}
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {contact.subject}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {format(new Date(contact.created_at), 'dd/MM/yyyy')}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-700 whitespace-pre-wrap mb-4">
                        {contact.message}
                      </p>
                      
                      {contact.statut === 'géré' ? (
                        <div className="flex justify-end">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Géré
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => markAsHandled(contact.id)}
                            className="h-8 w-8 text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => deleteContact(contact.id)}
                            className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Messagerie</h1>
            <p className="text-gray-600 mt-2">Gérer les messages de contact</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Liste des messages ({contacts.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : (
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun message reçu</p>
                  </CardContent>
                </Card>
              ) : (
                contacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold">{contact.name}</CardTitle>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                          )}
                          <Badge variant="secondary" className="mt-2">
                            {contact.subject}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {format(new Date(contact.created_at), 'dd/MM/yyyy')}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mb-4">
                        {contact.message}
                      </p>
                      
                      {contact.statut === 'géré' ? (
                        <div className="flex justify-end">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Géré
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => markAsHandled(contact.id)}
                            className="h-9 w-9 text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => deleteContact(contact.id)}
                            className="h-9 w-9 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
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
            <h1 className="text-3xl font-bold text-primary">Messagerie</h1>
            <p className="text-gray-600 mt-2">Gérer les messages de contact</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Liste des messages ({contacts.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contacts.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun message reçu</p>
                  </CardContent>
                </Card>
              ) : (
                contacts.map((contact) => (
                  <Card key={contact.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                    <CardHeader className="flex-shrink-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-semibold">{contact.name}</CardTitle>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                          )}
                          <Badge variant="secondary" className="mt-2">
                            {contact.subject}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {format(new Date(contact.created_at), 'dd/MM/yyyy')}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-base text-gray-700 whitespace-pre-wrap mb-4">
                        {contact.message}
                      </p>
                      
                      {contact.statut === 'géré' ? (
                        <div className="flex justify-end">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm">
                            Géré
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex gap-3 justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => markAsHandled(contact.id)}
                            className="h-10 w-10 text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Check className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => deleteContact(contact.id)}
                            className="h-10 w-10 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardMessaging;
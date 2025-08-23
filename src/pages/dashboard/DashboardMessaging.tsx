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
  status?: string;
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
      console.log('🔄 Appel de get_contact_messages...');
      const { data: contactData, error: contactError } = await supabase
        .rpc('get_contact_messages');

      if (contactError) throw contactError;

      console.log('📋 Données reçues:', contactData);
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
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer définitivement ce message ?')) {
      return;
    }

    try {
      console.log('🗑️ Suppression du message ID:', id);
      
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('✅ Suppression réussie, rechargement...');
      
      // Recharger la liste
      await fetchData();
      
      toast({
        title: "Succès",
        description: "Message supprimé définitivement"
      });
    } catch (error) {
      console.error('❌ Erreur suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le message",
        variant: "destructive"
      });
    }
  };

  const markAsHandled = async (id: string) => {
    try {
      console.log('🔄 Marquage comme géré pour l\'ID:', id);
      
      // Trouver le contact dans la liste actuelle
      const currentContact = contacts.find(c => c.id === id);
      console.log('📋 Contact actuel avant update:', currentContact);
      
      const { data, error } = await supabase
        .from('contacts')
        .update({ status: 'géré' })
        .eq('id', id)
        .select();

      if (error) {
        console.error('❌ Erreur update:', error);
        throw error;
      }

      console.log('✅ Update réussi, données retournées:', data);
      
      // Attendre un petit délai pour être sûr que la transaction est commitée
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('🔄 Rechargement des données...');
      // Recharger la liste complète
      await fetchData();
      
      toast({
        title: "Succès",
        description: "Message marqué comme géré et placé en bas de la liste"
      });
    } catch (error) {
      console.error('❌ Erreur complète:', error);
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
                      
                      {contact.status === 'géré' ? (
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
                      
                      {contact.status === 'géré' ? (
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
                      
                      {contact.status === 'géré' ? (
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
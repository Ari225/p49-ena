import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Mail, MessageSquare, Reply, Send } from 'lucide-react';
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
}

const DashboardMessaging = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

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

  const handleReply = (contactId: string) => {
    setReplyingTo(contactId);
    setReplyMessage('');
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyMessage('');
  };

  const sendReply = async (contact: Contact) => {
    if (!replyMessage.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un message de réponse",
        variant: "destructive"
      });
      return;
    }

    setSendingReply(true);
    try {
      const { error } = await supabase.functions.invoke('send-reply-email', {
        body: {
          to: contact.email,
          subject: contact.subject,
          replyMessage: replyMessage,
          originalMessage: contact.message,
          senderName: contact.name
        }
      });

      if (error) throw error;

      // Supprimer le message après envoi de la réponse
      await deleteContact(contact.id);
      
      setReplyingTo(null);
      setReplyMessage('');
      
      toast({
        title: "Succès",
        description: "Réponse envoyée avec succès"
      });
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la réponse",
        variant: "destructive"
      });
    } finally {
      setSendingReply(false);
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
                      
                      {replyingTo === contact.id ? (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Saisissez votre réponse..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="text-xs"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => sendReply(contact)}
                              disabled={sendingReply}
                              className="text-xs"
                            >
                              <Send className="h-3 w-3 mr-1" />
                              {sendingReply ? 'Envoi...' : 'Envoyer'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={cancelReply}
                              className="text-xs"
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReply(contact.id)}
                            className="text-xs"
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Répondre
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteContact(contact.id)}
                            className="text-red-600 text-xs"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Ignorer
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
                      
                      {replyingTo === contact.id ? (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Saisissez votre réponse..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="text-sm"
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => sendReply(contact)}
                              disabled={sendingReply}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              {sendingReply ? 'Envoi...' : 'Envoyer'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={cancelReply}
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReply(contact.id)}
                          >
                            <Reply className="h-4 w-4 mr-1" />
                            Répondre
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteContact(contact.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Ignorer
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
                      
                      {replyingTo === contact.id ? (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Saisissez votre réponse..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => sendReply(contact)}
                              disabled={sendingReply}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              {sendingReply ? 'Envoi en cours...' : 'Envoyer la réponse'}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={cancelReply}
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => handleReply(contact.id)}
                          >
                            <Reply className="h-4 w-4 mr-2" />
                            Répondre
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => deleteContact(contact.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Ignorer
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
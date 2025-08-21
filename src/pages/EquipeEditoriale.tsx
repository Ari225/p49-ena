import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Briefcase, Crown, Shield, Edit } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { AppUser } from '@/types/user';

const EquipeEditoriale = () => {
  const isMobile = useIsMobile();
  const [editorialTeam, setEditorialTeam] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditorialTeam = async () => {
      try {
        const { data, error } = await supabase.rpc('get_editorial_team');
        
        if (error) {
          console.error('Erreur lors de la récupération de l\'équipe éditoriale:', error);
          return;
        }
        
        setEditorialTeam(data || []);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEditorialTeam();
  }, []);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin_principal':
        return <Crown className="h-5 w-5" />;
      case 'admin_secondaire':
        return <Shield className="h-5 w-5" />;
      case 'redacteur':
        return <Edit className="h-5 w-5" />;
      default:
        return <Edit className="h-5 w-5" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin_principal':
        return 'Administrateur Principal';
      case 'admin_secondaire':
        return 'Administrateur Secondaire';
      case 'redacteur':
        return 'Rédacteur';
      default:
        return 'Rédacteur';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin_principal':
        return 'text-purple-700';
      case 'admin_secondaire':
        return 'text-red-700';
      case 'redacteur':
        return 'text-blue-700';
      default:
        return 'text-blue-700';
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/archives.webp" 
              alt="Background équipe éditoriale" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-2 md:mb-4 animate-fade-in`}>
              Équipe éditoriale
            </h1>
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} italic mb-4 md:mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Rencontrez l'équipe qui donne vie à Perspectives 49
            </p>
          </div>
        </section>

        {/* Team Introduction */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">Notre Mission</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                L'équipe éditoriale de Perspectives 49 s'engage à produire un contenu de qualité, 
                informatif et engagé. Composée de professionnels expérimentés issus du réseau P49, 
                notre équipe apporte une expertise unique dans les domaines de l'administration publique, 
                du journalisme et de la communication institutionnelle.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-accent/10`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">Nos Membres</h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Chargement de l'équipe...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {editorialTeam.map((member) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold border-4 border-primary/20">
                          {member.image_url ? (
                            <img 
                              src={member.image_url} 
                              alt={`${member.first_name} ${member.last_name}`}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            `${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-1">
                          {member.first_name} {member.last_name}
                        </h3>
                        <div className={`flex items-center justify-center gap-2 mb-2 ${getRoleColor(member.role)} font-semibold`}>
                          {getRoleIcon(member.role)}
                          <span>{getRoleLabel(member.role)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600 justify-center">
                          <Mail className="h-4 w-4 mr-2 text-primary" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        <div className="text-center">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            @{member.username}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {editorialTeam.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-600">Aucun membre de l'équipe éditoriale trouvé.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="bg-primary text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Rejoignez Notre Équipe</h2>
              <p className="mb-6 opacity-90">
                Vous souhaitez contribuer à Perspectives 49 ? Nous recherchons constamment 
                des talents passionnés pour enrichir notre équipe éditoriale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>redaction@perspectives49.ci</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span>Candidatures ouvertes</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EquipeEditoriale;

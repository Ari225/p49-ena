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
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Chargement de l'équipe...</p>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Administrateurs */}
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-12 text-center">Administrateurs</h2>
                  {(() => {
                    const admins = editorialTeam.filter((member) => member.role === 'admin_principal' || member.role === 'admin_secondaire');
                    const memberCount = admins.length;
                    
                    let gridClass = '';
                    if (isMobile) {
                      gridClass = 'grid grid-cols-1 gap-4 justify-items-center max-w-sm mx-auto';
                    } else if (memberCount === 1) {
                      gridClass = 'grid grid-cols-1 justify-items-center';
                    } else if (memberCount === 2) {
                      gridClass = 'grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-4 md:gap-y-6 justify-items-center max-w-2xl mx-auto';
                    } else if (memberCount === 3) {
                      gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-4 md:gap-y-6 justify-items-center max-w-4xl mx-auto';
                    } else {
                      gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-4 md:gap-y-6 justify-items-center max-w-6xl mx-auto';
                    }

                    return (
                      <div className={gridClass}>
                        {admins.map((member) => (
                          <div key={member.id} className={isMobile ? 'w-full max-w-sm' : ''}>
                            <Card className={`group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-white/95 backdrop-blur-sm ${isMobile ? '' : 'h-[200px] w-[280px] max-w-[280px]'}`}>
                              <CardContent className={`${isMobile ? 'p-3' : 'p-6'} h-full flex flex-col justify-center`}>
                                <div className="text-center space-y-2">
                                  <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-lg'} text-gray-900 group-hover:text-primary transition-colors leading-tight`}>
                                    {member.first_name} {member.last_name}
                                  </h3>
                                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 font-medium leading-snug px-1`}>
                                    {getRoleLabel(member.role)}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                        {admins.length === 0 && (
                          <div className="col-span-full text-center py-12">
                            <p className="text-gray-600">Aucun administrateur trouvé.</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Rédacteurs */}
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-12 text-center">Rédacteurs</h2>
                  {(() => {
                    const redacteurs = editorialTeam.filter((member) => member.role === 'redacteur');
                    const memberCount = redacteurs.length;
                    
                    let gridClass = '';
                    if (isMobile) {
                      gridClass = 'grid grid-cols-1 gap-4 justify-items-center max-w-sm mx-auto';
                    } else if (memberCount === 1) {
                      gridClass = 'grid grid-cols-1 justify-items-center';
                    } else if (memberCount === 2) {
                      gridClass = 'grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-4 md:gap-y-6 justify-items-center max-w-2xl mx-auto';
                    } else if (memberCount === 3) {
                      gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-4 md:gap-y-6 justify-items-center max-w-4xl mx-auto';
                    } else {
                      gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-4 md:gap-y-6 justify-items-center max-w-6xl mx-auto';
                    }

                    return (
                      <div className={gridClass}>
                        {redacteurs.map((member) => (
                          <div key={member.id} className={isMobile ? 'w-full max-w-sm' : ''}>
                            <Card className={`group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-white/95 backdrop-blur-sm ${isMobile ? '' : 'h-[200px] w-[280px] max-w-[280px]'}`}>
                              <CardContent className={`${isMobile ? 'p-3' : 'p-6'} h-full flex flex-col justify-center`}>
                                <div className="text-center space-y-2">
                                  <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-lg'} text-gray-900 group-hover:text-primary transition-colors leading-tight`}>
                                    {member.first_name} {member.last_name}
                                  </h3>
                                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 font-medium leading-snug px-1`}>
                                    {getRoleLabel(member.role)}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                        {redacteurs.length === 0 && (
                          <div className="col-span-full text-center py-12">
                            <p className="text-gray-600">Aucun rédacteur trouvé.</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EquipeEditoriale;

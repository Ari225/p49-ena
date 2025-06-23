import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Briefcase } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EquipeEditoriale = () => {
  const isMobile = useIsMobile();
  
  const editorialTeam = [
    {
      name: "Dr. Marie KOUAME",
      role: "Rédactrice en Chef",
      bio: "Docteure en Sciences Politiques, spécialisée en administration publique. Plus de 15 ans d'expérience dans le journalisme institutionnel.",
      email: "marie.kouame@p49.ci",
      phone: "+225 07 xx xx xx xx",
      image: "/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png"
    },
    {
      name: "Jean-Baptiste ASSI",
      role: "Rédacteur en Chef Adjoint",
      bio: "Journaliste professionnel, ancien correspondant de presse. Expert en communication institutionnelle et relations publiques.",
      email: "jb.assi@p49.ci",
      phone: "+225 05 xx xx xx xx",
      image: "/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png"
    },
    {
      name: "Fatou DIABATE",
      role: "Responsable Editorial",
      bio: "Spécialiste en communication digitale et gestion de contenu. Coordonne la production éditoriale et supervise la ligne éditoriale.",
      email: "fatou.diabate@p49.ci",
      phone: "+225 01 xx xx xx xx",
      image: "/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png"
    },
    {
      name: "Kouadio MENSAH",
      role: "Rédacteur Senior",
      bio: "Ancien fonctionnaire, expert en administration publique. Spécialisé dans les articles sur les réformes et modernisation de l'État.",
      email: "kouadio.mensah@p49.ci",
      phone: "+225 09 xx xx xx xx",
      image: "/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png"
    },
    {
      name: "Aminata TRAORE",
      role: "Rédactrice",
      bio: "Journaliste spécialisée dans les questions sociales et de développement. Couvre les actualités relatives aux politiques publiques.",
      email: "aminata.traore@p49.ci",
      phone: "+225 03 xx xx xx xx",
      image: "/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png"
    },
    {
      name: "Pascal KONE",
      role: "Photographe & Designer",
      bio: "Responsable de l'identité visuelle du journal. Conception graphique et photographies officielles des événements du réseau.",
      email: "pascal.kone@p49.ci",
      phone: "+225 02 xx xx xx xx",
      image: "/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png"
    }
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png" 
              alt="Background équipe éditoriale" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-2 md:mb-4 animate-fade-in`}>
              Équipe Éditoriale
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {editorialTeam.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                      />
                      <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                      <p className="text-secondary font-semibold mb-3">{member.role}</p>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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

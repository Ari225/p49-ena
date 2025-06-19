
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const CommissairesSection = () => {
  const isMobile = useIsMobile();
  
  const commissaires = [
    {
      title: "Commissaires aux Comptes",
      members: [
        { name: "BONI Tanoh Jean-Baptiste", role: "Premier Commissaire aux Comptes", phone: "0707035450" },
        { name: "KOFFI Ahou Solange", role: "Deuxième Commissaire aux Comptes", phone: "0707617838" }
      ]
    }
  ];

  return (
    <section className={`${isMobile ? 'p-4' : 'p-8'} relative`}>
      <div className="relative z-10">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center ${isMobile ? 'mb-6' : 'mb-8'} text-primary`}>
          Commissaires aux Comptes
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {commissaires.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {section.members.map((member, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-primary mb-2`}>
                        {member.name}
                      </CardTitle>
                      <div className="bg-primary/10 rounded-lg p-3">
                        <p className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-primary`}>
                          {member.role}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>📞</span>
                        <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>{member.phone}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommissairesSection;


import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import TestimonialFormDialog from '@/components/testimonials/TestimonialFormDialog';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardTemoignages = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const mockTestimonials = [
    {
      id: '1',
      name: 'Dr. Kouassi Marie',
      position: 'Directrice Générale, Ministère de l\'Économie',
      content: 'Le réseau P49 m\'a permis de développer mes compétences et de créer des liens durables avec des professionnels exceptionnels. C\'est une communauté qui valorise l\'excellence et l\'entraide.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b047?w=100&h=100&fit=crop&crop=face',
      date: '2024-03-15'
    },
    {
      id: '2',
      name: 'M. Yao Jean-Baptiste',
      position: 'Préfet de Région',
      content: 'Une communauté exceptionnelle qui favorise l\'excellence dans le service public. Les formations et les échanges nous permettent de mieux servir nos concitoyens.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      date: '2024-03-10'
    },
    {
      id: '3',
      name: 'Mme. Touré Fatou',
      position: 'Directrice des Ressources Humaines',
      content: 'L\'entraide et la solidarité de la P49 sont remarquables. Un vrai réseau de soutien qui nous accompagne dans nos défis professionnels et personnels.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      date: '2024-03-08'
    },
    {
      id: '4',
      name: 'Dr. Diallo Mamadou',
      position: 'Conseiller du Président',
      content: 'La formation continue proposée par le réseau est de très haute qualité. Elle nous permet de rester à la pointe des meilleures pratiques administratives.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: '2024-03-05'
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (formData: any) => {
    console.log('Nouveau témoignage:', formData);
    // TODO: Implement actual submission logic
  };

  const handleEdit = (testimonial: any) => {
    console.log('Modifier témoignage:', testimonial);
    // TODO: Implement edit logic
  };

  const handleDelete = (id: string) => {
    console.log('Supprimer témoignage:', id);
    // TODO: Implement delete logic
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des<br />Témoignages</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les témoignages des membres</p>
          </div>

          <div className="mb-6">
            <TestimonialFormDialog onSubmit={handleSubmit} />
          </div>

          <div className="space-y-4">
            {mockTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Témoignages</h1>
            <p className="text-gray-600 mt-2">Gérer les témoignages des membres</p>
          </div>

          <div className="mb-6">
            <TestimonialFormDialog onSubmit={handleSubmit} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardTemoignages;

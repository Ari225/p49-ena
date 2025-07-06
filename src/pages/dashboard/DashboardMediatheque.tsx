
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import MediaFormDialog from '@/components/media/MediaFormDialog';
import MediaCard from '@/components/media/MediaCard';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardMediatheque = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const mockMedia = [
    {
      id: '1',
      title: 'Discours du Président - Assemblée Générale 2024',
      type: 'Vidéo',
      category: 'Événements',
      description: 'Allocution du président lors de l\'AG annuelle. Un moment historique qui marque les grandes orientations de notre réseau pour l\'année à venir.',
      url: 'https://example.com/video1',
      date: '2024-03-20',
      tags: ['AG', 'Président', 'Discours', 'Orientations']
    },
    {
      id: '2',
      title: 'Galerie Photos - Séminaire Leadership',
      type: 'Images',
      category: 'Formation',
      description: 'Collection de photos du séminaire sur le leadership administratif organisé pour les membres de la P49.',
      url: 'https://example.com/gallery1',
      date: '2024-03-15',
      tags: ['Leadership', 'Formation', 'Photos', 'Séminaire']
    },
    {
      id: '3',
      title: 'Rapport Annuel 2023',
      type: 'Document',
      category: 'Archives',
      description: 'Document complet présentant les activités, réalisations et perspectives du réseau P49 pour l\'année 2023.',
      url: 'https://example.com/report2023',
      date: '2024-02-28',
      tags: ['Rapport', 'Annuel', '2023', 'Bilan']
    },
    {
      id: '4',
      title: 'Cérémonie de Remise des Prix',
      type: 'Vidéo',
      category: 'Événements',
      description: 'Vidéo complète de la cérémonie de remise des prix d\'excellence aux membres méritants.',
      url: 'https://example.com/ceremony',
      date: '2024-02-15',
      tags: ['Cérémonie', 'Prix', 'Excellence', 'Mérite']
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (formData: any) => {
    console.log('Nouveau média:', formData);
    // TODO: Implement actual submission logic
  };

  const handleEdit = (media: any) => {
    console.log('Modifier média:', media);
    // TODO: Implement edit logic
  };

  const handleDelete = (id: string) => {
    console.log('Supprimer média:', id);
    // TODO: Implement delete logic
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-4 py-6 pb-20 min-h-screen">
          <div className="mb-6 max-w-full">
            <h1 className="text-2xl font-bold text-primary leading-tight">
              Gestion de la<br />Médiathèque
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les contenus multimédias</p>
          </div>

          <div className="mb-6">
            <MediaFormDialog onSubmit={handleSubmit} />
          </div>

          <div className="space-y-4">
            {mockMedia.map((media) => (
              <div key={media.id} className="w-full">
                <MediaCard
                  media={media}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex min-h-screen">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-6 overflow-hidden">
          <div className="mb-8 max-w-full">
            <h1 className="text-3xl font-bold text-primary">Gestion de la Médiathèque</h1>
            <p className="text-gray-600 mt-2">Gérer les contenus multimédias (vidéos, photos, documents)</p>
          </div>

          <div className="mb-6">
            <MediaFormDialog onSubmit={handleSubmit} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {mockMedia.map((media) => (
              <div key={media.id} className="min-w-0">
                <MediaCard
                  media={media}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardMediatheque;

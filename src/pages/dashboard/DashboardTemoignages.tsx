
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialEditDialog from '@/components/testimonials/TestimonialEditDialog';
import TestimonialDeleteDialog from '@/components/testimonials/TestimonialDeleteDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import { useTestimonials, Testimonial } from '@/hooks/useTestimonials';

const DashboardTemoignages = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { testimonials, loading, updateTestimonial, deleteTestimonial } = useTestimonials();
  
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null);
  const [deleteTestimonialData, setDeleteTestimonialData] = useState<Testimonial | null>(null);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditTestimonial(testimonial);
  };

  const handleDelete = (testimonial: Testimonial) => {
    setDeleteTestimonialData(testimonial);
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des<br />Témoignages</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les témoignages des membres</p>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement des témoignages...</div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={{
                    id: testimonial.id,
                    name: testimonial.member_name,
                    position: testimonial.member_position,
                    content: testimonial.content,
                    image: testimonial.image_url || '',
                    date: new Date(testimonial.created_at).toLocaleDateString('fr-FR')
                  }}
                  onEdit={() => handleEdit(testimonial)}
                  onDelete={() => handleDelete(testimonial)}
                />
              ))}
              {testimonials.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucun témoignage enregistré
                </div>
              )}
            </div>
          )}
        </div>
        <AdminSidebar />
        
        <TestimonialEditDialog
          testimonial={editTestimonial}
          open={!!editTestimonial}
          onOpenChange={(open) => !open && setEditTestimonial(null)}
          onSave={updateTestimonial}
        />
        
        <TestimonialDeleteDialog
          testimonial={deleteTestimonialData}
          open={!!deleteTestimonialData}
          onOpenChange={(open) => !open && setDeleteTestimonialData(null)}
          onConfirm={deleteTestimonial}
        />
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

          {loading ? (
            <div className="text-center py-8">Chargement des témoignages...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={{
                    id: testimonial.id,
                    name: testimonial.member_name,
                    position: testimonial.member_position,
                    content: testimonial.content,
                    image: testimonial.image_url || '',
                    date: new Date(testimonial.created_at).toLocaleDateString('fr-FR')
                  }}
                  onEdit={() => handleEdit(testimonial)}
                  onDelete={() => handleDelete(testimonial)}
                />
              ))}
              {testimonials.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucun témoignage enregistré
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <TestimonialEditDialog
        testimonial={editTestimonial}
        open={!!editTestimonial}
        onOpenChange={(open) => !open && setEditTestimonial(null)}
        onSave={updateTestimonial}
      />
      
      <TestimonialDeleteDialog
        testimonial={deleteTestimonialData}
        open={!!deleteTestimonialData}
        onOpenChange={(open) => !open && setDeleteTestimonialData(null)}
        onConfirm={deleteTestimonial}
      />
    </Layout>
  );
};

export default DashboardTemoignages;

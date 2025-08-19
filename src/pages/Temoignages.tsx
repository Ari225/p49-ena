import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TestimonialVerificationDialog from '@/components/testimonials/TestimonialVerificationDialog';
import CreateTestimonialDialog from '@/components/testimonials/CreateTestimonialDialog';
import { Search, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
const Temoignages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [verifiedMatricule, setVerifiedMatricule] = useState('');

  // Charger les témoignages depuis la base de données
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des témoignages:', error);
        return;
      }

      setTestimonials(data || []);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = (matricule: string) => {
    setVerifiedMatricule(matricule);
    setShowVerificationDialog(false);
    setShowCreateDialog(true);
  };

  const handleTestimonialSuccess = () => {
    loadTestimonials();
    setShowCreateDialog(false);
    setVerifiedMatricule('');
  };

  const filteredTestimonials = testimonials.filter(testimonial => 
    testimonial.member_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className="bg-primary text-white py-16 px-[100px]">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Témoignages</h1>
            <p className="text-xl opacity-90">
              Découvrez ce que nos membres disent de leur expérience au sein de la P49
            </p>
          </div>
        </section>

        {/* Search and Actions Section */}
        <section className="py-8 px-[100px] bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="max-w-md mx-auto md:mx-0 relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="Rechercher par nom..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <Button 
                onClick={() => setShowVerificationDialog(true)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un témoignage
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-12 px-[100px]">
          <div className="container mx-auto px-0">
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredTestimonials.length} témoignage{filteredTestimonials.length > 1 ? 's' : ''} trouvé{filteredTestimonials.length > 1 ? 's' : ''}
              </p>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Chargement des témoignages...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start space-x-4 mb-4">
                        {testimonial.image_url ? (
                          <img 
                            src={testimonial.image_url} 
                            alt={testimonial.member_name} 
                            className="w-16 h-16 rounded-full object-cover flex-shrink-0" 
                          />
                        ) : (
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-semibold text-lg">
                              {testimonial.member_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-primary">{testimonial.member_name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.member_position}</p>
                        </div>
                      </div>
                      <p className="italic text-gray-700 flex-1">"{testimonial.content}"</p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {filteredTestimonials.length === 0 && <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun témoignage trouvé pour cette recherche.</p>
              </div>}
          </div>
        </section>
      </div>

      {/* Dialogs */}
      <TestimonialVerificationDialog
        isOpen={showVerificationDialog}
        onClose={() => setShowVerificationDialog(false)}
        onVerified={handleVerificationSuccess}
      />

      <CreateTestimonialDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        matricule={verifiedMatricule}
        onSuccess={handleTestimonialSuccess}
      />
    </Layout>;
};
export default Temoignages;
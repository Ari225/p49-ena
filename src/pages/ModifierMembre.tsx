import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import MatriculeVerificationDialog from '@/components/members/MatriculeVerificationDialog';

interface MemberData {
  id: number;
  'Prénoms': string;
  'Nom de famille': string;
  'Date de naissance': string;
  'Email': string;
  'Photo': string;
  'Matricule': string;
  'Ecole': string;
  'Filière_EGEF': string;
  'Filière_EGAD': string;
  'Ministère': string;
  "Lieu d'exercice": string;
  'Emploi fonction publique': string;
  'Région': string;
  'WhatsApp': number;
  'Facebook': string;
  'instagram': string;
  'linkedIn': string;
}

const ModifierMembre: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const memberId = searchParams.get('id');
  
  const [isVerificationOpen, setIsVerificationOpen] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [formData, setFormData] = useState<Partial<MemberData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Charger les données du membre après vérification
  const loadMemberData = async () => {
    if (!memberId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('id', parseInt(memberId))
        .single();

      if (error) throw error;

      if (data) {
        setMemberData(data as any);
        setFormData(data as any);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast.error('Erreur lors du chargement des données du membre');
      navigate('/repertoire-members');
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la vérification réussie
  const handleVerificationSuccess = () => {
    setIsVerified(true);
    setIsVerificationOpen(false);
    loadMemberData();
  };

  // Gérer la fermeture de la vérification
  const handleVerificationClose = () => {
    setIsVerificationOpen(false);
    navigate('/repertoire-members');
  };

  // Gérer les changements de formulaire
  const handleInputChange = (field: keyof MemberData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Gérer l'upload de photo
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !memberData) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `members/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-files')
        .getPublicUrl(filePath);

      handleInputChange('Photo', publicUrl);
      toast.success('Photo uploadée avec succès');
    } catch (error) {
      console.error('Erreur upload photo:', error);
      toast.error('Erreur lors de l\'upload de la photo');
    }
  };

  // Sauvegarder les modifications
  const handleSave = async () => {
    if (!memberData || !formData) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('members')
        .update(formData)
        .eq('id', memberData.id);

      if (error) throw error;

      toast.success('Informations mises à jour avec succès');
      navigate('/repertoire-members');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde des modifications');
    } finally {
      setIsSaving(false);
    }
  };

  if (!memberId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert>
          <AlertDescription>ID de membre manquant</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/repertoire-members')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Modifier mes informations
          </h1>
        </div>

        {/* Formulaire de modification */}
        {isVerified && memberData && (
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-gray-600">Chargement...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Photo */}
                  <div className="md:col-span-2">
                    <Label htmlFor="photo">Photo de profil</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      {formData['Photo'] && (
                        <img
                          src={formData['Photo']}
                          alt="Photo de profil"
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('photo')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Changer la photo
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Prénoms */}
                  <div>
                    <Label htmlFor="prenoms">Prénoms</Label>
                    <Input
                      id="prenoms"
                      value={formData['Prénoms'] || ''}
                      onChange={(e) => handleInputChange('Prénoms', e.target.value)}
                    />
                  </div>

                  {/* Nom de famille */}
                  <div>
                    <Label htmlFor="nom_famille">Nom de famille</Label>
                    <Input
                      id="nom_famille"
                      value={formData['Nom de famille'] || ''}
                      onChange={(e) => handleInputChange('Nom de famille', e.target.value)}
                    />
                  </div>

                  {/* Date de naissance */}
                  <div>
                    <Label htmlFor="date_naissance">Date de naissance</Label>
                    <Input
                      id="date_naissance"
                      type="date"
                      value={formData['Date de naissance'] || ''}
                      onChange={(e) => handleInputChange('Date de naissance', e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData['Email'] || ''}
                      onChange={(e) => handleInputChange('Email', e.target.value)}
                    />
                  </div>

                  {/* Matricule (lecture seule) */}
                  <div>
                    <Label htmlFor="matricule">Matricule</Label>
                    <Input
                      id="matricule"
                      value={formData['Matricule'] || ''}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>

                  {/* École */}
                  <div>
                    <Label htmlFor="ecole">École</Label>
                    <Input
                      id="ecole"
                      value={formData['Ecole'] || ''}
                      onChange={(e) => handleInputChange('Ecole', e.target.value)}
                    />
                  </div>

                  {/* Filière EGEF */}
                  <div>
                    <Label htmlFor="filiere_egef">Filière EGEF</Label>
                    <Input
                      id="filiere_egef"
                      value={formData['Filière_EGEF'] || ''}
                      onChange={(e) => handleInputChange('Filière_EGEF', e.target.value)}
                    />
                  </div>

                  {/* Filière EGAD */}
                  <div>
                    <Label htmlFor="filiere_egad">Filière EGAD</Label>
                    <Input
                      id="filiere_egad"
                      value={formData['Filière_EGAD'] || ''}
                      onChange={(e) => handleInputChange('Filière_EGAD', e.target.value)}
                    />
                  </div>

                  {/* Ministère */}
                  <div>
                    <Label htmlFor="ministere">Ministère</Label>
                    <Input
                      id="ministere"
                      value={formData['Ministère'] || ''}
                      onChange={(e) => handleInputChange('Ministère', e.target.value)}
                    />
                  </div>

                  {/* Lieu d'exercice */}
                  <div>
                    <Label htmlFor="lieu_exercice">Lieu d'exercice</Label>
                    <Input
                      id="lieu_exercice"
                      value={formData["Lieu d'exercice"] || ''}
                      onChange={(e) => handleInputChange("Lieu d'exercice", e.target.value)}
                    />
                  </div>

                  {/* Emploi fonction publique */}
                  <div>
                    <Label htmlFor="emploi_fonction_publique">Emploi fonction publique</Label>
                    <Input
                      id="emploi_fonction_publique"
                      value={formData['Emploi fonction publique'] || ''}
                      onChange={(e) => handleInputChange('Emploi fonction publique', e.target.value)}
                    />
                  </div>

                  {/* Région */}
                  <div>
                    <Label htmlFor="region">Région</Label>
                    <Input
                      id="region"
                      value={formData['Région'] || ''}
                      onChange={(e) => handleInputChange('Région', e.target.value)}
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={formData['WhatsApp']?.toString() || ''}
                      onChange={(e) => handleInputChange('WhatsApp', e.target.value)}
                      placeholder="ex: +33123456789"
                    />
                  </div>

                  {/* Facebook */}
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData['Facebook'] || ''}
                      onChange={(e) => handleInputChange('Facebook', e.target.value)}
                      placeholder="URL Facebook"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData['instagram'] || ''}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="URL Instagram"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData['linkedIn'] || ''}
                      onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                      placeholder="URL LinkedIn"
                    />
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => navigate('/repertoire-members')}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog de vérification du matricule */}
      <MatriculeVerificationDialog
        isOpen={isVerificationOpen}
        onClose={handleVerificationClose}
        onVerified={handleVerificationSuccess}
        memberId={memberId || ''}
      />
    </div>
  );
};

export default ModifierMembre;
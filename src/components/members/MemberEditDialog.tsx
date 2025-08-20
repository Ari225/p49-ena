import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Upload, Save } from 'lucide-react';
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

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  locality: string;
  photo?: string;
  whatsapp?: string | null;
  socialMedia: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  };
}

interface MemberEditDialogProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

const MemberEditDialog: React.FC<MemberEditDialogProps> = ({ 
  member, 
  isOpen, 
  onClose, 
  onUpdate 
}) => {
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [formData, setFormData] = useState<Partial<MemberData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Réinitialiser quand le dialog s'ouvre
  useEffect(() => {
    if (isOpen && member) {
      setIsVerificationOpen(true);
      setIsVerified(false);
      setMemberData(null);
      setFormData({});
    }
  }, [isOpen, member]);

  // Charger les données du membre après vérification
  const loadMemberData = async (memberMatricule?: string) => {
    if (!member || !memberMatricule) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_member_details_public', {
        member_matricule: memberMatricule,
        verification_matricule: memberMatricule
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const memberInfo = data[0];
        const formattedData = {
          id: memberInfo.id,
          'Prénoms': memberInfo.prenoms || '',
          'Nom de famille': memberInfo.nom_famille || '',
          'Date de naissance': memberInfo.date_naissance || '',
          'Email': memberInfo.email || '',
          'Photo': memberInfo.photo || '',
          'Matricule': memberMatricule,
          'Ecole': memberInfo.ecole || '',
          'Filière_EGEF': memberInfo.filiere_egef || '',
          'Filière_EGAD': memberInfo.filiere_egad || '',
          'Ministère': memberInfo.ministere || '',
          "Lieu d'exercice": memberInfo.lieu_exercice || '',
          'Emploi fonction publique': memberInfo.emploi_fonction_publique || '',
          'Région': memberInfo.region || '',
          'WhatsApp': memberInfo.whatsapp || 0,
          'Facebook': memberInfo.facebook || '',
          'instagram': memberInfo.instagram || '',
          'linkedIn': memberInfo.linkedin || ''
        };
        
        setMemberData(formattedData as any);
        setFormData(formattedData as any);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast.error('Erreur lors du chargement des données du membre');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la vérification réussie
  const handleVerificationSuccess = (matricule?: string) => {
    setIsVerified(true);
    setIsVerificationOpen(false);
    loadMemberData(matricule);
  };

  // Gérer la fermeture de la vérification
  const handleVerificationClose = () => {
    setIsVerificationOpen(false);
    onClose();
  };

  // Gérer les changements de formulaire
  const handleInputChange = (field: keyof MemberData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'WhatsApp' ? (value ? parseInt(value) : null) : value
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
      const updateData: any = {};
      
      if (formData['Prénoms'] !== undefined) updateData['Prénoms'] = formData['Prénoms'];
      if (formData['Nom de famille'] !== undefined) updateData['Nom de famille'] = formData['Nom de famille'];
      if (formData['Date de naissance'] !== undefined) updateData['Date de naissance'] = formData['Date de naissance'];
      if (formData['Email'] !== undefined) updateData['Email'] = formData['Email'];
      if (formData['Photo'] !== undefined) updateData['Photo'] = formData['Photo'];
      if (formData['Ecole'] !== undefined) updateData['Ecole'] = formData['Ecole'];
      if (formData['Filière_EGEF'] !== undefined) updateData['Filière_EGEF'] = formData['Filière_EGEF'];
      if (formData['Filière_EGAD'] !== undefined) updateData['Filière_EGAD'] = formData['Filière_EGAD'];
      if (formData['Ministère'] !== undefined) updateData['Ministère'] = formData['Ministère'];
      if (formData["Lieu d'exercice"] !== undefined) updateData["Lieu d'exercice"] = formData["Lieu d'exercice"];
      if (formData['Emploi fonction publique'] !== undefined) updateData['Emploi fonction publique'] = formData['Emploi fonction publique'];
      if (formData['Région'] !== undefined) updateData['Région'] = formData['Région'];
      if (formData['WhatsApp'] !== undefined) updateData['WhatsApp'] = formData['WhatsApp'];
      if (formData['Facebook'] !== undefined) updateData['Facebook'] = formData['Facebook'];
      if (formData['instagram'] !== undefined) updateData['instagram'] = formData['instagram'];
      if (formData['linkedIn'] !== undefined) updateData['linkedIn'] = formData['linkedIn'];

      const { error } = await supabase.rpc('update_member_info', {
        p_member_id: memberData.id,
        p_update_data: updateData
      });

      if (error) throw error;

      toast.success('Informations mises à jour avec succès');
      onUpdate?.();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde des modifications');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Dialog de vérification du matricule */}
      <MatriculeVerificationDialog
        isOpen={isVerificationOpen}
        onClose={handleVerificationClose}
        onVerified={handleVerificationSuccess}
        memberId={member?.id.toString()}
        verificationMode="edit"
      />

      {/* Dialog principal d'édition */}
      <Dialog open={isOpen && isVerified && !isVerificationOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl mx-auto my-auto">
          <DialogHeader>
            <DialogTitle>Modifier mes informations</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Chargement...</p>
            </div>
          ) : memberData ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button variant="outline" onClick={onClose}>
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
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemberEditDialog;
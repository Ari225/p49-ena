import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, BarChart3, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface CareerQuoteStatsFormProps {
  onSuccess?: () => void;
}

const CareerQuoteStatsForm: React.FC<CareerQuoteStatsFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Citation form data
  const [citation, setCitation] = useState('');
  const [matricule, setMatricule] = useState('');
  const [memberInfo, setMemberInfo] = useState<{
    nom: string;
    prenoms: string;
    fonction: string;
    id: number;
  } | null>(null);

  // Statistics form data
  const [formationsDispensees, setFormationsDispensees] = useState('');
  const [personnesFormees, setPersonnesFormees] = useState('');

  const resetForm = () => {
    setType('');
    setCitation('');
    setMatricule('');
    setMemberInfo(null);
    setFormationsDispensees('');
    setPersonnesFormees('');
  };

  const handleMatriculeChange = async (value: string) => {
    setMatricule(value);
    setMemberInfo(null);

    if (value.length >= 3) {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('Matricule', value)
          .maybeSingle();

        if (error) {
          console.error('Erreur lors de la recherche du matricule:', error);
          return;
        }

        if (data) {
          setMemberInfo({
            id: data.id,
            nom: data['Nom de famille'] || '',
            prenoms: data['Pr�noms'] || data['Prénoms'] || '',
            fonction: data['Emploi fonction publique'] || ''
          });
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      if (type === 'Citation') {
        if (!citation || !memberInfo) {
          toast({
            title: "Erreur",
            description: "Veuillez remplir tous les champs et vérifier le matricule",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase
          .from('career_quotes')
          .insert({
            quote: citation,
            member_id: memberInfo.id,
            member_name: memberInfo.nom,
            member_first_name: memberInfo.prenoms,
            member_position: memberInfo.fonction,
            matricule: matricule,
            created_by: user.id
          });

        if (error) {
          toast({
            title: "Erreur",
            description: "Impossible d'enregistrer la citation",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        toast({
          title: "Succès",
          description: "Citation enregistrée avec succès"
        });
      } else if (type === 'Statistiques') {
        if (!formationsDispensees || !personnesFormees) {
          toast({
            title: "Erreur",
            description: "Veuillez remplir tous les champs",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase
          .from('career_statistics')
          .insert({
            formations_dispensees: parseInt(formationsDispensees),
            personnes_formees: parseInt(personnesFormees),
            created_by: user.id
          });

        if (error) {
          toast({
            title: "Erreur",
            description: "Impossible d'enregistrer les statistiques",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        toast({
          title: "Succès",
          description: "Statistiques enregistrées avec succès"
        });
      }

      resetForm();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Citation et Stats
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background rounded-xl mx-4 sm:mx-auto px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle>Ajouter une Citation ou des Statistiques</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="Citation">Citation</SelectItem>
                <SelectItem value="Statistiques">Statistiques</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === 'Citation' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="citation">Citation</Label>
                <Textarea
                  id="citation"
                  value={citation}
                  onChange={(e) => setCitation(e.target.value)}
                  placeholder="Entrez la citation..."
                  rows={4}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="matricule">Matricule</Label>
                <Input
                  id="matricule"
                  value={matricule}
                  onChange={(e) => handleMatriculeChange(e.target.value)}
                  placeholder="Entrez le matricule du membre"
                  className="bg-background"
                />
              </div>

              {memberInfo && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Plus className="h-4 w-4 text-primary" />
                      Informations du membre
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1 text-sm">
                      <p><strong>Nom:</strong> {memberInfo.nom}</p>
                      <p><strong>Prénoms:</strong> {memberInfo.prenoms}</p>
                      <p><strong>Fonction:</strong> {memberInfo.fonction}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {type === 'Statistiques' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="formations">Formations dispensées (nombre)</Label>
                <Input
                  id="formations"
                  type="number"
                  min="0"
                  value={formationsDispensees}
                  onChange={(e) => setFormationsDispensees(e.target.value)}
                  placeholder="Nombre de formations dispensées"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personnes">Personnes formées (nombre)</Label>
                <Input
                  id="personnes"
                  type="number"
                  min="0"
                  value={personnesFormees}
                  onChange={(e) => setPersonnesFormees(e.target.value)}
                  placeholder="Nombre de personnes formées"
                  className="bg-background"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !type}
              className="flex items-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {type === 'Citation' ? <Plus className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CareerQuoteStatsForm;
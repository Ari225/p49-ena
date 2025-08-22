import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BureauExecutifMember {
  id: number;
  name: string;
  position: string;
}

export const useBureauExecutif = () => {
  const [members, setMembers] = useState<BureauExecutifMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBureauExecutif = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_bureau_executif_members');

        if (error) throw error;

        const formattedMembers: BureauExecutifMember[] = (data as any[])?.map((member: any) => ({
          id: member.id,
          name: member.nom_prenoms,
          position: member.poste
        })) || [];

        setMembers(formattedMembers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
        console.error('Erreur lors du chargement du bureau exécutif:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBureauExecutif();
  }, []);

  // Organiser les membres selon la disposition spécifiée
  const organizeMembers = () => {
    const levels: BureauExecutifMember[][] = [];
    
    if (members.length === 0) return levels;

    // Ligne 1 : id 1
    const member1 = members.find(m => m.id === 1);
    if (member1) levels.push([member1]);

    // Ligne 2 : id 2  
    const member2 = members.find(m => m.id === 2);
    if (member2) levels.push([member2]);

    // Ligne 3 : id 3 et 4
    const members3_4 = members.filter(m => [3, 4].includes(m.id)).sort((a, b) => a.id - b.id);
    if (members3_4.length > 0) levels.push(members3_4);

    // Ligne 4 : id 5 et 6
    const members5_6 = members.filter(m => [5, 6].includes(m.id)).sort((a, b) => a.id - b.id);
    if (members5_6.length > 0) levels.push(members5_6);

    // Ligne 5 : id 7
    const member7 = members.find(m => m.id === 7);
    if (member7) levels.push([member7]);

    // Ligne 6 : id 8, 9 et 10
    const members8_10 = members.filter(m => [8, 9, 10].includes(m.id)).sort((a, b) => a.id - b.id);
    if (members8_10.length > 0) levels.push(members8_10);

    // Ligne 7 : id 11, 12 et 13
    const members11_13 = members.filter(m => [11, 12, 13].includes(m.id)).sort((a, b) => a.id - b.id);
    if (members11_13.length > 0) levels.push(members11_13);

    // Ligne 8 : id 14
    const member14 = members.find(m => m.id === 14);
    if (member14) levels.push([member14]);

    // Ligne 9 : id 15, 16 et 17
    const members15_17 = members.filter(m => [15, 16, 17].includes(m.id)).sort((a, b) => a.id - b.id);
    if (members15_17.length > 0) levels.push(members15_17);

    // Ligne 10 : id 18, 19, 20
    const members18_20 = members.filter(m => [18, 19, 20].includes(m.id)).sort((a, b) => a.id - b.id);
    if (members18_20.length > 0) levels.push(members18_20);

    // Ligne 11 : id 21
    const member21 = members.find(m => m.id === 21);
    if (member21) levels.push([member21]);

    return levels;
  };

  return {
    members,
    organizedLevels: organizeMembers(),
    loading,
    error
  };
};
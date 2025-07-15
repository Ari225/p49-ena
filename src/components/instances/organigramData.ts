
export interface OrganigramMember {
  name: string;
  position: string;
  phone: string;
}

export const organigramLevels: OrganigramMember[][] = [
  // Niveau 1 - Président
  [
    { name: "KEITA Narcisse", position: "Président du Réseau", phone: "0707879789" }
  ],
  
  // Niveau 2 - Vice-Présidents
  [
    { name: "DIABATE Adama", position: "1er Vice-Président", phone: "0758156531" },
    { name: "KONE Mamadou", position: "2ème Vice-Président", phone: "0707240414" }
  ],
  
  // Niveau 3 - Secrétaire Général et Trésorier Général
  [
    { name: "TRAORE Seydou", position: "Secrétaire Général", phone: "0101127191" },
    { name: "OUATTARA Fatou", position: "Trésorier Général", phone: "0506727271" }
  ],
  
  // Niveau 4 - Secrétaires et Trésoriers Adjoints
  [
    { name: "BAMBA Issiaka", position: "Secrétaire Général Adjoint", phone: "0708767676" },
    { name: "COULIBALY Awa", position: "Trésorier Général Adjoint", phone: "0709876543" },
    { name: "DOUMBIA Moussa", position: "Secrétaire Administratif", phone: "0701234567" },
    { name: "YAO Marie", position: "Trésorier Adjoint", phone: "0708901234" }
  ]
];


import bcrypt from 'bcryptjs';

// Fonction pour hasher le mot de passe de manière sécurisée avec bcrypt
export const hashPassword = (password: string): string => {
  const saltRounds = 12; // Haute sécurité avec 12 rounds
  return bcrypt.hashSync(password, saltRounds);
};

// Fonction pour vérifier le mot de passe
export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error);
    return false;
  }
};

// Fonction pour valider la force du mot de passe
export const validatePasswordStrength = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

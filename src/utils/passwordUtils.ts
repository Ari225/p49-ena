
import crypto from 'crypto-js';

// Fonction pour hasher le mot de passe de manière cohérente
export const hashPassword = (password: string): string => {
  // Utilisons SHA-256 pour un hachage plus sécurisé
  return crypto.SHA256(password).toString();
};

// Fonction pour vérifier le mot de passe
export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword;
};

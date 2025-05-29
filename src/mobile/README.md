
# Dossier Mobile - P49 ENA

Ce dossier contient tous les fichiers dédiés à l'optimisation mobile du site P49 ENA.

## Structure

### Hooks (`/hooks`)
- `useMobileDetection.ts` - Détection des appareils mobiles et de l'orientation
- `useMobileNavigation.ts` - Gestion de la navigation mobile
- `useMobileScroll.ts` - Gestion du scroll et navigation fluide

### Composants (`/components`)
- `MobileHeader.tsx` - Header adapté mobile avec menu hamburger
- `MobileFooter.tsx` - Footer optimisé mobile
- `MobileLayout.tsx` - Layout wrapper pour mobile
- `MobileCard.tsx` - Cartes optimisées mobile
- `MobileGrid.tsx` - Grille responsive mobile
- `MobileOptimizedImage.tsx` - Images optimisées avec lazy loading
- `MobileSwipeCarousel.tsx` - Carrousel avec gestes tactiles

### Utilitaires (`/utils`)
- `mobileHelpers.ts` - Fonctions utilitaires pour mobile

### Styles (`/styles`)
- `mobileStyles.ts` - Styles prédéfinis pour mobile

## Utilisation

Pour utiliser ces composants dans vos pages :

```tsx
import { 
  useMobileDetection, 
  MobileLayout, 
  MobileCard 
} from '@/mobile';

const MyPage = () => {
  const { isMobile } = useMobileDetection();
  
  return (
    <MobileLayout>
      <MobileCard title="Mon Titre">
        Contenu optimisé mobile
      </MobileCard>
    </MobileLayout>
  );
};
```

## Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1023px  
- Desktop: ≥ 1024px

## Fonctionnalités

- ✅ Détection automatique d'appareil
- ✅ Navigation mobile avec menu hamburger
- ✅ Gestes tactiles (swipe)
- ✅ Images optimisées et lazy loading
- ✅ Layouts responsifs
- ✅ Composants réutilisables
- ✅ Styles cohérents

## Prochaines étapes

1. Intégrer ces composants dans les pages existantes
2. Tester sur différents appareils
3. Optimiser les performances
4. Ajouter des animations tactiles

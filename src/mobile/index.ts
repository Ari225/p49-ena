
// Hooks exports
export { useMobileDetection } from './hooks/useMobileDetection';
export { useMobileNavigation } from './hooks/useMobileNavigation';
export { useMobileScroll } from './hooks/useMobileScroll';

// Components exports
export { default as MobileHeader } from './components/MobileHeader';
export { default as MobileFooter } from './components/MobileFooter';
export { default as MobileLayout } from './components/MobileLayout';
export { default as MobileCard } from './components/MobileCard';
export { default as MobileGrid } from './components/MobileGrid';
export { default as MobileOptimizedImage } from './components/MobileOptimizedImage';
export { default as MobileSwipeCarousel } from './components/MobileSwipeCarousel';

// Utils exports
export * from './utils/mobileHelpers';

// Styles exports
export { mobileStyles, getMobileClassName } from './styles/mobileStyles';

// Types
export type { MobileDetection } from './hooks/useMobileDetection';

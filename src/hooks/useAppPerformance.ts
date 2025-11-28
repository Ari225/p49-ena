import { useEffect } from 'react';
import { usePerformanceOptimization } from './usePerformanceOptimization';
import { performanceMonitor, preloader, networkOptimizer } from '@/utils/performanceUtils';

export const useAppPerformance = () => {
  const { clearCache, preloadResources } = usePerformanceOptimization();

  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.mark('app-init');

    // Preload critical resources based on connection type
    if (networkOptimizer.shouldPreload()) {
      const criticalResources = [
        '/lovable-uploads/bg1.webp',
        '/lovable-uploads/P49Grid.webp'
      ];
      
      preloadResources(criticalResources);
      
      // Preload critical images
      preloader.images(criticalResources).catch(() => {
        // Silently handle preload failures - not critical
      });
    }

    // Set up performance monitoring
    const performanceTimer = setTimeout(() => {
      const metrics = performanceMonitor.getMetrics();
      console.log('App Performance Metrics:', metrics);
    }, 2000);

    // Clean up cache on page unload
    const handleBeforeUnload = () => {
      clearCache();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(performanceTimer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [clearCache, preloadResources]);

  return {
    clearCache,
    getConnectionType: networkOptimizer.getConnectionType,
    shouldPreload: networkOptimizer.shouldPreload
  };
};
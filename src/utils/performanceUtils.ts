// Performance monitoring utilities
export const performanceMonitor = {
  // Mark the start of a performance measurement
  mark: (name: string): void => {
    if (performance.mark) {
      performance.mark(`${name}-start`);
    }
  },

  // Measure the time between start and end
  measure: (name: string): number => {
    if (performance.mark && performance.measure) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      return measure ? measure.duration : 0;
    }
    return 0;
  },

  // Get performance metrics
  getMetrics: () => {
    if (!performance.getEntriesByType) return {};

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    return {
      // Page load metrics
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.fetchStart,
      pageLoad: navigation?.loadEventEnd - navigation?.fetchStart,
      
      // Paint metrics
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      
      // Network metrics
      dnsLookup: navigation?.domainLookupEnd - navigation?.domainLookupStart,
      tcpConnection: navigation?.connectEnd - navigation?.connectStart,
      serverResponse: navigation?.responseEnd - navigation?.requestStart,
    };
  }
};

// Resource preloading utilities
export const preloader = {
  // Preload images
  images: (urls: string[]): Promise<void[]> => {
    return Promise.all(
      urls.map(url => new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to preload image: ${url}`));
        img.src = url;
      }))
    );
  },

  // Preload resources with link tags
  resources: (resources: Array<{ url: string; as: string; type?: string }>): void => {
    resources.forEach(({ url, as, type }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = as;
      if (type) link.type = type;
      document.head.appendChild(link);
    });
  },

  // Prefetch resources for next navigation
  prefetch: (urls: string[]): void => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
};

// Database query optimization
export const queryOptimizer = {
  // Batch multiple queries
  batch: async <T>(queries: Array<() => Promise<T>>, batchSize = 3): Promise<T[]> => {
    const results: T[] = [];
    
    for (let i = 0; i < queries.length; i += batchSize) {
      const batch = queries.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(query => query()));
      results.push(...batchResults);
    }
    
    return results;
  },

  // Add select optimization for Supabase queries
  optimizeSelect: (columns: string[], limit?: number) => {
    const selectColumns = columns.length > 0 ? columns.join(',') : '*';
    return {
      select: selectColumns,
      ...(limit && { limit })
    };
  }
};

// Memory management
export const memoryManager = {
  // Clean up resources
  cleanup: (): void => {
    // Clear unused images
    const images = document.querySelectorAll('img[data-cleanup="true"]');
    images.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.src = '';
        img.remove();
      }
    });

    // Force garbage collection if available
    if ('gc' in window && typeof window.gc === 'function') {
      window.gc();
    }
  },

  // Monitor memory usage
  getMemoryUsage: () => {
    if ('memory' in performance) {
      return {
        used: Math.round((performance as any).memory.usedJSHeapSize / 1048576),
        total: Math.round((performance as any).memory.totalJSHeapSize / 1048576),
        limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1048576)
      };
    }
    return null;
  }
};

// Image optimization utilities
export const imageOptimizer = {
  // Get WebP/AVIF support
  getOptimalFormat: (): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    // Check WebP support
    if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
      return 'webp';
    }
    
    // Check AVIF support
    if (canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
      return 'avif';
    }
    
    return 'jpeg';
  },

  // Generate responsive image sizes
  getResponsiveSizes: (baseWidth: number) => {
    return [
      Math.round(baseWidth * 0.25), // Mobile
      Math.round(baseWidth * 0.5),  // Tablet
      Math.round(baseWidth * 0.75), // Small desktop
      baseWidth                     // Full size
    ];
  },

  // Create optimized image URL
  createOptimizedUrl: (baseUrl: string, width?: number, quality = 80) => {
    if (!baseUrl.includes('supabase.co/storage')) {
      return baseUrl;
    }

    const url = new URL(baseUrl);
    if (width) url.searchParams.set('width', width.toString());
    url.searchParams.set('quality', quality.toString());
    
    const format = imageOptimizer.getOptimalFormat();
    if (format !== 'jpeg') {
      url.searchParams.set('format', format);
    }
    
    return url.toString();
  }
};

// Network optimization
export const networkOptimizer = {
  // Check connection quality
  getConnectionType: (): string => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType || 'unknown';
    }
    return 'unknown';
  },

  // Adjust quality based on connection
  getOptimalQuality: (): number => {
    const connectionType = networkOptimizer.getConnectionType();
    
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return 50;
      case '3g':
        return 70;
      case '4g':
      default:
        return 80;
    }
  },

  // Check if should preload based on connection
  shouldPreload: (): boolean => {
    const connection = networkOptimizer.getConnectionType();
    return !['slow-2g', '2g'].includes(connection);
  }
};
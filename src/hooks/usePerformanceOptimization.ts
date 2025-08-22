import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class PerformanceCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

const performanceCache = new PerformanceCache();

// Debounce utility
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export const usePerformanceOptimization = () => {
  const [isOptimized, setIsOptimized] = useState(false);

  // Optimized fetch with caching
  const optimizedFetch = useCallback(async <T>(
    key: string,
    fetchFunction: () => Promise<T>,
    ttl?: number
  ): Promise<T> => {
    const cached = performanceCache.get<T>(key);
    if (cached) {
      return cached;
    }

    try {
      const data = await fetchFunction();
      performanceCache.set(key, data, ttl);
      return data;
    } catch (error) {
      console.error(`Error in optimizedFetch for key ${key}:`, error);
      throw error;
    }
  }, []);

  // Preload critical resources
  const preloadResources = useCallback((urls: string[]) => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      if (url.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
        link.as = 'image';
      } else if (url.match(/\.(mp4|webm|mov)$/i)) {
        link.as = 'video';
      } else {
        link.as = 'fetch';
        link.crossOrigin = 'anonymous';
      }
      
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  // Optimize images with lazy loading and compression
  const optimizeImage = useCallback((src: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
  } = {}): string => {
    if (!src) return src;

    // If it's a Supabase storage URL, add transformation parameters
    if (src.includes('supabase.co/storage')) {
      const url = new URL(src);
      const params = new URLSearchParams();
      
      if (options.width) params.set('width', options.width.toString());
      if (options.height) params.set('height', options.height.toString());
      if (options.quality) params.set('quality', options.quality.toString());
      if (options.format && options.format !== 'auto') {
        params.set('format', options.format);
      }
      
      if (params.toString()) {
        url.search = params.toString();
        return url.toString();
      }
    }

    return src;
  }, []);

  // Batch database operations
  const batchedFetch = useCallback(async <T>(
    queries: Array<() => Promise<T>>,
    batchSize: number = 3
  ): Promise<T[]> => {
    const results: T[] = [];
    
    for (let i = 0; i < queries.length; i += batchSize) {
      const batch = queries.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(query => query()));
      results.push(...batchResults);
    }
    
    return results;
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    // Enable compression in Supabase client
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed
      });
    }

    // Clean cache periodically
    const cleanupInterval = setInterval(() => {
      performanceCache.cleanup();
    }, 10 * 60 * 1000); // Every 10 minutes

    // Preload critical resources
    const criticalUrls = [
      '/lovable-uploads/P49Grid.webp',
      '/lovable-uploads/Pers49.webp'
    ];
    preloadResources(criticalUrls);

    setIsOptimized(true);

    return () => {
      clearInterval(cleanupInterval);
    };
  }, [preloadResources]);

  // Debounced and throttled utilities
  const debouncedCallback = useCallback(
    (callback: (...args: any[]) => void, delay: number = 300) => 
      debounce(callback, delay),
    []
  );

  const throttledCallback = useCallback(
    (callback: (...args: any[]) => void, limit: number = 1000) => 
      throttle(callback, limit),
    []
  );

  // Clear cache manually
  const clearCache = useCallback(() => {
    performanceCache.clear();
  }, []);

  // Performance monitoring
  const measurePerformance = useCallback(<T>(
    name: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    const start = performance.now();
    return operation().then(result => {
      const end = performance.now();
      console.log(`Performance: ${name} took ${(end - start).toFixed(2)}ms`);
      return result;
    });
  }, []);

  return {
    isOptimized,
    optimizedFetch,
    optimizeImage,
    preloadResources,
    batchedFetch,
    debouncedCallback,
    throttledCallback,
    clearCache,
    measurePerformance
  };
};
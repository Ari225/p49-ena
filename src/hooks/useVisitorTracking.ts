import { useVisitorTrackingContext } from '@/context/VisitorTrackingContext';

interface VisitorStats {
  monthlyVisitors: number;
  isTracking: boolean;
  totalVisitors: number;
}

export const useVisitorTracking = (): VisitorStats => {
  const { monthlyVisitors, isTracking, totalVisitors } = useVisitorTrackingContext();
  
  return {
    monthlyVisitors,
    isTracking,
    totalVisitors
  };
};
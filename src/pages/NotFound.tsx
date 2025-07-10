
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";

const NotFound = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className={`font-bold mb-4 ${
          isMobile ? 'text-3xl' : 
          isTablet ? 'text-4xl' : 
          'text-4xl'
        }`}>404</h1>
        <p className={`text-gray-600 mb-4 ${
          isMobile ? 'text-lg' : 
          isTablet ? 'text-xl' : 
          'text-xl'
        }`}>Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

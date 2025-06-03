
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface UserMenuProps {
  mobile?: boolean;
  onAction?: () => void;
}

const UserMenu = ({ mobile = false, onAction }: UserMenuProps) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    onAction?.();
  };

  if (mobile) {
    return (
      <div className="flex items-center gap-4 px-6 py-3 mt-4 border-t border-gray-200">
        {user ? (
          <>
            <Link 
              to="/dashboard" 
              onClick={onAction}
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <button 
              onClick={handleLogout}
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90 transition-colors"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/contact" 
              onClick={onAction}
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors"
            >
              {t('header.contact')}
            </Link>
            <Link 
              to="/login" 
              onClick={onAction}
              className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90 transition-colors"
            >
              {t('header.login')}
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 flex-shrink-0">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200">
              {user.username}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg">
            <DropdownMenuItem asChild>
              <Link to="/dashboard" className="w-full px-4 py-2 text-gray-700 hover:bg-accent">
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="w-full px-4 py-2 text-gray-700 hover:bg-accent cursor-pointer"
            >
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex space-x-2">
          <Link to="/contact">
            <Button className="bg-primary text-white hover:bg-primary py-[5px] px-[15px] rounded flex items-center text-sm md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
              {t('header.contact')}
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-medium py-[5px] px-[15px] rounded transition-colors duration-200 text-sm">
              {t('header.login')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

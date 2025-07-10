
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useMenuItems } from './MenuItems';
import UserMenu from './UserMenu';
import { useIsTablet } from '@/hooks/use-mobile';

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuItems = useMenuItems();
  const isTab = useIsTablet();

  const handleSubmenuToggle = (itemLabel: string) => {
    setOpenSubmenu(openSubmenu === itemLabel ? null : itemLabel);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <>
      <div className="flex justify-end flex-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className={`${isTab ? 'p-4' : 'p-2'}`}
        >
          {isMobileMenuOpen ? (
            <X className={`${isTab ? 'h-10 w-10' : 'h-7 w-7'}`} />
          ) : (
            <Menu className={`${isTab ? 'h-10 w-10' : 'h-7 w-7'}`} />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay with slide animation - Full width */}
      <div className={`fixed ${isTab ? 'top-[92px]' : 'top-[85px]'} left-0 right-0 w-screen bg-white shadow-lg border-t border-gray-200 max-h-[calc(100vh-${isTab ? '92px' : '85px'})] overflow-y-auto z-40 transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <nav className="px-[25px] py-[15px]">
          {menuItems.map(menu => (
            <div key={menu.title}>
              <button 
                onClick={() => handleSubmenuToggle(menu.title)} 
                className="w-full flex items-center justify-between px-6 py-3 text-left text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              >
                <span className="text-left">{menu.title}</span>
                {openSubmenu === menu.title ? 
                  <ChevronUp className="h-4 w-4 ml-auto" /> : 
                  <ChevronDown className="h-4 w-4 ml-auto" />
                }
              </button>
              {openSubmenu === menu.title && (
                <div className="bg-gray-50">
                  {menu.items.map(item => (
                    <Link 
                      key={item.href} 
                      to={item.href} 
                      onClick={closeMobileMenu} 
                      className="block px-10 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors text-left"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <UserMenu mobile onAction={closeMobileMenu} />
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMenuItems } from './MenuItems';

const DesktopNavigation = () => {
  const menuItems = useMenuItems();

  return (
    <nav className="flex items-center justify-center flex-1 mx-8">
      <div className="flex items-center space-x-1">
        {menuItems.map((menu, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-primary hover:bg-accent transition-colors duration-200 flex items-center space-x-1 px-3 py-2 text-sm"
              >
                <span className="font-medium whitespace-nowrap">{menu.title}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg mt-9">
              {menu.items.map((item, itemIndex) => (
                <DropdownMenuItem key={itemIndex} asChild>
                  <Link 
                    to={item.href} 
                    className="w-full text-gray-700 hover:bg-accent hover:text-primary transition-colors duration-200 px-[20px] py-[10px]"
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </nav>
  );
};

export default DesktopNavigation;

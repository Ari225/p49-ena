
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  PenTool, 
  FileText, 
  User, 
  Send,
  BarChart3,
  BookOpen
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const EditorSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const menuItems = [
    {
      title: 'Tableau de bord',
      href: '/dashboard',
      icon: BarChart3
    },
    {
      title: 'Mes Articles',
      href: '/dashboard/my-articles',
      icon: PenTool
    },
    {
      title: 'Nouvel Article',
      href: '/dashboard/new-article',
      icon: FileText
    },
    {
      title: 'Articles Journal',
      href: '/dashboard/journal-articles',
      icon: BookOpen
    },
    {
      title: 'Articles Soumis',
      href: '/dashboard/submitted',
      icon: Send
    },
    {
      title: 'Mon Profil',
      href: '/dashboard/profile',
      icon: User
    }
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-gray-200 z-50">
        <div className="overflow-x-auto">
          <div className="flex py-2 px-2 min-w-max">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex flex-col items-center px-3 py-1 text-xs min-w-[80px] flex-shrink-0',
                    isActive
                      ? 'text-secondary'
                      : 'text-white'
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center leading-tight whitespace-nowrap">
                    {item.title.split(' ').map((word, index, array) => (
                      <span key={index}>
                        {word}
                        {index < array.length - 1 && index === Math.floor(array.length / 2) - 1 ? <br /> : ' '}
                      </span>
                    ))}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-primary text-white h-screen fixed left-0 top-20 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Rédaction</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  location.pathname === item.href
                    ? 'bg-secondary text-primary font-semibold'
                    : 'hover:bg-white/10'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default EditorSidebar;

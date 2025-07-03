import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Users, FileText, Calendar, Settings, PenTool, MessageSquare, BarChart3, Bell, BookOpen, MapPin, Briefcase, Star, PartyPopper, Activity, PlayCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const AdminSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  const menuItems = [
    {
      title: 'Portail',
      href: '/dashboard',
      icon: BarChart3
    },
    {
      title: 'Utilisateurs',
      href: '/dashboard/users',
      icon: Users
    },
    {
      title: 'Actualités',
      href: '/dashboard/news',
      icon: FileText
    },
    {
      title: 'Blog',
      href: '/dashboard/blog',
      icon: PenTool
    },
    {
      title: 'Journal',
      href: '/dashboard/journal',
      icon: BookOpen
    },
    {
      title: 'Communiqués',
      href: '/dashboard/communiques',
      icon: MessageSquare
    },
    {
      title: 'Écho des Régions',
      mobileTitle: 'Écho régions',
      href: '/dashboard/echo-regions',
      icon: MapPin
    },
    {
      title: 'Carrières+',
      href: '/dashboard/carrieres',
      icon: Briefcase
    },
    {
      title: 'Témoignages',
      href: '/dashboard/temoignages',
      icon: Star
    },
    {
      title: 'Évènements sociaux',
      mobileTitle: 'Év. sociaux',
      href: '/dashboard/evenements-sociaux',
      icon: PartyPopper
    },
    {
      title: 'Activités',
      href: '/dashboard/activites',
      icon: Activity
    },
    {
      title: 'Médiathèque',
      href: '/dashboard/mediatheque',
      icon: PlayCircle
    },
    {
      title: 'Évènements',
      href: '/dashboard/events',
      icon: Calendar
    },
    {
      title: 'Pop-ups',
      href: '/dashboard/popups',
      icon: MessageSquare
    },
    {
      title: 'Notifications',
      href: '/dashboard/notifications',
      icon: Bell
    },
    {
      title: 'Paramètres',
      href: '/dashboard/settings',
      icon: Settings
    }
  ];

  // Auto-scroll to active item in mobile view
  useEffect(() => {
    if (isMobile && activeItemRef.current && scrollContainerRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [location.pathname, isMobile]);

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-gray-200 z-50">
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <div className="flex py-2 px-2 min-w-max">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/dashboard' 
                ? location.pathname === '/dashboard'
                : location.pathname.startsWith(item.href);
              const displayTitle = item.mobileTitle || item.title;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  ref={isActive ? activeItemRef : null}
                  className={cn(
                    'flex flex-col items-center px-3 py-1 text-xs transition-colors min-w-[80px] flex-shrink-0',
                    isActive
                      ? 'text-secondary bg-white/10 rounded-lg'
                      : 'text-white hover:text-secondary/80'
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center leading-tight whitespace-nowrap">
                    {displayTitle}
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
      <div className="p-6 px-[20px] py-[50px]">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
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

export default AdminSidebar;

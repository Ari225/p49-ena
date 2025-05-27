
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Users, FileText, Calendar, Settings, PenTool, MessageSquare, BarChart3, Bell, BookOpen, Clock } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Tableau de bord',
      href: '/dashboard',
      icon: BarChart3
    },
    {
      title: 'Administrateurs & Rédacteurs',
      href: '/dashboard/users',
      icon: Users
    },
    {
      title: 'Actualités',
      href: '/dashboard/news',
      icon: FileText
    },
    {
      title: 'Articles Blog',
      href: '/dashboard/blog',
      icon: PenTool
    },
    {
      title: 'Journal',
      href: '/dashboard/journal',
      icon: BookOpen
    },
    {
      title: 'Événements',
      href: '/dashboard/events',
      icon: Calendar
    },
    {
      title: 'Pop-ups & Communiqués',
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

  return (
    <div className="w-64 bg-primary text-white h-screen fixed left-0 top-20 overflow-y-auto">
      <div className="p-6 px-[20px] py-[50px]">
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

export default AdminSidebar;

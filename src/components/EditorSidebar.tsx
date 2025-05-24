
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

const EditorSidebar = () => {
  const location = useLocation();

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

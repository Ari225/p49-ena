
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const NavigationMenu = () => {
  const { t } = useLanguage();

  const menuItems = [
    {
      title: t('header.presentation'),
      items: [
        { label: t('menu.history'), href: '/historique' },
        { label: t('menu.official_texts'), href: '/textes-officiels' },
        { label: t('menu.leadership'), href: '/instances-dirigeantes' },
        { label: t('menu.directory'), href: '/repertoire-membres' }
      ]
    },
    {
      title: t('header.activities'),
      items: [
        { label: t('menu.agenda'), href: '/agenda' },
        { label: t('menu.regional'), href: '/regionales' },
        { label: t('menu.assemblies'), href: '/assemblees-generales' },
        { label: t('menu.constitution_meetings'), href: '/reunions-constitution' }
      ]
    },
    {
      title: t('header.social_events'),
      items: [
        { label: t('menu.happy_events'), href: '/evenements-heureux' },
        { label: t('menu.retirement'), href: '/departs-retraite' },
        { label: t('menu.necrology'), href: '/necrologie' }
      ]
    },
    {
      title: t('header.careers'),
      items: [
        { label: t('menu.training'), href: '/formations' },
        { label: t('menu.capacity_building'), href: '/renforcement-capacites' },
        { label: t('menu.coaching'), href: '/coaching-mentorat' },
        { label: t('menu.competition_news'), href: '/actualites-concours' }
      ]
    },
    {
      title: t('header.perspectives'),
      items: [
        { label: t('menu.latest_edition'), href: '/derniere-edition' },
        { label: t('menu.editorial_team'), href: '/equipe-editoriale' },
        { label: 'Écho des régions', href: '/echo-regions' },
        { label: t('menu.news'), href: '/actualites' },
        { label: t('menu.archives'), href: '/archives' },
        { label: t('menu.suggestions'), href: '/suggestions' }
      ]
    }
  ];

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

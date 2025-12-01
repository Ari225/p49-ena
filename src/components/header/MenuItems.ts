
import { useLanguage } from '@/context/LanguageContext';

export const useMenuItems = () => {
  const { t } = useLanguage();

  return [
    {
      title: t('header.presentation'),
      items: [
        {
          label: t('menu.history'),
          href: '/historique'
        },
        {
          label: t('menu.official_texts'),
          href: '/textes-officiels'
        },
        {
          label: t('menu.leadership'),
          href: '/instances-dirigeantes'
        },
        {
          label: t('menu.directory'),
          href: '/repertoire-membres'
        }
      ]
    },
    {
      title: t('header.activities'),
      items: [
        {
          label: t('menu.agenda'),
          href: '/agenda'
        },
        {
          label: t('menu.regional'),
          href: '/regionales'
        },
        {
          label: t('menu.assemblies'),
          href: '/assemblees-generales'
        },
        {
          label: t('menu.constitution_meetings'),
          href: '/reunions-constitution'
        },
        {
          label: 'Médiathèque',
          href: '/galerie'
        }
      ]
    },
    {
      title: t('header.social_events'),
      items: [
        {
          label: t('menu.happy_events'),
          href: '/evenements-heureux'
        },
        {
          label: t('menu.retirement'),
          href: '/departs-retraite'
        },
        {
          label: 'Évènements malheureux',
          href: '/evenements-malheureux'
        }
      ]
    },
    {
      title: t('header.careers'),
      items: [
        {
          label: t('menu.training'),
          href: '/formations'
        },
        {
          label: t('menu.capacity_building'),
          href: '/renforcement-capacites'
        },
        {
          label: t('menu.coaching'),
          href: '/coaching-mentorat'
        },
        {
          label: t('menu.competition_news'),
          href: '/actualites-concours'
        }
      ]
    },
    {
      title: t('header.perspectives'),
      items: [
        {
          label: t('menu.latest_edition'),
          href: '/derniere-edition'
        },
        {
          label: t('menu.editorial_team'),
          href: '/equipe-editoriale'
        },
        {
          label: 'Écho des régions',
          href: '/echo-regions'
        },
        {
          label: t('menu.news'),
          href: '/news'
        },
        {
          label: t('menu.archives'),
          href: '/archives'
        },
        {
          label: t('menu.suggestions'),
          href: '/suggestions'
        }
      ]
    }
  ];
};

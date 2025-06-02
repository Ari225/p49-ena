
import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const FooterSocial = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1Fd5Ct69iu/',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      url: '#',
      icon: Instagram,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@ena.p49?_t=ZM-8wr2lgkMOKU&_r=1',
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-4 w-4 lg:h-6 lg:w-6" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: '#',
      icon: Linkedin,
    },
  ];

  return (
    <div className="flex space-x-3 lg:space-x-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-secondary transition-colors"
          aria-label={social.name}
        >
          <social.icon className="h-4 w-4 lg:h-6 lg:w-6" />
        </a>
      ))}
    </div>
  );
};

export default FooterSocial;

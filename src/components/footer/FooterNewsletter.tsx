
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

const FooterNewsletter = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription for:', email);
    setEmail('');
  };

  return (
    <div className="text-center lg:text-left mb-6 lg:mb-0">
      <h3 className="text-lg font-semibold mb-3 lg:mb-4">Newsletter</h3>
      <p className="text-gray-300 text-xs lg:text-sm mb-3 lg:mb-4">
        Restez informé de nos actualités et événements
      </p>
      <form onSubmit={handleNewsletterSubmit} className="space-y-3 max-w-sm mx-auto lg:mx-0">
        <div className="flex">
          <Input 
            type="email" 
            placeholder="Votre email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-r-none text-xs lg:text-sm" 
            required 
          />
          <Button 
            type="submit" 
            className="bg-secondary hover:bg-secondary/90 text-primary rounded-l-none"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FooterNewsletter;

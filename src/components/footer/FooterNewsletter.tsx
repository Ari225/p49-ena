
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FooterNewsletterProps {
  variant?: 'mobile' | 'tablet' | 'desktop';
}

const FooterNewsletter: React.FC<FooterNewsletterProps> = ({ variant = 'desktop' }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Submitting newsletter subscription for:', email);
      
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      });

      console.log('Newsletter response:', { data, error });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      toast({
        title: "Inscription réussie !",
        description: "Merci de vous être abonné à notre newsletter.",
      });
      
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      
      let errorMessage = "Une erreur est survenue lors de l'inscription.";
      
      if (error.message?.includes('Failed to send a request') || error.message?.includes('FunctionsError')) {
        errorMessage = "Service temporairement indisponible. Veuillez réessayer plus tard.";
      } else if (error.message?.includes('409')) {
        errorMessage = "Cette adresse email est déjà inscrite.";
      } else if (error.context?.status === 404) {
        errorMessage = "Service newsletter non configuré.";
      }
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center lg:text-left mb-6 lg:mb-0">
      <h3 className={`font-semibold mb-3 lg:mb-4 ${
        variant === 'mobile' ? 'text-base' :
        variant === 'tablet' ? 'text-lg' :
        'text-lg'
      }`}>
        Newsletter
      </h3>
      <p className={`text-gray-300 mb-5 lg:mb-4 ${
        variant === 'mobile' ? 'text-xs' :
        variant === 'tablet' ? 'text-sm' :
        'text-sm lg:text-base'
      }`}>
        Restez informé de nos actualités et évènements
      </p>
      <form onSubmit={handleNewsletterSubmit} className="space-y-3 max-w-sm mx-auto lg:mx-0">
        <div className="flex">
          <Input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-r-none ${
              variant === 'mobile' ? 'text-xs' :
              variant === 'tablet' ? 'text-sm' :
              'text-xs lg:text-sm'
            }`}
            required
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-secondary hover:bg-secondary/90 text-primary rounded-l-none disabled:opacity-50"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FooterNewsletter;

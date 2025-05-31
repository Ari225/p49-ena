
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export const useTranslation = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translateText = async (
    text: string, 
    targetLanguage: string, 
    sourceLanguage: string = 'fr'
  ): Promise<string> => {
    if (!text.trim()) return text;
    
    setIsTranslating(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('translate-text', {
        body: {
          text,
          targetLanguage,
          sourceLanguage
        }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      const response = data as TranslationResponse;
      return response.translatedText;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      setError(errorMessage);
      console.error('Translation error:', errorMessage);
      return text; // Return original text if translation fails
    } finally {
      setIsTranslating(false);
    }
  };

  const translateMultipleTexts = async (
    texts: string[], 
    targetLanguage: string, 
    sourceLanguage: string = 'fr'
  ): Promise<string[]> => {
    const translations = await Promise.allSettled(
      texts.map(text => translateText(text, targetLanguage, sourceLanguage))
    );

    return translations.map((result, index) => 
      result.status === 'fulfilled' ? result.value : texts[index]
    );
  };

  return {
    translateText,
    translateMultipleTexts,
    isTranslating,
    error
  };
};

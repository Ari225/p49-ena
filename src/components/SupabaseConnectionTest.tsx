import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSupabase } from '@/context/SupabaseContext';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const SupabaseConnectionTest: React.FC = () => {
  const { isConnected, isLoading, testConnection, selectData, insertData } = useSupabase();

  const handleTestConnection = async () => {
    await testConnection();
  };

  const handleTestSelect = async () => {
    try {
      const result = await selectData('media_items', 'count');
      console.log('Test select result:', result);
    } catch (error) {
      console.error('Test select error:', error);
    }
  };

  const handleTestInsert = async () => {
    try {
      const testData = {
        title: 'Test Media',
        category: 'Test',
        date: new Date().toISOString().split('T')[0],
        description: 'Test description',
        media_urls: ['https://example.com/test.jpg'],
        created_by: '1f2f2d6c-61e1-457c-bdf3-7f938f4e821a'
      };
      
      const result = await insertData('media_items', testData);
      console.log('Test insert result:', result);
    } catch (error) {
      console.error('Test insert error:', error);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Test de connexion Supabase</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>État de la connexion:</span>
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isLoading ? (
              <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> En cours...</>
            ) : isConnected ? (
              <><CheckCircle className="w-4 h-4 mr-1" /> Connecté</>
            ) : (
              <><XCircle className="w-4 h-4 mr-1" /> Déconnecté</>
            )}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleTestConnection} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Test en cours...</>
            ) : (
              'Tester la connexion'
            )}
          </Button>
          
          <Button 
            onClick={handleTestSelect} 
            variant="outline"
            disabled={!isConnected || isLoading}
            className="w-full"
          >
            Tester SELECT
          </Button>
          
          <Button 
            onClick={handleTestInsert} 
            variant="outline"
            disabled={!isConnected || isLoading}
            className="w-full"
          >
            Tester INSERT
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SupabaseConnectionTest;
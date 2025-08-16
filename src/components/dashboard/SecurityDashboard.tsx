import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Eye,
  Database,
  Lock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SecurityAudit {
  audit_category: string;
  issue_description: string;
  severity_level: string;
  recommendation: string;
  affected_count: number;
}

interface SecurityMonitor {
  timestamp_check: string;
  security_status: string;
  active_threats: number;
  recommendations: string[];
}

const SecurityDashboard = () => {
  const [auditResults, setAuditResults] = useState<SecurityAudit[]>([]);
  const [monitorResults, setMonitorResults] = useState<SecurityMonitor | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const runSecurityAudit = async () => {
    setLoading(true);
    try {
      // Exécuter l'audit de sécurité
      const { data: auditData, error: auditError } = await supabase
        .rpc('security_audit_report');

      if (auditError) {
        console.error('Erreur audit:', auditError);
        toast.error('Erreur lors de l\'audit de sécurité');
        return;
      }

      // Exécuter le monitoring
      const { data: monitorData, error: monitorError } = await supabase
        .rpc('security_monitor');

      if (monitorError) {
        console.error('Erreur monitoring:', monitorError);
        toast.error('Erreur lors du monitoring de sécurité');
        return;
      }

      setAuditResults(auditData || []);
      setMonitorResults(monitorData?.[0] || null);
      setLastCheck(new Date());
      
      toast.success('Audit de sécurité terminé');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'audit de sécurité');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSecurityAudit();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITIQUE': return 'destructive';
      case 'ÉLEVÉ': return 'destructive';
      case 'MOYEN': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SÉCURISÉ': return 'text-green-600';
      case 'ATTENTION': return 'text-yellow-600';
      case 'DANGER': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SÉCURISÉ': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'ATTENTION': return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'DANGER': return <XCircle className="h-6 w-6 text-red-600" />;
      default: return <Shield className="h-6 w-6 text-gray-600" />;
    }
  };

  const criticalIssues = auditResults.filter(issue => 
    issue.severity_level.toUpperCase() === 'CRITIQUE'
  );
  
  const highIssues = auditResults.filter(issue => 
    issue.severity_level.toUpperCase() === 'ÉLEVÉ'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Sécurité</h1>
          <p className="text-gray-600">Surveillance et audit de la sécurité de la base de données</p>
        </div>
        <Button 
          onClick={runSecurityAudit} 
          disabled={loading}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualiser l'audit</span>
        </Button>
      </div>

      {/* Status Overview */}
      {monitorResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getStatusIcon(monitorResults.security_status)}
              <span>État de Sécurité Global</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getStatusColor(monitorResults.security_status)}`}>
                  {monitorResults.security_status}
                </div>
                <p className="text-sm text-gray-600">Statut actuel</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {monitorResults.active_threats}
                </div>
                <p className="text-sm text-gray-600">Menaces actives</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {lastCheck ? lastCheck.toLocaleTimeString() : 'N/A'}
                </div>
                <p className="text-sm text-gray-600">Dernière vérification</p>
              </div>
            </div>
            
            {monitorResults.recommendations.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Recommandations :</h4>
                <ul className="list-disc list-inside space-y-1">
                  {monitorResults.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Critical Issues Alert */}
      {criticalIssues.length > 0 && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>ATTENTION:</strong> {criticalIssues.length} problème(s) critique(s) détecté(s) ! 
            Action immédiate requise.
          </AlertDescription>
        </Alert>
      )}

      {/* Security Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical and High Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Problèmes Critiques et Élevés</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...criticalIssues, ...highIssues].map((issue, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={getSeverityColor(issue.severity_level)}>
                      {issue.severity_level}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {issue.affected_count} affecté(s)
                    </span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{issue.issue_description}</h4>
                  <p className="text-xs text-gray-600">{issue.recommendation}</p>
                </div>
              ))}
              {criticalIssues.length === 0 && highIssues.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p>Aucun problème critique ou élevé détecté</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* All Issues Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Résumé de l'Audit</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditResults.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant={getSeverityColor(issue.severity_level)} className="text-xs">
                        {issue.severity_level}
                      </Badge>
                      <span className="text-sm font-medium">{issue.audit_category}</span>
                    </div>
                    <p className="text-xs text-gray-600">{issue.issue_description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {issue.affected_count}
                    </span>
                  </div>
                </div>
              ))}
              {auditResults.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p>Aucun problème détecté</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Conseils de Sécurité</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Bonnes Pratiques :</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Vérifiez régulièrement cet audit (quotidiennement)</li>
                <li>Activez RLS sur toutes les tables sensibles</li>
                <li>Utilisez des mots de passe forts (8+ caractères)</li>
                <li>Limitez les accès aux données personnelles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Actions Immédiates :</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Corrigez tous les problèmes CRITIQUES</li>
                <li>Surveillez les accès anormaux</li>
                <li>Sauvegardez régulièrement les données</li>
                <li>Mettez à jour les politiques de sécurité</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, FileText, Download, Clock } from 'lucide-react';
interface AssembleeData {
  id: number;
  type: string;
  date: string;
  lieu: string;
  participants: number;
  duree: string;
  president: string;
  decisions?: string[];
  ordreJour?: string[];
  documents?: {
    nom: string;
    type: string;
  }[];
  inscriptions?: string;
  status: string;
  resume: string;
}
interface AssembleeCardProps {
  assemblee: AssembleeData;
}
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Terminée':
      return 'bg-gray-100 text-gray-800';
    case 'À venir':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};
const AssembleeCard: React.FC<AssembleeCardProps> = ({
  assemblee
}) => <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-primary">{assemblee.type}</CardTitle>
        <Badge className={getStatusColor(assemblee.status)}>
          {assemblee.status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{assemblee.resume}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {assemblee.date}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {assemblee.lieu}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          {assemblee.participants} participants
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          Durée : {assemblee.duree}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          Président : {assemblee.president}
        </div>
      </div>

      {assemblee.inscriptions}

      {assemblee.ordreJour && <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Ordre du jour :</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {assemblee.ordreJour.map((point: string, index: number) => <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {point}
              </li>)}
          </ul>
        </div>}

      {assemblee.decisions && <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Principales décisions :</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {assemblee.decisions.map((decision: string, index: number) => <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                {decision}
              </li>)}
          </ul>
        </div>}

      {assemblee.documents && <div>
          <h4 className="font-medium text-gray-700 mb-2">Documents disponibles :</h4>
          <div className="space-y-2">
            {assemblee.documents.map((doc: any, index: number) => <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{doc.nom}</span>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  {doc.type}
                </Button>
              </div>)}
          </div>
        </div>}
    </CardContent>
  </Card>;
export default AssembleeCard;
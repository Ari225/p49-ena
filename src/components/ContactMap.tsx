
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ContactMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Coordinates for the headquarters location from the Google Maps link
  // This corresponds to Abidjan, Cocody area
  const headquarters = {
    lng: -4.0083,
    lat: 5.3364,
    name: "Siège de la P49"
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [headquarters.lng, headquarters.lat],
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker for headquarters
    const marker = new mapboxgl.Marker({ color: '#151D3B' })
      .setLngLat([headquarters.lng, headquarters.lat])
      .addTo(map.current);

    // Add popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 4px 0; font-weight: bold; color: #151D3B;">${headquarters.name}</h3>
          <p style="margin: 0; font-size: 14px; color: #666;">Cocody, Angré<br/>Abidjan, Côte d'Ivoire</p>
        </div>
      `);

    marker.setPopup(popup);

    setShowTokenInput(false);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="h-48 bg-gray-50 rounded-lg border p-6 flex flex-col justify-center">
        <div className="text-center mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Configuration de la carte</h4>
          <p className="text-sm text-gray-600 mb-4">
            Veuillez entrer votre token Mapbox public pour afficher la carte interactive.
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Obtenez votre token sur mapbox.com
            </a>
          </p>
        </div>
        <form onSubmit={handleTokenSubmit} className="space-y-3">
          <div>
            <Label htmlFor="mapbox-token" className="text-sm">Token Mapbox</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1IjoiY..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="text-sm"
            />
          </div>
          <Button type="submit" size="sm" className="w-full">
            Charger la carte
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="h-48 rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ContactMap;

import type { Map as MapboxMap } from 'mapbox-gl';

export interface Location {
  id: number;
  city: string;
  country: string;
  coordinates: [number, number]; // Fixed: Using tuple type instead of number[]
  type: string;
  impact: {
    clients: number;
    revenue: string;
    projects: number;
  };
  successStories: Array<{
    title: string;
    description: string;
    metrics: string;
  }>;
}

export interface GlobalStats {
  totalClients: string;
  globalProjects: string;
  successRate: string;
  countriesServed: string;
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface MapContextType {
  map: MapboxMap | null;
  setMap: (map: MapboxMap | null) => void;
}
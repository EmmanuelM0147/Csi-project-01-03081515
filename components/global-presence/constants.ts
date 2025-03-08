import { Location, GlobalStats } from './types';

export const LOCATIONS: Location[] = [
  {
    id: 1,
    city: "New York",
    country: "United States",
    coordinates: [-74.006, 40.7128], // Explicitly defined as [lng, lat] tuple
    type: "Regional Headquarters",
    impact: {
      clients: 150,
      revenue: "$50M+",
      projects: 200
    },
    successStories: [
      {
        title: "Digital Transformation Success",
        description: "Led a major financial institution through complete digital transformation",
        metrics: "200% increase in digital adoption"
      }
    ]
  },
  {
    id: 2,
    city: "London",
    country: "United Kingdom",
    coordinates: [-0.1278, 51.5074], // Explicitly defined as [lng, lat] tuple
    type: "European Hub",
    impact: {
      clients: 120,
      revenue: "£40M+",
      projects: 180
    },
    successStories: [
      {
        title: "FinTech Innovation",
        description: "Revolutionized payment systems for a major retail chain",
        metrics: "45% increase in transaction efficiency"
      }
    ]
  },
  {
    id: 3,
    city: "Singapore",
    country: "Singapore",
    coordinates: [103.8198, 1.3521], // Explicitly defined as [lng, lat] tuple
    type: "APAC Headquarters",
    impact: {
      clients: 100,
      revenue: "S$35M+",
      projects: 150
    },
    successStories: [
      {
        title: "Supply Chain Optimization",
        description: "Implemented smart logistics solution for regional operations",
        metrics: "30% reduction in operational costs"
      }
    ]
  },
  {
    id: 4,
    city: "Dubai",
    country: "UAE",
    coordinates: [55.2708, 25.2048], // Explicitly defined as [lng, lat] tuple
    type: "Middle East Office",
    impact: {
      clients: 80,
      revenue: "AED 180M+",
      projects: 120
    },
    successStories: [
      {
        title: "Smart City Initiative",
        description: "Partnered with government for digital infrastructure",
        metrics: "Smart services adoption increased by 150%"
      }
    ]
  }
];

export const GLOBAL_STATS: GlobalStats = {
  totalClients: "450+",
  globalProjects: "650+",
  successRate: "95%",
  countriesServed: "25+"
};

export const MAP_STYLE = "mapbox://styles/mapbox/dark-v11";

export const INITIAL_VIEWPORT = {
  latitude: 20,
  longitude: 0,
  zoom: 1.5,
  minZoom: 1,
  maxZoom: 16
};
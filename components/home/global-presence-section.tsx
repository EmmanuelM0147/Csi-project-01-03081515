import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

// Configure Mapbox
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Define location type with proper coordinates tuple
interface Location {
  name: string;
  coordinates: [number, number]; // Fixed: Using tuple type instead of number[]
  description: string;
  metrics: {
    projects: number;
    clients: number;
    satisfaction: string;
  }
}

const locations: Location[] = [
  {
    name: "New York",
    coordinates: [-74.006, 40.7128],
    description: "North American Innovation Hub",
    metrics: {
      projects: 150,
      clients: 75,
      satisfaction: "98%"
    }
  },
  {
    name: "Lagos",
    coordinates: [3.3792, 6.5244],
    description: "West African Strategic Center",
    metrics: {
      projects: 120,
      clients: 60,
      satisfaction: "96%"
    }
  },
  {
    name: "Abuja",
    coordinates: [7.4917, 9.0765],
    description: "Nigerian Operations Hub",
    metrics: {
      projects: 85,
      clients: 40,
      satisfaction: "95%"
    }
  },
  {
    name: "Nairobi",
    coordinates: [36.8219, -1.2921],
    description: "East African Innovation Center",
    metrics: {
      projects: 95,
      clients: 45,
      satisfaction: "97%"
    }
  },
  {
    name: "Kigali",
    coordinates: [30.0587, -1.9403],
    description: "Central African Tech Hub",
    metrics: {
      projects: 70,
      clients: 35,
      satisfaction: "99%"
    }
  },
  {
    name: "Accra",
    coordinates: [-0.1870, 5.6037],
    description: "West African Development Center",
    metrics: {
      projects: 80,
      clients: 40,
      satisfaction: "96%"
    }
  },
  {
    name: "London",
    coordinates: [-0.1276, 51.5074],
    description: "European Strategic Hub",
    metrics: {
      projects: 130,
      clients: 65,
      satisfaction: "97%"
    }
  },
  {
    name: "Johannesburg",
    coordinates: [28.0473, -26.2041],
    description: "Southern African Hub",
    metrics: {
      projects: 110,
      clients: 55,
      satisfaction: "96%"
    }
  },
  {
    name: "Singapore",
    coordinates: [103.8198, 1.3521],
    description: "Asian Pacific Center",
    metrics: {
      projects: 90,
      clients: 45,
      satisfaction: "98%"
    }
  }
];

export function GlobalPresenceSection() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) {
      // Skip map initialization if token is missing
      return;
    }

    // Dynamically import mapboxgl to avoid server-side rendering issues
    const initializeMap = async () => {
      try {
        const mapboxgl = (await import('mapbox-gl')).default;
        mapboxgl.accessToken = mapboxToken;

        if (!map.current && mapContainer.current) {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [0, 20],
            zoom: 1.8,
            projection: 'mercator',
            interactive: true,
            attributionControl: false
          });

          map.current.scrollZoom.disable();
          map.current.addControl(new mapboxgl.NavigationControl());

          // Add markers with animations
          map.current.on('load', () => {
            locations.forEach((location, index) => {
              // Create custom marker element
              const el = document.createElement('div');
              el.className = 'custom-marker';
              el.style.width = '20px';
              el.style.height = '20px';
              el.style.backgroundColor = '#0A2240';
              el.style.borderRadius = '50%';
              el.style.cursor = 'pointer';
              el.style.animation = 'pulse 2s infinite';
              el.style.opacity = '0';
              el.style.transform = 'scale(0)';

              // Add marker to map - coordinates are now properly typed as [number, number]
              const marker = new mapboxgl.Marker(el)
                .setLngLat(location.coordinates)
                .addTo(map.current);

              // Add click event
              el.addEventListener('click', () => {
                setSelectedLocation(location);
                map.current?.flyTo({
                  center: location.coordinates,
                  zoom: 4,
                  duration: 2000
                });
              });

              // Animate marker entrance
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
              }, index * 200);
            });
          });
        }
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    // Only initialize map in browser environment
    if (typeof window !== 'undefined') {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <style jsx global>{`
        .custom-marker {
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease-out;
          box-shadow: 0 0 0 rgba(10, 34, 64, 0.4);
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(10, 34, 64, 0.4);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(10, 34, 64, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(10, 34, 64, 0);
          }
        }
      `}</style>

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Global Presence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering strategic innovation and business excellence across continents
          </p>
        </motion.div>

        <div className="relative">
          {mapboxToken ? (
            <div 
              ref={mapContainer} 
              className="w-full h-[600px] rounded-lg overflow-hidden"
              role="region"
              aria-label="Interactive map showing Carlora's global presence"
            />
          ) : (
            <div className="w-full h-[600px] rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map visualization unavailable</p>
            </div>
          )}

          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-8 right-8"
            >
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{selectedLocation.name}</h3>
                  <p className="text-primary-foreground/80 mb-4">{selectedLocation.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{selectedLocation.metrics.projects}</div>
                      <div className="text-sm text-primary-foreground/70">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{selectedLocation.metrics.clients}</div>
                      <div className="text-sm text-primary-foreground/70">Clients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{selectedLocation.metrics.satisfaction}</div>
                      <div className="text-sm text-primary-foreground/70">Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState, useEffect } from 'react';

interface GeolocationState {
  location: string;
  error: string | null;
  loading: boolean;
}

export function useGeoLocation() {
  const [state, setState] = useState<GeolocationState>({
    location: '',
    error: null,
    loading: true
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        // First try to get location from IP (for better UX)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.city && data.country_name) {
          setState({
            location: `${data.city}, ${data.country_name}`,
            error: null,
            loading: false
          });
        } else {
          // Fallback to browser geolocation
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const response = await fetch(
                  `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
                );
                const data = await response.json();
                
                const features = data.features[0];
                if (features) {
                  const city = features.context.find((c: any) => c.id.startsWith('place'))?.text;
                  const country = features.context.find((c: any) => c.id.startsWith('country'))?.text;
                  
                  setState({
                    location: `${city}, ${country}`,
                    error: null,
                    loading: false
                  });
                }
              } catch (error) {
                setState(prev => ({
                  ...prev,
                  error: 'Failed to get location name',
                  loading: false
                }));
              }
            },
            (error) => {
              setState(prev => ({
                ...prev,
                error: error.message,
                loading: false
              }));
            }
          );
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to get location',
          loading: false
        }));
      }
    };

    getLocation();
  }, []);

  return state;
}
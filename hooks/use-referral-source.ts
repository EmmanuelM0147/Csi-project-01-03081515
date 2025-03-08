"use client";

import { useState, useEffect } from 'react';

interface ReferralState {
  referralSource: string;
  campaign: string | null;
  medium: string | null;
}

export function useReferralSource() {
  const [state, setState] = useState<ReferralState>({
    referralSource: '',
    campaign: null,
    medium: null
  });

  useEffect(() => {
    const getReferralInfo = () => {
      if (typeof window === 'undefined') return;

      // Get referrer
      const referrer = document.referrer;
      let source = '';
      let campaign = null;
      let medium = null;

      // Check URL parameters for UTM
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmCampaign = urlParams.get('utm_campaign');
      const utmMedium = urlParams.get('utm_medium');

      if (utmSource) {
        source = utmSource;
        campaign = utmCampaign;
        medium = utmMedium;
      } else if (referrer) {
        // Parse referrer URL
        try {
          const referrerUrl = new URL(referrer);
          const hostname = referrerUrl.hostname.toLowerCase();

          if (hostname.includes('google')) {
            source = 'google';
          } else if (hostname.includes('linkedin')) {
            source = 'linkedin';
          } else if (hostname.includes('facebook')) {
            source = 'facebook';
          } else if (hostname.includes('twitter')) {
            source = 'twitter';
          } else {
            source = hostname;
          }
        } catch (error) {
          console.error('Failed to parse referrer:', error);
          source = 'direct';
        }
      } else {
        source = 'direct';
      }

      setState({
        referralSource: source,
        campaign,
        medium
      });
    };

    getReferralInfo();
  }, []);

  return state;
}
import { MapProvider } from '@/components/global-presence/map-context';

export default function GlobalPresenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MapProvider>{children}</MapProvider>;
}
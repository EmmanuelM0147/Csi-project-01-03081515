import { usePerformanceMonitor } from '@/lib/animations/hooks';

export function PerformanceMonitor() {
  const { fps, paintTiming } = usePerformanceMonitor();

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
      <div>FPS: {fps}</div>
      <div>Paint: {Math.round(paintTiming)}ms</div>
    </div>
  );
}
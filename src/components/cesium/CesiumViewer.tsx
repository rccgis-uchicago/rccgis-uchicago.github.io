import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';

export function CesiumViewer({
  initialLocation = {
    longitude: -87.6298, // UChicago coordinates
    latitude: 41.7886,
    height: 1000
  }
}) {
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Initialize viewer
    viewerRef.current = new Cesium.Viewer(containerRef.current, {
      terrainProvider: Cesium.createWorldTerrain(),
      baseLayerPicker: true,
      timeline: false,
      animation: false,
      geocoder: true
    });
    // Set initial view
    viewerRef.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        initialLocation.longitude,
        initialLocation.latitude,
        initialLocation.height
      )
    });
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [initialLocation]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[600px] rounded-lg shadow-lg"
    />
  );
}
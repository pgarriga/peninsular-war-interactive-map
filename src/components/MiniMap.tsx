import { useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Rectangle, useMap, useMapEvent } from 'react-leaflet';
import type { LatLngBounds } from 'leaflet';
import {
  HISTORICAL_MAP_URL,
  PENINSULA_BOUNDS,
  MINIMAP_CENTER,
  MINIMAP_ZOOM
} from '../constants';

function MinimapBounds({ parentMap }: { parentMap: L.Map }) {
  const minimap = useMap();
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);

  const updateBounds = useCallback(() => {
    const newBounds = parentMap.getBounds();
    setBounds(newBounds);
  }, [parentMap]);

  useMapEvent('moveend', updateBounds);

  useEffect(() => {
    parentMap.on('move', updateBounds);
    parentMap.on('zoom', updateBounds);
    updateBounds();
    return () => {
      parentMap.off('move', updateBounds);
      parentMap.off('zoom', updateBounds);
    };
  }, [parentMap, updateBounds]);

  useMapEvent('click', (e) => {
    parentMap.setView(e.latlng, parentMap.getZoom());
  });

  useEffect(() => {
    minimap.setView(MINIMAP_CENTER, MINIMAP_ZOOM);
  }, [minimap]);

  if (!bounds) return null;

  return (
    <Rectangle
      bounds={bounds}
      pathOptions={{
        color: '#c41e3a',
        weight: 2,
        fillColor: '#c41e3a',
        fillOpacity: 0.2
      }}
    />
  );
}

interface MiniMapProps {
  parentMap: L.Map | null;
}

export function MiniMap({ parentMap }: MiniMapProps) {
  if (!parentMap) return null;

  return (
    <div className="minimap-container sepia-filter">
      <MapContainer
        center={MINIMAP_CENTER}
        zoom={MINIMAP_ZOOM}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        className="minimap"
        bounds={PENINSULA_BOUNDS}
      >
        <TileLayer url={HISTORICAL_MAP_URL} />
        <MinimapBounds parentMap={parentMap} />
      </MapContainer>
    </div>
  );
}

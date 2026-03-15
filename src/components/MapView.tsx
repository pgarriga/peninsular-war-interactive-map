import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { EventMarker } from './EventMarker';
import { EventInfo } from './EventInfo';
import { MiniMap } from './MiniMap';
import type { WarEvent } from '../types';
import {
  HISTORICAL_MAP_URL,
  HISTORICAL_MAP_ATTRIBUTION,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  EVENT_ZOOM_LEVEL
} from '../constants';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  events: WarEvent[];
  currentEventIndex: number;
  selectedEvent: WarEvent | null;
  onEventClick: (index: number) => void;
  onCloseInfo: () => void;
}

function MapController({
  event,
  onMapReady
}: {
  event: WarEvent | null;
  onMapReady: (map: LeafletMap) => void;
}) {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  useEffect(() => {
    if (event) {
      map.setView(event.coords, EVENT_ZOOM_LEVEL);
    }
  }, [event, map]);

  return null;
}

export function MapView({
  events,
  currentEventIndex,
  selectedEvent,
  onEventClick,
  onCloseInfo
}: MapViewProps) {
  const [parentMap, setParentMap] = useState<LeafletMap | null>(null);

  return (
    <div className="map-container sepia-filter">
      <MapContainer
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
        className="map"
      >
        <TileLayer
          attribution={HISTORICAL_MAP_ATTRIBUTION}
          url={HISTORICAL_MAP_URL}
        />
        <MapController event={selectedEvent} onMapReady={setParentMap} />
        {events.map((event, index) => (
          <EventMarker
            key={event.id}
            event={event}
            isActive={index === currentEventIndex}
            onClick={() => onEventClick(index)}
          />
        ))}
      </MapContainer>
      <MiniMap parentMap={parentMap} />
      <EventInfo event={selectedEvent} onClose={onCloseInfo} />
      <div className="map-legend">
        <div className="legend-item">
          <svg className="legend-icon legend-battle" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.2 2L2 6.2l1.5 1.5 1.5-1.5 6.3 6.3-6.3 6.3-1.5-1.5L2 18.8 6.2 23l1.5-1.5-1.5-1.5 6.3-6.3 6.3 6.3-1.5 1.5L18.8 23 23 18.8l-1.5-1.5-1.5 1.5-6.3-6.3 6.3-6.3 1.5 1.5L23 6.2 18.8 2l-1.5 1.5 1.5 1.5-6.3 6.3L6.2 5l1.5-1.5L6.2 2z"/>
          </svg>
          <span>Battle</span>
        </div>
        <div className="legend-item">
          <svg className="legend-icon legend-siege" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h3v3h2V3h4v3h2V3h4v3h2V3h1v6h-2v12H5V9H3V3zm4 8v9h4v-5h2v5h4V11H7z"/>
          </svg>
          <span>Siege</span>
        </div>
        <div className="legend-item">
          <svg className="legend-icon legend-other" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>Other</span>
        </div>
      </div>
    </div>
  );
}

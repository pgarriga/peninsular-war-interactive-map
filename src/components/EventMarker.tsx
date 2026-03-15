import { memo, useMemo } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import type { WarEvent, EventCategory } from '../types';
import { CATEGORY_COLORS, MARKER_SIZE_DEFAULT, MARKER_SIZE_ACTIVE } from '../constants';

interface EventMarkerProps {
  event: WarEvent;
  isActive: boolean;
  onClick: () => void;
}

const categoryIcons: Record<EventCategory, string> = {
  // Crossed swords for battles
  battle: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.2 2L2 6.2l1.5 1.5 1.5-1.5 6.3 6.3-6.3 6.3-1.5-1.5L2 18.8 6.2 23l1.5-1.5-1.5-1.5 6.3-6.3 6.3 6.3-1.5 1.5L18.8 23 23 18.8l-1.5-1.5-1.5 1.5-6.3-6.3 6.3-6.3 1.5 1.5L23 6.2 18.8 2l-1.5 1.5 1.5 1.5-6.3 6.3L6.2 5l1.5-1.5L6.2 2z"/>
  </svg>`,
  // Castle tower for sieges
  siege: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h3v3h2V3h4v3h2V3h4v3h2V3h1v6h-2v12H5V9H3V3zm4 8v9h4v-5h2v5h4V11H7z"/>
  </svg>`,
  // Star for other events
  other: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>`
};

function createIcon(category: EventCategory, isActive: boolean) {
  const color = isActive ? CATEGORY_COLORS.active : CATEGORY_COLORS[category];
  const size = isActive ? MARKER_SIZE_ACTIVE : MARKER_SIZE_DEFAULT;
  const iconSvg = categoryIcons[category];

  const html = `
    <div class="custom-marker ${isActive ? 'active' : ''}" style="
      width: ${size}px;
      height: ${size}px;
      color: ${color};
      filter: drop-shadow(0 2px 3px rgba(0,0,0,0.4));
    ">
      ${iconSvg}
    </div>
  `;

  return L.divIcon({
    className: 'custom-marker-container',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

export const EventMarker = memo(function EventMarker({ event, isActive, onClick }: EventMarkerProps) {
  const icon = useMemo(
    () => createIcon(event.category, isActive),
    [event.category, isActive]
  );

  return (
    <Marker
      position={event.coords}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Tooltip direction="top" offset={[0, -10]}>
        {event.name}
      </Tooltip>
    </Marker>
  );
});

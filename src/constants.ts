// Autoplay settings
export const AUTOPLAY_INTERVAL_MS = 4000;

// Map settings
export const DEFAULT_MAP_CENTER: [number, number] = [40.0, -4.0];
export const DEFAULT_MAP_ZOOM = 6;
export const EVENT_ZOOM_LEVEL = 9;

// Minimap settings
export const MINIMAP_CENTER: [number, number] = [40, -3];
export const MINIMAP_ZOOM = 4;
export const PENINSULA_BOUNDS: [[number, number], [number, number]] = [
  [35.5, -10],
  [44, 4]
];

// Map tile URL
export const HISTORICAL_MAP_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
export const HISTORICAL_MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

// Marker settings
export const MARKER_SIZE_DEFAULT = 24;
export const MARKER_SIZE_ACTIVE = 32;

// Category colors
export const CATEGORY_COLORS = {
  battle: '#c41e3a',
  siege: '#8b4513',
  other: '#2e7d32',
  active: '#1a5276'
} as const;

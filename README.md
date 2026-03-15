# Peninsular War Interactive Map

![Version](https://img.shields.io/badge/Version-1.0.3-blue?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.0-646CFF?logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)
![React Leaflet](https://img.shields.io/badge/React_Leaflet-5.0.0-61DAFB?logo=react&logoColor=white)

An interactive map visualization of the Peninsular War (1807-1814) timeline with 93 historical events.

## Features

- Interactive map with OpenStreetMap tiles
- Timeline slider to navigate through events chronologically
- Auto-play mode to animate through the war timeline
- Click on markers to view event details and Wikipedia links
- Keyboard navigation (arrows, space, escape)
- Responsive design

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Tech Stack

| Library | Version | Description |
|---------|---------|-------------|
| React | 19.2.4 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Vite | 8.0.0 | Build tool |
| Leaflet | 1.9.4 | Map library |
| React Leaflet | 5.0.0 | React bindings for Leaflet |

## Project Structure

```
src/
├── components/
│   ├── MapView.tsx      # Main map component
│   ├── EventMarker.tsx  # Custom map markers with category icons
│   ├── EventInfo.tsx    # Event details panel
│   ├── EventList.tsx    # Sidebar with search and filters
│   ├── MiniMap.tsx      # Overview minimap
│   └── Timeline.tsx     # Timeline slider controls
├── data/
│   └── events.ts        # 93 historical events
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx
├── App.css
└── main.tsx
```

## License

MIT

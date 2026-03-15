# Peninsular War Interactive Map

An interactive map visualization of the Peninsular War (1807-1814) events.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Leaflet / React-Leaflet** for map rendering
- **pnpm** as package manager

## Project Structure

```
src/
├── components/
│   ├── EventMarker.tsx    # Map markers with category icons
│   ├── EventList.tsx      # Sidebar with search/filter
│   ├── EventInfo.tsx      # Event detail panel
│   ├── MapView.tsx        # Main map component
│   ├── MiniMap.tsx        # Overview minimap
│   └── Timeline.tsx       # Timeline slider controls
├── data/
│   └── events.ts          # 93 historical events
├── types/
│   └── index.ts           # TypeScript types
├── App.tsx                # Main app component
└── App.css                # All styles
```

## Development

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm tsc        # Type check
```

## Event Categories

- **battle** - Military engagements (red, crossed swords icon)
- **siege** - City/fortress sieges (brown, castle icon)
- **other** - Treaties, occupations, etc. (green, star icon)

## Key Features

- Chronologically sorted events
- Search by name or location
- Filter by category
- Auto-play timeline with 4s intervals
- Keyboard navigation (arrows, space, escape)
- Mobile-responsive with slide-out event list
- Historical sepia map style
- Minimap for orientation

## Code Conventions

- Functional components with hooks
- TypeScript strict mode
- CSS in single App.css file
- Events sorted at runtime, not in data file

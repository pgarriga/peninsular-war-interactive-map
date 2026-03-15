import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { Timeline } from './components/Timeline';
import { EventList } from './components/EventList';
import { peninsularWarEvents } from './data/events';
import { useKeyboardNavigation, useUrlState } from './hooks';
import { AUTOPLAY_INTERVAL_MS } from './constants';
import type { EventCategory } from './types';
import './App.css';

// Lazy load MapView for better initial load
const MapView = lazy(() => import('./components/MapView').then(m => ({ default: m.MapView })));

// Sort events chronologically once
const sortedEvents = [...peninsularWarEvents].sort((a, b) =>
  new Date(a.date).getTime() - new Date(b.date).getTime()
);

function App() {
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'all'>('all');

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return sortedEvents.filter(event => {
      const matchesSearch = searchTerm === '' ||
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const currentEvent = currentEventIndex >= 0 && currentEventIndex < filteredEvents.length
    ? filteredEvents[currentEventIndex]
    : null;

  // URL state management
  const handleUrlEventChange = useCallback((eventId: number | null) => {
    if (eventId === null) {
      setCurrentEventIndex(-1);
      return;
    }
    const index = filteredEvents.findIndex(e => e.id === eventId);
    if (index !== -1) {
      setCurrentEventIndex(index);
    }
  }, [filteredEvents]);

  useUrlState({
    eventId: currentEvent?.id ?? null,
    onEventIdChange: handleUrlEventChange
  });

  // Navigation functions
  const goToEvent = useCallback((index: number) => {
    if (index >= 0 && index < filteredEvents.length) {
      setCurrentEventIndex(index);
    }
  }, [filteredEvents.length]);

  const previousEvent = useCallback(() => {
    if (currentEventIndex > 0) {
      goToEvent(currentEventIndex - 1);
    }
  }, [currentEventIndex, goToEvent]);

  const nextEvent = useCallback(() => {
    if (currentEventIndex < filteredEvents.length - 1) {
      goToEvent(currentEventIndex + 1);
    }
  }, [currentEventIndex, filteredEvents.length, goToEvent]);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentEventIndex === filteredEvents.length - 1 || currentEventIndex === -1) {
        goToEvent(0);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentEventIndex, filteredEvents.length, goToEvent]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleCloseInfo = useCallback(() => {
    setCurrentEventIndex(-1);
  }, []);

  const handleSliderChange = useCallback((index: number) => {
    setIsPlaying(false);
    goToEvent(index);
  }, [goToEvent]);

  // Reset index when filters change
  useEffect(() => {
    setCurrentEventIndex(-1);
    setIsPlaying(false);
  }, [searchTerm, categoryFilter]);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentEventIndex(prev => {
        if (prev < filteredEvents.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPlaying, filteredEvents.length]);

  // Keyboard navigation
  useKeyboardNavigation({
    onPrevious: previousEvent,
    onNext: nextEvent,
    onTogglePlay: togglePlayback,
    onEscape: handleCloseInfo,
    onPause: pause
  });

  return (
    <div className="app">
      <header>
        <h1>Peninsular War Interactive Map</h1>
        <p className="subtitle">1807 - 1814</p>
      </header>

      <div className="main-content">
        <EventList
          events={filteredEvents}
          currentEventIndex={currentEventIndex}
          onEventClick={goToEvent}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <Suspense fallback={<div className="map-container loading">Loading map...</div>}>
          <MapView
            events={filteredEvents}
            currentEventIndex={currentEventIndex}
            selectedEvent={currentEvent}
            onEventClick={goToEvent}
            onCloseInfo={handleCloseInfo}
          />
        </Suspense>
      </div>

      <Timeline
        currentIndex={currentEventIndex}
        totalEvents={filteredEvents.length}
        isPlaying={isPlaying}
        onSliderChange={handleSliderChange}
        onPrevious={() => { pause(); previousEvent(); }}
        onNext={() => { pause(); nextEvent(); }}
        onTogglePlay={togglePlayback}
      />
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from 'react';
import type { WarEvent, EventCategory } from '../types';

interface EventListProps {
  events: WarEvent[];
  currentEventIndex: number;
  onEventClick: (index: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categoryFilter: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function EventList({
  events,
  currentEventIndex,
  onEventClick,
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange
}: EventListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeItemRef = useRef<HTMLLIElement>(null);

  // Scroll to active item when it changes
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentEventIndex]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="event-list-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close event list' : 'Open event list'}
      >
        <span className="toggle-icon">{isOpen ? '✕' : '☰'}</span>
        <span className="toggle-text">{events.length} events</span>
      </button>

      <div className={`event-list ${isOpen ? 'open' : ''}`}>
        <h2 className="event-list-title">Events ({events.length})</h2>

        {/* Search input */}
        <div className="event-list-search">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category filter */}
        <div className="event-list-filters">
          <button
            className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`}
            onClick={() => onCategoryChange('all')}
          >
            All
          </button>
          <button
            className={`filter-btn filter-battle ${categoryFilter === 'battle' ? 'active' : ''}`}
            onClick={() => onCategoryChange('battle')}
          >
            Battles
          </button>
          <button
            className={`filter-btn filter-siege ${categoryFilter === 'siege' ? 'active' : ''}`}
            onClick={() => onCategoryChange('siege')}
          >
            Sieges
          </button>
          <button
            className={`filter-btn filter-other ${categoryFilter === 'other' ? 'active' : ''}`}
            onClick={() => onCategoryChange('other')}
          >
            Other
          </button>
        </div>

        <ul className="event-list-items">
          {events.length === 0 ? (
            <li className="event-list-empty">No events found</li>
          ) : (
            events.map((event, index) => (
              <li
                key={event.id}
                ref={index === currentEventIndex ? activeItemRef : null}
                className={`event-list-item ${index === currentEventIndex ? 'active' : ''}`}
                onClick={() => {
                  onEventClick(index);
                  setIsOpen(false);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onEventClick(index);
                    setIsOpen(false);
                  }
                }}
              >
                <span className="event-list-date">{formatDate(event.date)}</span>
                <span className="event-list-name">
                  <span className={`category-dot category-${event.category}`}></span>
                  {event.name}
                </span>
                <span className="event-list-location">{event.location}</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="event-list-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}

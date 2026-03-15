import type { WarEvent } from '../types';

interface EventInfoProps {
  event: WarEvent | null;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

export function EventInfo({ event, onClose }: EventInfoProps) {
  if (!event) return null;

  return (
    <div className="event-info">
      <button className="close-info" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <h2 className="event-name">{event.name}</h2>
      <p className="event-date">{formatDate(event.date)}</p>
      <a
        className="event-link"
        href={event.wikipedia}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more on Wikipedia
      </a>
    </div>
  );
}

import { useEffect, useCallback } from 'react';

interface UseUrlStateOptions {
  eventId: number | null;
  onEventIdChange: (id: number | null) => void;
}

export function useUrlState({ eventId, onEventIdChange }: UseUrlStateOptions) {
  // Read initial state from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlEventId = params.get('event');

    if (urlEventId) {
      const id = parseInt(urlEventId, 10);
      if (!isNaN(id)) {
        onEventIdChange(id);
      }
    }
  }, [onEventIdChange]);

  // Update URL when event changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (eventId !== null) {
      params.set('event', String(eventId));
    } else {
      params.delete('event');
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, [eventId]);

  const getShareUrl = useCallback(() => {
    if (eventId === null) return window.location.origin + window.location.pathname;
    return `${window.location.origin}${window.location.pathname}?event=${eventId}`;
  }, [eventId]);

  return { getShareUrl };
}

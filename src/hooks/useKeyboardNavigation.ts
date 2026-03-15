import { useEffect } from 'react';

interface UseKeyboardNavigationOptions {
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onEscape: () => void;
  onPause?: () => void;
}

export function useKeyboardNavigation({
  onPrevious,
  onNext,
  onTogglePlay,
  onEscape,
  onPause
}: UseKeyboardNavigationOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          onPause?.();
          onPrevious();
          break;
        case 'ArrowRight':
          onPause?.();
          onNext();
          break;
        case ' ':
          e.preventDefault();
          onTogglePlay();
          break;
        case 'Escape':
          onEscape();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onPrevious, onNext, onTogglePlay, onEscape, onPause]);
}

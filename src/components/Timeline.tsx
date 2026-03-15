interface TimelineProps {
  currentIndex: number;
  totalEvents: number;
  isPlaying: boolean;
  onSliderChange: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}

export function Timeline({
  currentIndex,
  totalEvents,
  isPlaying,
  onSliderChange,
  onPrevious,
  onNext,
  onTogglePlay
}: TimelineProps) {
  const sliderValue = totalEvents > 1
    ? (currentIndex / (totalEvents - 1)) * 100
    : 0;

  const handleSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const index = Math.round((value / 100) * (totalEvents - 1));
    onSliderChange(index);
  };

  return (
    <div className="timeline-container">
      <div className="timeline-controls">
        <button
          className="control-btn"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          aria-label="Previous event"
        >
          &#9664;
        </button>
        <button
          className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={onTogglePlay}
          aria-label="Play/Pause"
        >
          {isPlaying ? <>&#10074;&#10074;</> : <>&#9654;</>}
        </button>
        <button
          className="control-btn"
          onClick={onNext}
          disabled={currentIndex === totalEvents - 1}
          aria-label="Next event"
        >
          &#9654;
        </button>
      </div>

      <div className="timeline-slider-container">
        <input
          type="range"
          className="timeline-slider"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderInput}
        />
        <div className="timeline-years">
          <span>1807</span>
          <span>1808</span>
          <span>1809</span>
          <span>1810</span>
          <span>1811</span>
          <span>1812</span>
          <span>1813</span>
          <span>1814</span>
        </div>
      </div>

    </div>
  );
}

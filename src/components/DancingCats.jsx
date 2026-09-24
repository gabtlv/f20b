import { useEffect, useRef } from 'react'
import catsDancing from '../assets/cats dancing.webm'

// The native `loop` attribute always restarts at frame 0, so it cannot skip
// an intro. We loop by hand instead, which fixes both causes of the flicker:
//
//   startAt  - skips the opening frames, whose content differs from the end
//   endGap   - jumps back slightly BEFORE the file ends, so the element never
//              enters its "ended" state, where the browser may paint a blank
//              frame for an instant before restarting
//
// Times are in seconds; both are safe to tweak.
function DancingCats({ side, startAt = 2, endGap = 0.2 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let frame = 0;

    const rewind = () => {
      try {
        video.currentTime = startAt;
      } catch {
        // seeking can throw until enough of the file is buffered
      }
    };

    const startPlaying = () => {
      if (startAt > 0) rewind();
      const attempt = video.play();
      // muted video is allowed to autoplay, but never assume
      if (attempt) attempt.catch(() => {});
    };

    // checked per frame rather than on timeupdate, which only fires a few
    // times a second and would overshoot the end
    const tick = () => {
      const { duration, currentTime } = video;
      if (duration && currentTime >= duration - endGap) rewind();
      frame = requestAnimationFrame(tick);
    };

    if (video.readyState >= 1) startPlaying();
    else video.addEventListener('loadedmetadata', startPlaying, { once: true });

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener('loadedmetadata', startPlaying);
    };
  }, [startAt, endGap]);

  return (
    <video
      ref={videoRef}
      className={`dancing-cats dancing-cats-${side}`}
      src={catsDancing}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}

export default DancingCats;

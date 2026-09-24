import { useEffect, useRef, useState } from 'react'

// Plays once the final screen appears (i.e. after the candles are out).
//
// startAt / endAt are in seconds, so 0:45 -> 1:08 is startAt={45} endAt={68}.
// With loop set (the default) the clip repeats that section; pass loop={false}
// to have it play the section once and stop.
//
// Browsers block audio that starts without a user gesture; clicking the
// envelope earlier counts, so it normally just plays. If it is blocked
// anyway, fall back to a button instead of failing silently.
function Music({ src, startAt = 0, endAt = 0, loop = true }) {
  const audioRef = useRef(null);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    audio.volume = 0.6;

    // Seeking is ignored until the browser has read the file's metadata.
    const seekTo = (time) => {
      try {
        audio.currentTime = time;
      } catch {
        // some browsers refuse to seek until more of the file is buffered
      }
    };

    const seekAndPlay = () => {
      if (startAt > 0) seekTo(startAt);
      const attempt = audio.play();
      if (attempt) attempt.catch(() => setBlocked(true));
    };

    // Stop (or restart) at endAt. timeupdate fires a few times a second,
    // so the cut can land up to ~250ms late.
    const onTimeUpdate = () => {
      if (endAt > startAt && audio.currentTime >= endAt) {
        if (loop) seekTo(startAt);
        else audio.pause();
      }
    };

    // Reaching the real end of the file, if endAt was left off.
    const onEnded = () => {
      if (!loop) return;
      seekTo(startAt);
      const attempt = audio.play();
      if (attempt) attempt.catch(() => {});
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    // readyState >= 1 (HAVE_METADATA) means duration is known and we can seek
    if (audio.readyState >= 1) seekAndPlay();
    else audio.addEventListener('loadedmetadata', seekAndPlay, { once: true });

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('loadedmetadata', seekAndPlay);
    };
  }, [startAt, endAt, loop]);

  const start = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (startAt > 0 && (audio.currentTime < startAt || (endAt > startAt && audio.currentTime >= endAt))) {
      try {
        audio.currentTime = startAt;
      } catch {
        // ignore; playback still starts, just from wherever it can
      }
    }
    const attempt = audio.play();
    if (attempt) attempt.then(() => setBlocked(false)).catch(() => {});
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onError={() => setFailed(true)}
      />
      {blocked && !failed && (
        <button type="button" className="music-button" onClick={start}>
          &#9835; play music
        </button>
      )}
    </>
  );
}

export default Music;

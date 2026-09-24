import { useState, useEffect, useCallback } from 'react'
import '../style.css'

function Gallery({ photos }) {
  const [index, setIndex] = useState(0);
  const [touchX, setTouchX] = useState(null);

  const count = photos.length;

  const go = useCallback((step) => {
    setIndex((i) => (i + step + count) % count);
  }, [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  if (count === 0) return null;

  const photo = photos[index];

  const handleTouchEnd = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    setTouchX(null);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-stage"
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="carousel-arrow"
          onClick={() => go(-1)}
          aria-label="Previous photo"
        >
          &#8249;
        </button>

        <div className="photo-frame">
          {photo.src
            ? <img className="photo-img" key={index} src={photo.src} alt={photo.caption} />
            : <div className="photo-placeholder"></div>}
          <p className="photo-caption">{photo.caption}</p>
        </div>

        <button
          type="button"
          className="carousel-arrow"
          onClick={() => go(1)}
          aria-label="Next photo"
        >
          &#8250;
        </button>
      </div>

      <p className="carousel-count">{index + 1} / {count}</p>
    </div>
  );
}

export default Gallery;

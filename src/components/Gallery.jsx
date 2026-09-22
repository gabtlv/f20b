import '../style.css'

function Gallery({ photos }) {
  return (
    <div className="gallery">
      {photos.map((photo, index) => (
        <div className="photo-frame" key={index}>
          <div className="photo-placeholder"></div>
          <p className="photo-caption">{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default Gallery;

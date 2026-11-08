import { useEffect, useState } from 'react';
import { galleryImages } from '../data/party';
import './Gallery.css';

const imageUrl = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? null : (index + 1) % galleryImages.length);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? null : (index - 1 + galleryImages.length) % galleryImages.length);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('lightbox-open');
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('lightbox-open');
    };
  }, [activeIndex]);

  const activeImage = activeIndex === null ? null : galleryImages[activeIndex];

  return (
    <>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <button className={`gallery-tile gallery-tile-${index + 1}`} type="button" key={image.src} onClick={() => setActiveIndex(index)} aria-label={`Open image: ${image.title}`}>
            <img src={imageUrl(image.src)} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
            <span className="gallery-caption">{image.title}<span aria-hidden="true"> ↗</span></span>
          </button>
        ))}
      </div>
      {activeImage && activeIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title} onClick={() => setActiveIndex(null)}>
          <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close image">×</button>
          <button className="lightbox-arrow lightbox-prev" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length); }}>‹</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={imageUrl(activeImage.src)} alt={activeImage.alt} width={activeImage.width} height={activeImage.height} />
            <figcaption>{activeImage.title}</figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex + 1) % galleryImages.length); }}>›</button>
        </div>
      )}
    </>
  );
}

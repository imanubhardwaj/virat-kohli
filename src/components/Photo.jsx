import { useState } from 'react';
import { srcSet, imgSrc } from '../lib.jsx';

export default function Photo({ photo, priority = false, sizes = '100vw', width = 1280, className = '', fit, pos, caption = true, onClick }) {
  const [failed, setFailed] = useState(false);
  const style = { objectFit: fit, objectPosition: pos };
  const img = failed
    ? <div className="photo-fallback"><span>18</span><p>Photo unavailable</p><a href={photo.source} target="_blank" rel="noreferrer">View the original ↗</a></div>
    : <img src={imgSrc(photo, width)} srcSet={srcSet(photo)} sizes={sizes} alt={photo.alt} width={photo.width} height={photo.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={style} onError={() => setFailed(true)} />;
  return <figure className={`photo ${className}`}>
    {onClick ? <button className="photo-hit" onClick={onClick} aria-label={`Enlarge: ${photo.caption}`}>{img}</button> : img}
    {caption && <figcaption><span>{photo.caption}</span><a href={photo.source} target="_blank" rel="noreferrer" aria-label={`Photo source and credit: ${photo.author}`}>{photo.author} ↗</a></figcaption>}
  </figure>;
}

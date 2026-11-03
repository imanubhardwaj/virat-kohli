import { useState } from 'react';
export default function Photo({photo,priority=false,className=''}) {
  const [failed,setFailed]=useState(false);
  return <figure className={`photo ${className}`}>
    {!failed ? <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" onError={()=>setFailed(true)}/> : <div className="photo-fallback"><span>18</span><p>Photo unavailable</p><a href={photo.source} target="_blank" rel="noreferrer">View the original photograph ↗</a></div>}
    <figcaption><span>{photo.caption}</span><a href={photo.source} target="_blank" rel="noreferrer" aria-label={`Photo source and credit: ${photo.author}`}>{photo.author} ↗</a></figcaption>
  </figure>;
}

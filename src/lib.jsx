import { useEffect, useRef, useState } from 'react';

// Wikimedia serves any width below the original as /thumb/<path>/<w>px-<file>. Falls back to the original.
export function thumb(src, w, width) {
  const m = src.match(/^(.*\/commons)\/(\w\/\w\w)\/(.+)$/);
  if (!m || (width && w >= width)) return src;
  return `${m[1]}/thumb/${m[2]}/${m[3]}/${w}px-${m[3]}`;
}
export function srcSet(p, widths = [640, 960, 1280, 1920, 2560]) {
  return widths.filter(w => w < p.width).map(w => `${thumb(p.src, w, p.width)} ${w}w`).concat(`${p.src} ${p.width}w`).join(', ');
}
export const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInView(opts = { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }, once = true) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined' || reduced()) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); if (once) io.disconnect(); } else if (!once) setSeen(false); }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, seen] = useInView();
  return <Tag ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>{children}</Tag>;
}

export function CountUp({ to, duration = 1600, format = n => Math.round(n).toLocaleString('en-IN'), suffix = '' }) {
  const [ref, seen] = useInView({ threshold: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) { setV(to); return; }
    let raf, t0;
    const step = t => { t0 ??= t; const p = Math.min(1, (t - t0) / duration); setV(to * (1 - Math.pow(1 - p, 4))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{format(v)}{suffix}</span>;
}

export function useLocal(key, initial) {
  const [v, setV] = useState(() => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch { return initial; } });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setY(window.scrollY)); };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

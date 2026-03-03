import { useState, useEffect } from 'react';

export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState('up');
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      if (Math.abs(delta) >= threshold) {
        setScrollDirection(delta > 0 ? 'down' : 'up');
        lastScrollY = scrollY > 0 ? scrollY : 0;
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { window.requestAnimationFrame(updateScrollDirection); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrollDirection;
}
export default useScrollDirection;

'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
    };
    const expand = () => el.classList.add('expand');
    const shrink = () => el.classList.remove('expand');

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, .work-item, .belt-cell, input, textarea, [data-hover]')
      .forEach(el => { el.addEventListener('mouseenter', expand); el.addEventListener('mouseleave', shrink); });

    return () => document.removeEventListener('mousemove', move);
  }, []);

  return <div className="cursor" ref={ref} id="cursor" />;
}

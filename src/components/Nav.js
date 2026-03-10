'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">authr.</a>
      <ul className="nav-links">
        <li><a href="#work">Work</a></li>
        <li><a href="#philosophy">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

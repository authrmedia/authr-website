'use client';
import { useEffect, useState } from 'react';
import Belt from './Belt';

const phrases = ['founder-led marketing.', 'built for builders.', 'content that compounds.'];

export default function Hero() {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phase];
    let timeout;
    if (!deleting && text.length < phrase.length) {
      timeout = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 68);
    } else if (!deleting && text.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(phrase.slice(0, text.length - 1)), 38);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setPhase((phase + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [text, phase, deleting]);

  return (
    <section id="hero">
      <div className="hero-inner">
        <span className="hero-wordmark">
          {text}<span className="blink" />
        </span>
        <p style={{
          marginTop: '28px',
          fontFamily: 'var(--mono)',
          fontSize: '13px',
          letterSpacing: '.02em',
          color: '#BBBBBB',
        }}>
          pull this up on your laptop. trust me.
        </p>
      </div>
      <Belt />
      <div className="scroll-cue">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}

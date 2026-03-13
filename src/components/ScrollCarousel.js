'use client';
import { useEffect, useRef } from 'react';

const reels = [
  'reel-03_ojmvpn',
  'reel-01_a15n7s',
  'reel-04_zibhry',
  'reel-02_aghz4l',
  'reel-03_eyihgc',
  'reel-01_siyn5x',
  'reel-04_xtjsti',
  'reel-02_qwvvdq',
];

const cards = reels.map((id) => ({
  video: `https://res.cloudinary.com/dtkifypdq/video/upload/${id}.mp4`,
  poster: `https://res.cloudinary.com/dtkifypdq/image/upload/${id}.jpg`,
}));

export default function ScrollCarousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const spacerRef = useRef(null);
  const rafRef = useRef(null);
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const maxTranslateRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const track = trackRef.current;
      if (track) {
        track.style.overflowX = 'auto';
        track.style.transform = 'none';
      }
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;
    const spacer = spacerRef.current;

    function setup() {
      if (!track || !section || !spacer) return;
      const max = track.scrollWidth - window.innerWidth;
      maxTranslateRef.current = max;
      spacer.style.height = `${max}px`;
      currentXRef.current = 0;
      targetXRef.current = 0;
      track.style.transform = `translateX(0px)`;
    }

    function onScroll() {
      const max = maxTranslateRef.current;
      if (max <= 0) return;
      const rawProgress = (window.scrollY - section.offsetTop) / max;
      const progress = Math.min(1, Math.max(0, rawProgress));
      targetXRef.current = -(progress * max);
    }

    function loop() {
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.085;
      if (track) {
        track.style.transform = `translateX(${currentXRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    setup();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setup);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setup);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  function handleMouseEnter(e) {
    if (isTouchDevice) return;
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.load();
      video.play().catch(() => {});
    }
  }

  function handleMouseLeave(e) {
    if (isTouchDevice) return;
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative' }}
    >
      {/* sticky viewport */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#FFFFFF',
      }}>
        {/* track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '20px',
            padding: '0 60px',
            willChange: 'transform',
          }}
        >
          {cards.map((card, i) => {
            const progress = 1 / cards.length * (i + 1);
            return (
              <div
                key={i}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: '340px',
                  height: '520px',
                  overflow: 'hidden',
                  borderRadius: 0,
                }}
              >
                <video
                  src={card.video}
                  poster={card.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* info overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 20px',
                  background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.55))',
                }} />
                {/* progress bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#5BA4CF',
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* scroll spacer */}
      <div
        ref={spacerRef}
        style={{ pointerEvents: 'none' }}
      />
    </section>
  );
}

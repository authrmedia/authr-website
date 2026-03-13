'use client';
import { useEffect, useRef } from 'react';

const CARD_COUNT = 6;
const THETA = 360 / CARD_COUNT;   // 60° between cards
const RADIUS = 900;                // px — wheel depth

const CARDS = [
  { id: 'reel-01_siyn5x', label: 'Candace & Basil' },
  { id: 'reel-02_aghz4l', label: 'Candace & Basil' },
  { id: 'reel-01_a15n7s', label: 'Freshman Barbershop' },
  { id: 'reel-02_qwvvdq', label: 'Freshman Barbershop' },
  { id: 'reel-03_eyihgc', label: 'Freshman Barbershop' },
  { id: 'reel-04_zibhry', label: 'Freshman Barbershop' },
].map((c) => ({
  ...c,
  video: `https://res.cloudinary.com/dtkifypdq/video/upload/${c.id}.mp4`,
  poster: `https://res.cloudinary.com/dtkifypdq/image/upload/${c.id}.jpg`,
}));

export default function ScrollCarousel() {
  const sectionRef   = useRef(null);
  const cardRefs     = useRef([]);
  const labelRefs    = useRef([]);
  const progressRef  = useRef(null);
  const rafRef       = useRef(null);
  const currentAngle = useRef(0);
  const targetAngle  = useRef(0);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;

    const section = sectionRef.current;
    const cardHeight = window.innerHeight;

    function onScroll() {
      const top     = section.getBoundingClientRect().top + window.scrollY;
      const scrolled = Math.max(0, window.scrollY - top);
      const total    = cardHeight * CARD_COUNT;
      const progress = Math.min(1, scrolled / total);

      // one full revolution spread over all cards
      targetAngle.current = progress * 360;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    }

    function tick() {
      // lerp toward target
      currentAngle.current +=
        (targetAngle.current - currentAngle.current) * 0.07;

      const wheel = currentAngle.current;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // each card's position on the wheel
        const baseAngle  = i * THETA;
        const angle      = baseAngle - wheel;

        // normalise to [-180, 180] so cos gives correct front/back
        const norm = ((angle % 360) + 540) % 360 - 180;
        const rad  = (norm * Math.PI) / 180;
        const cos  = Math.cos(rad);          // 1 = front, -1 = back

        // opacity: 0.08 when fully behind, 1.0 when fully front
        const opacity = 0.08 + ((cos + 1) / 2) * 0.92;
        // hide cards on the back half entirely
        const visible = norm > -90 && norm < 90;

        card.style.opacity   = visible ? opacity.toFixed(3) : '0';
        card.style.transform =
          `rotateX(${angle}deg) translateZ(${RADIUS}px)`;

        // label: only show when near front (norm within ±20°)
        const label = labelRefs.current[i];
        if (label) {
          label.style.opacity = Math.abs(norm) < 20 ? '1' : '0';
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced]);

  /* ── REDUCED MOTION: plain vertical stack ─────────────────────── */
  if (prefersReduced) {
    return (
      <div style={{ background: '#F0EFED', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        {CARDS.map((card, i) => (
          <div key={i} style={{ width: '55vw', height: '65vh', background: '#0A0A0A', overflow: 'hidden', position: 'relative' }}>
            <video
              src={card.video}
              poster={card.poster}
              autoPlay muted loop playsInline preload="none"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>
    );
  }

  /* ── WHEEL CAROUSEL ───────────────────────────────────────────── */
  return (
    <div
      ref={sectionRef}
      style={{
        height: `calc(${CARD_COUNT} * 100vh + 100vh)`,
        background: '#F0EFED',
        position: 'relative',
      }}
    >
      {/* sticky wheel viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 3-D scene */}
        <div
          style={{
            perspective: '1800px',
            width: '55vw',
            height: '65vh',
            position: 'relative',
          }}
        >
          {/* wheel — transformStyle preserve-3d so children stack in 3D */}
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {CARDS.map((card, i) => {
              const baseAngle = i * THETA;
              return (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '55vw',
                    height: '65vh',
                    marginTop: '-32.5vh',   // half of 65vh
                    marginLeft: '-27.5vw',  // half of 55vw
                    transformOrigin: `center center -${RADIUS}px`,
                    transform: `rotateX(${baseAngle}deg) translateZ(${RADIUS}px)`,
                    background: '#0A0A0A',
                    overflow: 'hidden',
                    willChange: 'transform, opacity',
                    transition: 'none',
                  }}
                >
                  <video
                    src={card.video}
                    poster={card.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* centered client label — visible only near front */}
                  <div
                    ref={(el) => { labelRefs.current[i] = el; }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      opacity: i === 0 ? 1 : 0,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Courier Prime', 'Courier New', monospace",
                        fontSize: '10px',
                        letterSpacing: '.2em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                      }}
                    >
                      {card.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: '#5BA4CF',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
          ref={progressRef}
        />
      </div>
    </div>
  );
}

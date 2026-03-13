'use client';
import { useState, useRef } from 'react';

const CARD_DATA = [
  { id: 'reel-01_siyn5x', label: 'Candace & Basil' },
  { id: 'reel-02_aghz4l', label: 'Candace & Basil' },
  { id: 'reel-01_a15n7s', label: 'Freshman Barbershop' },
  { id: 'reel-02_qwvvdq', label: 'Freshman Barbershop' },
  { id: 'reel-03_eyihgc', label: 'Freshman Barbershop' },
  { id: 'reel-04_zibhry', label: 'Freshman Barbershop' },
];

const cards = CARD_DATA.map((c, i) => ({
  ...c,
  video: `https://res.cloudinary.com/dtkifypdq/video/upload/${c.id}.mp4`,
  poster: `https://res.cloudinary.com/dtkifypdq/image/upload/${c.id}.jpg`,
  clipPath: i % 2 === 0
    ? 'polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)'
    : 'polygon(0% 0%, 100% 0%, 97% 100%, 3% 100%)',
}));

export default function ScrollCarousel() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [playingIdx, setPlayingIdx] = useState(null);
  const videoRefs = useRef([]);

  function handleEnter(i) {
    setHoveredIdx(i);
    const video = videoRefs.current[i];
    if (video) {
      video.load();
      video.play()
        .then(() => setPlayingIdx(i))
        .catch(() => {});
    }
  }

  function handleLeave(i) {
    setHoveredIdx(null);
    setPlayingIdx(null);
    const video = videoRefs.current[i];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  return (
    <div
      style={{
        height: `calc(100vh * ${cards.length})`,
        background: '#F0EFED',
        position: 'relative',
      }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          style={{
            position: 'sticky',
            top: `calc(80px + ${i * 18}px)`,
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: i + 1,
          }}
        >
          {/* card + side label wrapper */}
          <div
            style={{
              position: 'relative',
              width: '60vw',
              height: '70vh',
            }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            {/* rotated client label */}
            <div
              style={{
                position: 'absolute',
                left: '-72px',
                top: '50%',
                transform: 'translateY(-50%) rotate(-90deg)',
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                color: '#999',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {card.label}
            </div>

            {/* card face */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#0A0A0A',
                clipPath: card.clipPath,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
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

              {/* PLAY overlay — shown while hovered, hides once playing */}
              {hoveredIdx === i && playingIdx !== i && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '11px',
                      letterSpacing: '.25em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                    }}
                  >
                    PLAY
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

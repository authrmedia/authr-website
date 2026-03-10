'use client';

export default function CaseStudyModal({ client, onClose }) {
  if (!client) return null;
  const { slug, nameDisplay, year, service, hero, brief, approach, pillars, photos, reels, photoCount, reelCount } = client;
  const basePath = `/assets/clients/${slug}`;

  return (
    <div className={`modal open`}>
      <div className="modal-nav">
        <button className="modal-back" onClick={onClose}>Back to work</button>
        <span className="modal-logo">authr.</span>
      </div>

      <div className="modal-body">
        {/* Header */}
        <div className="case-meta">
          <h1 className="case-client">
            {nameDisplay.map((line, i) => (
              <span key={i}>{line}{i < nameDisplay.length - 1 && <br />}</span>
            ))}
          </h1>
          <div className="case-details">
            <span className="case-year">{year}</span>
            <span className="case-service">{service}</span>
          </div>
        </div>

        {/* Hero image */}
        {hero ? (
          <img src={hero} alt={client.name} className="case-hero" />
        ) : (
          <div className="case-hero-ph"><span className="ph-txt">Hero visual — upload hero.jpg</span></div>
        )}

        {/* Brief */}
        <div className="case-sec">
          <p className="case-sec-label">The Brief</p>
          <p className="case-sec-body">{brief}</p>
        </div>

        <div className="case-divider" />

        {/* Approach */}
        <div className="case-sec">
          <p className="case-sec-label">The Approach</p>
          <p className="case-sec-body">{approach}</p>
        </div>

        {/* Pillars */}
        <div className="pillars">
          {pillars.map(p => (
            <div className="pillar" key={p.num}>
              <span className="pillar-num">{p.num}</span>
              <div className="pillar-title">{p.title}</div>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Reels */}
        <p className="case-sec-label">Content — Reels</p>
        <div className="reels-grid">
          {Array.from({ length: reelCount }).map((_, i) => {
            const filename = reels[i];
            return (
              <div className="reel-cell" key={i}>
                {filename ? (
                  <video
                    src={`${basePath}/reels/${filename}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                  />
                ) : (
                  <div className="reel-cell-ph">
                    <span className="reel-lbl">Reel {String(i+1).padStart(2,'0')}<br />↓ upload</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Photos */}
        <p className="case-sec-label">Content — Photography</p>
        <div className="photo-grid">
          {Array.from({ length: photoCount }).map((_, i) => {
            const filename = photos[i];
            return (
              <div className="photo-cell" key={i}>
                {filename ? (
                  <img src={`${basePath}/photos/${filename}`} alt="" loading="lazy" />
                ) : (
                  <div className="photo-cell-ph" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

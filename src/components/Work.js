'use client';
import { useState, useRef } from 'react';
import { clients } from '../data/clients';
import CaseStudyModal from './CaseStudyModal';

export default function Work() {
  const [activeModal, setActiveModal] = useState(null);
  const [preview, setPreview] = useState({ visible: false, text: '', x: 0, y: 0, img: null });
  const previewRef = useRef(null);

  const openModal = (client) => {
    setActiveModal(client);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="work">
      {/* Floating preview */}
      <div
        ref={previewRef}
        className={`work-preview ${preview.visible ? 'active' : ''}`}
        style={{ left: preview.x + 32, top: preview.y - 100 }}
      >
        <div className="work-preview-inner">
          {preview.img
            ? <img src={preview.img} alt="" />
            : preview.text
          }
        </div>
      </div>

      <div className="work-header reveal">
        <span className="sec-label">Selected Work</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--mid-grey)' }}>003 clients</span>
      </div>

      <div className="work-list">
        {clients.map((client, i) => (
          <div
            key={client.id}
            className="work-item reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
            onMouseEnter={(e) => setPreview({
              visible: true,
              text: client.previewText,
              img: client.hero || null,
              x: e.clientX, y: e.clientY
            })}
            onMouseMove={(e) => setPreview(p => ({ ...p, x: e.clientX, y: e.clientY }))}
            onMouseLeave={() => setPreview(p => ({ ...p, visible: false }))}
            onClick={() => openModal(client)}
          >
            <span className="work-num">{client.num}</span>
            <span className="work-name">{client.name}</span>
            <div className="work-tag">{client.tags[0]}<br />{client.tags[1]}</div>
          </div>
        ))}
      </div>

      {activeModal && <CaseStudyModal client={activeModal} onClose={closeModal} />}
    </section>
  );
}

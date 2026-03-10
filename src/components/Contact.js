'use client';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [fields, setFields] = useState({ name: '', org: '', email: '', phone: '', message: '' });

  const handleSubmit = async () => {
    if (!fields.name || !fields.email || !fields.message) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mdawekkq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          message: fields.message,
          _subject: 'authr. Contact Form',
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <div className="contact-grid">
        <div className="reveal">
          <h2 className="contact-headline">Start a<br />conversation.</h2>
          <p className="contact-sub">We work with a small number of founders each quarter. If you're building something worth talking about, we want to hear it.</p>
          <div>
            <div className="meta-item"><span className="meta-label">Email</span><span className="meta-value">founder@authrmedia.ca</span></div>
            <div className="meta-item"><span className="meta-label">Based in</span><span className="meta-value">Toronto, ON</span></div>
            <div className="meta-item"><span className="meta-label">Availability</span><span className="meta-value">Accepting Q2 briefs</span></div>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: '0.15s' }}>
          {status === 'success' ? (
            <p style={{ fontFamily: 'var(--mono)', fontSize: '16px', lineHeight: 1.7 }}>
              Sent. We'll be in touch.
            </p>
          ) : (
            <>
              <div className="form-row">
                <input type="text" placeholder=" " value={fields.name} onChange={e => setFields(f => ({...f, name: e.target.value}))} />
                <label className="f-label">Name</label>
              </div>
              <div className="form-row">
                <input type="text" placeholder=" " value={fields.org} onChange={e => setFields(f => ({...f, org: e.target.value}))} />
                <label className="f-label">Organisation</label>
              </div>
              <div className="form-row">
                <input type="email" placeholder=" " value={fields.email} onChange={e => setFields(f => ({...f, email: e.target.value}))} />
                <label className="f-label">Email</label>
              </div>
              <div className="form-row">
                <input type="tel" placeholder=" " value={fields.phone} onChange={e => setFields(f => ({...f, phone: e.target.value}))} />
                <label className="f-label">Phone</label>
                <span className="f-opt">Optional</span>
              </div>
              <div className="form-row">
                <textarea placeholder=" " value={fields.message} onChange={e => setFields(f => ({...f, message: e.target.value}))} />
                <label className="f-label">Tell us about your brand</label>
              </div>
              <div className="form-submit">
                <button className="btn-sub" onClick={handleSubmit} disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Sending…' : 'Send Brief'}</span>
                </button>
                {status === 'error' && (
                  <span style={{ fontSize: '11px', color: '#888', fontFamily: 'var(--mono)' }}>
                    Something went wrong. Email us directly at founder@authrmedia.ca
                  </span>
                )}
                {status === 'idle' && <span className="f-note">We respond within 48 hours.</span>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

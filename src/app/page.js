import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Work from '../components/Work';
import Contact from '../components/Contact';
import Cursor from '../components/Cursor';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollReveal />
      <Nav />

      <Hero />

      {/* 01 — Why */}
      <section id="philosophy">
        <div className="phil-grid">
          <div className="reveal">
            <p className="phil-label">01 &nbsp; Why we exist</p>
            <h2 className="phil-statement">The founder<br />is the brand.</h2>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <p className="phil-label">The belief</p>
            <p className="phil-body">
              Most marketing agencies treat founders like a budget line. We treat you like the asset.<br /><br />
              Your story, your voice, your conviction — that is the most defensible thing your business owns. Every competitor can copy your product. Nobody can copy you.<br /><br />
              authr. works with a small number of founders at a time. We learn your business from the inside, build content systems around what you actually believe, and create work that compounds over time. Not campaigns. Infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — How */}
      <section id="process" style={{
        padding: '120px 48px',
        borderTop: '1px solid #E0E0E0',
        borderBottom: '1px solid #E0E0E0',
        maxWidth: '100%'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '80px' }}>
            <p className="phil-label">02 &nbsp; How it works</p>
            <h2 className="phil-statement" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              A system, not a service.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#E0E0E0' }}>
            {[
              { n: '01', title: 'Study', body: 'We spend time inside your world before we touch a camera. Your customers, your competitors, your category. Everything we make is downstream of what we learn here.' },
              { n: '02', title: 'Build', body: 'We design a content system built around your voice and your goals. Shot schedules, platform strategies, creative frameworks. Everything has a purpose before production starts.' },
              { n: '03', title: 'Compound', body: 'Content that earns. Every piece we make is designed to work harder over time, not just perform on the day it posts. We measure what compounds, not just what spikes.' },
            ].map(step => (
              <div key={step.n} className="reveal" style={{
                background: '#FFFFFF', padding: '48px 36px',
                transitionDelay: `${parseInt(step.n) * 0.1}s`
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.15em', color: '#AAAAAA', display: 'block', marginBottom: '20px' }}>{step.n}</span>
                <div style={{ fontFamily: 'var(--mono)', fontWeight: '700', fontSize: '20px', marginBottom: '16px' }}>{step.title}</div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '15px', lineHeight: '1.8', color: '#555' }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Work */}
      <Work />

      {/* 04 — Contact */}
      <Contact />

      <footer>
        <span className="footer-logo">authr.</span>
        <span className="footer-copy">© 2025 authr. media. All rights reserved.</span>
      </footer>
    </>
  );
}

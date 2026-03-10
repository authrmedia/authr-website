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

      {/* Philosophy */}
      <section id="philosophy">
        <div className="phil-grid">
          <div className="reveal">
            <p className="phil-label">Philosophy</p>
            <h2 className="phil-statement">The founder<br />is the brand.</h2>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <p className="phil-label">Our approach</p>
            <p className="phil-body">
              We don't build audiences. We build gravity.<br /><br />
              authr. works exclusively with founders who understand that the most powerful marketing asset they own is their own story, told with precision.<br /><br />
              We study your business, your voice, your customer — then architect content systems that compound. Every frame is intentional. Every word earns its place.
            </p>
          </div>
        </div>
      </section>

      <Work />

      <Contact />

      <footer>
        <span className="footer-logo">authr.</span>
        <span className="footer-copy">© 2025 authr. media — all rights reserved</span>
      </footer>
    </>
  );
}

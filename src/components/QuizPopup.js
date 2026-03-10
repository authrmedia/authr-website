'use client';
import { useEffect, useState } from 'react';

const Q2_OPTIONS = [
  "Nothing that reflects who I actually am",
  "Some stuff, but it doesn't tell the right story",
  "A solid presence, but it's not growing",
  "Exactly what I'd want them to see",
];

const Q3_OPTIONS = [
  "They'd have no idea",
  "They'd know what we sell, not why we exist",
  "They'd get the vibe but not the substance",
  "They'd get the product but not the experience behind it",
  "They'd understand it completely",
];

const Q4_OPTIONS = [
  "They'd say my name but would never show my page",
  "They'd pull it up but it would raise more questions than confidence",
  "They might show it — but inconsistent, some posts land, some don't",
  "They'd show it confidently but it's not doing enough selling on its own",
  "My content sells me better than I ever could in person",
];

export default function QuizPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({ name: '', industry: '', email: '' });
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [infoError, setInfoError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('quizDone')) return;
    const timer = setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step === 5) {
      fetch('https://formspree.io/f/mdawekkq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: info.name,
          industry: info.industry,
          email: info.email,
          q1: answers.q1,
          q2: answers.q2,
          q3: answers.q3,
          _subject: 'authr. Quiz Submission',
        }),
      }).catch(() => {});

      const t = setTimeout(() => dismiss(), 3000);
      return () => clearTimeout(t);
    }
  }, [step]);

  const dismiss = () => {
    setVisible(false);
    if (typeof window !== 'undefined') sessionStorage.setItem('quizDone', 'true');
    setTimeout(() => setMounted(false), 700);
  };

  const handleContinueInfo = () => {
    if (!info.name.trim() || !info.industry.trim() || !info.email.trim()) {
      setInfoError(true);
      return;
    }
    setInfoError(false);
    setStep(2);
  };

  const progress = step === 0 ? 0 : step === 1 ? 10 : ((step - 1) / 4) * 100;

  if (!mounted) return null;

  const backdropStyle = {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 3000,
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.8s ease',
    pointerEvents: visible ? 'auto' : 'none',
  };

  const panelStyle = {
    position: 'fixed',
    bottom: 0, left: '50%',
    transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100%)',
    width: '100%', maxWidth: '520px',
    background: '#0A0A0A',
    color: '#FFFFFF',
    fontFamily: 'var(--mono)',
    zIndex: 3001,
    opacity: visible ? 1 : 0,
    transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
    pointerEvents: visible ? 'auto' : 'none',
    maxHeight: '92vh',
    overflowY: 'auto',
  };

  return (
    <>
      <div style={backdropStyle} onClick={dismiss} />
      <div style={panelStyle}>
        {/* Progress bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#1a1a1a' }}>
          <div style={{
            height: '100%', background: '#5BA4CF',
            width: `${progress}%`,
            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />
        </div>

        {/* Close button — hidden on step 0 */}
        {step > 0 && step < 5 && (
          <button onClick={dismiss} style={{
            position: 'absolute', top: '20px', right: '24px',
            background: 'none', border: 'none', color: '#FFFFFF',
            fontSize: '20px', cursor: 'pointer', fontFamily: 'var(--mono)',
            lineHeight: 1, padding: '4px',
          }}>×</button>
        )}

        <div style={{ padding: '52px 40px 48px' }}>

          {/* Step 0 — Intro */}
          {step === 0 && (
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#5BA4CF', marginBottom: '24px' }}>
                Free Brand Audit
              </p>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: '700', letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '20px' }}>
                Is authr. right for you?
              </h2>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '40px' }}>
                Three questions. Sixty seconds.
              </p>
              <button onClick={() => setStep(1)} style={btnStyle}>
                Begin
              </button>
            </div>
          )}

          {/* Step 1 — Info */}
          {step === 1 && (
            <div>
              <p style={stepLabelStyle}>&nbsp;</p>
              {[
                { key: 'name', placeholder: 'Name', type: 'text' },
                { key: 'industry', placeholder: 'Industry', type: 'text' },
                { key: 'email', placeholder: 'Email', type: 'email' },
              ].map(({ key, placeholder, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={info[key]}
                  onChange={e => setInfo(f => ({ ...f, [key]: e.target.value }))}
                  style={inputStyle}
                />
              ))}
              {infoError && (
                <p style={{ fontSize: '11px', color: '#5BA4CF', marginBottom: '16px', letterSpacing: '.05em' }}>
                  All fields are required.
                </p>
              )}
              <button onClick={handleContinueInfo} style={btnStyle}>Continue</button>
            </div>
          )}

          {/* Step 2 — Q1 */}
          {step === 2 && (
            <QuestionStep
              label="01 / 03"
              question="When someone Googles your name or brand, what do they find?"
              options={Q2_OPTIONS}
              selected={answers.q1}
              onSelect={v => setAnswers(a => ({ ...a, q1: v }))}
              onNext={() => setStep(3)}
            />
          )}

          {/* Step 3 — Q2 */}
          {step === 3 && (
            <QuestionStep
              label="02 / 03"
              question="If a stranger spent 60 seconds on your Instagram or LinkedIn, what would they understand about why your business exists?"
              options={Q3_OPTIONS}
              selected={answers.q2}
              onSelect={v => setAnswers(a => ({ ...a, q2: v }))}
              onNext={() => setStep(4)}
            />
          )}

          {/* Step 4 — Q3 */}
          {step === 4 && (
            <QuestionStep
              label="03 / 03"
              question="If your best client got asked for a recommendation in your industry right now, would they pull up your profile to show you off — or just say your name and hope for the best?"
              options={Q4_OPTIONS}
              selected={answers.q3}
              onSelect={v => setAnswers(a => ({ ...a, q3: v }))}
              onNext={() => setStep(5)}
              isLast
            />
          )}

          {/* Step 5 — Thank you */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: '700', letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: '20px' }}>
                We'll be in touch.
              </h2>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7 }}>
                Your answers have been sent. If you're a good fit, you'll hear from us soon.
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

function QuestionStep({ label, question, options, selected, onSelect, onNext, isLast }) {
  return (
    <div>
      <p style={stepLabelStyle}>{label}</p>
      <p style={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '28px', fontWeight: '400' }}>
        {question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            style={{
              background: selected === opt ? '#111' : 'transparent',
              border: 'none',
              borderLeft: selected === opt ? '3px solid #5BA4CF' : '3px solid transparent',
              color: selected === opt ? '#FFFFFF' : '#888',
              fontFamily: 'var(--mono)',
              fontSize: '13px',
              textAlign: 'left',
              padding: '14px 16px',
              cursor: 'pointer',
              lineHeight: 1.5,
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={() => { if (selected) onNext(); }}
        style={{ ...btnStyle, opacity: selected ? 1 : 0.35, cursor: selected ? 'pointer' : 'default' }}
      >
        {isLast ? 'Submit' : 'Continue'}
      </button>
    </div>
  );
}

const stepLabelStyle = {
  fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase',
  color: '#5BA4CF', marginBottom: '20px',
};

const inputStyle = {
  display: 'block', width: '100%',
  background: '#000000', color: '#FFFFFF',
  border: 'none', borderBottom: '1px solid #444',
  borderRadius: 0,
  fontFamily: 'var(--mono)', fontSize: '14px',
  padding: '16px 0', marginBottom: '20px',
  outline: 'none',
};

const btnStyle = {
  display: 'block', width: '100%',
  background: '#FFFFFF', color: '#000000',
  border: 'none', borderRadius: 0,
  fontFamily: 'var(--mono)', fontSize: '11px',
  letterSpacing: '.15em', textTransform: 'uppercase',
  padding: '18px', cursor: 'pointer',
  marginTop: '8px',
};

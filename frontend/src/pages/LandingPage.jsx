import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarField from '../components/shared/StarField';

const FEATURES = [
  {
    col: '#00d4ff',
    title: '3D Transaction Network Graph',
    desc: 'Visualise every fund hop across accounts, branches, and channels in a live rotating 3D network. Click any node to see full account intelligence instantly.',
  },
  {
    col: '#ff2d55',
    title: '5 Fraud Typology Detectors',
    desc: 'Purpose-built ML models detect Round-Tripping, Rapid Layering, Structuring, Dormant Account Activation, and Profile Mismatch — simultaneously, in real time.',
  },
  {
    col: '#00ff88',
    title: 'One-Click FIU-IND STR Report',
    desc: 'Auto-generate RBI-compliant Suspicious Transaction Reports with all required fields pre-populated from graph and ML data. File in minutes, not hours.',
  },
  {
    col: '#7c3aed',
    title: 'AI Investigator Chat',
    desc: 'Ask natural language questions and get graph-grounded answers instantly. "Trace all funds from ACC-0091 in the last 7 days" — and watch it animate the answer.',
  },
  {
    col: '#ffb700',
    title: 'Timeline Replay',
    desc: 'Scrub back in time to watch exactly how funds moved, step by step. Show investigators and regulators a frame-by-frame reconstruction of any suspicious transaction chain.',
  },
  {
    col: '#00d4ff',
    title: 'Real-Time Risk Scoring',
    desc: 'Six ML models run simultaneously on every transaction. Composite risk scores from 0–100 update in real time as new data arrives — no batch jobs, no delays.',
  },
];

const HOW_STEPS = [
  { num: '01', title: 'Ingest',  desc: 'Every transaction streams into UNIONTRACE via Kafka in real time — NEFT, RTGS, IMPS, SWIFT, cash.' },
  { num: '02', title: 'Graph',   desc: 'Funds are mapped as edges between account nodes in a Neo4j graph database updated within milliseconds.' },
  { num: '03', title: 'Detect',  desc: 'Six ML models score every new edge for circular paths, layering velocity, structuring patterns, and profile mismatches.' },
  { num: '04', title: 'Alert',   desc: 'Critical alerts surface in under 5 minutes with a composite risk score, typology tag, and full fund trail pre-loaded.' },
  { num: '05', title: 'Report',  desc: 'One click generates a FIU-IND compliant STR with all required fields auto-populated — ready to submit to regulators.' },
];

const COMPLIANCE = [
  { val: 'RBI',     lbl: 'Master Directions on KYC 2016 (Updated 2023)' },
  { val: 'PMLA',    lbl: 'Prevention of Money Laundering Act compliance built-in' },
  { val: 'FIU-IND', lbl: 'Auto-generated STR & CTR in prescribed format' },
  { val: 'AES-256', lbl: 'Bank-grade encryption in transit and at rest' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const featRef = useRef(null);
  const howRef  = useRef(null);
  const compRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(ref) {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }

  return (
    <div className="land-page">
      <StarField />
      <div className="land-grid" />
      <div className="orbs">
        <div className="orb" style={{ width:450,height:450,background:'rgba(0,212,255,0.05)',top:-120,left:-120,animationDelay:'0s' }} />
        <div className="orb" style={{ width:320,height:320,background:'rgba(255,45,85,0.05)',bottom:-80,right:-80,animationDelay:'3s' }} />
        <div className="orb" style={{ width:220,height:220,background:'rgba(124,58,237,0.05)',top:'40%',right:'10%',animationDelay:'1.5s' }} />
      </div>

      {/* NAV */}
      <nav className="land-nav">
        <div className="logo-txt">UNION<span>TRACE</span></div>
        <div className="mob-menu-btn" onClick={() => setMenuOpen(o => !o)}>
          <span/><span/><span/>
        </div>
        <div className={`lnav-links${menuOpen ? ' show' : ''}`}>
          <div style={{ display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',gap:32 }} className="m-flex-col">
            <span className="lnl" onClick={() => scrollTo(featRef)}>Platform</span>
            <span className="lnl" onClick={() => scrollTo(howRef)}>How It Works</span>
            <span className="lnl" onClick={() => scrollTo(compRef)}>Compliance</span>
          </div>
          <div className="lnav-right">
            <div className="btn-ghost" onClick={() => navigate('/login')}>Sign In</div>
            <div className="btn-primary" onClick={() => navigate('/login')}>Request Demo</div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow"><span className="hero-dot" />AI-POWERED FRAUD INTELLIGENCE</div>
        <h1 className="hero-h1">Follow The <span className="hl">Money.</span><br/>Stop The <span className="hl2">Fraud.</span></h1>
        <p className="hero-sub">UNIONTRACE maps every rupee moving through your bank in real time. Graph analytics and machine learning detect round-tripping, layering, and structuring before investigators even open their laptops.</p>
        <div className="hero-btns">
          <div className="btn-primary" style={{ padding:'14px 40px',fontSize:15 }} onClick={() => navigate('/login')}>Get Started Free</div>
          <div className="btn-ghost"   style={{ padding:'14px 40px',fontSize:15 }} onClick={() => navigate('/login')}>Watch Live Demo</div>
        </div>
        <div className="hero-stats">
          {[['98.7%','ML ACCURACY'],['<5 MIN','DETECT TIME'],['5 CR+','TX MONITORED'],['FIU-IND','COMPLIANT']].map(([v,l]) => (
            <div className="hs-item" key={l}><div className="hs-val">{v}</div><div className="hs-lbl">{l}</div></div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" ref={featRef}>
        <div className="section-tag">PLATFORM CAPABILITIES</div>
        <h2 className="section-h">Everything You Need to <span>Detect Fraud</span></h2>
        <div className="feat-grid">
          {FEATURES.map(f => (
            <div className="feat-card" key={f.title}>
              <div className="fc-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke={f.col} strokeWidth="1.4"/>
                  <polyline points="7,10 9,12 13,8" stroke={f.col} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="fc-title">{f.title}</div>
              <div className="fc-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="howitworks" ref={howRef}>
        <div className="section-tag">HOW IT WORKS</div>
        <h2 className="section-h">From <span>Transaction</span> to Evidence in Minutes</h2>
        <div className="steps">
          {HOW_STEPS.map(s => (
            <div className="step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="compliance" ref={compRef}>
        <div className="section-tag">COMPLIANCE & TRUST</div>
        <h2 className="section-h" style={{ marginBottom:40 }}>Built for <span>Indian Banking</span> Regulations</h2>
        <div className="comp-grid">
          {COMPLIANCE.map(c => (
            <div className="comp-card" key={c.val}>
              <div className="cc-val">{c.val}</div>
              <div className="cc-lbl">{c.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">UNION<span>TRACE</span></div>
        <div className="footer-links">
          {['Privacy Policy','Terms of Use','Security','Contact'].map(l => (
            <span className="fl" key={l}>{l}</span>
          ))}
        </div>
        <div className="footer-copy">© 2025 UNIONTRACE · FUND FLOW INTELLIGENCE</div>
      </footer>
    </div>
  );
}

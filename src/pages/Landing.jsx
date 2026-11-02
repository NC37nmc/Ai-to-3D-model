import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <section className="hero">
        <div className="badge">✦ AI POWERED</div>
        <h1>
          Transform <span className="grad-blue">Text</span> into{' '}
          <span className="grad-purple">3D Models</span>
        </h1>
        <p className="hero-sub">
          Describe your idea, and let AI generate a ready-to-view 3D model in seconds.
        </p>
        <div className="cta-row">
          <button onClick={() => navigate('/signup')}>Get Started</button>
          <button className="ghost" onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </section>

      <section className="flow">
        <div className="flow-card blue">
          <div className="flow-label">1. TEXT PROMPT</div>
          <div className="flow-icon">💬</div>
          <div className="flow-box">"a futuristic spaceship with blue lights"</div>
          <div className="flow-caption">You describe it.</div>
        </div>
        <div className="flow-arrow blue-arrow">→</div>
        <div className="flow-card purple">
          <div className="flow-label">2. AI GENERATION</div>
          <div className="flow-icon">✨</div>
          <div className="flow-box media">⚙️</div>
          <div className="flow-caption">AI builds the shape.</div>
        </div>
        <div className="flow-arrow purple-arrow">→</div>
        <div className="flow-card pink">
          <div className="flow-label">3. 3D MODEL</div>
          <div className="flow-icon">🧊</div>
          <div className="flow-box media">🚀</div>
          <div className="flow-caption">Get your 3D model.</div>
        </div>
      </section>

      <section className="features">
        <div className="feature"><span className="ficon blue">⚡</span><div><div className="ftitle">Fast</div><div className="fsub">Generate in under a minute</div></div></div>
        <div className="feature"><span className="ficon purple">🎯</span><div><div className="ftitle">Free Pipeline</div><div className="fsub">Built on open-source Shap-E</div></div></div>
        <div className="feature"><span className="ficon blue">📦</span><div><div className="ftitle">3D Ready</div><div className="fsub">Export as .glb</div></div></div>
        <div className="feature"><span className="ficon pink">🔒</span><div><div className="ftitle">Your Account</div><div className="fsub">Projects saved to your login</div></div></div>
      </section>
    </div>
  );
}
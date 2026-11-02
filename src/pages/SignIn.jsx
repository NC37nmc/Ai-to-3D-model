import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../Auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo">◆ Aethel AI</div>
        <h2>Welcome Back, <span className="grad-purple">Visionary.</span></h2>
        <p className="hero-sub small">Sign in to your account to continue.</p>

        <input type="email" placeholder="Email Address" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />

        {error && <div className="error-banner">{error}</div>}

        <button type="submit" disabled={loading} className="full">
          {loading ? <span className="spinner" /> : 'Sign In'}
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
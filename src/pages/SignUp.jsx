import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../Auth';

export default function SignUp() {
  const [name, setName] = useState('');
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
      await signup(name, email, password);
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
        <h2>Transform <span className="grad-blue">Text</span> into <span className="grad-purple">3D Models</span></h2>
        <p className="hero-sub small">Create an account to start generating.</p>

        <input type="text" placeholder="Full Name" value={name}
          onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email Address" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />

        {error && <div className="error-banner">{error}</div>}

        <button type="submit" disabled={loading} className="full">
          {loading ? <span className="spinner" /> : 'Create Account'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </form>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModelViewer from '../ModelViewer';
import { apiFetch, apiUpload, getUser, logout } from '../Auth';


export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [modelUrl, setModelUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const user = getUser();
  const [mode, setMode] = useState('text');
const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    apiFetch('/projects').then(setProjects).catch(() => {});
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      setModelUrl(data.model_url);
      const updated = await apiFetch('/projects');
      setProjects(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
};

const handleGenerateImage = async () => {
  setLoading(true);
  setError(null);
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const data = await apiUpload('/generate-image', formData);
    setModelUrl(data.model_url);
    const updated = await apiFetch('/projects');
    setProjects(updated);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dash">
      <aside className="sidebar">
        <div className="auth-logo small">◆ Aethel AI</div>
        <nav>
          
          <div className="nav-item active">📊 Dashboard</div>
          <div className="nav-item">📁 Projects</div>
          <div className="nav-item">🗂 Asset Library</div>
          <div className="nav-item">⚙️ Settings</div>
          <div className="sidebar-history">
  <div className="sidebar-heading">Recent Projects</div>
  {projects.length === 0 && (
    <p className="sidebar-empty">No projects yet</p>
  )}
  {projects.map((p) => (
    <div
      key={p.id}
      className="sidebar-project"
      onClick={() => setModelUrl(p.model_url)}
    >
      {p.prompt}
    </div>
  ))}
</div>
        </nav>
        
        <div className="sidebar-bottom" onClick={handleLogout}>
          👤 {user?.name || user?.email} — Log out
        </div>
      </aside>

      <main className="dash-main">
       <div className="mode-tabs">
  <button className={mode === 'text' ? 'tab active' : 'tab'} onClick={() => setMode('text')}>
    Text to 3D
  </button>
  <button className={mode === 'image' ? 'tab active' : 'tab'} onClick={() => setMode('image')}>
    Image to 3D
  </button>
</div>

{mode === 'text' ? (
  <div className="input-row">
    <input
      type="text"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="A futuristic spaceship with blue lights"
      disabled={loading}
    />
    <button onClick={handleGenerate} disabled={loading || !prompt}>
      {loading ? <span className="spinner" /> : 'Generate Model'}
    </button>
  </div>
) : (
  <div className="upload-row">
    <label className="upload-box">
      <input type="file" accept="image/*" onChange={handleImageChange} hidden />
      {imagePreview ? (
        <img src={imagePreview} alt="Selected" />
      ) : (
        <span>Click to choose an image</span>
      )}
    </label>
    <button onClick={handleGenerateImage} disabled={loading || !imageFile}>
      {loading ? <span className="spinner" /> : 'Generate Model'}
    </button>
  </div>
)}

        {error && <div className="error-banner">{error}</div>}

<h3>Current Model Viewport</h3>
<div className="viewport-frame">
  <ModelViewer modelUrl={modelUrl} loading={loading} />
</div>

        <h3>My Projects</h3>
        <div className="project-grid">
          {projects.map((p) => (
            <div key={p.id} className="project-card" onClick={() => setModelUrl(p.model_url)}>
              <div className="project-thumb">🧊</div>
              <div className="project-prompt">{p.prompt}</div>
            </div>
          ))}
          {projects.length === 0 && <p className="fsub">No projects yet — generate your first model above.</p>}
        </div>
      </main>
    </div>
  );
}
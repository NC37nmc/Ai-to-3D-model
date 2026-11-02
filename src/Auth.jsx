const API_URL = 'http://localhost:5050';

export function saveSession(token, name, email) {
  localStorage.setItem('token', token);
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  return { name: localStorage.getItem('name'), email: localStorage.getItem('email') };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
}

export async function signup(name, email, password) {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  const data = await res.json();
  saveSession(data.token, data.name, data.email);
  return data;
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  const data = await res.json();
  saveSession(data.token, data.name, data.email);
  return data;
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
  return res.json();
}

export async function apiUpload(path, formData) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Upload failed');
  return res.json();
}
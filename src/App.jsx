import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { getToken } from './Auth';

function Protected({ children }) {
  return getToken() ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
    </Routes>
  );
}

export default App;
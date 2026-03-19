import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import BootPage    from './pages/BootPage';
import LandingPage from './pages/LandingPage';
import LoginPage   from './pages/LoginPage';
import AppPage     from './pages/AppPage';

function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<BootPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login"   element={<LoginPage />} />
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <AppPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

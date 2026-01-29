import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/components/LoginPage';
import RegisterPage from './features/auth/components/RegisterPage';
import Dashboard from './features/roadmap/components/Dashboard';
import CreateRoadmap from './features/roadmap/components/CreateRoadmap';
import UpgradePage from './features/auth/components/UpgradePage';
import { useAuthStore } from './stores/authStore';

function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/roadmap/create" 
          element={
            <ProtectedRoute>
              <CreateRoadmap />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/upgrade" 
          element={
            <ProtectedRoute>
              <UpgradePage />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

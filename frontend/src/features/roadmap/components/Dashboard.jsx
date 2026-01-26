import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-lg">Welcome, {user?.email}!</p>
          <p className="text-slate-400 mt-2">Trial ends: {new Date(user?.trial_end_date).toLocaleDateString()}</p>
          <p className="text-green-400 mt-4">✓ Backend working! Roadmap generation coming next...</p>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/roadmaps/current', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📊 Roadmap data:', data); // Debug
        setRoadmap(data.roadmap);
      } else if (response.status === 404) {
        setRoadmap(null);
      } else {
        setError('Failed to load roadmap');
      }
    } catch (error) {
      console.error('Failed to fetch roadmap:', error);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteRoadmap = async () => {
    if (!confirm('Are you sure you want to delete this roadmap? This cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/roadmaps/current', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setRoadmap(null);
      }
    } catch (error) {
      console.error('Failed to delete roadmap:', error);
    }
  };

  const daysRemaining = user?.trial_end_date 
    ? Math.ceil((new Date(user.trial_end_date) - new Date()) / (1000 * 60 * 60 * 24))
    : 0;

  const isTrialExpired = daysRemaining <= 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-slate-900">SteerClear</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Trial badge */}
              {!isTrialExpired && daysRemaining > 0 && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-amber-900">
                    {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left in trial
                  </span>
                </div>
              )}

              {/* User menu */}
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">
            Your Roadmap
          </h1>
          <p className="text-slate-600 text-sm">
            Personalized UPSC preparation plan
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={fetchRoadmap} />
        ) : !roadmap ? (
          <EmptyState onCreate={() => navigate('/roadmap/create')} />
        ) : (
          <RoadmapCard roadmap={roadmap} onDelete={handleDeleteRoadmap} />
        )}
      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-800 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 text-sm">Loading your roadmap...</p>
      </div>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-white rounded-lg border border-red-200 p-12 text-center">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">Failed to load roadmap</h3>
      <p className="text-slate-600 text-sm mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-blue-900 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

function EmptyState({ onCreate }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">
        No roadmap yet
      </h3>
      <p className="text-slate-600 mb-6 text-sm max-w-md mx-auto">
        Create your personalized study plan based on your target date, daily hours, and preparation level
      </p>
      <button
        onClick={onCreate}
        className="inline-flex items-center px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-blue-900 transition-colors"
      >
        Create Roadmap
      </button>
    </div>
  );
}

function RoadmapCard({ roadmap, onDelete }) {
  const targetDate = new Date(roadmap.target_date);
  const createdDate = new Date(roadmap.created_at);
  const today = new Date();
  
  const daysUntilExam = Math.max(0, Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)));
  const daysSinceCreation = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
  
  // Calculate progress
  const totalDays = roadmap.total_days || Math.ceil((targetDate - createdDate) / (1000 * 60 * 60 * 24));
  const progressPercentage = totalDays > 0 ? Math.min(100, Math.round((daysSinceCreation / totalDays) * 100)) : 0;
  
  // Format exam type
  const formatExamType = (examType) => {
    return examType?.replace(/_/g, ' ') || examType;
  };

  // Extract coverage percentage (handle if it's an object)
  const coveragePercent = typeof roadmap.coverage_percent === 'object' 
    ? (roadmap.coverage_percent?.percentage || roadmap.coverage_percent?.value || 0)
    : (roadmap.coverage_percent || 0);

  // Check if roadmap has detailed data
  const hasPhases = Array.isArray(roadmap.phases) && roadmap.phases.length > 0;
  const hasSubjects = roadmap.subject_allocation && typeof roadmap.subject_allocation === 'object' && Object.keys(roadmap.subject_allocation).length > 0;
  const isComplete = hasPhases && hasSubjects && roadmap.total_hours > 0;

  // Debug log
  console.log('🔍 Roadmap structure:', {
    phases: roadmap.phases,
    subject_allocation: roadmap.subject_allocation,
    coverage_percent: roadmap.coverage_percent,
    total_hours: roadmap.total_hours
  });

  return (
    <div className="space-y-6">
      {/* Main Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              {formatExamType(roadmap.exam_type)}
            </h2>
            <p className="text-sm text-slate-600">
              Target: {targetDate.toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-900">
                {daysUntilExam}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                days left
              </div>
            </div>
            <button
              onClick={onDelete}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete roadmap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Daily Study" value={`${roadmap.daily_hours}h`} />
          <StatCard label="Total Hours" value={`${roadmap.total_hours || 0}h`} />
          <StatCard label="Syllabus" value={`${Math.round(coveragePercent)}%`} />
          <StatCard label="Level" value={roadmap.level} capitalize />
        </div>

        {/* Progress Bar */}
        {isComplete && totalDays > 0 && !isNaN(daysSinceCreation) && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Time Elapsed</span>
              <span className="text-sm font-semibold text-slate-900">{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-800 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Day {daysSinceCreation + 1} of {totalDays}
            </p>
          </div>
        )}

        {/* Phases */}
        {hasPhases && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Preparation Phases</h3>
            <div className="grid grid-cols-3 gap-3">
              {roadmap.phases.map((phase, index) => {
                // Handle different phase structures
                const phaseName = phase.name || phase.phase || `Phase ${index + 1}`;
                const phaseDays = phase.duration_days || phase.days || phase.duration || 0;
                
                return (
                  <div 
                    key={index}
                    className="bg-blue-50 rounded-lg p-4 border border-blue-200"
                  >
                    <div className="text-sm font-semibold text-blue-900 mb-1">{phaseName}</div>
                    <div className="text-xs text-blue-700">{phaseDays} days</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Subject Breakdown */}
        {hasSubjects && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Subject-wise Hours</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(roadmap.subject_allocation)
                .filter(([subject, hours]) => subject && hours > 0)
                .sort(([, a], [, b]) => b - a)
                .map(([subject, hours]) => (
                  <div key={subject} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-sm font-medium text-slate-700">{subject}</span>
                    <span className="text-sm font-bold text-slate-900">{hours}h</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Incomplete Data Warning */}
        {!isComplete && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-900 mb-1">
                  Roadmap data incomplete
                </p>
                <p className="text-xs text-amber-700">
                  Some details are missing. Check console for debugging info.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, capitalize = false }) {
  return (
    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
      <div className="text-xs text-slate-600 mb-1 font-medium">{label}</div>
      <div className={`text-2xl font-bold text-slate-900 ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </div>
    </div>
  );
}
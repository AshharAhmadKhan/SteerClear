import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRoadmap() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    exam_type: 'UPSC CSE Prelims',
    target_date: '',
    daily_hours: 8,
    level: 'advanced'  // ← Changed to lowercase
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/roadmaps/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create roadmap');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Map display labels to backend values
  const levelMap = {
    'Beginner': 'beginner',
    'Intermediate': 'intermediate',
    'Advanced': 'advanced'
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Create Your Roadmap
          </h1>
          <p className="text-slate-600 text-sm">
            Answer a few questions to generate your personalized study plan
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-8">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Exam Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Which exam are you preparing for?
              </label>
              <select
                value={formData.exam_type}
                onChange={(e) => handleChange('exam_type', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                required
              >
                <option value="UPSC CSE Prelims">UPSC CSE Prelims</option>
                <option value="UPSC CSE Mains">UPSC CSE Mains</option>
                <option value="UPSC CSE Prelims + Mains">UPSC CSE Prelims + Mains</option>
              </select>
            </div>

            {/* Target Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What's your target exam date?
              </label>
              <input
                type="date"
                value={formData.target_date}
                onChange={(e) => handleChange('target_date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                required
              />
            </div>

            {/* Daily Hours */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                How many hours can you study daily?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[3, 4, 5, 6, 8].map((hours) => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => handleChange('daily_hours', hours)}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      formData.daily_hours === hours
                        ? 'bg-blue-800 text-white'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {hours}h
                  </button>
                ))}
              </div>
            </div>

            {/* User Level */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What's your current preparation level?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(levelMap).map((displayLevel) => (
                  <button
                    key={displayLevel}
                    type="button"
                    onClick={() => handleChange('level', levelMap[displayLevel])}
                    className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                      formData.level === levelMap[displayLevel]
                        ? 'bg-blue-800 text-white'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {displayLevel}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating your roadmap...' : 'Generate Roadmap'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
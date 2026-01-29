import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

export default function UpgradePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleUpgrade = () => {
    // TODO: Integrate with your payment provider (Razorpay/Stripe)
    console.log('Redirect to payment');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-slate-900">
              SteerClear
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow border border-slate-200 p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Your trial has ended
            </h2>
            <p className="text-slate-600 text-sm">
              Continue accessing your personalized roadmap with a premium account
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-slate-900 mb-1">
                ₹999<span className="text-lg font-normal text-slate-600">/year</span>
              </div>
              <div className="text-sm text-slate-600">
                or ₹99/month
              </div>
            </div>
            
            <div className="space-y-2">
              {[
                'Full access to your personalized roadmap',
                'Subject-wise study planning',
                'Progress tracking',
                'Regular updates and improvements'
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleUpgrade}
            className="w-full py-3 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-blue-900 transition-colors mb-3"
          >
            Upgrade Now
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* Trust signal */}
        <p className="mt-6 text-center text-xs text-slate-400">
          30-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
}
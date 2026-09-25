import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';

export const UnifiedLogin: React.FC = () => {
  const { handleRequestOtp, handleVerifyOtp } = useAppState();

  const [role, setRole] = useState<'Administrator' | 'Field Executive' | 'Shop Owner'>('Administrator');
  const [username, setUsername] = useState('ADMIN');
  const [mobile, setMobile] = useState('9876543210');
  const [otp, setOtp] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpRequested, setOtpRequested] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Quick preset loader for hassle-free demonstration
  const handleSelectRole = (selectedRole: 'Administrator' | 'Field Executive' | 'Shop Owner') => {
    setRole(selectedRole);
    setIsDropdownOpen(false);
    setError(null);
    setSuccessMsg(null);
    setOtpRequested(false);
    setOtp('');

    if (selectedRole === 'Administrator') {
      setUsername('ADMIN');
      setMobile('9876543210');
    } else if (selectedRole === 'Field Executive') {
      setUsername('FE001');
      setMobile('9848011223');
    } else if (selectedRole === 'Shop Owner') {
      setUsername('SHOP001');
      setMobile('9848023456');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    
    try {
      await handleRequestOtp(username, mobile);
      setOtpRequested(true);
      setSuccessMsg('OTP sent successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to request OTP. Invalid username or mobile number.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await handleVerifyOtp(username, mobile, otp);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Incorrect OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f6f3] flex flex-col justify-center items-center p-4 font-sans select-none">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Secure Login</h1>
          <p className="text-slate-500 text-sm mt-1">Authenticate via SMS OTP to continue</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-100 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-start gap-3 border border-emerald-100 animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm font-medium">{successMsg}</span>
          </div>
        )}

        {/* Step 1: Request OTP */}
        {!otpRequested ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Role</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-slate-50 border border-slate-200 text-left px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 font-medium flex items-center justify-between"
                >
                  {role}
                  <div className="text-slate-400 text-xs">▼</div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden py-1">
                    {(['Administrator', 'Field Executive', 'Shop Owner'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleSelectRole(r)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${role === r ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username / Login ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. FE001"
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Mobile Number Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Registered Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 9876543210"
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 flex justify-center mt-6"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          /* Step 2: Verify OTP */
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter 6-Digit OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="••••••"
                required
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 flex justify-center mt-6"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpRequested(false);
                setOtp('');
                setError(null);
                setSuccessMsg(null);
              }}
              className="w-full text-slate-500 hover:text-slate-700 text-sm font-medium py-2 transition-colors"
            >
              Change Username / Mobile Number
            </button>
          </form>
        )}

        {/* Presets Row */}
        {!otpRequested && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-center text-slate-400 font-bold tracking-wider mb-4 uppercase">Test Presets</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => handleSelectRole('Administrator')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${role === 'Administrator' ? 'bg-emerald-100 text-emerald-800' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>Admin</button>
              <button onClick={() => handleSelectRole('Field Executive')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${role === 'Field Executive' ? 'bg-emerald-100 text-emerald-800' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>Field Exec</button>
              <button onClick={() => handleSelectRole('Shop Owner')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${role === 'Shop Owner' ? 'bg-emerald-100 text-emerald-800' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>Shop Owner</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

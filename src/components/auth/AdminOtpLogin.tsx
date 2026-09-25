import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { YadviLogo } from '../common/YadviLogo';
import { Phone, KeyRound, ShieldAlert, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

export const AdminOtpLogin: React.FC = () => {
  const { loginAdmin } = useAppState();

  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState('');

  // Handle Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit authorized mobile number');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setOtp('123456'); // Pre-fill mock OTP for smooth demo evaluation
      setOtpSentMessage(`OTP successfully dispatched to +91 ${cleanPhone}`);
    }, 600);
  };

  // Handle Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length < 4) {
      setError('Please enter the verification OTP');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const success = loginAdmin(mobileNumber, otp);
      if (!success) {
        setError('Invalid or expired OTP. Please try entering 123456.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062018] via-[#0b3b2c] to-[#08291f] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Decorative Farm Landscape Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Floating Leaves Accent */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center Login Card matching reference screenshot */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/20 z-10 animate-fade-in">
        {/* Top Header Section */}
        <div className="bg-gradient-to-b from-emerald-50 to-white pt-8 pb-6 px-8 text-center border-b border-emerald-100 flex flex-col items-center">
          <YadviLogo size="lg" showTagline={true} variant="dark" />
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Enterprise Admin Portal</span>
          </div>
        </div>

        {/* Login Body */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {step === 'mobile' ? 'Authorized Admin Access' : 'Verify Mobile OTP'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {step === 'mobile'
                ? 'Enter your registered mobile number. A secure OTP will be sent for instant authentication.'
                : otpSentMessage || 'Enter the 6-digit OTP sent to your phone.'}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {step === 'mobile' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Authorized Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition text-sm tracking-wider"
                    required
                  />
                  <Phone className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-400">Demo Authorized Admin #</span>
                  <button
                    type="button"
                    onClick={() => setMobileNumber('9876543210')}
                    className="text-[11px] text-emerald-700 font-semibold hover:underline"
                  >
                    Use 98765 43210
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#0b3b2c] hover:bg-[#0e4a38] text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-950/30 transition flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Requesting Secure OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Enter 6-Digit OTP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold text-center tracking-[0.5em] text-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition"
                    autoFocus
                    required
                  />
                  <KeyRound className="w-4 h-4 absolute right-3.5 top-4 text-slate-400" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-emerald-600 font-medium">Demo OTP is 123456</span>
                  <button
                    type="button"
                    onClick={() => setStep('mobile')}
                    className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                  >
                    Change Number
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#0b3b2c] hover:bg-[#0e4a38] text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-950/30 transition flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Verify & Open Admin Dashboard</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Client Notice */}
          <div className="mt-8 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              🔒 High security two-factor authorization enabled for Yadvi Management System.
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Backend integration ready for Firebase SMS / Fast2SMS gateway.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-6 text-center text-xs text-emerald-100/60 font-medium z-10">
        Yadvi Hybrid Seeds © 2026 • Seed Distribution & Logistics Portal
      </div>
    </div>
  );
};

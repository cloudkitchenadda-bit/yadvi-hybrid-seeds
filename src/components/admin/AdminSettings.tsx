import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Settings, Phone, ShieldCheck, Truck, Building, Save } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { adminPhone } = useAppState();
  const [authorizedNumbers, setAuthorizedNumbers] = useState([
    '+91 98765 43210 (Primary Admin)',
    '+91 98480 99881 (Operations Head)',
    '+91 94401 11223 (Logistics Lead)',
  ]);
  const [newNumber, setNewNumber] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleAddNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNumber.trim().length >= 10) {
      setAuthorizedNumbers([...authorizedNumbers, `+91 ${newNumber.trim()} (Authorized)`]);
      setNewNumber('');
      setSavedMessage('Authorized mobile whitelist updated!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Portal Configuration & Security</h2>
        <p className="text-xs text-slate-500">Manage authorized login credentials, logistics partners and enterprise settings</p>
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900">
          {savedMessage}
        </div>
      )}

      {/* 1. Authorized Admin Mobile Whitelist (Client Requirement #1) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <h3 className="font-bold text-sm">Authorized Admin Mobile Numbers (OTP Access Only)</h3>
        </div>
        <p className="text-xs text-slate-500">
          In compliance with enterprise security specifications, there are no passwords. Only phone numbers listed here can request and verify OTPs to access this Admin Portal.
        </p>

        <div className="space-y-2">
          {authorizedNumbers.map((num, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono font-semibold text-slate-800">{num}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Verified
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddNumber} className="flex items-center gap-3 pt-2">
          <input
            type="tel"
            placeholder="Add new authorized 10-digit mobile..."
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs"
          >
            Add Mobile
          </button>
        </form>
      </div>

      {/* 2. Registered Transporters */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Truck className="w-5 h-5 text-emerald-700" />
          <h3 className="font-bold text-sm">Approved Logistics & Transporter Partners</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800">Navata Road Transport</div>
            <div className="text-[11px] text-slate-500">Fleet: AP & Telangana Corridor</div>
            <div className="text-[10px] text-emerald-700 font-mono mt-1">Contract ID: NVT-2026-AP</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800">VRL Logistics</div>
            <div className="text-[11px] text-slate-500">Fleet: South India Express Cargo</div>
            <div className="text-[10px] text-emerald-700 font-mono mt-1">Contract ID: VRL-YADVI-09</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800">Kranti Road Transport</div>
            <div className="text-[11px] text-slate-500">Fleet: Coastal & Rayalaseema Routes</div>
            <div className="text-[10px] text-emerald-700 font-mono mt-1">Contract ID: KRN-9921</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800">BMPS Parcel Service</div>
            <div className="text-[11px] text-slate-500">Fleet: Last-mile Mandal Delivery</div>
            <div className="text-[10px] text-emerald-700 font-mono mt-1">Contract ID: BMPS-4410</div>
          </div>
        </div>
      </div>

      {/* 3. Company & Seed Licensing Details */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 space-y-3 text-xs text-slate-700">
        <div className="flex items-center gap-2 text-slate-900 font-bold">
          <Building className="w-4 h-4 text-emerald-700" />
          <span>Yadvi Hybrid Seeds Corporate Profile</span>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400">Head Office:</span>
            <div className="font-bold text-slate-900 mt-0.5">Plot 42, Seed Tech Park, Gannavaram, AP - 521101</div>
          </div>
          <div>
            <span className="text-slate-400">Central Seed License:</span>
            <div className="font-mono font-bold text-slate-900 mt-0.5">AP/CENTRAL/SEED/HYB/2021-998</div>
          </div>
          <div>
            <span className="text-slate-400">Processing Plant:</span>
            <div className="font-bold text-slate-900 mt-0.5">Gannavaram Automated Seed Cleaning & Grading Unit</div>
          </div>
          <div>
            <span className="text-slate-400">Quality Assurance:</span>
            <div className="font-bold text-emerald-800 mt-0.5">ISTA Certified Testing Laboratory</div>
          </div>
        </div>
      </div>
    </div>
  );
};

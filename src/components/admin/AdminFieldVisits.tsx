import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { FieldVisit } from '../../data/mockVisits';
import { Briefcase, CheckCircle2, Clock, MapPin, Image, Eye, X, MessageSquare, ShoppingBag } from 'lucide-react';

export const AdminFieldVisits: React.FC = () => {
  const { visits } = useAppState();
  const [selectedVisit, setSelectedVisit] = useState<FieldVisit | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const filteredVisits = visits.filter((v) => {
    if (filter === 'All') return true;
    return v.status === filter;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Dealer Field Visits</h2>
          <p className="text-xs text-slate-500">Retailer audits, variety demonstrations and on-spot seed bookings</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
          {(['All', 'Completed', 'In Progress', 'Pending'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filter === tab ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Visits Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVisits.map((visit) => (
          <div
            key={visit.id}
            onClick={() => setSelectedVisit(visit)}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition p-5 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  {visit.scheduledTime}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    visit.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : visit.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {visit.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm mt-2">{visit.shopName}</h3>
              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{visit.shopAddress}</span>
              </div>

              <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                <div className="text-[10px] text-slate-400 font-medium">Field Officer</div>
                <div className="font-bold text-slate-800">{visit.executiveName}</div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  Purpose: {visit.purpose}
                </div>
              </div>

              {visit.notes && (
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-3 bg-emerald-50/40 p-2 rounded-lg border border-emerald-100 italic">
                  "{visit.notes}"
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              {visit.bagsOrdered ? (
                <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100/60 px-2 py-0.5 rounded">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Booked: {visit.bagsOrdered} Bags</span>
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">No order booked</span>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVisit(visit);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Visit Detail Modal with Seed Packet Photo */}
      {selectedVisit && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-scale-in">
            <div className="bg-[#0b3b2c] p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">{selectedVisit.shopName}</h3>
                <div className="text-xs text-emerald-200">Field Visit Audit Log</div>
              </div>
              <button
                onClick={() => setSelectedVisit(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-medium">Executive:</span>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedVisit.executiveName}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Check-In Time:</span>
                  <div className="font-mono font-bold text-emerald-700 mt-0.5">
                    {selectedVisit.checkInTime || 'Pending'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Distance from Hub:</span>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedVisit.distanceKm} km</div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Order Status:</span>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {selectedVisit.bagsOrdered ? `${selectedVisit.bagsOrdered} Bags Booked` : 'Nil'}
                  </div>
                </div>
              </div>

              {selectedVisit.photoUrl && (
                <div>
                  <span className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-emerald-600" />
                    <span>On-Site Variety Demo / Display Packet:</span>
                  </span>
                  <div className="h-44 bg-slate-100 rounded-xl overflow-hidden p-2 flex items-center justify-center border border-slate-200">
                    <img
                      src={selectedVisit.photoUrl}
                      alt="Visit verification"
                      className="max-h-full object-contain drop-shadow"
                    />
                  </div>
                </div>
              )}

              <div>
                <span className="font-bold text-slate-800 block mb-1">Executive Notes:</span>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600 leading-relaxed">
                  {selectedVisit.notes || 'No specific notes logged.'}
                </p>
              </div>

              {selectedVisit.farmerFeedback && (
                <div>
                  <span className="font-bold text-emerald-900 block mb-1">Retailer / Farmer Feedback:</span>
                  <p className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-800">
                    {selectedVisit.farmerFeedback}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedVisit(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

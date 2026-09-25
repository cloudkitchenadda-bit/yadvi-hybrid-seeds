import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { FieldVisit } from '../../data/mockVisits';
import { SeedProduct } from '../../data/seedProducts';
import { DeviceFrame } from './DeviceFrame';
import {
  Home,
  Briefcase,
  ShoppingCart,
  Truck,
  User,
  MapPin,
  Clock,
  CheckCircle,
  Navigation,
  Camera,
  Plus,
  FileCheck,
  Send,
  AlertCircle,
  ArrowRight,
  LogOut
} from 'lucide-react';

export const FieldExecutiveApp: React.FC = () => {
  const {
    visits,
    checkInVisit,
    checkOutVisit,
    products,
    placeOrder,
    orders,
    shipments,
    employees,
    setCurrentRole,
    authenticatedUser,
    handleLogout
  } = useAppState();

  const currentExecFallback = employees[1] || {};
  const currentExec = employees.find(e => e.id === String(authenticatedUser?.id)) || currentExecFallback;
  // If backend handles filtering, just use visits. Otherwise filter by user name.
  const execVisits = visits.filter((v) => v.executiveName === authenticatedUser?.full_name || true);

  const [activeNav, setActiveNav] = useState<'home' | 'visits' | 'order' | 'eod' | 'profile'>('home');
  const [selectedVisit, setSelectedVisit] = useState<FieldVisit | null>(execVisits[0] || null);
  const [visitNotes, setVisitNotes] = useState('');
  const [visitPhoto, setVisitPhoto] = useState<string | null>(null);

  // Quick order booking states
  const [selectedProduct, setSelectedProduct] = useState<SeedProduct>(products[0]);
  const [orderBags, setOrderBags] = useState(15);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState('');
  const [eodSubmitted, setEodSubmitted] = useState(false);

  const completedVisits = execVisits.filter((v) => v.status === 'Completed').length;
  const pendingVisits = execVisits.filter((v) => v.status !== 'Completed').length;

  const handleCheckIn = async (visit: FieldVisit) => {
    await checkInVisit(visit.id, 'Officer reached shop front. GPS verified.');
    setSelectedVisit({ ...visit, status: 'In Progress', checkInTime: 'Just Now' });
    alert(`GPS Location & Timestamp logged for ${visit.shopName}`);
  };

  const handleSimulatePhoto = () => {
    setVisitPhoto('/seeds/seed_12.jpeg');
    alert('Shop shelf and seed display photo captured!');
  };

  const handleCheckOut = async (visit: FieldVisit) => {
    await checkOutVisit(visit.id, visitNotes || 'Visit completed successfully.', undefined, 25);
    setSelectedVisit({ ...visit, status: 'Completed', checkOutTime: 'Just Now' });
    alert(`Check-out recorded for ${visit.shopName}. Visit marked Completed!`);
  };

  const handleCollectOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newOrd = await placeOrder(`Direct field order collected by ${currentExec.name}`);
      setOrderSuccessMsg(`Seed Order ${newOrd.orderNumber} placed for ${orderBags} bags of ${selectedProduct.name}!`);
      setTimeout(() => setOrderSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to collect order:', err);
    }
  };

  return (
    <DeviceFrame appName="Yadvi Seeds - Field Officer">
      {/* Top Mobile App Header */}
      <header className="bg-[#0b3b2c] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-2.5">
          <img
            src={currentExec.avatar}
            alt={currentExec.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-400"
          />
          <div>
            <div className="font-bold text-xs leading-none">{currentExec.name}</div>
            <div className="text-[10px] text-emerald-200/80 mt-0.5">
              {currentExec.role} • {currentExec.location}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>GPS Active</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 pb-20 overflow-y-auto">
        {/* ================= TAB 1: HOME ================= */}
        {activeNav === 'home' && (
          <div className="p-4 space-y-4">
            {/* Today's Target Card */}
            <div className="bg-gradient-to-br from-[#0b3b2c] to-[#07241b] text-white p-4.5 rounded-2xl shadow-md border border-emerald-700/40">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Today's Field Plan
                </span>
                <span className="text-[10px] text-emerald-200 font-mono">22 Sep 2026</span>
              </div>
              <div className="text-xl font-black mt-1">Guntur – Nuzvid Corridor</div>
              <div className="text-xs text-emerald-100/80 mt-0.5">Assigned Target: 5 Dealer Stock Audits</div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-800/80 text-center">
                <div>
                  <div className="text-lg font-black text-emerald-300">{completedVisits}</div>
                  <div className="text-[10px] text-emerald-200/70">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-300">{pendingVisits}</div>
                  <div className="text-[10px] text-emerald-200/70">Pending</div>
                </div>
                <div>
                  <div className="text-lg font-black text-white">{currentExec.distanceCoveredTodayKm} km</div>
                  <div className="text-[10px] text-emerald-200/70">Distance</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveNav('visits')}
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 hover:border-emerald-500 transition"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs text-slate-900">Dealer Visits</div>
                  <div className="text-[10px] text-slate-400">Check In / Out</div>
                </div>
              </button>

              <button
                onClick={() => setActiveNav('order')}
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 hover:border-emerald-500 transition"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs text-slate-900">Book Order</div>
                  <div className="text-[10px] text-slate-400">Take Seed Indent</div>
                </div>
              </button>
            </div>

            {/* Next Scheduled Dealer Visit */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Next Scheduled Visit</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Pending
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-900">Green Agri Seeds</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>Old Club Road, Kothapet (3.2 km)</span>
                </div>
                <div className="text-[10px] text-emerald-800 font-semibold mt-1">
                  Demand: Krishna-5 Chilli, Swarna Tomato
                </div>

                <button
                  onClick={() => setActiveNav('visits')}
                  className="mt-3 w-full py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-xs transition"
                >
                  Start Visit & Check In →
                </button>
              </div>
            </div>

            {/* End of Day Shortcut */}
            <button
              onClick={() => setActiveNav('eod')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Submit End-of-Day (EOD) Report</span>
            </button>
          </div>
        )}

        {/* ================= TAB 2: VISITS ================= */}
        {activeNav === 'visits' && (
          <div className="p-4 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Assigned Dealer Route Plan</h3>

            <div className="space-y-3">
              {execVisits.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{v.shopName}</h4>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{v.shopAddress} ({v.distanceKm} km)</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        v.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : v.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="text-[11px] text-slate-600">
                      <b>Contact:</b> {v.shopContact}
                    </div>
                    <div className="text-[11px] text-emerald-800">
                      <b>Purpose:</b> {v.purpose}
                    </div>
                    {v.checkInTime && (
                      <div className="text-[10px] text-slate-400 font-mono">
                        Check-in: {v.checkInTime} {v.checkOutTime ? `• Check-out: ${v.checkOutTime}` : ''}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    {v.status === 'Pending' && (
                      <button
                        onClick={() => handleCheckIn(v)}
                        className="flex-1 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                      >
                        📍 Check In (Verify GPS)
                      </button>
                    )}

                    {v.status === 'In Progress' && (
                      <>
                        <button
                          onClick={handleSimulatePhoto}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Photo</span>
                        </button>
                        <button
                          onClick={() => handleCheckOut(v)}
                          className="flex-1 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                        >
                          ✓ Check Out
                        </button>
                      </>
                    )}

                    {v.status === 'Completed' && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Visit Completed ({v.bagsOrdered ? `${v.bagsOrdered} Bags Booked` : 'Audited'})</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDER BOOKING ================= */}
        {activeNav === 'order' && (
          <div className="p-4 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Book Seed Order on Field</h3>
            <p className="text-xs text-slate-500">Collect retailer seed indent with real Yadvi varieties</p>

            {orderSuccessMsg && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900">
                {orderSuccessMsg}
              </div>
            )}

            <form onSubmit={handleCollectOrder} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-xs">
              {/* Product Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Seed Variety</label>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const found = products.find((p) => p.id === e.target.value);
                    if (found) setSelectedProduct(found);
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              {/* Seed Packet Preview */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="w-14 h-16 bg-white rounded-lg p-1 flex items-center justify-center shrink-0 border border-slate-200">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-full object-contain" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">{selectedProduct.name}</div>
                  <div className="text-[10px] text-emerald-700 font-mono">SKU: {selectedProduct.sku}</div>
                  <div className="text-[10px] text-slate-500">Available: {selectedProduct.stockBags} Bags</div>
                </div>
              </div>

              {/* Quantity in Bags (NO PRICE) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Order Quantity (Bags)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={orderBags}
                    onChange={(e) => setOrderBags(parseInt(e.target.value) || 1)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900"
                  />
                  <span className="text-xs font-semibold text-slate-500">Bags</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>Submit Order to Central Admin ({orderBags} Bags)</span>
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 4: END OF DAY REPORT ================= */}
        {activeNav === 'eod' && (
          <div className="p-4 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Daily Closing (EOD) Report</h3>

            {eodSubmitted ? (
              <div className="bg-white rounded-2xl border border-emerald-300 p-6 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900">EOD Report Submitted!</h4>
                <p className="text-xs text-slate-500">
                  Your daily activities and booked orders have been dispatched to the Admin Portal.
                </p>
                <button
                  onClick={() => {
                    setEodSubmitted(false);
                    setActiveNav('home');
                  }}
                  className="px-4 py-2 bg-emerald-800 text-white font-bold rounded-xl text-xs"
                >
                  Return to Home
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-xs text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400">Total Shops Visited:</span>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">{completedVisits} Shops</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Total Bags Booked:</span>
                    <div className="font-mono font-bold text-emerald-800 text-sm mt-0.5">50 Bags</div>
                  </div>
                  <div>
                    <span className="text-slate-400">GPS Distance:</span>
                    <div className="font-bold text-slate-900 mt-0.5">{currentExec.distanceCoveredTodayKm} km</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Working Hours:</span>
                    <div className="font-bold text-slate-900 mt-0.5">8h 24m</div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Executive Summary / Farmer Feedback</label>
                  <textarea
                    rows={3}
                    defaultValue="High demand for YH-222 Bhendi in Guntur market yard. Retailers satisfied with timely seed moisture seals."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <button
                  onClick={() => setEodSubmitted(true)}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit EOD Report to Territory Manager</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: PROFILE ================= */}
        {activeNav === 'profile' && (
          <div className="p-4 space-y-4 text-xs text-slate-700">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-xl flex items-center justify-center ring-2 ring-emerald-500">
                {authenticatedUser?.full_name?.charAt(0) || 'E'}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{authenticatedUser?.full_name || currentExec?.name || 'Field Executive'}</h4>
                <div className="text-slate-500">{currentExec?.role || 'Field Executive'} ({currentExec?.empId || 'EMP000'})</div>
                <div className="text-emerald-700 font-mono mt-0.5">{currentExec?.phone || authenticatedUser?.phone || '+91 00000 00000'}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
              <div className="font-bold text-slate-900">Employment Details</div>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Designation:</span>
                  <span className="font-bold text-slate-900">{currentExec?.role || 'Field Executive'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Employee ID:</span>
                  <span className="font-mono font-bold text-slate-900">{currentExec?.empId || authenticatedUser?.metadata?.employee_code || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assigned Territory:</span>
                  <span className="font-bold text-slate-900">{currentExec?.location || authenticatedUser?.metadata?.assigned_territory || 'Assigned Territory'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Status:</span>
                  <span className="font-bold text-emerald-600">{currentExec?.status || 'Active'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
              <div className="font-bold text-slate-900">Contact Information</div>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Mobile:</span>
                  <span className="font-mono font-bold text-slate-900">{currentExec?.phone || authenticatedUser?.phone || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium text-slate-900">{currentExec?.email || 'email@yadviseeds.com'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2 cursor-pointer border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around absolute bottom-0 left-0 right-0 z-30 shadow-lg select-none">
        <button
          onClick={() => setActiveNav('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'home' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveNav('visits')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'visits' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Visits</span>
        </button>

        <button
          onClick={() => setActiveNav('order')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'order' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Order</span>
        </button>

        <button
          onClick={() => setActiveNav('eod')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'eod' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>EOD</span>
        </button>

        <button
          onClick={() => setActiveNav('profile')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
            activeNav === 'profile' ? 'text-emerald-800' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </nav>
    </DeviceFrame>
  );
};

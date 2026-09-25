import React from 'react';
import { useAppState, UserRole, DeviceView } from '../../context/AppStateContext';
import { ShieldCheck, Store, Bike, Smartphone, Monitor, Bell, LogOut, User } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    deviceView,
    setDeviceView,
    whatsappAlert,
    triggerWhatsAppAlert,
    cart,
    authenticatedUser,
    canSwitchRoles,
    handleLogout,
  } = useAppState();

  const handleTestWhatsApp = () => {
    triggerWhatsAppAlert({
      show: true,
      orderNumber: 'ORD-1025',
      shopName: 'ABC Seeds & Fertilizers',
      itemsCount: 5,
      totalQuantity: 25,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'New',
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur text-white border-b border-slate-800 shadow-md px-3 sm:px-6 py-2 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Role Navigation Tabs or Locked Role Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {canSwitchRoles ? (
            /* Administrator has full access to all 3 modules */
            <>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mr-1 hidden md:inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Switcher:
              </span>

              <button
                onClick={() => setCurrentRole('admin')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                  currentRole === 'admin'
                    ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                <span>Admin Portal</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-800/60 rounded text-emerald-200 border border-emerald-500/30">
                  Full
                </span>
              </button>

              <button
                onClick={() => setCurrentRole('shop_owner')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                  currentRole === 'shop_owner'
                    ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-emerald-200" />
                <span>Shop Owner</span>
                {cart.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCurrentRole('field_executive')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                  currentRole === 'field_executive'
                    ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                }`}
              >
                <Bike className="w-3.5 h-3.5 text-emerald-200" />
                <span>Field Executive</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </button>
            </>
          ) : (
            /* Field Executive or Shop Owner: strictly locked to their single role */
            <div className="flex items-center gap-2.5">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-900/50 border border-emerald-600/40 text-xs font-bold text-emerald-200 flex items-center gap-2">
                {currentRole === 'field_executive' ? (
                  <>
                    <Bike className="w-4 h-4 text-emerald-400" />
                    <span>Field Executive Portal</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
                  </>
                ) : (
                  <>
                    <Store className="w-4 h-4 text-emerald-400" />
                    <span>Shop Owner Portal (ABC Seeds)</span>
                  </>
                )}
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                User: <b className="text-white">{authenticatedUser?.full_name || 'Authorized User'}</b>
              </span>
            </div>
          )}
        </div>

        {/* Right: Device View Toggles, WhatsApp Alert trigger & Logout */}
        <div className="flex items-center gap-2">
          {/* Device Frame Toggle for Mobile View */}
          {currentRole !== 'admin' && (
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setDeviceView('android')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                  deviceView === 'android' ? 'bg-emerald-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
                title="Android Device Frame"
              >
                <Smartphone className="w-3 h-3" />
                <span>Android</span>
              </button>
              <button
                onClick={() => setDeviceView('ios')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                  deviceView === 'ios' ? 'bg-emerald-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
                title="iPhone Device Frame"
              >
                <Smartphone className="w-3 h-3" />
                <span>iOS</span>
              </button>
              <button
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                  deviceView === 'desktop' ? 'bg-emerald-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
                title="Full Responsive View"
              >
                <Monitor className="w-3 h-3" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
            </div>
          )}

          {/* Test WhatsApp Alert Trigger */}
          <button
            onClick={handleTestWhatsApp}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold border border-[#25D366]/40 transition"
            title="Preview WhatsApp Order Alert simulation"
          >
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span className="hidden sm:inline">WhatsApp Alert</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-700/40 text-xs font-semibold transition"
            title="Logout from session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

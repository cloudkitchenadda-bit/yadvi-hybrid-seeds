import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  appName: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, appName }) => {
  const { deviceView } = useAppState();

  if (deviceView === 'desktop') {
    return <div className="w-full max-w-4xl mx-auto min-h-screen bg-white shadow-lg">{children}</div>;
  }

  const isIos = deviceView === 'ios';

  return (
    <div className="py-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-50px)] bg-slate-950/80">
      {/* Device Frame Shell */}
      <div
        className={`relative w-full max-w-[390px] h-[820px] bg-white overflow-hidden shadow-2xl flex flex-col border-[10px] ${
          isIos
            ? 'rounded-[50px] border-slate-800 ring-1 ring-slate-700'
            : 'rounded-[40px] border-slate-900 ring-2 ring-emerald-950/50'
        }`}
      >
        {/* Top Camera Notch / Dynamic Island */}
        <div className="w-full bg-white z-30 pt-2 pb-1 px-6 flex items-center justify-between text-xs text-slate-800 select-none border-b border-slate-100">
          <span className="font-bold text-[11px]">10:24</span>

          {/* Island / Notch */}
          {isIos ? (
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800 ml-auto mr-2" />
            </div>
          ) : (
            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-700" />
          )}

          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <BatteryMedium className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Mobile App Viewport */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-slate-50 relative">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="bg-white py-1.5 flex justify-center items-center select-none border-t border-slate-100 z-30">
          <div
            className={`bg-slate-300 rounded-full ${
              isIos ? 'w-32 h-1' : 'w-20 h-1'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

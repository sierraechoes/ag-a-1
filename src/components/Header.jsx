import React, { useState, useEffect } from 'react';
import { Shield, Bell, Wifi, Sun, Moon, Sparkles, Terminal } from 'lucide-react';

export default function Header({ user, onOpenSettings }) {
  const [timeStr, setTimeStr] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#090b10]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Partnership Branding & Client info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/40 glow-cyan relative group">
            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300">N</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#090b10] animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wider text-slate-100">{user.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                SOVEREIGN TIER-0
              </span>
            </div>
            <p className="text-[11px] text-slate-400">BlackRock x J.P. Morgan Exclusive Partnership</p>
          </div>
        </div>
      </div>

      {/* Center: Live Market Status & Time */}
      <div className="hidden md:flex items-center gap-6 px-4 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-slate-300">NY4 FEED: ACTIVE</span>
        </div>
        <div className="text-slate-500">|</div>
        <div className="text-cyan-400 font-medium">{timeStr}</div>
        <div className="text-slate-500">|</div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Wifi className="w-3.5 h-3.5" /> 1.2ms
        </div>
      </div>

      {/* Right: Actions, Notifications, Settings, Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
          title="Toggle Theme"
        >
          {darkMode ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        <div className="relative">
          <button className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400"></span>
          </button>
        </div>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Institutional Settings</span>
        </button>

        {/* Diamond N Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-500 to-indigo-600 p-[1px] shadow-md glow-cyan">
            <div className="w-full h-full bg-[#090b10] rounded-[11px] flex items-center justify-center relative overflow-hidden">
              <span className="font-extrabold text-sm text-cyan-300 tracking-tighter">N</span>
              <Sparkles className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

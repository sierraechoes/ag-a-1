import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  CandlestickChart, 
  Cpu, 
  Box, 
  Layers, 
  ShieldAlert, 
  FileCheck, 
  Settings,
  Terminal,
  ChevronRight,
  Zap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio & Holdings', icon: Briefcase },
    { id: 'futures', label: 'Futures Execution (1m)', icon: CandlestickChart },
    { id: 'cli', label: 'Institutional Terminal CLI', icon: Terminal },
    { id: 'quant', label: 'Quantum Quant Engines', icon: Cpu },
    { id: 'studio3d', label: '3D Microstructure & Risk', icon: Box },
    { id: 'darkpool', label: 'Dark Pool & Liquidity', icon: Layers },
    { id: 'risk', label: 'Risk Matrix & VaR', icon: ShieldAlert },
    { id: 'audit', label: 'Audit & Compliance', icon: FileCheck },
    { id: 'settings', label: 'Settings & Seed Editor', icon: Settings },
  ];

  return (
    <aside className="w-72 border-r border-slate-800/80 bg-[#07090f] flex flex-col h-[calc(100vh-4rem)] sticky top-16 z-20">
      {/* Partnership Badge */}
      <div className="p-4 mx-4 my-3 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">BlackRock x J.P. Morgan</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">Secret Sovereign Partnership Terminal v9.4</p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Institutional Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/30 glow-cyan'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`} />
                <span className="tracking-wide">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span>Sovereign Node</span>
          <span className="text-emerald-400 font-mono">ONLINE</span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[98%] animate-pulse"></div>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-center">Exclusive Access: Neah Hale</p>
      </div>
    </aside>
  );
}

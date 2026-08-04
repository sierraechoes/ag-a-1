import React from 'react';
import { Cpu, Zap, Activity, ShieldCheck, ArrowUpRight, BarChart3 } from 'lucide-react';

export default function QuantEngines({ quantModels }) {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Cpu className="w-3.5 h-3.5" /> Jane Street & Quant Firm Architecture
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Quantum & Statistical Arbitrage Engines</h2>
        <p className="text-xs text-slate-400 mt-1">Autonomous high-frequency pricing models, order flow imbalance detectors, and spread matrices</p>
      </div>

      {/* Grid of Quant Models */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quantModels.map((qm) => (
          <div key={qm.id} className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {qm.status}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">{qm.confidence} Confidence</span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">{qm.name}</h3>
              <p className="text-xs text-slate-400">Signal: <span className="text-cyan-300 font-mono font-medium">{qm.signal}</span></p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">Model Generated P&L</span>
              <span className="text-sm font-bold font-mono text-emerald-400">{qm.pnl}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Statistical Arbitrage Spread Monitor */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-100">Cross-Asset Statistical Arbitrage Spread Monitor</h3>
            <p className="text-xs text-slate-400">Real-time Z-score deviation and cointegration regression curves</p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            Z-Score: -2.14 (Mean Reverting)
          </span>
        </div>

        <div className="h-64 w-full bg-[#05070c] rounded-xl border border-slate-800/80 p-4 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>
          
          <div className="text-center z-10 space-y-2">
            <Activity className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
            <div className="text-sm font-mono font-bold text-slate-200">Stat-Arb Cointegration Spread Matrix Live</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Executing spread capture across Chicago CME and NY4 ECN venues. Expected reversion window: 4.2 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

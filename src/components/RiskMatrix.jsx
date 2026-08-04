import React from 'react';
import { ShieldAlert, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';

export default function RiskMatrix() {
  const stressScenarios = [
    { name: 'Black Swan Global Equity Crash (-20%)', impact: '-$968,400,000', probability: '0.12%', status: 'HEDGED' },
    { name: 'Interest Rate Shock (+150 bps Fed Hike)', impact: '-$342,100,000', probability: '1.45%', status: 'MONITORED' },
    { name: 'Geopolitical Energy Supply Disruption', impact: '-$210,500,000', probability: '0.85%', status: 'PROTECTED' },
    { name: 'Liquidity Squeeze in Treasury Futures', impact: '-$125,000,000', probability: '0.40%', status: 'SECURE' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <ShieldAlert className="w-3.5 h-3.5" /> Institutional Risk & Stress Testing
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Risk Matrix & Monte Carlo VaR Analytics</h2>
        <p className="text-xs text-slate-400 mt-1">Sovereign risk modeling, stress scenario simulation, and tail-risk hedging protocols</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400">Value at Risk (95% 1-Day)</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">$18,450,000</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400">Value at Risk (99% 10-Day)</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">$42,150,000</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400">Expected Shortfall (CVaR)</div>
          <div className="text-xl font-bold font-mono text-red-400 mt-1">$68,900,000</div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
        <h3 className="text-base font-bold text-slate-100 mb-4">Black Swan & Stress Testing Scenarios</h3>
        <div className="space-y-3">
          {stressScenarios.map((sc, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 gap-4">
              <div>
                <div className="text-sm font-bold text-slate-100">{sc.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">Estimated Tail Probability: <span className="text-cyan-400 font-mono">{sc.probability}</span></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-red-400">{sc.impact}</div>
                  <div className="text-[10px] text-slate-500">Portfolio Impact</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {sc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

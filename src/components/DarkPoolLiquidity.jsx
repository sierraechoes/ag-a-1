import React from 'react';
import { Layers, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

export default function DarkPoolLiquidity() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Layers className="w-3.5 h-3.5" /> Institutional Dark Pool & Block Execution
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Dark Pool Liquidity & Iceberg Routing</h2>
        <p className="text-xs text-slate-400 mt-1">Execute multi-million dollar institutional block orders with zero market impact via hidden liquidity venues</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Sigma-X / JPM Dark Venue</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-2">$1,245,000,000</div>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> 99.4% Fill Rate Efficiency
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">BlackRock Aladdin Cross</div>
          <div className="text-2xl font-bold font-mono text-slate-100 mt-2">$890,400,000</div>
          <p className="text-xs text-slate-400 mt-2">Zero Market Impact Score</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Active Iceberg Orders</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-2">14 Block Trades</div>
          <p className="text-xs text-emerald-400 mt-2">Stealth Routing Enabled</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
        <h3 className="text-base font-bold text-slate-100 mb-4">Recent Institutional Block Executions</h3>
        <div className="space-y-3 font-mono text-xs">
          {[
            { id: 'BLK-9901', symbol: 'NVDA', size: '250,000 shares', venue: 'Sigma-X Dark Pool', status: 'COMPLETED', time: '14:15:22' },
            { id: 'BLK-9902', symbol: 'ES', size: '1,500 contracts', venue: 'CME Globex Stealth', status: 'COMPLETED', time: '13:50:10' },
            { id: 'BLK-9903', symbol: 'BTC', size: '150 tokens', venue: 'Institutional OTC Prime', status: 'ROUTING', time: '14:28:00' },
          ].map((b, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-bold text-cyan-400">{b.id}</span>
                <span className="text-slate-100 font-bold">{b.symbol}</span>
                <span className="text-slate-400">{b.size}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400">{b.venue}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${b.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {b.status}
                </span>
                <span className="text-slate-500">{b.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

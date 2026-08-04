import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  BarChart3, 
  PieChart as PieIcon,
  Layers,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const navData = [
  { time: '09:30', nav: 4720, sp500: 4500 },
  { time: '10:30', nav: 4755, sp500: 4515 },
  { time: '11:30', nav: 4780, sp500: 4505 },
  { time: '12:30', nav: 4765, sp500: 4520 },
  { time: '13:30', nav: 4810, sp500: 4535 },
  { time: '14:30', nav: 4835, sp500: 4530 },
  { time: '15:30', nav: 4850, sp500: 4550 },
];

const allocationData = [
  { name: 'Futures & Derivatives', value: 35, color: '#06b6d4' },
  { name: 'Quantum Equities', value: 30, color: '#3b82f6' },
  { name: 'Dark Pool Alpha', value: 20, color: '#8b5cf6' },
  { name: 'Fixed Income & Bonds', value: 10, color: '#10b981' },
  { name: 'Commodities & FX', value: 5, color: '#f59e0b' },
];

export default function ExecutiveDashboard({ user, positions, instruments, onQuickTrade }) {
  const [timeframe, setTimeframe] = useState('1D');

  const totalUnrealizedPnl = positions.reduce((acc, p) => acc + p.pnl, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Sovereign Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-cyan-950/40 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
              <Sparkles className="w-3.5 h-3.5" /> BlackRock x J.P. Morgan Sovereign Portfolio
            </div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Welcome back, Neah Hale</h2>
            <p className="text-xs text-slate-400 mt-1">Tier-0 Sovereign Client ID: {user.clientId} // NY4 Ultra-Low Latency Routing Active</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
              <div className="text-[10px] uppercase font-semibold text-slate-400">Total Portfolio NAV</div>
              <div className="text-lg font-bold font-mono text-cyan-400">
                ${(user.aum + totalUnrealizedPnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Daily Alpha</span>
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{user.dailyAlpha}</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> Outperforming S&P by +2.14%
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sharpe Ratio</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{user.sharpeRatio}</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
            Institutional Risk-Adjusted Return
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Unrealized P&L</span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className={`text-2xl font-bold font-mono ${totalUnrealizedPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalUnrealizedPnl >= 0 ? '+' : ''}${totalUnrealizedPnl.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> Live Mark-to-Market
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Value at Risk (99%)</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{user.var99}</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
            Monte Carlo 24h Horizon
          </div>
        </div>
      </div>

      {/* Charts Section: NAV Performance vs Benchmark & Asset Allocation Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NAV Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-100">Portfolio NAV vs S&P 500 Benchmark</h3>
              <p className="text-xs text-slate-400">Real-time valuation curve (Millions USD)</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {['1D', '1W', '1M', '1Y', 'YTD', 'MAX'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    timeframe === tf ? 'bg-cyan-500 text-black font-bold shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={navData}>
                <defs>
                  <linearGradient id="navColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="nav" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#navColor)" name="APEX NAV ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Allocation Donut */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 mb-1">Asset Allocation</h3>
            <p className="text-xs text-slate-400 mb-4">Sovereign tier distribution model</p>
            
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-800/80">
            {allocationData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-300 truncate max-w-[140px]">{item.name}</span>
                </div>
                <span className="font-mono font-semibold text-slate-100">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Market Tickers & Positions Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Market Tickers */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100">Live Institutional Instrument Tickers</h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Streaming
            </span>
          </div>

          <div className="space-y-3">
            {instruments.map((inst, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-slate-100 text-sm">{inst.symbol}</span>
                    <span className="text-xs text-slate-400">{inst.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Vol: {inst.volume}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-100 text-sm">${inst.price.toLocaleString()}</div>
                  <div className={`text-xs font-mono font-semibold ${inst.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {inst.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Positions P&L */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100">Sovereign Core Positions</h3>
            <span className="text-xs text-cyan-400 font-medium">Mark-to-Market</span>
          </div>

          <div className="space-y-3">
            {positions.slice(0, 5).map((pos) => (
              <div key={pos.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-slate-100 text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400">{pos.symbol}</span>
                    <span className="text-xs text-slate-300 font-medium">{pos.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Qty: {pos.quantity.toLocaleString()} @ ${pos.avgCost.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className={`font-mono font-bold text-xs ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{pos.change24h}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

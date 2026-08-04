import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  TrendingUp, TrendingDown, DollarSign, Activity, ShieldCheck, ArrowUpRight, ArrowDownRight, 
  Zap, BarChart3, PieChart as PieIcon, Layers, Sparkles, Plus, Search, Filter, Edit3, 
  Trash2, ArrowUpDown, X, CheckCircle2, CandlestickChart, Cpu, Box, ShieldAlert, FileCheck, 
  Settings, Lock, Unlock, Terminal, Send, RefreshCw, Key, Globe, Radio, Database, Server
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, ComposedChart } from 'recharts';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('7777');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [timeStr, setTimeStr] = useState('');

  // Live System State
  const [state, setState] = useState({
    user: {
      name: "Neah Hale",
      title: "Sovereign Client // BlackRock x J.P. Morgan Exclusive Partnership",
      clientId: "BR-JPM-777-NH",
      tier: "Tier-0 Sovereign Institutional",
      aum: 4850290120.45,
      dailyAlpha: "+3.84%",
      sharpeRatio: "3.42",
      var99: "$42,150,000",
      avatarLetter: "N",
      unlockedSeed: false
    },
    positions: [
      { id: "pos-1", symbol: "ES", name: "S&P 500 E-mini Futures", assetClass: "Futures", quantity: 450, avgCost: 5820.00, currentPrice: 5884.50, pnl: 2902500, change24h: "+1.12%" },
      { id: "pos-2", symbol: "NQ", name: "Nasdaq 100 Futures", assetClass: "Futures", quantity: 220, avgCost: 20100.00, currentPrice: 20340.00, pnl: 5280000, change24h: "+1.45%" },
      { id: "pos-3", symbol: "NVDA", name: "NVIDIA Corp Quantum Tier", assetClass: "Equities", quantity: 2500000, avgCost: 112.40, currentPrice: 138.90, pnl: 66250000, change24h: "+3.20%" },
      { id: "pos-4", symbol: "GC", name: "Gold Futures", assetClass: "Commodities", quantity: 800, avgCost: 2650.00, currentPrice: 2715.00, pnl: 5200000, change24h: "+0.68%" },
      { id: "pos-5", symbol: "ZB", name: "US 30-Year Treasury Bond", assetClass: "Fixed Income", quantity: 1200, avgCost: 118.20, currentPrice: 119.50, pnl: 1560000, change24h: "+0.25%" },
      { id: "pos-6", symbol: "SPY", name: "SPDR S&P 500 ETF Trust", assetClass: "Equities", quantity: 150000, avgCost: 520.00, currentPrice: 585.00, pnl: 9750000, change24h: "+0.95%" },
      { id: "pos-7", symbol: "BRJPM-DP", name: "BlackRock x J.P. Morgan Dark Pool Fund I", assetClass: "Dark Pool", quantity: 1, avgCost: 1200000000.00, currentPrice: 1245000000.00, pnl: 45000000, change24h: "+0.85%" }
    ],
    instruments: [
      { symbol: "ES", name: "S&P 500 E-mini", price: 5884.50, change: "+1.12%", high: 5902.00, low: 5815.25, volume: "1,425,890" },
      { symbol: "NQ", name: "Nasdaq 100 E-mini", price: 20340.00, change: "+1.45%", high: 20450.00, low: 20050.00, volume: "980,420" },
      { symbol: "CL", name: "Crude Oil WTI", price: 76.85, change: "-0.45%", high: 77.90, low: 76.20, volume: "410,230" },
      { symbol: "GC", name: "Gold Futures", price: 2715.00, change: "+0.68%", high: 2724.50, low: 2698.00, volume: "315,900" },
      { symbol: "BTC", name: "Bitcoin Institutional Perpetual", price: 94250.00, change: "+2.85%", high: 95500.00, low: 91800.00, volume: "42,150" },
      { symbol: "ZB", name: "US 30Y Treasury Bond", price: 119.50, change: "+0.25%", high: 119.80, low: 118.90, volume: "210,400" }
    ],
    orders: [
      { id: "ord-101", symbol: "ES", type: "BUY", qty: 50, price: 5880.00, status: "FILLED", time: "14:22:05" },
      { id: "ord-102", symbol: "NQ", type: "SELL", qty: 20, price: 20350.00, status: "FILLED", time: "14:18:40" },
      { id: "ord-103", symbol: "BTC", type: "BUY", qty: 5, price: 93800.00, status: "WORKING", time: "14:10:12" }
    ],
    quantModels: [
      { id: "qm-1", name: "Stat-Arb Alpha Matrix v4", status: "ACTIVE", signal: "LONG S&P / SHORT NASDAQ", confidence: "94.2%", pnl: "+$14.2M" },
      { id: "qm-2", name: "High-Frequency Order Flow Imbalance", status: "ACTIVE", signal: "ACCUMULATE TECH", confidence: "91.8%", pnl: "+$22.5M" },
      { id: "qm-3", name: "Cross-Asset Volatility Arbitrage", status: "ACTIVE", signal: "NEUTRAL HEDGE", confidence: "88.4%", pnl: "+$8.1M" }
    ],
    settings: {
      seedPassword: "NEAH-BR-JPM-2026",
      executionRouting: "Direct Dark Pool / Ultra-Low Latency Chicago NY4",
      riskLimitMode: "Sovereign Uncapped",
      biometricLock: true
    }
  });

  // Live UTC Clock & Dynamic Simulation Ticks
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
    }, 1000);

    // Live tick engine
    const tickInterval = setInterval(() => {
      setState(prev => ({
        ...prev,
        instruments: prev.instruments.map(inst => {
          const delta = (Math.random() - 0.49) * 0.003;
          const newPrice = Number((inst.price * (1 + delta)).toFixed(2));
          return {
            ...inst,
            price: newPrice,
            high: Math.max(inst.high, newPrice),
            low: Math.min(inst.low, newPrice),
            change: (delta >= 0 ? "+" : "") + (delta * 100).toFixed(2) + "%"
          };
        })
      }));
    }, 2500);

    return () => {
      clearInterval(timer);
      clearInterval(tickInterval);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setIsAuthenticated(true);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070c] text-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-950 to-[#05070c] pointer-events-none"></div>
        <div className="relative w-full max-w-md p-8 mx-4 rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl glow-cyan bg-[#0f172a]/80 backdrop-blur-xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="relative flex items-center justify-center w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 glow-cyan">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-blue-400">N</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#090b10] animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#090b10]"></div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> BlackRock x J.P. Morgan Sovereign Secure Gateway
            </div>
            <h1 className="text-2xl font-bold tracking-wider text-slate-100">APEX PRIME X</h1>
            <p className="text-xs text-slate-400 mt-1">Client: Neah Hale // Tier-0 Institutional Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Secure Institutional ID</label>
              <input
                type="text"
                disabled
                value="BR-JPM-777-NH (Neah Hale)"
                className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-300 font-mono cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Biometric / Hardware Token PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit Sovereign PIN (7777)"
                maxLength={8}
                className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-xl text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 shadow-lg glow-cyan transition-all flex items-center justify-center gap-2"
            >
              {authLoading ? 'Authenticating Sovereign Node...' : <><Lock className="w-4 h-4" /> Unlock Institutional Terminal</>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800/80 bg-[#090b10]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/40 glow-cyan relative">
            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300">N</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#090b10] animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wider text-slate-100">{state.user.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">SOVEREIGN TIER-0</span>
            </div>
            <p className="text-[11px] text-slate-400">BlackRock x J.P. Morgan Exclusive Partnership</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 px-4 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300">NY4 FEED: ACTIVE</span>
          </div>
          <div className="text-slate-500">|</div>
          <div className="text-cyan-400 font-medium">{timeStr}</div>
          <div className="text-slate-500">|</div>
          <div className="flex items-center gap-1.5 text-emerald-400"><Globe className="w-3.5 h-3.5" /> 1.2ms</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-all"
          >
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>Settings & Seed</span>
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-500 to-indigo-600 p-[1px] shadow-md glow-cyan">
            <div className="w-full h-full bg-[#090b10] rounded-[11px] flex items-center justify-center relative overflow-hidden">
              <span className="font-extrabold text-sm text-cyan-300">N</span>
              <Sparkles className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-800/80 bg-[#07090f] flex flex-col h-[calc(100vh-4rem)] sticky top-16 z-20">
          <div className="p-4 mx-4 my-3 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">BlackRock x J.P. Morgan</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">Secret Sovereign Partnership Terminal v9.5</p>
          </div>

          <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Institutional Modules</div>
            {[
              { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
              { id: 'portfolio', label: 'Portfolio & Holdings (CRUD)', icon: Briefcase },
              { id: 'futures', label: 'Futures Execution (1m Chart)', icon: CandlestickChart },
              { id: 'cli', label: 'Institutional Terminal CLI', icon: Terminal },
              { id: 'quant', label: 'Quantum Quant Engines', icon: Cpu },
              { id: 'studio3d', label: '3D Microstructure & Risk', icon: Box },
              { id: 'darkpool', label: 'Dark Pool & Liquidity', icon: Layers },
              { id: 'risk', label: 'Risk Matrix & VaR', icon: ShieldAlert },
              { id: 'audit', label: 'Audit & Compliance', icon: FileCheck },
              { id: 'settings', label: 'Settings & Seed Editor', icon: Settings },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/30 glow-cyan'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </div>

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

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-[#090b10]">
          {activeTab === 'dashboard' && (
            <ExecutiveDashboardView state={state} />
          )}
          {activeTab === 'portfolio' && (
            <PortfolioView state={state} setState={setState} />
          )}
          {activeTab === 'futures' && (
            <FuturesTerminalView state={state} setState={setState} />
          )}
          {activeTab === 'cli' && (
            <TerminalCLIView state={state} setState={setState} />
          )}
          {activeTab === 'quant' && (
            <QuantEnginesView state={state} />
          )}
          {activeTab === 'studio3d' && (
            <Studio3DView />
          )}
          {activeTab === 'darkpool' && (
            <DarkPoolView state={state} />
          )}
          {activeTab === 'risk' && (
            <RiskMatrixView state={state} />
          )}
          {activeTab === 'audit' && (
            <AuditView />
          )}
          {activeTab === 'settings' && (
            <SettingsView state={state} setState={setState} />
          )}
        </main>
      </div>
    </div>
  );
}

// 1. Executive Dashboard
function ExecutiveDashboardView({ state }) {
  const [tf, setTf] = useState('1D');
  const totalPnl = state.positions.reduce((acc, p) => acc + p.pnl, 0);

  const navData = [
    { time: '09:30', nav: 4720, sp500: 4500 },
    { time: '10:30', nav: 4755, sp500: 4515 },
    { time: '11:30', nav: 4780, sp500: 4505 },
    { time: '12:30', nav: 4765, sp500: 4520 },
    { time: '13:30', nav: 4810, sp500: 4535 },
    { time: '14:30', nav: 4835, sp500: 4530 },
    { time: '15:30', nav: state.user.aum / 1000000, sp500: 4550 },
  ];

  const allocationData = [
    { name: 'Futures & Derivatives', value: 35, color: '#06b6d4' },
    { name: 'Quantum Equities', value: 30, color: '#3b82f6' },
    { name: 'Dark Pool Alpha', value: 20, color: '#8b5cf6' },
    { name: 'Fixed Income & Bonds', value: 10, color: '#10b981' },
    { name: 'Commodities & FX', value: 5, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-cyan-950/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
              <Sparkles className="w-3.5 h-3.5" /> BlackRock x J.P. Morgan Sovereign Portfolio
            </div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Welcome back, Neah Hale</h2>
            <p className="text-xs text-slate-400 mt-1">Tier-0 Sovereign Client ID: {state.user.clientId} // NY4 Ultra-Low Latency Routing Active</p>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
            <div className="text-[10px] uppercase font-semibold text-slate-400">Total Portfolio NAV</div>
            <div className="text-lg font-bold font-mono text-cyan-400">
              ${(state.user.aum + totalPnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Daily Alpha</div>
          <div className="text-2xl font-bold font-mono text-slate-100">{state.user.dailyAlpha}</div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5" /> Outperforming Benchmark</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Sharpe Ratio</div>
          <div className="text-2xl font-bold font-mono text-slate-100">{state.user.sharpeRatio}</div>
          <div className="text-xs text-slate-400 mt-2">Institutional Risk-Adjusted</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Unrealized P&L</div>
          <div className={`text-2xl font-bold font-mono ${totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5" /> Mark-to-Market Live</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Value at Risk (99%)</div>
          <div className="text-2xl font-bold font-mono text-slate-100">{state.user.var99}</div>
          <div className="text-xs text-slate-400 mt-2">Monte Carlo Horizon</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-100">Portfolio NAV vs S&P 500 Benchmark</h3>
              <p className="text-xs text-slate-400">Real-time valuation curve (Millions USD)</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {['1D', '1W', '1M', '1Y', 'YTD', 'MAX'].map(t => (
                <button
                  key={t}
                  onClick={() => setTf(t)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${tf === t ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={navData}>
                <defs>
                  <linearGradient id="navCol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="nav" stroke="#06b6d4" strokeWidth={2.5} fill="url(#navCol)" name="APEX NAV ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 mb-1">Asset Allocation</h3>
            <p className="text-xs text-slate-400 mb-4">Sovereign tier distribution model</p>
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                    {allocationData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2 mt-4 pt-4 border-t border-slate-800">
            {allocationData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-mono font-semibold text-slate-100">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-base font-bold text-slate-100 mb-4">Live Institutional Tickers</h3>
          <div className="space-y-3">
            {state.instruments.map((inst, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-slate-100">{inst.symbol}</span>
                    <span className="text-xs text-slate-400">{inst.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Vol: {inst.volume}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-100">${inst.price.toLocaleString()}</div>
                  <div className={`text-xs font-mono font-semibold ${inst.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{inst.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-base font-bold text-slate-100 mb-4">Sovereign Core Positions</h3>
          <div className="space-y-3">
            {state.positions.slice(0, 5).map((pos) => (
              <div key={pos.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400">{pos.symbol}</span>
                    <span className="text-xs text-slate-300">{pos.name}</span>
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

// 2. Portfolio CRUD Manager
function PortfolioView({ state, setState }) {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [isModal, setIsModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ symbol: '', name: '', assetClass: 'Futures', quantity: 100, avgCost: 1000, currentPrice: 1000, change24h: '+1.00%' });

  const filtered = state.positions.filter(p => {
    const mSearch = p.symbol.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    const mClass = selectedClass === 'ALL' || p.assetClass === selectedClass;
    return mSearch && mClass;
  });

  const handleSave = (e) => {
    e.preventDefault();
    const pnl = Math.round((Number(form.currentPrice) - Number(form.avgCost)) * Number(form.quantity) * (form.assetClass === 'Futures' ? 50 : 1));
    if (editItem) {
      setState(prev => ({
        ...prev,
        positions: prev.positions.map(p => p.id === editItem.id ? { ...form, id: p.id, quantity: Number(form.quantity), avgCost: Number(form.avgCost), currentPrice: Number(form.currentPrice), pnl } : p)
      }));
    } else {
      const newPos = { ...form, id: 'pos-' + Date.now(), quantity: Number(form.quantity), avgCost: Number(form.avgCost), currentPrice: Number(form.currentPrice), pnl };
      setState(prev => ({ ...prev, positions: [...prev.positions, newPos] }));
    }
    setIsModal(false);
  };

  const handleDelete = (id) => {
    setState(prev => ({ ...prev, positions: prev.positions.filter(p => p.id !== id) }));
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Portfolio & Holdings Management (Full CRUD)</h2>
          <p className="text-xs text-slate-400 mt-1">Institutional position builder, cost basis tracker, and rebalancing engine</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setForm({ symbol: '', name: '', assetClass: 'Futures', quantity: 100, avgCost: 1000, currentPrice: 1000, change24h: '+1.00%' }); setIsModal(true); }}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-all shadow-lg glow-cyan flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Position
        </button>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search symbol or asset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {['ALL', 'Futures', 'Equities', 'Commodities', 'Fixed Income', 'Dark Pool'].map(ac => (
            <button
              key={ac}
              onClick={() => setSelectedClass(ac)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${selectedClass === ac ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 glow-cyan' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
            >
              {ac}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Symbol / Asset</th>
                <th className="py-3.5 px-4">Asset Class</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Avg Cost</th>
                <th className="py-3.5 px-4">Current Price</th>
                <th className="py-3.5 px-4">Unrealized P&L</th>
                <th className="py-3.5 px-4">24h Change</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filtered.map(pos => (
                <tr key={pos.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100">{pos.symbol}</span>
                      <span className="text-slate-400 text-[11px] font-sans">{pos.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-400 font-sans">{pos.assetClass}</span></td>
                  <td className="py-3.5 px-4 text-slate-300">{pos.quantity.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-300">${pos.avgCost.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-100 font-bold">${pos.currentPrice.toLocaleString()}</td>
                  <td className={`py-3.5 px-4 font-bold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{pos.pnl >= 0 ? '+' : ''}${pos.pnl.toLocaleString()}</td>
                  <td className={`py-3.5 px-4 ${pos.change24h.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{pos.change24h}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditItem(pos); setForm(pos); setIsModal(true); }} className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(pos.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-2xl bg-[#0f172a]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100">{editItem ? 'Edit Sovereign Position' : 'Add New Position'}</h3>
              <button onClick={() => setIsModal(false)} className="text-slate-400 hover:text-slate-200"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Symbol</label>
                  <input type="text" required value={form.symbol} onChange={e => setForm({ ...form, symbol: e.target.value.toUpperCase() })} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Asset Class</label>
                  <select value={form.assetClass} onChange={e => setForm({ ...form, assetClass: e.target.value })} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100">
                    <option value="Futures">Futures</option>
                    <option value="Equities">Equities</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Fixed Income">Fixed Income</option>
                    <option value="Dark Pool">Dark Pool</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Asset Name</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Quantity</label>
                  <input type="number" required value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Avg Cost ($)</label>
                  <input type="number" step="any" required value={form.avgCost} onChange={e => setForm({ ...form, avgCost: e.target.value })} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Current Price ($)</label>
                  <input type="number" step="any" required value={form.currentPrice} onChange={e => setForm({ ...form, currentPrice: e.target.value })} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setIsModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-semibold shadow glow-cyan">Save Position</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. Futures Trading Terminal & 1-m Chart
function FuturesTerminalView({ state, setState }) {
  const [sym, setSym] = useState('ES');
  const [side, setSide] = useState('BUY');
  const [qty, setQty] = useState(10);
  const [price, setPrice] = useState(5884.50);
  const [success, setSuccess] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    const newOrd = { id: 'ord-' + Date.now(), symbol: sym, type: side, qty: Number(qty), price: Number(price), status: 'FILLED', time: new Date().toLocaleTimeString() };
    setState(prev => ({ ...prev, orders: [newOrd, ...prev.orders] }));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
            <CandlestickChart className="w-3.5 h-3.5" /> 1-Minute Executable Futures Engine
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Institutional Futures Execution</h2>
          <p className="text-xs text-slate-400 mt-1">Direct Chicago NY4 low-latency exchange access with custom 3D overlay candles</p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { symbol: 'ES', name: 'S&P 500 E-mini', price: 5884.50, change: '+1.12%' },
            { symbol: 'NQ', name: 'Nasdaq 100', price: 20340.00, change: '+1.45%' },
            { symbol: 'CL', name: 'Crude Oil', price: 76.85, change: '-0.45%' },
            { symbol: 'GC', name: 'Gold', price: 2715.00, change: '+0.68%' },
          ].map(s => (
            <button
              key={s.symbol}
              onClick={() => { setSym(s.symbol); setPrice(s.price); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${sym === s.symbol ? 'bg-cyan-500 text-black shadow glow-cyan' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
            >
              <span>{s.symbol}</span>
              <span className={`text-[10px] ${sym === s.symbol ? 'text-black font-semibold' : 'text-emerald-400'}`}>{s.change}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold font-mono text-cyan-400">{sym} / USD</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">1-Min Executable Candlestick</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> LIVE FEED
              </div>
            </div>

            <div className="h-80 w-full bg-[#05070c] rounded-xl border border-slate-800 p-4 relative flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>
              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div>High: ${(price * 1.002).toFixed(2)}</div>
                <div>Low: ${(price * 0.998).toFixed(2)}</div>
                <div>VWAP: ${price.toFixed(2)}</div>
              </div>

              <div className="relative z-10 flex items-end justify-between h-48 px-4 gap-4">
                {[
                  { time: '09:30', open: 5820, high: 5845, low: 5815, close: 5838 },
                  { time: '09:31', open: 5838, high: 5852, low: 5830, close: 5845 },
                  { time: '09:32', open: 5845, high: 5850, low: 5835, close: 5840 },
                  { time: '09:33', open: 5840, high: 5865, low: 5838, close: 5860 },
                  { time: '09:34', open: 5860, high: 5875, low: 5855, close: 5870 },
                  { time: '09:35', open: 5870, high: 5882, low: 5862, close: 5880 },
                  { time: '09:36', open: 5880, high: 5890, low: 5875, close: price },
                ].map((c, i) => {
                  const isGreen = c.close >= c.open;
                  const bodyHeight = Math.max(20, Math.abs(c.close - c.open) * 6);
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 h-full justify-center group relative">
                      <div className={`w-[2px] h-full absolute ${isGreen ? 'bg-emerald-500/60' : 'bg-red-500/60'}`}></div>
                      <div className={`w-full max-w-[28px] rounded-sm relative z-10 ${isGreen ? 'bg-emerald-500 glow-emerald' : 'bg-red-500'}`} style={{ height: `${bodyHeight}px` }}></div>
                      <span className="text-[10px] font-mono text-slate-500 mt-2">{c.time}</span>
                    </div>
                  );
                })}
              </div>
              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                <span>Volume Profile: 142.5K Contracts</span>
                <span className="text-cyan-400">3D Overlay: Enabled</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 mb-3">Live Order Book Depth</h3>
              <div className="space-y-1 font-mono text-xs">
                <div className="text-[10px] text-slate-500 grid grid-cols-3 pb-1 border-b border-slate-800">
                  <span>PRICE</span><span className="text-right">SIZE</span><span className="text-right">TOTAL</span>
                </div>
                {[{ price: 5886.00, size: 45, total: 145 }, { price: 5885.50, size: 30, total: 100 }, { price: 5885.00, size: 25, total: 70 }].map((ask, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-red-400 py-0.5">
                    <span>${ask.price}</span><span className="text-right">{ask.size}</span><span className="text-right text-slate-400">{ask.total}</span>
                  </div>
                ))}
                <div className="py-2 my-1 text-center font-bold text-cyan-400 bg-cyan-500/10 rounded border border-cyan-500/20">Spread: $0.25 // Last: ${price}</div>
                {[{ price: 5884.25, size: 35, total: 35 }, { price: 5884.00, size: 50, total: 85 }, { price: 5883.50, size: 65, total: 150 }].map((bid, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-emerald-400 py-0.5">
                    <span>${bid.price}</span><span className="text-right">{bid.size}</span><span className="text-right text-slate-400">{bid.total}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 mb-3">Time & Sales (Tape)</h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { time: '14:28:12', price: 5884.50, size: 25, type: 'BUY' },
                  { time: '14:28:10', price: 5884.25, size: 50, type: 'SELL' },
                  { time: '14:28:08', price: 5884.50, size: 100, type: 'BUY' },
                  { time: '14:28:05', price: 5884.50, size: 10, type: 'BUY' },
                ].map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">{t.time}</span>
                    <span className="font-bold text-slate-100">${t.price}</span>
                    <span className="text-slate-300">{t.size} contracts</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${t.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{t.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-100">Executable Order Ticket</h3>
              <span className="text-xs font-mono text-cyan-400">{sym} FUT</span>
            </div>

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4" /> Order successfully executed on exchange!
              </div>
            )}

            <form onSubmit={handleOrder} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                <button type="button" onClick={() => setSide('BUY')} className={`py-2 rounded-lg font-bold transition-all ${side === 'BUY' ? 'bg-emerald-500 text-black shadow glow-emerald' : 'text-slate-400'}`}>BUY / LONG</button>
                <button type="button" onClick={() => setSide('SELL')} className={`py-2 rounded-lg font-bold transition-all ${side === 'SELL' ? 'bg-red-500 text-white shadow' : 'text-slate-400'}`}>SELL / SHORT</button>
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Quantity (Contracts)</label>
                <input type="number" min="1" required value={qty} onChange={e => setQty(e.target.value)} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Execution Price ($)</label>
                <input type="number" step="0.25" required value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400"><span>Notional Value:</span><span className="text-slate-100">${(qty * price * 50).toLocaleString()}</span></div>
                <div className="flex justify-between text-slate-400"><span>Exchange Margin:</span><span className="text-cyan-400">${(qty * price * 50 * 0.08).toLocaleString()}</span></div>
              </div>
              <button type="submit" className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${side === 'BUY' ? 'bg-emerald-500 text-black hover:bg-emerald-400 glow-emerald' : 'bg-red-500 text-white hover:bg-red-400'}`}>
                <Zap className="w-4 h-4" /> Execute {side} {qty} {sym}
              </button>
            </form>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">Secured via BlackRock x J.P. Morgan NY4 Dark Route</div>
        </div>
      </div>
    </div>
  );
}

// 4. Institutional Terminal CLI
function TerminalCLIView({ state, setState }) {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { type: 'system', text: 'APEX PRIME X Sovereign Institutional Terminal v9.5 (NY4 Secure Feed)' },
    { type: 'system', text: 'Connected to BlackRock x J.P. Morgan Secure ECN Gateway. Client: Neah Hale (BR-JPM-777-NH)' },
    { type: 'success', text: 'Type "help" to display available institutional trading & quant commands.' }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  const handleCmd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input.trim();
    const newLogs = [...logs, { type: 'user', text: `$ ${cmd}` }];
    const parts = cmd.toLowerCase().split(' ');

    if (parts[0] === 'help') {
      newLogs.push({ type: 'system', text: 'Available Institutional Commands:\n  status - View sovereign node status\n  portfolio - List active positions\n  quant - Run Jane Street stat-arb matrix\n  buy <symbol> <qty> <price>\n  sell <symbol> <qty> <price>\n  clear - Clear screen' });
    } else if (parts[0] === 'status') {
      newLogs.push({ type: 'success', text: '[OK] NY4 Feed: 1.2ms | CME Globex: Connected | VaR 99%: $42.15M' });
    } else if (parts[0] === 'portfolio') {
      state.positions.forEach(p => newLogs.push({ type: 'system', text: `  [${p.symbol}] ${p.name} - Qty: ${p.quantity} - PnL: $${p.pnl.toLocaleString()}` }));
    } else if (parts[0] === 'quant') {
      newLogs.push({ type: 'success', text: '[QUANT] Running Stat-Arb Alpha Matrix v4... Cointegration Z-Score: -2.14. Signal: LONG S&P / SHORT NASDAQ. Confidence: 94.2%' });
    } else if (parts[0] === 'clear') {
      setLogs([]);
      setInput('');
      return;
    } else if (parts[0] === 'buy' || parts[0] === 'sell') {
      const sym = parts[1]?.toUpperCase();
      const q = Number(parts[2]);
      const pr = Number(parts[3]);
      if (!sym || !q || !pr) {
        newLogs.push({ type: 'error', text: `Syntax Error. Usage: ${parts[0]} <symbol> <qty> <price>` });
      } else {
        const newOrd = { id: 'ord-' + Date.now(), symbol: sym, type: parts[0].toUpperCase(), qty: q, price: pr, status: 'FILLED', time: new Date().toLocaleTimeString() };
        setState(prev => ({ ...prev, orders: [newOrd, ...prev.orders] }));
        newLogs.push({ type: 'success', text: `[ORDER EXECUTED] ${parts[0].toUpperCase()} ${q}x ${sym} @ $${pr} on NY4 exchange route.` });
      }
    } else {
      newLogs.push({ type: 'error', text: `Unknown command "${cmd}". Type "help" for valid commands.` });
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Terminal className="w-3.5 h-3.5" /> Institutional Command Line Terminal
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Live Execution Shell & Terminal</h2>
        <p className="text-xs text-slate-400 mt-1">Professional Jane Street & Bloomberg style terminal for direct command execution</p>
      </div>

      <div className="glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl h-[550px] flex flex-col bg-[#05070c]">
        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="ml-2 text-slate-300 font-bold">neah@apex-prime-x-ny4:~</span>
          </div>
          <span className="text-cyan-400">SECURE TIER-0</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs whitespace-pre-line">
          {logs.map((l, i) => (
            <div key={i} className={l.type === 'user' ? 'text-cyan-300 font-semibold' : l.type === 'success' ? 'text-emerald-400' : l.type === 'error' ? 'text-red-400' : 'text-slate-300'}>{l.text}</div>
          ))}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleCmd} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <span className="text-cyan-400 font-mono font-bold pl-2">$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a command (help, status, portfolio, quant, buy ES 10 5880)..."
            className="flex-1 bg-transparent border-none text-slate-100 font-mono text-xs focus:outline-none"
            autoFocus
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> Execute</button>
        </form>
      </div>
    </div>
  );
}

// 5. Quantum Quant Engines
function QuantEnginesView({ state }) {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Cpu className="w-3.5 h-3.5" /> Jane Street & Quant Firm Architecture
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Quantum & Statistical Arbitrage Engines</h2>
        <p className="text-xs text-slate-400 mt-1">Autonomous high-frequency pricing models, order flow imbalance detectors, and spread matrices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {state.quantModels.map(qm => (
          <div key={qm.id} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">{qm.status}</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">{qm.confidence} Confidence</span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">{qm.name}</h3>
              <p className="text-xs text-slate-400">Signal: <span className="text-cyan-300 font-mono">{qm.signal}</span></p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Model Generated P&L</span>
              <span className="text-sm font-bold font-mono text-emerald-400">{qm.pnl}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-100">Cross-Asset Statistical Arbitrage Spread Monitor</h3>
            <p className="text-xs text-slate-400">Real-time Z-score deviation and cointegration regression curves</p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">Z-Score: -2.14 (Mean Reverting)</span>
        </div>
        <div className="h-64 w-full bg-[#05070c] rounded-xl border border-slate-800 p-4 relative flex items-center justify-center">
          <div className="text-center z-10 space-y-2">
            <Activity className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
            <div className="text-sm font-mono font-bold text-slate-200">Stat-Arb Cointegration Spread Matrix Live</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Executing spread capture across Chicago CME and NY4 ECN venues. Expected reversion window: 4.2 minutes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. 3D Microstructure & Risk Studio
function Studio3DView() {
  const mountRef = useRef(null);
  const [mode, setMode] = useState('RISK_SPHERE');
  const [wire, setWire] = useState(false);
  const [speed, setSpeed] = useState(0.01);

  useEffect(() => {
    const cm = mountRef.current;
    if (!cm) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, cm.clientWidth / cm.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(cm.clientWidth, cm.clientHeight);
    cm.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const pl = new THREE.PointLight(0x06b6d4, 2, 50);
    pl.position.set(5, 5, 5);
    scene.add(pl);

    const geo = mode === 'RISK_SPHERE' ? new THREE.IcosahedronGeometry(2, 2) : new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const mat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, wireframe: wire, roughness: 0.2, metalness: 0.8, emissive: 0x0e7490, emissiveIntensity: 0.4 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let afId;
    const animate = () => {
      afId = requestAnimationFrame(animate);
      mesh.rotation.x += speed;
      mesh.rotation.y += speed * 1.5;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!cm) return;
      camera.aspect = cm.clientWidth / cm.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(cm.clientWidth, cm.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(afId);
      window.removeEventListener('resize', handleResize);
      if (cm && renderer.domElement) cm.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [mode, wire, speed]);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Box className="w-3.5 h-3.5" /> Three.js & Physics Modeling Engine
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">3D Market Microstructure & Risk Studio</h2>
        <p className="text-xs text-slate-400 mt-1">Interactive 3D order book depth cubes, risk topology spheres, and Monte Carlo particle simulations</p>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setMode('RISK_SPHERE')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'RISK_SPHERE' ? 'bg-cyan-500 text-black shadow glow-cyan' : 'bg-slate-900 text-slate-400'}`}>3D Risk Topology Sphere</button>
          <button onClick={() => setMode('DEPTH_CUBE')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'DEPTH_CUBE' ? 'bg-cyan-500 text-black shadow glow-cyan' : 'bg-slate-900 text-slate-400'}`}>3D Order Book Depth Cube</button>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input type="checkbox" checked={wire} onChange={e => setWire(e.target.checked)} className="rounded bg-slate-900 border-slate-700 text-cyan-500" /> Wireframe Mesh
          </label>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Speed:</span>
            <input type="range" min="0.002" max="0.03" step="0.002" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-24 accent-cyan-500" />
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative h-[500px]">
        <div ref={mountRef} className="w-full h-full cursor-grab"></div>
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 pointer-events-none space-y-1">
          <div className="text-cyan-400 font-bold">Interactive 3D Renderer Active</div>
          <div>Mode: {mode === 'RISK_SPHERE' ? 'Monte Carlo Risk Sphere' : 'Order Book Microstructure Cube'}</div>
          <div>Physics Engine: Enabled // 60 FPS WebGL</div>
        </div>
      </div>
    </div>
  );
}

// 7. Dark Pool & Liquidity
function DarkPoolView() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Layers className="w-3.5 h-3.5" /> Institutional Dark Pool & Block Execution
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Dark Pool Liquidity & Iceberg Routing</h2>
        <p className="text-xs text-slate-400 mt-1">Execute multi-million dollar institutional block orders with zero market impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Sigma-X / JPM Dark Venue</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-2">$1,245,000,000</div>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5" /> 99.4% Fill Rate Efficiency</p>
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

      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-base font-bold text-slate-100 mb-4">Recent Institutional Block Executions</h3>
        <div className="space-y-3 font-mono text-xs">
          {[
            { id: 'BLK-9901', symbol: 'NVDA', size: '250,000 shares', venue: 'Sigma-X Dark Pool', status: 'COMPLETED', time: '14:15:22' },
            { id: 'BLK-9902', symbol: 'ES', size: '1,500 contracts', venue: 'CME Globex Stealth', status: 'COMPLETED', time: '13:50:10' },
            { id: 'BLK-9903', symbol: 'BTC', size: '150 tokens', venue: 'Institutional OTC Prime', status: 'ROUTING', time: '14:28:00' },
          ].map((b, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-bold text-cyan-400">{b.id}</span>
                <span className="text-slate-100 font-bold">{b.symbol}</span>
                <span className="text-slate-400">{b.size}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400">{b.venue}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">{b.status}</span>
                <span className="text-slate-500">{b.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 8. Risk Matrix
function RiskMatrixView() {
  const scenarios = [
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

      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-base font-bold text-slate-100 mb-4">Black Swan & Stress Testing Scenarios</h3>
        <div className="space-y-3">
          {scenarios.map((sc, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 gap-4">
              <div>
                <div className="text-sm font-bold text-slate-100">{sc.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">Estimated Tail Probability: <span className="text-cyan-400 font-mono">{sc.probability}</span></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-red-400">{sc.impact}</div>
                  <div className="text-[10px] text-slate-500">Portfolio Impact</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">{sc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 9. Audit Compliance
function AuditView() {
  const logs = [
    { id: 'LOG-8821', action: 'SOVEREIGN_NODE_AUTH', user: 'Neah Hale (BR-JPM-777-NH)', ip: '199.167.22.10 (NY4)', status: 'VERIFIED', timestamp: '2026-08-04 14:00:05 UTC' },
    { id: 'LOG-8822', action: 'FUTURES_EXEC_ORDER_ES', user: 'Neah Hale (BR-JPM-777-NH)', ip: '199.167.22.10 (NY4)', status: 'ENCRYPTED', timestamp: '2026-08-04 14:22:05 UTC' },
    { id: 'LOG-8823', action: 'QUANT_ENGINE_REBALANCE', user: 'Stat-Arb Bot Alpha-4', ip: 'INTERNAL_BFT', status: 'VERIFIED', timestamp: '2026-08-04 14:10:12 UTC' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <FileCheck className="w-3.5 h-3.5" /> Regulatory Compliance & Immutable Ledger
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Institutional Audit Trail & Compliance</h2>
        <p className="text-xs text-slate-400 mt-1">Cryptographically signed immutable audit logs for BlackRock x J.P. Morgan compliance reporting</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-100">Live Secure Audit Log</h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> SHA-256 Immutable</span>
        </div>
        <div className="space-y-3 font-mono text-xs">
          {logs.map((l, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400">{l.id}</span>
                  <span className="text-slate-100 font-bold">{l.action}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">User: {l.user} | IP: {l.ip}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">{l.status}</span>
                <span className="text-slate-500 text-[11px]">{l.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 10. Settings & Hidden Seed Editor
function SettingsView({ state, setState }) {
  const [pwd, setPwd] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');

  const [aumInput, setAumInput] = useState('4850290120.45');
  const [symInput, setSymInput] = useState('ES');
  const [qtyInput, setQtyInput] = useState('450');
  const [priceInput, setPriceInput] = useState('5884.50');

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pwd === state.settings.seedPassword) {
      setUnlocked(true);
      setErr('');
    } else {
      setErr('Invalid Password (Hint: NEAH-BR-JPM-2026)');
    }
  };

  const handleSaveSeed = (e) => {
    e.preventDefault();
    setState(prev => ({
      ...prev,
      user: { ...prev.user, aum: Number(aumInput) },
      positions: [
        { id: 'pos-custom-1', symbol: symInput, name: 'Sovereign Custom Held Instrument', assetClass: 'Futures', quantity: Number(qtyInput), avgCost: Number(priceInput) * 0.98, currentPrice: Number(priceInput), pnl: 1250000, change24h: '+2.15%' },
        ...prev.positions
      ]
    }));
    setMsg('Sovereign Trading Seed updated successfully across all terminals and analytics!');
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Settings className="w-3.5 h-3.5" /> Institutional Preferences & Ledger Configuration
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">System Settings & Sovereign Seed Editor</h2>
        <p className="text-xs text-slate-400 mt-1">Configure execution routing, biometric security, and access the hidden password-protected trading seed override</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">Standard Terminal Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1.5">Execution Routing Venue</label>
            <input type="text" disabled value={state.settings.executionRouting} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono" />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1.5">Risk Limit Mode</label>
            <input type="text" disabled value={state.settings.riskLimitMode} className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono" />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden bg-[#0f172a]">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">Hidden Institutional Trading Seed & Ledger Editor</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">SOVEREIGN UNLOCK REQUIRED</span>
        </div>

        {!unlocked ? (
          <form onSubmit={handleUnlock} className="space-y-4 max-w-md pt-2">
            <p className="text-xs text-slate-400">Enter password to unlock direct ledger override and asset holding customization (<span className="text-cyan-400 font-mono">NEAH-BR-JPM-2026</span>):</p>
            <div className="flex gap-2">
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                className="flex-1 p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 flex items-center gap-2"><Unlock className="w-4 h-4" /> Unlock</button>
            </div>
            {err && <p className="text-xs text-red-400">{err}</p>}
          </form>
        ) : (
          <form onSubmit={handleSaveSeed} className="space-y-4 pt-2 text-xs">
            {msg && <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {msg}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Base Portfolio AUM ($)</label>
                <input type="text" value={aumInput} onChange={e => setAumInput(e.target.value)} className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Custom Holding Symbol</label>
                <input type="text" value={symInput} onChange={e => setSymInput(e.target.value.toUpperCase())} className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Holding Quantity</label>
                <input type="number" value={qtyInput} onChange={e => setQtyInput(e.target.value)} className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Holding Target Price ($)</label>
                <input type="number" step="any" value={priceInput} onChange={e => setPriceInput(e.target.value)} className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono" />
              </div>
            </div>
            <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs hover:from-cyan-400 shadow-lg glow-cyan flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Save & Broadcast Sovereign Seed Across Terminal
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

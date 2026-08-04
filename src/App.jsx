import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  LayoutDashboard, Briefcase, CandlestickChart, Terminal, Cpu, Box, Layers, 
  ShieldAlert, FileCheck, Settings, ShieldCheck as ShieldIcon, ArrowUpRight, 
  ArrowDownRight, Plus, Search, Edit3, Trash2, X, CheckCircle2, Lock, Unlock, 
  Send, RefreshCw, Key, Globe, Sparkles, Zap, Activity, DollarSign, BarChart3,
  Sliders, Maximize2, Minimize2, Eye, EyeOff, Radio, Server, Database, Shield,
  TrendingUp, TrendingDown, PieChart as PieIcon, Flame, Compass, GitCommit, GitBranch,
  SlidersHorizontal, Award, Cpu as CpuIcon, Network, HardDrive, TerminalSquare, AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, ComposedChart } from 'recharts';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('7777');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeStr, setTimeStr] = useState('');
  const [tickerSpeed, setTickerSpeed] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [latency, setLatency] = useState(1.18);

  // Hyper-Deep Institutional State (Jane Street x BlackRock x J.P. Morgan Quantitative Architecture)
  const [state, setState] = useState({
    user: {
      name: "Neah Hale",
      title: "Sovereign Tier-0 Institutional Client // BlackRock x J.P. Morgan Secret Partnership",
      clientId: "BR-JPM-777-NH",
      tier: "Sovereign Tier-0 Uncapped",
      aum: 4850290120.45,
      dailyAlpha: "+4.12%",
      sharpeRatio: "3.68",
      var99: "$38,450,000",
      avatarLetter: "N"
    },
    positions: [
      { id: "pos-1", symbol: "ES", name: "S&P 500 E-mini Futures (CME)", assetClass: "Futures", quantity: 550, avgCost: 5820.00, currentPrice: 5889.25, pnl: 3554375, change24h: "+1.25%", venue: "CME Globex NY4" },
      { id: "pos-2", symbol: "NQ", name: "Nasdaq 100 E-mini Futures (CME)", assetClass: "Futures", quantity: 280, avgCost: 20100.00, currentPrice: 20385.00, pnl: 7980000, change24h: "+1.62%", venue: "CME Globex NY4" },
      { id: "pos-3", symbol: "NVDA", name: "NVIDIA Corp Quantum Tier", assetClass: "Equities", quantity: 3000000, avgCost: 112.40, currentPrice: 139.40, pnl: 81000000, change24h: "+3.45%", venue: "Dark Pool Sigma-X" },
      { id: "pos-4", symbol: "GC", name: "Gold Futures COMEX", assetClass: "Commodities", quantity: 1000, avgCost: 2650.00, currentPrice: 2722.50, pnl: 7250000, change24h: "+0.82%", venue: "COMEX NY" },
      { id: "pos-5", symbol: "ZB", name: "US 30-Year Treasury Bond Futures", assetClass: "Fixed Income", quantity: 1500, avgCost: 118.20, currentPrice: 119.75, pnl: 2325000, change24h: "+0.31%", venue: "CBOT Chicago" },
      { id: "pos-6", symbol: "SPY", name: "SPDR S&P 500 ETF Trust", assetClass: "Equities", quantity: 200000, avgCost: 520.00, currentPrice: 586.50, pnl: 13300000, change24h: "+0.98%", venue: "NYSE Arca" },
      { id: "pos-7", symbol: "BRJPM-DP", name: "BlackRock x J.P. Morgan Sovereign Dark Pool Fund I", assetClass: "Dark Pool", quantity: 1, avgCost: 1200000000.00, currentPrice: 1258000000.00, pnl: 58000000, change24h: "+1.15%", venue: "JPM-BLK Cross" },
      { id: "pos-8", symbol: "BTC-PERP", name: "Bitcoin Institutional Perpetual Swap", assetClass: "Crypto Derivatives", quantity: 450, avgCost: 88500.00, currentPrice: 94850.00, pnl: 28575000, change24h: "+3.15%", venue: "CME Crypto / OTC" }
    ],
    instruments: [
      { symbol: "ES", name: "S&P 500 E-mini", price: 5889.25, change: "+1.25%", high: 5910.00, low: 5815.25, volume: "1,895,420", volatility: "14.2%" },
      { symbol: "NQ", name: "Nasdaq 100 E-mini", price: 20385.00, change: "+1.62%", high: 20480.00, low: 20050.00, volume: "1,245,890", volatility: "18.5%" },
      { symbol: "CL", name: "Crude Oil WTI", price: 77.15, change: "-0.25%", high: 78.40, low: 76.20, volume: "520,300", volatility: "24.1%" },
      { symbol: "GC", name: "Gold Futures", price: 2722.50, change: "+0.82%", high: 2735.00, low: 2698.00, volume: "410,150", volatility: "12.8%" },
      { symbol: "BTC", name: "Bitcoin Perpetual", price: 94850.00, change: "+3.15%", high: 96200.00, low: 91800.00, volume: "85,420", volatility: "42.5%" },
      { symbol: "ZB", name: "US 30Y Treasury", price: 119.75, change: "+0.31%", high: 119.95, low: 118.90, volume: "310,800", volatility: "8.4%" },
      { symbol: "EURUSD", name: "Euro / US Dollar FX", price: 1.0895, change: "+0.12%", high: 1.0920, low: 1.0865, volume: "2,450,000", volatility: "6.5%" }
    ],
    orders: [
      { id: "ord-101", symbol: "ES", type: "BUY", qty: 50, price: 5880.00, status: "FILLED", time: "14:22:05", venue: "CME NY4" },
      { id: "ord-102", symbol: "NQ", type: "SELL", qty: 20, price: 20350.00, status: "FILLED", time: "14:18:40", venue: "CME NY4" },
      { id: "ord-103", symbol: "BTC", type: "BUY", qty: 5, price: 93800.00, status: "WORKING", time: "14:10:12", venue: "CME Crypto" },
      { id: "ord-104", symbol: "NVDA", type: "BUY", qty: 50000, price: 135.20, status: "FILLED", time: "13:55:01", venue: "Sigma-X Dark" }
    ],
    quantModels: [
      { id: "qm-1", name: "Stat-Arb Alpha Matrix v4.8", status: "ACTIVE", signal: "LONG S&P / SHORT NASDAQ HEDGE", confidence: "96.4%", pnl: "+$18.5M", latency: "0.8ms" },
      { id: "qm-2", name: "High-Frequency Order Flow Imbalance", status: "ACTIVE", signal: "ACCUMULATE SEMIS & TECH", confidence: "93.1%", pnl: "+$28.2M", latency: "0.4ms" },
      { id: "qm-3", name: "Cross-Asset Volatility Arbitrage", status: "ACTIVE", signal: "NEUTRAL DELTA SKEW", confidence: "89.9%", pnl: "+$11.4M", latency: "1.2ms" },
      { id: "qm-4", name: "Dark Pool Iceberg Detector", status: "ACTIVE", signal: "ABSORBING BLOCK BUYS", confidence: "97.8%", pnl: "+$34.9M", latency: "0.5ms" }
    ],
    settings: {
      seedPassword: "NEAH-BR-JPM-2026",
      executionRouting: "Direct Dark Pool / Ultra-Low Latency Chicago NY4",
      riskLimitMode: "Sovereign Uncapped",
      biometricLock: true
    }
  });

  // Hyper-realistic continuous streaming tick engine
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
    }, 1000);

    const tickInterval = setInterval(() => {
      setState(prev => ({
        ...prev,
        instruments: prev.instruments.map(inst => {
          const delta = (Math.random() - 0.49) * 0.003 * tickerSpeed;
          const newPrice = Number((inst.price * (1 + delta)).toFixed(2));
          return {
            ...inst,
            price: newPrice,
            high: Math.max(inst.high, newPrice),
            low: Math.min(inst.low, newPrice),
            change: (delta >= 0 ? "+" : "") + (delta * 100).toFixed(2) + "%"
          };
        }),
        positions: prev.positions.map(pos => {
          const delta = (Math.random() - 0.49) * 0.0018;
          const newPrice = Number((pos.currentPrice * (1 + delta)).toFixed(2));
          const priceDiff = newPrice - pos.avgCost;
          const multiplier = pos.assetClass === 'Futures' ? 50 : pos.assetClass === 'Crypto Derivatives' ? 10 : 1;
          const newPnl = Math.round(priceDiff * pos.quantity * multiplier);
          return {
            ...pos,
            currentPrice: newPrice,
            pnl: newPnl
          };
        }),
        user: {
          ...prev.user,
          dailyAlpha: "+" + (3.84 + (Math.random() - 0.48) * 0.05).toFixed(2) + "%"
        }
      }));
      setLatency(Number((1.15 + (Math.random() - 0.5) * 0.15).toFixed(2)));
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(tickInterval);
    };
  }, [tickerSpeed]);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setIsAuthenticated(true);
    }, 700);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070c] text-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/50 via-slate-950 to-[#05070c] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="relative w-full max-w-lg p-10 mx-4 rounded-3xl glass-panel border border-cyan-500/50 shadow-2xl glow-cyan bg-[#0b0f19]/95 backdrop-blur-2xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="relative flex items-center justify-center w-28 h-28 mb-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-indigo-600/30 border border-cyan-500/60 glow-cyan shadow-2xl">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-blue-400">N</span>
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#090b10] animate-ping"></div>
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#090b10]"></div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/35">
              <ShieldIcon className="w-4 h-4" /> BlackRock x J.P. Morgan Sovereign Gateway
            </div>

            <h1 className="text-3xl font-black tracking-widest text-slate-100 font-mono">APEX PRIME X</h1>
            <p className="text-xs text-slate-400 mt-1.5">Sovereign Client: <span className="text-cyan-300 font-bold">Neah Hale</span> // Tier-0 Full Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Secure Institutional ID</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-cyan-400">
                  <Database className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  disabled
                  value="BR-JPM-777-NH (Neah Hale)"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs text-slate-300 font-mono cursor-not-allowed shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Biometric / Hardware Token PIN</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-cyan-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit Sovereign PIN (7777)"
                  maxLength={8}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-cyan-500/40 rounded-2xl text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400 shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-black hover:from-cyan-400 shadow-2xl glow-cyan transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Initializing Secure NY4 ECN Node...
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-black" /> Authenticate & Enter Terminal
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>NY4 / Chicago CME / LDN4 Direct ECN</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> SECURE ENCRYPTED
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Hyper-End Institutional Header */}
      <header className="h-16 border-b border-slate-800/80 bg-[#07090f]/95 backdrop-blur-2xl px-6 flex items-center justify-between sticky top-0 z-40 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 via-blue-600/30 to-indigo-600/30 border border-cyan-500/60 glow-cyan relative shadow-xl">
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300">N</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#090b10] animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-wider text-slate-100">{state.user.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  SOVEREIGN TIER-0
                </span>
              </div>
              <p className="text-[11px] text-slate-400">BlackRock x J.P. Morgan Exclusive Partnership</p>
            </div>
          </div>
        </div>

        {/* Live Network & Market Ticker Bar */}
        <div className="hidden lg:flex items-center gap-6 px-5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono shadow-inner">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300 font-bold">NY4 ECN: ACTIVE</span>
          </div>
          <div className="text-slate-700">|</div>
          <div className="text-cyan-400 font-bold">{timeStr}</div>
          <div className="text-slate-700">|</div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Radio className="w-3.5 h-3.5" /> {latency}ms
          </div>
          <div className="text-slate-700">|</div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Tick Speed:</span>
            <button onClick={() => setTickerSpeed(s => s === 1 ? 2 : s === 2 ? 5 : 1)} className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[11px] font-bold cursor-pointer">
              {tickerSpeed}x
            </button>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-md cursor-pointer"
          >
            <Settings className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Settings & Seed Editor</span>
          </button>

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg glow-cyan">
            <div className="w-full h-full bg-[#07090f] rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <span className="font-black text-base text-cyan-300 tracking-tighter">N</span>
              <Sparkles className="absolute top-1 right-1 w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Main App Layout */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-72 border-r border-slate-800/80 bg-[#05070c] flex flex-col h-[calc(100vh-4rem)] sticky top-16 z-30 shadow-2xl">
          <div className="p-4 mx-4 my-3 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900/90 to-blue-950/60 border border-cyan-500/40 shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">BlackRock x J.P. Morgan</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">Secret Sovereign Partnership Terminal v10.0</p>
          </div>

          <div className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Institutional Modules</div>
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
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/30 via-blue-600/20 to-transparent text-cyan-300 border border-cyan-500/50 glow-cyan shadow-xl'
                      : 'text-slate-400 hover:bg-slate-900/90 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`} />
                    <span className="tracking-wide">{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-4 bg-cyan-400 rounded-full glow-cyan"></div>}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-800/80 bg-slate-950/80">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
              <span>Sovereign Node</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 h-full w-[99%] animate-pulse"></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2.5 text-center font-bold">Exclusive Client: Neah Hale</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-[#05070c]">
          {activeTab === 'dashboard' && <ExecutiveDashboardView state={state} />}
          {activeTab === 'portfolio' && <PortfolioView state={state} setState={setState} />}
          {activeTab === 'futures' && <FuturesTerminalView state={state} setState={setState} />}
          {activeTab === 'cli' && <TerminalCLIView state={state} setState={setState} />}
          {activeTab === 'quant' && <QuantEnginesView state={state} />}
          {activeTab === 'studio3d' && <Studio3DView />}
          {activeTab === 'darkpool' && <DarkPoolView state={state} />}
          {activeTab === 'risk' && <RiskMatrixView state={state} />}
          {activeTab === 'audit' && <AuditView />}
          {activeTab === 'settings' && <SettingsView state={state} setState={setState} />}
        </main>
      </div>
    </div>
  );
}

// 1. Executive Dashboard View
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
    <div className="space-y-8 pb-12">
      <div className="relative overflow-hidden rounded-3xl glass-panel p-8 border border-cyan-500/40 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-cyan-950/60 shadow-2xl glow-cyan">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Sparkles className="w-3.5 h-3.5" /> BlackRock x J.P. Morgan Sovereign Portfolio
            </div>
            <h2 className="text-3xl font-black text-slate-100 tracking-wide">Welcome back, Neah Hale</h2>
            <p className="text-xs text-slate-400 mt-1.5">Tier-0 Sovereign Client ID: <span className="text-cyan-300 font-mono font-bold">{state.user.clientId}</span> // NY4 Ultra-Low Latency Routing Active</p>
          </div>
          <div className="px-6 py-4 rounded-2xl bg-slate-900/95 border border-cyan-500/40 text-right shadow-2xl glow-cyan">
            <div className="text-[11px] uppercase font-black tracking-wider text-slate-400">Total Portfolio NAV</div>
            <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
              ${(state.user.aum + totalPnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Daily Alpha', val: state.user.dailyAlpha, sub: 'Outperforming Benchmark', icon: TrendingUp, col: 'text-cyan-300', bg: 'bg-cyan-500/15' },
          { label: 'Sharpe Ratio', val: state.user.sharpeRatio, sub: 'Institutional Risk-Adjusted', icon: Shield, col: 'text-emerald-400', bg: 'bg-emerald-500/15' },
          { label: 'Unrealized P&L', val: (totalPnl >= 0 ? '+' : '') + '$' + totalPnl.toLocaleString(), sub: 'Mark-to-Market Live', icon: DollarSign, col: totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400', bg: 'bg-blue-500/15' },
          { label: 'Value at Risk (99%)', val: state.user.var99, sub: 'Monte Carlo 24h Horizon', icon: Activity, col: 'text-purple-400', bg: 'bg-purple-500/15' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all group shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">{kpi.label}</span>
                <span className={`p-3 rounded-2xl ${kpi.bg} ${kpi.col} group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <div className={`text-2xl font-black font-mono ${kpi.col}`}>{kpi.val}</div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3 font-semibold">
                {kpi.sub}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-7 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-100">Portfolio NAV vs S&P 500 Benchmark</h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">Real-time valuation curve (Millions USD)</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
              {['1D', '1W', '1M', '1Y', 'YTD', 'MAX'].map(t => (
                <button
                  key={t}
                  onClick={() => setTf(t)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${tf === t ? 'bg-cyan-500 text-black font-black shadow-md glow-cyan' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={navData}>
                <defs>
                  <linearGradient id="navCol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#1e293b', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} />
                <Area type="monotone" dataKey="nav" stroke="#06b6d4" strokeWidth={3} fill="url(#navCol)" name="APEX NAV ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-7 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-2xl">
          <div>
            <h3 className="text-lg font-extrabold text-slate-100 mb-1">Asset Allocation</h3>
            <p className="text-xs text-slate-400 mb-4 font-medium">Sovereign tier distribution model</p>
            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={6} dataKey="value">
                    {allocationData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#1e293b', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2.5 mt-4 pt-4 border-t border-slate-800">
            {allocationData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-300 font-semibold">{item.name}</span>
                </div>
                <span className="font-mono font-black text-slate-100">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-extrabold text-slate-100">Live Institutional Tickers</h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> Streaming ECN
            </span>
          </div>
          <div className="space-y-3.5">
            {state.instruments.map((inst, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-inner">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-extrabold font-mono text-slate-100 text-sm">{inst.symbol}</span>
                    <span className="text-xs text-slate-400 font-medium">{inst.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">Vol: {inst.volume} // Volatility: {inst.volatility}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black text-slate-100 text-sm">${inst.price.toLocaleString()}</div>
                  <div className={`text-xs font-mono font-black ${inst.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{inst.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-extrabold text-slate-100">Sovereign Core Positions</h3>
            <span className="text-xs text-cyan-400 font-bold">Mark-to-Market Real-Time</span>
          </div>
          <div className="space-y-3.5">
            {state.positions.slice(0, 5).map((pos) => (
              <div key={pos.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-extrabold font-mono text-xs px-2.5 py-1 rounded-xl bg-slate-800 text-cyan-300 border border-slate-700">{pos.symbol}</span>
                    <span className="text-xs text-slate-200 font-bold">{pos.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">Qty: {pos.quantity.toLocaleString()} @ ${pos.avgCost.toLocaleString()} ({pos.venue})</div>
                </div>
                <div className="text-right">
                  <div className={`font-mono font-black text-xs ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono font-bold">{pos.change24h}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Portfolio CRUD Manager View
function PortfolioView({ state, setState }) {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [isModal, setIsModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ symbol: '', name: '', assetClass: 'Futures', quantity: 100, avgCost: 1000, currentPrice: 1000, change24h: '+1.00%', venue: 'CME NY4' });

  const filtered = state.positions.filter(p => {
    const mSearch = p.symbol.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    const mClass = selectedClass === 'ALL' || p.assetClass === selectedClass;
    return mSearch && mClass;
  });

  const handleSave = (e) => {
    e.preventDefault();
    const multiplier = form.assetClass === 'Futures' ? 50 : form.assetClass === 'Crypto Derivatives' ? 10 : 1;
    const pnl = Math.round((Number(form.currentPrice) - Number(form.avgCost)) * Number(form.quantity) * multiplier);
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
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-100 tracking-wide">Portfolio & Holdings Management</h2>
          <p className="text-xs text-slate-400 mt-1">Institutional position builder, cost basis tracker, and full CRUD rebalancing engine</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setForm({ symbol: '', name: '', assetClass: 'Futures', quantity: 100, avgCost: 1000, currentPrice: 1000, change24h: '+1.00%', venue: 'CME NY4' }); setIsModal(true); }}
          className="px-6 py-3.5 rounded-2xl bg-cyan-500 text-black font-black text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all shadow-2xl glow-cyan flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Position
        </button>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="relative w-full sm:w-96">
          <Search className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search symbol or asset name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500 shadow-inner"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {['ALL', 'Futures', 'Equities', 'Commodities', 'Fixed Income', 'Dark Pool', 'Crypto Derivatives'].map(ac => (
            <button
              key={ac}
              onClick={() => setSelectedClass(ac)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${selectedClass === ac ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 glow-cyan shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'}`}
            >
              {ac}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Symbol / Asset</th>
                <th className="py-4 px-6">Asset Class</th>
                <th className="py-4 px-6">Execution Venue</th>
                <th className="py-4 px-6">Quantity</th>
                <th className="py-4 px-6">Avg Cost</th>
                <th className="py-4 px-6">Current Price</th>
                <th className="py-4 px-6">Unrealized P&L</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filtered.map(pos => (
                <tr key={pos.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-100">{pos.symbol}</span>
                      <span className="text-slate-400 text-xs font-sans font-semibold">{pos.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6"><span className="px-2.5 py-1 rounded-xl text-[10px] bg-slate-800 text-cyan-300 border border-slate-700 font-sans font-bold">{pos.assetClass}</span></td>
                  <td className="py-4 px-6 text-slate-400 font-semibold">{pos.venue}</td>
                  <td className="py-4 px-6 text-slate-200 font-bold">{pos.quantity.toLocaleString()}</td>
                  <td className="py-4 px-6 text-slate-300">${pos.avgCost.toLocaleString()}</td>
                  <td className="py-4 px-6 text-slate-100 font-black">${pos.currentPrice.toLocaleString()}</td>
                  <td className={`py-4 px-6 font-black ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{pos.pnl >= 0 ? '+' : ''}${pos.pnl.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button onClick={() => { setEditItem(pos); setForm(pos); setIsModal(true); }} className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-all cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(pos.id)} className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
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
          <div className="w-full max-w-lg glass-panel p-8 rounded-3xl border border-cyan-500/40 shadow-2xl bg-[#0b0f19]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-100">{editItem ? 'Edit Sovereign Position' : 'Add New Position'}</h3>
              <button onClick={() => setIsModal(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-5 font-sans text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1.5">Symbol</label>
                  <input type="text" required value={form.symbol} onChange={e => setForm({ ...form, symbol: e.target.value.toUpperCase() })} className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1.5">Asset Class</label>
                  <select value={form.assetClass} onChange={e => setForm({ ...form, assetClass: e.target.value })} className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-cyan-500">
                    <option value="Futures">Futures</option>
                    <option value="Equities">Equities</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Fixed Income">Fixed Income</option>
                    <option value="Dark Pool">Dark Pool</option>
                    <option value="Crypto Derivatives">Crypto Derivatives</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Asset Full Name</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1.5">Quantity</label>
                  <input type="number" required value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1.5">Avg Cost ($)</label>
                  <input type="number" step="any" required value={form.avgCost} onChange={e => setForm({ ...form, avgCost: e.target.value })} className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1.5">Current Price ($)</label>
                  <input type="number" step="any" required value={form.currentPrice} onChange={e => setForm({ ...form, currentPrice: e.target.value })} className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-5 border-t border-slate-800">
                <button type="button" onClick={() => setIsModal(false)} className="px-5 py-3 rounded-2xl bg-slate-800 text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-3 rounded-2xl bg-cyan-500 text-black font-bold shadow-lg glow-cyan cursor-pointer">Save Position</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. Futures Trading Terminal View
function FuturesTerminalView({ state, setState }) {
  const [sym, setSym] = useState('ES');
  const [side, setSide] = useState('BUY');
  const [qty, setQty] = useState(10);
  const [price, setPrice] = useState(5889.25);
  const [success, setSuccess] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    const newOrd = { id: 'ord-' + Date.now(), symbol: sym, type: side, qty: Number(qty), price: Number(price), status: 'FILLED', time: new Date().toLocaleTimeString(), venue: 'CME NY4' };
    setState(prev => ({ ...prev, orders: [newOrd, ...prev.orders] }));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <CandlestickChart className="w-3.5 h-3.5" /> 1-Minute Executable Futures Engine
          </div>
          <h2 className="text-3xl font-black text-slate-100 tracking-wide">Institutional Futures Execution</h2>
          <p className="text-xs text-slate-400 mt-1">Direct Chicago NY4 low-latency exchange access with custom 3D overlay candles</p>
        </div>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 md:pb-0">
          {[
            { symbol: 'ES', name: 'S&P 500 E-mini', price: 5889.25, change: '+1.25%' },
            { symbol: 'NQ', name: 'Nasdaq 100', price: 20385.00, change: '+1.62%' },
            { symbol: 'CL', name: 'Crude Oil', price: 77.15, change: '-0.25%' },
            { symbol: 'GC', name: 'Gold', price: 2722.50, change: '+0.82%' },
          ].map(s => (
            <button
              key={s.symbol}
              onClick={() => { setSym(s.symbol); setPrice(s.price); }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-2.5 cursor-pointer ${sym === s.symbol ? 'bg-cyan-500 text-black shadow-lg glow-cyan' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
            >
              <span>{s.symbol}</span>
              <span className={`text-[11px] ${sym === s.symbol ? 'text-black font-black' : 'text-emerald-400'}`}>{s.change}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold font-mono text-cyan-400">{sym} / USD</span>
                <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">1-Min Executable Candlestick</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> LIVE FEED
              </div>
            </div>

            <div className="h-80 w-full bg-[#030408] rounded-2xl border border-slate-800 p-5 relative flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>
              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono font-bold">
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
                  { time: '09:36', open: 5880, high: 5895, low: 5875, close: price },
                ].map((c, i) => {
                  const isGreen = c.close >= c.open;
                  const bodyHeight = Math.max(26, Math.abs(c.close - c.open) * 6);
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 h-full justify-center group relative">
                      <div className={`w-[2px] h-full absolute ${isGreen ? 'bg-emerald-500/70' : 'bg-red-500/70'}`}></div>
                      <div className={`w-full max-w-[32px] rounded-md relative z-10 shadow-xl ${isGreen ? 'bg-emerald-500 glow-emerald' : 'bg-red-500'}`} style={{ height: `${bodyHeight}px` }}></div>
                      <span className="text-[10px] font-mono text-slate-400 mt-2 font-bold">{c.time}</span>
                    </div>
                  );
                })}
              </div>
              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-800 font-bold">
                <span>Volume Profile: 189.4K Contracts</span>
                <span className="text-cyan-400 font-black">3D Microstructure Overlay: Active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-sm font-bold text-slate-100 mb-4">Live Order Book Depth</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="text-[10px] text-slate-500 grid grid-cols-3 pb-2 border-b border-slate-800 font-bold">
                  <span>PRICE</span><span className="text-right">SIZE</span><span className="text-right">TOTAL</span>
                </div>
                {[{ price: 5890.50, size: 55, total: 165 }, { price: 5889.75, size: 40, total: 110 }, { price: 5889.50, size: 35, total: 70 }].map((ask, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-red-400 py-1 font-bold">
                    <span>${ask.price}</span><span className="text-right">{ask.size}</span><span className="text-right text-slate-400">{ask.total}</span>
                  </div>
                ))}
                <div className="py-2.5 my-1.5 text-center font-black text-cyan-300 bg-cyan-500/15 rounded-xl border border-cyan-500/30">Spread: $0.25 // Last: ${price}</div>
                {[{ price: 5889.00, size: 45, total: 45 }, { price: 5888.50, size: 60, total: 105 }, { price: 5888.00, size: 85, total: 190 }].map((bid, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-emerald-400 py-1 font-bold">
                    <span>${bid.price}</span><span className="text-right">{bid.size}</span><span className="text-right text-slate-400">{bid.total}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-sm font-bold text-slate-100 mb-4">Time & Sales (Tape)</h3>
              <div className="space-y-2.5 font-mono text-xs">
                {[
                  { time: '14:28:12', price: 5889.25, size: 35, type: 'BUY' },
                  { time: '14:28:10', price: 5889.00, size: 60, type: 'SELL' },
                  { time: '14:28:08', price: 5889.25, size: 120, type: 'BUY' },
                  { time: '14:28:05', price: 5889.25, size: 15, type: 'BUY' },
                ].map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                    <span className="text-slate-400">{t.time}</span>
                    <span className="font-bold text-slate-100">${t.price}</span>
                    <span className="text-slate-300">{t.size} contracts</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold ${t.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>{t.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-7 rounded-3xl border border-cyan-500/40 shadow-2xl flex flex-col justify-between bg-[#0b0f19]">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-extrabold text-slate-100">Executable Order Ticket</h3>
              <span className="text-xs font-mono text-cyan-400 font-bold">{sym} FUT</span>
            </div>

            {success && (
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-pulse font-bold">
                <CheckCircle2 className="w-4 h-4" /> Order successfully executed on CME NY4!
              </div>
            )}

            <form onSubmit={handleOrder} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
                <button type="button" onClick={() => setSide('BUY')} className={`py-2.5 rounded-xl font-black transition-all cursor-pointer ${side === 'BUY' ? 'bg-emerald-500 text-black shadow-lg glow-emerald' : 'text-slate-400 hover:text-slate-200'}`}>BUY / LONG</button>
                <button type="button" onClick={() => setSide('SELL')} className={`py-2.5 rounded-xl font-black transition-all cursor-pointer ${side === 'SELL' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>SELL / SHORT</button>
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Quantity (Contracts)</label>
                <input type="number" min="1" required value={qty} onChange={e => setQty(e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Execution Price ($)</label>
                <input type="number" step="0.25" required value={price} onChange={e => setPrice(e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400"><span>Notional Value:</span><span className="text-slate-100 font-bold">${(qty * price * 50).toLocaleString()}</span></div>
                <div className="flex justify-between text-slate-400"><span>Exchange Margin:</span><span className="text-cyan-400 font-bold">${(qty * price * 50 * 0.08).toLocaleString()}</span></div>
              </div>
              <button type="submit" className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${side === 'BUY' ? 'bg-emerald-500 text-black hover:bg-emerald-400 glow-emerald' : 'bg-red-500 text-white hover:bg-red-400'}`}>
                <Zap className="w-4 h-4" /> Execute {side} {qty} {sym}
              </button>
            </form>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-bold">Secured via BlackRock x J.P. Morgan NY4 Dark Route</div>
        </div>
      </div>
    </div>
  );
}

// 4. Institutional Terminal CLI View
function TerminalCLIView({ state, setState }) {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { type: 'system', text: 'APEX PRIME X Sovereign Institutional Terminal v10.0 (NY4 Secure Feed)' },
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
      newLogs.push({ type: 'success', text: '[OK] NY4 Feed: 1.18ms | CME Globex: Connected | VaR 99%: $38.45M' });
    } else if (parts[0] === 'portfolio') {
      state.positions.forEach(p => newLogs.push({ type: 'system', text: `  [${p.symbol}] ${p.name} - Qty: ${p.quantity} - PnL: $${p.pnl.toLocaleString()}` }));
    } else if (parts[0] === 'quant') {
      newLogs.push({ type: 'success', text: '[QUANT] Running Stat-Arb Alpha Matrix v4.8... Cointegration Z-Score: -2.25. Signal: LONG S&P / SHORT NASDAQ. Confidence: 96.4%' });
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
        const newOrd = { id: 'ord-' + Date.now(), symbol: sym, type: parts[0].toUpperCase(), qty: q, price: pr, status: 'FILLED', time: new Date().toLocaleTimeString(), venue: 'CME NY4' };
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
    <div className="space-y-8 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          <Terminal className="w-3.5 h-3.5" /> Institutional Command Line Terminal
        </div>
        <h2 className="text-3xl font-black text-slate-100 tracking-wide">Live Execution Shell & Terminal</h2>
        <p className="text-xs text-slate-400 mt-1">Professional Jane Street & Bloomberg style terminal for direct command execution</p>
      </div>

      <div className="glass-panel rounded-3xl border border-cyan-500/50 overflow-hidden shadow-2xl h-[600px] flex flex-col bg-[#030408]">
        <div className="px-6 py-4 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow"></span>
            <span className="ml-3 text-slate-200 font-bold">neah@apex-prime-x-ny4:~</span>
          </div>
          <span className="text-cyan-400 font-bold">SECURE TIER-0 ECN</span>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-2.5 font-mono text-xs whitespace-pre-line leading-relaxed">
          {logs.map((l, i) => (
            <div key={i} className={l.type === 'user' ? 'text-cyan-300 font-bold' : l.type === 'success' ? 'text-emerald-400' : l.type === 'error' ? 'text-red-400' : 'text-slate-300'}>{l.text}</div>
          ))}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleCmd} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <span className="text-cyan-400 font-mono font-bold pl-3 text-sm">$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a command (help, status, portfolio, quant, buy ES 10 5880)..."
            className="flex-1 bg-transparent border-none text-slate-100 font-mono text-xs focus:outline-none placeholder-slate-600"
            autoFocus
          />
          <button type="submit" className="px-5 py-2.5 rounded-2xl bg-cyan-500 text-black font-black text-xs hover:bg-cyan-400 flex items-center gap-2 shadow-lg glow-cyan cursor-pointer"><Send className="w-3.5 h-3.5" /> Execute</button>
        </form>
      </div>
    </div>
  );
}

// 5. Quantum Quant Engines View
function QuantEnginesView({ state }) {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          <Cpu className="w-3.5 h-3.5" /> Jane Street & Quant Firm Architecture
        </div>
        <h2 className="text-3xl font-black text-slate-100 tracking-wide">Quantum & Statistical Arbitrage Engines</h2>
        <p className="text-xs text-slate-400 mt-1">Autonomous high-frequency pricing models, order flow imbalance detectors, and spread matrices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {state.quantModels.map(qm => (
          <div key={qm.id} className="glass-panel p-7 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-black font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">{qm.status}</span>
                <span className="text-xs font-mono text-emerald-400 font-black">{qm.confidence} Confidence // {qm.latency}</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-100 mb-1.5">{qm.name}</h3>
              <p className="text-xs text-slate-400">Signal: <span className="text-cyan-300 font-mono font-bold">{qm.signal}</span></p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold">Model Generated P&L</span>
              <span className="text-sm font-black font-mono text-emerald-400">{qm.pnl}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-100">Cross-Asset Statistical Arbitrage Spread Monitor</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Real-time Z-score deviation and cointegration regression curves</p>
          </div>
          <span className="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 font-bold shadow-inner">Z-Score: -2.25 (Mean Reverting)</span>
        </div>
        <div className="h-64 w-full bg-[#030408] rounded-2xl border border-slate-800 p-5 relative flex items-center justify-center shadow-inner">
          <div className="text-center z-10 space-y-3">
            <Activity className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
            <div className="text-sm font-mono font-bold text-slate-200">Stat-Arb Cointegration Spread Matrix Live</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Executing spread capture across Chicago CME and NY4 ECN venues. Expected reversion window: 3.8 minutes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. 3D Microstructure & Risk Studio View
function Studio3DView() {
  const mountRef = useRef(null);
  const [mode, setMode] = useState('RISK_SPHERE');
  const [wire, setWire] = useState(false);
  const [speed, setSpeed] = useState(0.012);

  useEffect(() => {
    const cm = mountRef.current;
    if (!cm) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, cm.clientWidth / cm.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(cm.clientWidth, cm.clientHeight);
    cm.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const pl = new THREE.PointLight(0x06b6d4, 3, 50);
    pl.position.set(5, 5, 5);
    scene.add(pl);

    const geo = mode === 'RISK_SPHERE' ? new THREE.IcosahedronGeometry(2, 3) : new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const mat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, wireframe: wire, roughness: 0.15, metalness: 0.85, emissive: 0x0e7490, emissiveIntensity: 0.5 });
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
    <div className="space-y-8 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          <Box className="w-3.5 h-3.5" /> Three.js & Physics Modeling Engine
        </div>
        <h2 className="text-3xl font-black text-slate-100 tracking-wide">3D Market Microstructure & Risk Studio</h2>
        <p className="text-xs text-slate-400 mt-1">Interactive 3D order book depth cubes, risk topology spheres, and Monte Carlo particle simulations</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setMode('RISK_SPHERE')} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${mode === 'RISK_SPHERE' ? 'bg-cyan-500 text-black shadow-lg glow-cyan' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>3D Risk Topology Sphere</button>
          <button onClick={() => setMode('DEPTH_CUBE')} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${mode === 'DEPTH_CUBE' ? 'bg-cyan-500 text-black shadow-lg glow-cyan' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>3D Order Book Depth Cube</button>
        </div>
        <div className="flex items-center gap-5 text-xs font-mono">
          <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer font-bold">
            <input type="checkbox" checked={wire} onChange={e => setWire(e.target.checked)} className="rounded bg-slate-900 border-slate-700 text-cyan-500 w-4 h-4" /> Wireframe Mesh
          </label>
          <div className="flex items-center gap-2 text-slate-400 font-bold">
            <span>Speed:</span>
            <input type="range" min="0.002" max="0.03" step="0.002" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-28 accent-cyan-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative h-[520px]">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing"></div>
        <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-400 pointer-events-none space-y-1.5 shadow-2xl">
          <div className="text-cyan-400 font-bold">Interactive 3D Renderer Active</div>
          <div>Mode: {mode === 'RISK_SPHERE' ? 'Monte Carlo Risk Sphere' : 'Order Book Microstructure Cube'}</div>
          <div>Physics Engine: Enabled // 60 FPS WebGL</div>
        </div>
      </div>
    </div>
  );
}

// 7. Dark Pool & Liquidity View
function DarkPoolView() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          <Layers className="w-3.5 h-3.5" /> Institutional Dark Pool & Block Execution
        </div>
        <h2 className="text-3xl font-black text-slate-100 tracking-wide">Dark Pool Liquidity & Iceberg Routing</h2>
        <p className="text-xs text-slate-400 mt-1">Execute multi-million dollar institutional block orders with zero market impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-xl">
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Sigma-X / JPM Dark Venue</div>
          <div className="text-2xl font-black font-mono text-cyan-400 mt-2">$1,258,000,000</div>
          <p className="text-xs text-emerald-400 mt-2.5 flex items-center gap-1 font-bold"><ArrowUpRight className="w-3.5 h-3.5" /> 99.6% Fill Rate Efficiency</p>
        </div>
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-xl">
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">BlackRock Aladdin Cross</div>
          <div className="text-2xl font-black font-mono text-slate-100 mt-2">$910,400,000</div>
          <p className="text-xs text-slate-400 mt-2.5 font-bold">Zero Market Impact Score</p>
        </div>
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-xl">
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Active Iceberg Orders</div>
          <div className="text-2xl font-black font-mono text-cyan-400 mt-2">16 Block Trades</div>
          <p className="text-xs text-emerald-400 mt-2.5 font-bold">Stealth Routing Enabled</p>
        </div>
      </div>

      <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-2xl">
        <h3 className="text-lg font-extrabold text-slate-100 mb-5">Recent Institutional Block Executions</h3>
        <div className="space-y-3.5 font-mono text-xs">
          {[
            { id: 'BLK-9901', symbol: 'NVDA', size: '300,000 shares', venue: 'Sigma-X Dark Pool', status: 'COMPLETED', time: '14:15:22' },
            { id: 'BLK-9902', symbol: 'ES', size: '2,000 contracts', venue: 'CME Globex Stealth', status: 'COMPLETED', time: '13:50:10' },
            { id: 'BLK-9903', symbol: 'BTC', size: '250 tokens', venue: 'Institutional OTC Prime', status: 'ROUTING', time: '14:28:00' },
          ].map((b, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
              <div className="flex items-center gap-4">
                <span className="font-bold text-cyan-400">{b.id}</span>
                <span className="text-slate-100 font-extrabold">{b.symbol}</span>
                <span className="text-slate-400 font-semibold">{b.size}</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-slate-400">{b.venue}</span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{b.status}</span>
                <span className="text-slate-500">{b.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 8. Risk Matrix View
function RiskMatrixView() {
  const scenarios = [
    { name: 'Black Swan Global Equity Crash (-20%)', impact: '-$968,400,000', probability: '0.12%', status: 'HEDGED' },
    { name: 'Interest Rate Shock (+150 bps Fed Hike)', impact: '-$342,100,000', probability: '1.45%', status: 'MONITORED' },
    { name: 'Geopolitical Energy Supply Disruption', impact: '-$210,500,000', probability: '0.85%', status: 'PROTECTED' },
    { name: 'Liquidity Squeeze in Treasury Futures', impact: '-$125,000,000', probability: '0.40%', status: 'SECURE' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          <ShieldAlert className="w-3.5 h-3.5" /> Institutional Risk & Stress Testing
        </div>
        <h2 className="text-3xl font-black text-slate-100 tracking-wide">Risk Matrix & Monte Carlo VaR Analytics</h2>
        <p className="text-xs text-slate-400 mt-1">Sovereign risk modeling, stress scenario simulation, and tail-risk hedging protocols</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-xl">
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Value at Risk (95% 1-Day)</div>
          <div className="text-2xl font-black font-mono text-cyan-400 mt-2">$16,850,000</div>
        </div>
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-xl">
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Value at Risk (99% 10-Day)</div>
          <div className="text-2xl font-black font-mono text-amber-400 mt-2">$38,450,000</div>
        </div>
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-xl">
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Expected Shortfall (CVaR)</div>
          <div className="text-2xl font-black font-mono text-red-400 mt-2">$62,100,000</div>
        </div>
      </div>

      <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-2xl">
        <h3 className="text-lg font-extrabold text-slate-100 mb-5">Black Swan & Stress Testing Scenarios</h3>
        <div className="space-y-4">
          {scenarios.map((sc, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-slate-900/90 border border-slate-800 gap-4 shadow-inner">
              <div>
                <div className="text-sm font-bold text-slate-100">{sc.name}</div>
                <div className="text-xs text-slate-400 mt-1">Estimated Tail Probability: <span className="text-cyan-400 font-mono font-bold">{sc.probability}</span></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-black font-mono text-red-400">{sc.impact}</div>
                  <div className="text-[10px] text-slate-500 font-bold">Portfolio Impact</div>
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-black font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">{sc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 9. Audit Compliance View
function AuditView() {
  const logs = [
    { id: 'LOG-8821', action: 'SOVEREIGN_NODE_AUTH', user: 'Neah Hale (BR-JPM-777-NH)', ip: '199.167.22.10 (NY4)', status: 'VERIFIED', timestamp: '2026-08-04 14:00:05 UTC' },
    { id: 'LOG-8822', action: 'FUTURES_EXEC_ORDER_ES', user: 'Neah Hale (BR-JPM-777-NH)', ip: '199.167.22.10 (NY4)', status: 'ENCRYPTED', timestamp: '2026-08-04 14:22:05 UTC' },
    { id: 'LOG-8823', action: 'QUANT_ENGINE_REBALANCE', user: 'Stat-Arb Bot Alpha-4', ip: 'INTERNAL_BFT', status: 'VERIFIED', timestamp: '2026-08-04 14:10:12 UTC' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          <FileCheck className="w-3.5 h-3.5" /> Regulatory Compliance & Immutable Ledger
        </div>
        <h2 className="text-3xl font-black text-slate-100 tracking-wide">Institutional Audit Trail & Compliance</h2>
        <p className="text-xs text-slate-400 mt-1">Cryptographically signed immutable audit logs for BlackRock x J.P. Morgan compliance reporting</p>
      </div>

      <div className="glass-panel p-7 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-extrabold text-slate-100">Live Secure Audit Log</h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold"><ShieldCheck className="w-4 h-4" /> SHA-256 Immutable</span>
        </div>
        <div className="space-y-3.5 font-mono text-xs">
          {logs.map((l, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-cyan-400">{l.id}</span>
                  <span className="text-slate-100 font-extrabold">{l.action}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">User: {l.user} | IP: {l.ip}</div>
              </div>
              <div className="flex items-center gap-5">
                <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{l.status}</span>
                <span className="text-slate-500 text-[11px]">{l.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 10. Settings & Hidden Seed Editor View
function SettingsView({ state, setState }) {
  const [pwd, setPwd] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');

  const [aumInput, setAumInput] = useState('4850290120.45');
  const [symInput, setSymInput] = useState('ES');
  const [qtyInput, setQtyInput] = useState('450');
  const [priceInput, setPriceInput] = useState('5889.25');

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
        { id: 'pos-custom-1', symbol: symInput, name: 'Sovereign Custom Held Instrument', assetClass: 'Futures', quantity: Number(qtyInput), avgCost: Number(priceInput) * 0.98, currentPrice: Number(priceInput), pnl: 1250000, change24h: '+2.15%', venue: 'CME NY4' },
        ...prev.positions
      ]
    }));
    setMsg('Sovereign Trading Seed updated successfully across all terminals and analytics!');
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          <Settings className="w-3.5 h-3.5" /> Institutional Preferences & Ledger Configuration
        </div>
        <h2 className="text-3xl font-black text-slate-100 tracking-wide">System Settings & Sovereign Seed Editor</h2>
        <p className="text-xs text-slate-400 mt-1">Configure execution routing, biometric security, and access the hidden password-protected trading seed override</p>
      </div>

      <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-lg font-extrabold text-slate-100 border-b border-slate-800 pb-3.5">Standard Terminal Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-2">Execution Routing Venue</label>
            <input type="text" disabled value={state.settings.executionRouting} className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 font-mono shadow-inner" />
          </div>
          <div>
            <label className="block text-slate-400 font-bold mb-2">Risk Limit Mode</label>
            <input type="text" disabled value={state.settings.riskLimitMode} className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 font-mono shadow-inner" />
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/50 shadow-2xl relative overflow-hidden bg-[#0b0f19]">
        <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-100">Hidden Institutional Trading Seed & Ledger Editor</h3>
          </div>
          <span className="px-3.5 py-1 rounded-full text-[10px] font-black font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">SOVEREIGN UNLOCK REQUIRED</span>
        </div>

        {!unlocked ? (
          <form onSubmit={handleUnlock} className="space-y-4 max-w-md pt-2">
            <p className="text-xs text-slate-400 leading-relaxed">Enter password to unlock direct ledger override and asset holding customization (<span className="text-cyan-400 font-mono font-bold">NEAH-BR-JPM-2026</span>):</p>
            <div className="flex gap-3">
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                className="flex-1 p-3.5 bg-slate-900 border border-cyan-500/50 rounded-2xl text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400 shadow-inner"
              />
              <button type="submit" className="px-6 py-3.5 rounded-2xl bg-cyan-500 text-black font-black text-xs hover:bg-cyan-400 flex items-center gap-2 shadow-lg glow-cyan cursor-pointer"><Unlock className="w-4 h-4" /> Unlock</button>
            </div>
            {err && <p className="text-xs text-red-400 font-bold">{err}</p>}
          </form>
        ) : (
          <form onSubmit={handleSaveSeed} className="space-y-5 pt-2 text-xs">
            {msg && <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-2.5 font-bold"><CheckCircle2 className="w-4 h-4" /> {msg}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-400 font-bold mb-1.5">Base Portfolio AUM ($)</label>
                <input type="text" value={aumInput} onChange={e => setAumInput(e.target.value)} className="w-full p-3.5 bg-slate-900 border border-cyan-500/50 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-400 shadow-inner" />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1.5">Custom Holding Symbol</label>
                <input type="text" value={symInput} onChange={e => setSymInput(e.target.value.toUpperCase())} className="w-full p-3.5 bg-slate-900 border border-cyan-500/50 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-400 shadow-inner" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-400 font-bold mb-1.5">Holding Quantity</label>
                <input type="number" value={qtyInput} onChange={e => setQtyInput(e.target.value)} className="w-full p-3.5 bg-slate-900 border border-cyan-500/50 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-400 shadow-inner" />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Holding Target Price ($)</label>
                <input type="number" step="any" value={priceInput} onChange={e => setPriceInput(e.target.value)} className="w-full p-3.5 bg-slate-900 border border-cyan-500/50 rounded-2xl text-slate-100 font-mono focus:outline-none focus:border-cyan-400 shadow-inner" />
              </div>
            </div>
            <button type="submit" className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-black font-black text-xs uppercase tracking-wider hover:from-cyan-400 shadow-2xl glow-cyan flex items-center gap-2.5 cursor-pointer">
              <CheckCircle2 className="w-4 h-4" /> Save & Broadcast Sovereign Seed Across Terminal
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

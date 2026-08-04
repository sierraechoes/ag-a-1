import React, { useState, useEffect } from 'react';
import { 
  CandlestickChart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  ShieldCheck, 
  Layers,
  CheckCircle2
} from 'lucide-react';

const mockCandles = [
  { time: '09:30', open: 5820, high: 5845, low: 5815, close: 5838, volume: '14,250' },
  { time: '09:31', open: 5838, high: 5852, low: 5830, close: 5845, volume: '18,400' },
  { time: '09:32', open: 5845, high: 5850, low: 5835, close: 5840, volume: '12,100' },
  { time: '09:33', open: 5840, high: 5865, low: 5838, close: 5860, volume: '22,900' },
  { time: '09:34', open: 5860, high: 5875, low: 5855, close: 5870, volume: '25,600' },
  { time: '09:35', open: 5870, high: 5882, low: 5862, close: 5880, volume: '19,800' },
  { time: '09:36', open: 5880, high: 5890, low: 5875, close: 5884.50, volume: '31,200' },
];

const orderBookAsks = [
  { price: 5886.00, size: 45, total: 145 },
  { price: 5885.50, size: 30, total: 100 },
  { price: 5885.00, size: 25, total: 70 },
  { price: 5884.75, size: 45, total: 45 },
];

const orderBookBids = [
  { price: 5884.25, size: 35, total: 35 },
  { price: 5884.00, size: 50, total: 85 },
  { price: 5883.50, size: 65, total: 150 },
  { price: 5883.00, size: 90, total: 240 },
];

export default function FuturesTradingTerminal({ onPlaceOrder }) {
  const [selectedSymbol, setSelectedSymbol] = useState('ES');
  const [orderType, setOrderType] = useState('LIMIT');
  const [side, setSide] = useState('BUY');
  const [quantity, setQuantity] = useState(10);
  const [price, setPrice] = useState(5884.50);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const symbols = [
    { symbol: 'ES', name: 'S&P 500 E-mini', price: 5884.50, change: '+1.12%' },
    { symbol: 'NQ', name: 'Nasdaq 100 E-mini', price: 20340.00, change: '+1.45%' },
    { symbol: 'CL', name: 'Crude Oil WTI', price: 76.85, change: '-0.45%' },
    { symbol: 'GC', name: 'Gold Futures', price: 2715.00, change: '+0.68%' },
    { symbol: 'ZB', name: 'US 30Y Treasury', price: 119.50, change: '+0.25%' },
  ];

  const handleExecute = (e) => {
    e.preventDefault();
    onPlaceOrder({
      symbol: selectedSymbol,
      type: side,
      qty: Number(quantity),
      price: Number(price),
      status: 'FILLED'
    });
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Symbol Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
            <CandlestickChart className="w-3.5 h-3.5" /> 1-Minute Executable Futures Engine
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Institutional Futures Execution</h2>
          <p className="text-xs text-slate-400 mt-1">Direct Chicago NY4 low-latency exchange access with custom 3D overlay candles</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {symbols.map((s) => (
            <button
              key={s.symbol}
              onClick={() => {
                setSelectedSymbol(s.symbol);
                setPrice(s.price);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                selectedSymbol === s.symbol
                  ? 'bg-cyan-500 text-black shadow-lg glow-cyan'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-cyan-500/30'
              }`}
            >
              <span>{s.symbol}</span>
              <span className={`text-[10px] ${s.change.startsWith('+') ? (selectedSymbol === s.symbol ? 'text-black font-semibold' : 'text-emerald-400') : 'text-red-400'}`}>
                {s.change}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 1-Min Executable Chart & Heatmap */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold font-mono text-cyan-400">{selectedSymbol} / USD</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  1-Min Executable Candlestick
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE FEED
              </div>
            </div>

            {/* Simulated 1-Min Custom Candlestick Visualizer */}
            <div className="h-80 w-full bg-[#05070c] rounded-xl border border-slate-800/80 p-4 relative overflow-hidden flex flex-col justify-between">
              {/* Background 3D grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>

              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div>High: ${(price * 1.002).toFixed(2)}</div>
                <div>Low: ${(price * 0.998).toFixed(2)}</div>
                <div>VWAP: ${price.toFixed(2)}</div>
              </div>

              {/* Custom Candlesticks representation */}
              <div className="relative z-10 flex items-end justify-between h-48 px-4 gap-4">
                {mockCandles.map((c, i) => {
                  const isGreen = c.close >= c.open;
                  const heightPct = Math.min(100, Math.max(30, ((c.high - c.low) / 20) * 100));
                  const bodyHeight = Math.max(20, Math.abs(c.close - c.open) * 8);
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 h-full justify-center group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-12 bg-slate-900 border border-cyan-500/40 px-2 py-1 rounded text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap pointer-events-none">
                        {c.time} | O:{c.open} C:{c.close} V:{c.volume}
                      </div>
                      {/* Wick */}
                      <div className={`w-[2px] h-full absolute ${isGreen ? 'bg-emerald-500/60' : 'bg-red-500/60'}`}></div>
                      {/* Body */}
                      <div 
                        className={`w-full max-w-[28px] rounded-sm relative z-10 shadow-lg ${isGreen ? 'bg-emerald-500 glow-emerald' : 'bg-red-500'}`}
                        style={{ height: `${bodyHeight}px` }}
                      ></div>
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

          {/* Market Depth Heatmap & Order Book */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Book Depth */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-sm font-bold text-slate-100 mb-3">Live Order Book Depth</h3>
              <div className="space-y-1 font-mono text-xs">
                <div className="text-[10px] text-slate-500 grid grid-cols-3 pb-1 border-b border-slate-800">
                  <span>PRICE</span>
                  <span className="text-right">SIZE</span>
                  <span className="text-right">TOTAL</span>
                </div>
                {orderBookAsks.map((ask, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-red-400 py-0.5 relative">
                    <div className="absolute inset-y-0 right-0 bg-red-500/10 pointer-events-none" style={{ width: `${(ask.total / 150) * 100}%` }}></div>
                    <span className="relative z-10">${ask.price}</span>
                    <span className="text-right relative z-10">{ask.size}</span>
                    <span className="text-right text-slate-400 relative z-10">{ask.total}</span>
                  </div>
                ))}
                <div className="py-2 my-1 text-center font-bold text-cyan-400 bg-cyan-500/10 rounded border border-cyan-500/20">
                  Spread: $0.25 // Last: ${price}
                </div>
                {orderBookBids.map((bid, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-emerald-400 py-0.5 relative">
                    <div className="absolute inset-y-0 right-0 bg-emerald-500/10 pointer-events-none" style={{ width: `${(bid.total / 240) * 100}%` }}></div>
                    <span className="relative z-10">${bid.price}</span>
                    <span className="text-right relative z-10">{bid.size}</span>
                    <span className="text-right text-slate-400 relative z-10">{bid.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time & Sales Feed */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-sm font-bold text-slate-100 mb-3">Time & Sales (Tape)</h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { time: '14:28:12', price: 5884.50, size: 25, type: 'BUY' },
                  { time: '14:28:10', price: 5884.25, size: 50, type: 'SELL' },
                  { time: '14:28:08', price: 5884.50, size: 100, type: 'BUY' },
                  { time: '14:28:05', price: 5884.50, size: 10, type: 'BUY' },
                  { time: '14:28:01', price: 5884.00, size: 75, type: 'SELL' },
                ].map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
                    <span className="text-slate-400">{t.time}</span>
                    <span className="font-bold text-slate-100">${t.price}</span>
                    <span className="text-slate-300">{t.size} contracts</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${t.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {t.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Order Ticket */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-100">Executable Order Ticket</h3>
              <span className="text-xs font-mono text-cyan-400">{selectedSymbol} FUT</span>
            </div>

            {orderSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4" /> Order successfully executed on exchange!
              </div>
            )}

            <form onSubmit={handleExecute} className="space-y-4 font-sans text-xs">
              {/* Buy / Sell Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setSide('BUY')}
                  className={`py-2 rounded-lg font-bold transition-all ${side === 'BUY' ? 'bg-emerald-500 text-black shadow glow-emerald' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  BUY / LONG
                </button>
                <button
                  type="button"
                  onClick={() => setSide('SELL')}
                  className={`py-2 rounded-lg font-bold transition-all ${side === 'SELL' ? 'bg-red-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  SELL / SHORT
                </button>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Order Type</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="LIMIT">Limit Order</option>
                  <option value="MARKET">Market Order</option>
                  <option value="STOP">Stop Loss</option>
                  <option value="ICEBERG">Iceberg Algorithmic</option>
                  <option value="TWAP">TWAP Execution</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Quantity (Contracts)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Execution Price ($)</label>
                <input
                  type="number"
                  step="0.25"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Notional Value:</span>
                  <span className="text-slate-100">${(quantity * price * 50).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Exchange Margin:</span>
                  <span className="text-cyan-400">${(quantity * price * 50 * 0.08).toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                  side === 'BUY'
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400 glow-emerald'
                    : 'bg-red-500 text-white hover:bg-red-400'
                }`}
              >
                <Zap className="w-4 h-4" /> Execute {side} {quantity} {selectedSymbol}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
            Secured via BlackRock x J.P. Morgan NY4 Dark Route
          </div>
        </div>
      </div>
    </div>
  );
}

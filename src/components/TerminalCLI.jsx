import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ShieldCheck, Play, RefreshCw, Zap, Cpu } from 'lucide-react';

export default function TerminalCLI({ positions, onPlaceOrder }) {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState([
    { type: 'system', text: 'APEX PRIME X Sovereign Institutional Terminal v9.4 (NY4 Secure Feed)' },
    { type: 'system', text: 'Connected to BlackRock x J.P. Morgan Secure ECN Gateway. Client: Neah Hale (BR-JPM-777-NH)' },
    { type: 'success', text: 'Type "help" to display available institutional trading & quant commands.' }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim();
    const newLogs = [...logs, { type: 'user', text: `$ ${cmd}` }];

    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];

    if (mainCmd === 'help') {
      newLogs.push({ type: 'system', text: 'Available Institutional Commands:' });
      newLogs.push({ type: 'system', text: '  status           - View live sovereign node status & network latency' });
      newLogs.push({ type: 'system', text: '  portfolio        - List active portfolio positions & unrealized P&L' });
      newLogs.push({ type: 'system', text: '  buy <symbol> <qty> <price> - Execute buy order (e.g. buy ES 10 5880)' });
      newLogs.push({ type: 'system', text: '  sell <symbol> <qty> <price> - Execute sell order (e.g. sell NQ 5 20300)' });
      newLogs.push({ type: 'system', text: '  quant            - Run Jane Street statistical arbitrage scan' });
      newLogs.push({ type: 'system', text: '  clear            - Clear terminal log buffer' });
    } else if (mainCmd === 'status') {
      newLogs.push({ type: 'success', text: '[OK] NY4 Feed: 1.2ms | CME Globex: Connected | Dark Pool Sigma-X: Active | VaR 99%: $42.15M' });
    } else if (mainCmd === 'portfolio') {
      newLogs.push({ type: 'system', text: `Active Positions Count: ${positions.length}` });
      positions.forEach(p => {
        newLogs.push({ type: 'system', text: `  [${p.symbol}] ${p.name} - Qty: ${p.quantity} - PnL: $${p.pnl.toLocaleString()}` });
      });
    } else if (mainCmd === 'quant') {
      newLogs.push({ type: 'success', text: '[QUANT] Running Stat-Arb Alpha Matrix v4... Cointegration Z-Score: -2.14. Signal: LONG S&P / SHORT NASDAQ. Confidence: 94.2%' });
    } else if (mainCmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else if (mainCmd === 'buy' || mainCmd === 'sell') {
      const symbol = parts[1]?.toUpperCase();
      const qty = Number(parts[2]);
      const price = Number(parts[3]);

      if (!symbol || !qty || !price) {
        newLogs.push({ type: 'error', text: `Syntax Error. Usage: ${mainCmd} <symbol> <qty> <price> (e.g. ${mainCmd} ES 10 5880)` });
      } else {
        onPlaceOrder({
          symbol,
          type: mainCmd.toUpperCase(),
          qty,
          price,
          status: 'FILLED'
        });
        newLogs.push({ type: 'success', text: `[ORDER EXECUTED] ${mainCmd.toUpperCase()} ${qty}x ${symbol} @ $${price} on NY4 exchange route.` });
      }
    } else {
      newLogs.push({ type: 'error', text: `Unknown command "${cmd}". Type "help" for valid commands.` });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Terminal className="w-3.5 h-3.5" /> Institutional Command Line Terminal
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Live Execution Shell & Terminal</h2>
        <p className="text-xs text-slate-400 mt-1">Professional Jane Street & Bloomberg style terminal for direct command execution and streaming packet inspection</p>
      </div>

      <div className="glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl h-[550px] flex flex-col bg-[#05070c]">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 text-slate-300 font-bold">neah@apex-prime-x-ny4:~</span>
          </div>
          <div className="flex items-center gap-3 text-cyan-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> SECURE TIER-0</span>
            <span>UTF-8</span>
          </div>
        </div>

        {/* Terminal Output Buffer */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs">
          {logs.map((log, idx) => (
            <div key={idx} className={`leading-relaxed ${
              log.type === 'user' ? 'text-cyan-300 font-semibold' :
              log.type === 'success' ? 'text-emerald-400' :
              log.type === 'error' ? 'text-red-400' :
              'text-slate-300'
            }`}>
              {log.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleCommand} className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-3">
          <span className="text-cyan-400 font-mono font-bold pl-2">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command (e.g., help, status, portfolio, buy ES 10 5880, quant)..."
            className="flex-1 bg-transparent border-none text-slate-100 font-mono text-xs focus:outline-none placeholder-slate-600"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-all shadow glow-cyan flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Execute
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Settings, Lock, Unlock, Terminal, CheckCircle2, Shield, Key } from 'lucide-react';

export default function SettingsModal({ settings, onUpdateSettings, onOverrideSeed }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Seed Editor state
  const [customAum, setCustomAum] = useState('4850290120.45');
  const [customSymbol, setCustomSymbol] = useState('ES');
  const [customQty, setCustomQty] = useState('450');
  const [customPrice, setCustomPrice] = useState('5884.50');

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passwordInput === settings.seedPassword) {
      setUnlocked(true);
      setError('');
    } else {
      setError('Invalid Institutional Seed Password (Hint: NEAH-BR-JPM-2026)');
    }
  };

  const handleSaveSeed = (e) => {
    e.preventDefault();
    onOverrideSeed({
      password: passwordInput,
      userUpdates: { aum: Number(customAum) },
      positions: [
        { id: 'pos-custom-1', symbol: customSymbol, name: 'Sovereign Custom Held Instrument', assetClass: 'Futures', quantity: Number(customQty), avgCost: Number(customPrice) * 0.98, currentPrice: Number(customPrice), pnl: 1250000, change24h: '+2.15%' }
      ]
    });
    setSuccessMsg('Sovereign Ledger & Trading Seed successfully updated and reflected across all systems!');
    setTimeout(() => setSuccessMsg(''), 4000);
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

      {/* Standard Settings */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
        <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">Standard Terminal Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1.5">Execution Routing Venue</label>
            <input
              type="text"
              disabled
              value={settings.executionRouting}
              className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1.5">Risk Limit Mode</label>
            <input
              type="text"
              disabled
              value={settings.riskLimitMode}
              className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Hidden Password-Protected Trading Seed Editor */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">Hidden Institutional Trading Seed & Ledger Editor</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
            SOVEREIGN UNLOCK REQUIRED
          </span>
        </div>

        {!unlocked ? (
          <form onSubmit={handleUnlock} className="space-y-4 max-w-md pt-2">
            <p className="text-xs text-slate-400">
              Enter password to unlock direct ledger override and asset holding customization (<span className="text-cyan-400 font-mono">NEAH-BR-JPM-2026</span>):
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="flex-1 p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-all shadow-lg glow-cyan flex items-center gap-2"
              >
                <Unlock className="w-4 h-4" /> Unlock
              </button>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
          </form>
        ) : (
          <form onSubmit={handleSaveSeed} className="space-y-4 pt-2 text-xs">
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {successMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Base Portfolio AUM ($)</label>
                <input
                  type="text"
                  value={customAum}
                  onChange={(e) => setCustomAum(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Custom Holding Symbol</label>
                <input
                  type="text"
                  value={customSymbol}
                  onChange={(e) => setCustomSymbol(e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Holding Quantity</label>
                <input
                  type="number"
                  value={customQty}
                  onChange={(e) => setCustomQty(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Holding Target Price ($)</label>
                <input
                  type="number"
                  step="any"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg glow-cyan flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Save & Broadcast Sovereign Seed Across Terminal
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

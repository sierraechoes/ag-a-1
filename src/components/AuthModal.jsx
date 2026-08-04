import React, { useState } from 'react';
import { Shield, Lock, Fingerprint, Terminal, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ onAuthenticate }) {
  const [pin, setPin] = useState('7777');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      onAuthenticate();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070c]/90 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950/80 to-[#05070c] pointer-events-none"></div>
      
      <div className="relative w-full max-w-md p-8 mx-4 rounded-2xl glass-panel border border-cyan-500/20 shadow-2xl glow-cyan">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative flex items-center justify-center w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 glow-cyan">
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">N</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#090b10] animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#090b10]"></div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Shield className="w-3.5 h-3.5" /> BlackRock x J.P. Morgan Sovereign Secure Gateway
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-slate-100">APEX PRIME X</h1>
          <p className="text-xs text-slate-400 mt-1">Client: Neah Hale // Tier-0 Institutional Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Secure Institutional ID</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Terminal className="w-4 h-4" />
              </span>
              <input
                type="text"
                disabled
                value="BR-JPM-777-NH (Neah Hale)"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm text-slate-300 font-mono cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Biometric / Hardware Token PIN</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit Sovereign PIN"
                maxLength={8}
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-xl text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 shadow-lg glow-cyan transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Authenticating Sovereign Node...
              </>
            ) : (
              <>
                <Fingerprint className="w-5 h-5 text-black" /> Unlock Institutional Terminal
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>NY4 NY4-LDN Direct Backbone</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" /> SECURE ENCRYPTED
          </span>
        </div>
      </div>
    </div>
  );
}

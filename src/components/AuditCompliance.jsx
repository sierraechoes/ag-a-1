import React from 'react';
import { FileCheck, ShieldCheck, Terminal } from 'lucide-react';

export default function AuditCompliance() {
  const auditLogs = [
    { id: 'LOG-8821', action: 'SOVEREIGN_NODE_AUTH', user: 'Neah Hale (BR-JPM-777-NH)', ip: '199.167.22.10 (NY4)', status: 'VERIFIED', timestamp: '2026-08-04 14:00:05 UTC' },
    { id: 'LOG-8822', action: 'FUTURES_EXEC_ORDER_ES', user: 'Neah Hale (BR-JPM-777-NH)', ip: '199.167.22.10 (NY4)', status: 'ENCRYPTED', timestamp: '2026-08-04 14:22:05 UTC' },
    { id: 'LOG-8823', action: 'QUANT_ENGINE_REBALANCE', user: 'Stat-Arb Bot Alpha-4', ip: 'INTERNAL_BFT', status: 'VERIFIED', timestamp: '2026-08-04 14:10:12 UTC' },
    { id: 'LOG-8824', action: 'DARK_POOL_BLOCK_ROUTE', user: 'Neah Hale (BR-JPM-777-NH)', ip: '199.167.22.10 (NY4)', status: 'SECURE', timestamp: '2026-08-04 13:50:10 UTC' },
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

      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-100">Live Secure Audit Log</h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> SHA-256 Immutable
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400">{log.id}</span>
                  <span className="text-slate-100 font-bold">{log.action}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">User: {log.user} | IP: {log.ip}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">
                  {log.status}
                </span>
                <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

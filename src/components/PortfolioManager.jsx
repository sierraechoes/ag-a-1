import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  ArrowUpDown, 
  Shield, 
  DollarSign, 
  TrendingUp, 
  X,
  CheckCircle2
} from 'lucide-react';

export default function PortfolioManager({ positions, onAddPosition, onUpdatePosition, onDeletePosition }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssetClass, setSelectedAssetClass] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPos, setEditingPos] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    assetClass: 'Futures',
    quantity: 100,
    avgCost: 1000,
    currentPrice: 1000,
    change24h: '+1.00%'
  });

  const assetClasses = ['ALL', 'Futures', 'Equities', 'Commodities', 'Fixed Income', 'Dark Pool'];

  const filteredPositions = positions.filter(p => {
    const matchesSearch = p.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedAssetClass === 'ALL' || p.assetClass === selectedAssetClass;
    return matchesSearch && matchesClass;
  });

  const handleOpenAdd = () => {
    setEditingPos(null);
    setFormData({ symbol: '', name: '', assetClass: 'Futures', quantity: 100, avgCost: 1000, currentPrice: 1000, change24h: '+1.00%' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pos) => {
    setEditingPos(pos);
    setFormData({ ...pos });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPos) {
      onUpdatePosition(editingPos.id, {
        ...formData,
        quantity: Number(formData.quantity),
        avgCost: Number(formData.avgCost),
        currentPrice: Number(formData.currentPrice),
        pnl: Math.round((Number(formData.currentPrice) - Number(formData.avgCost)) * Number(formData.quantity) * (formData.assetClass === 'Futures' ? 50 : 1))
      });
    } else {
      onAddPosition({
        ...formData,
        quantity: Number(formData.quantity),
        avgCost: Number(formData.avgCost),
        currentPrice: Number(formData.currentPrice),
        pnl: Math.round((Number(formData.currentPrice) - Number(formData.avgCost)) * Number(formData.quantity) * (formData.assetClass === 'Futures' ? 50 : 1))
      });
    }
    setIsModalOpen(false);
  };

  const totalValue = positions.reduce((acc, p) => acc + (p.currentPrice * p.quantity * (p.assetClass === 'Futures' ? 50 : 1)), 0);
  const totalPnl = positions.reduce((acc, p) => acc + p.pnl, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-wide">Portfolio & Asset Holdings (CRUD)</h2>
          <p className="text-xs text-slate-400 mt-1">Manage institutional sovereign positions, leverage, and cost basis</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-all shadow-lg glow-cyan flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Position
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Total Holdings Value</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Total Unrealized P&L</div>
          <div className={`text-xl font-bold font-mono mt-1 ${totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString()}
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Active Instruments Count</div>
          <div className="text-xl font-bold font-mono text-slate-100 mt-1">{positions.length} Positions</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search symbol or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {assetClasses.map((ac) => (
            <button
              key={ac}
              onClick={() => setSelectedAssetClass(ac)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedAssetClass === ac
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 glow-cyan'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {ac}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
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
              {filteredPositions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-500">
                    No positions match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPositions.map((pos) => (
                  <tr key={pos.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100">{pos.symbol}</span>
                        <span className="text-slate-400 text-[11px] font-sans truncate max-w-[180px]">{pos.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-400 border border-slate-700 font-sans">
                        {pos.assetClass}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{pos.quantity.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-slate-300">${pos.avgCost.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-slate-100 font-bold">${pos.currentPrice.toLocaleString()}</td>
                    <td className={`py-3.5 px-4 font-bold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toLocaleString()}
                    </td>
                    <td className={`py-3.5 px-4 ${pos.change24h.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {pos.change24h}
                    </td>
                    <td className="py-3.5 px-4 text-right font-sans">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(pos)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-all"
                          title="Edit Position"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeletePosition(pos.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                          title="Delete Position"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100">
                {editingPos ? 'Edit Sovereign Position' : 'Add New Sovereign Position'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Symbol</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ES, NVDA, BTC"
                    value={formData.symbol}
                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Asset Class</label>
                  <select
                    value={formData.assetClass}
                    onChange={(e) => setFormData({ ...formData, assetClass: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Futures">Futures</option>
                    <option value="Equities">Equities</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Fixed Income">Fixed Income</option>
                    <option value="Dark Pool">Dark Pool</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Asset Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S&P 500 E-mini Futures"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Avg Cost ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.avgCost}
                    onChange={(e) => setFormData({ ...formData, avgCost: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Current Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.currentPrice}
                    onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-all shadow-lg glow-cyan"
                >
                  {editingPos ? 'Save Changes' : 'Create Position'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

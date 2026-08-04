import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import PortfolioManager from './components/PortfolioManager';
import FuturesTradingTerminal from './components/FuturesTradingTerminal';
import TerminalCLI from './components/TerminalCLI';
import QuantEngines from './components/QuantEngines';
import Visuals3DStudio from './components/Visuals3DStudio';
import DarkPoolLiquidity from './components/DarkPoolLiquidity';
import RiskMatrix from './components/RiskMatrix';
import AuditCompliance from './components/AuditCompliance';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // App State from Backend
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
      avatarLetter: "N"
    },
    positions: [],
    instruments: [],
    orders: [],
    quantModels: [],
    settings: {
      seedPassword: "NEAH-BR-JPM-2026",
      executionRouting: "Direct Dark Pool / Ultra-Low Latency Chicago NY4",
      riskLimitMode: "Sovereign Uncapped",
      biometricLock: true
    }
  });

  // Fetch state on mount and poll every 3 seconds for live sync
  const fetchState = async () => {
    try {
      const res = await fetch('/api/state');
      const data = await res.json();
      setState(data);
      setLoading(false);
    } catch (e) {
      console.error('Failed to fetch state from backend:', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 3000);
    return () => clearInterval(interval);
  }, []);

  // CRUD Handlers for Positions
  const handleAddPosition = async (newPos) => {
    try {
      const res = await fetch('/api/positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPos)
      });
      const data = await res.json();
      setState(prev => ({ ...prev, positions: [...prev.positions, data] }));
    } catch (e) {
      console.error('Failed to add position:', e);
    }
  };

  const handleUpdatePosition = async (id, updatedPos) => {
    try {
      const res = await fetch(`/api/positions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPos)
      });
      const data = await res.json();
      setState(prev => ({
        ...prev,
        positions: prev.positions.map(p => p.id === id ? data : p)
      }));
    } catch (e) {
      console.error('Failed to update position:', e);
    }
  };

  const handleDeletePosition = async (id) => {
    try {
      await fetch(`/api/positions/${id}`, { method: 'DELETE' });
      setState(prev => ({
        ...prev,
        positions: prev.positions.filter(p => p.id !== id)
      }));
    } catch (e) {
      console.error('Failed to delete position:', e);
    }
  };

  const handlePlaceOrder = async (order) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      const data = await res.json();
      setState(prev => ({ ...prev, orders: [data, ...prev.orders] }));
    } catch (e) {
      console.error('Failed to place order:', e);
    }
  };

  const handleOverrideSeed = async (overrideData) => {
    try {
      const res = await fetch('/api/seed-override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(overrideData)
      });
      const data = await res.json();
      if (data.db) {
        setState(data.db);
      }
    } catch (e) {
      console.error('Failed to override seed:', e);
    }
  };

  if (!isAuthenticated) {
    return <AuthModal onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070c] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-cyan-400 tracking-wider">INITIALIZING APEX PRIME X SOVEREIGN TERMINAL...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <Header user={state.user} onOpenSettings={() => setActiveTab('settings')} />
      
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <ExecutiveDashboard 
              user={state.user} 
              positions={state.positions} 
              instruments={state.instruments} 
            />
          )}
          {activeTab === 'portfolio' && (
            <PortfolioManager 
              positions={state.positions}
              onAddPosition={handleAddPosition}
              onUpdatePosition={handleUpdatePosition}
              onDeletePosition={handleDeletePosition}
            />
          )}
          {activeTab === 'futures' && (
            <FuturesTradingTerminal onPlaceOrder={handlePlaceOrder} />
          )}
          {activeTab === 'cli' && (
            <TerminalCLI positions={state.positions} onPlaceOrder={handlePlaceOrder} />
          )}
          {activeTab === 'quant' && (
            <QuantEngines quantModels={state.quantModels} />
          )}
          {activeTab === 'studio3d' && (
            <Visuals3DStudio />
          )}
          {activeTab === 'darkpool' && (
            <DarkPoolLiquidity />
          )}
          {activeTab === 'risk' && (
            <RiskMatrix />
          )}
          {activeTab === 'audit' && (
            <AuditCompliance />
          )}
          {activeTab === 'settings' && (
            <SettingsModal 
              settings={state.settings} 
              onOverrideSeed={handleOverrideSeed} 
            />
          )}
        </main>
      </div>
    </div>
  );
}

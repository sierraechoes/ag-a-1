const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Default Seed Data
const defaultData = {
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
    biometricLock: true,
    quantEngineAutostart: true,
    theme: "obsidian-quantum"
  }
};

// Initialize Data File
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
  try {
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
  } catch (e) {
    return defaultData;
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let db = loadData();

// API Endpoints
app.get('/api/state', (req, res) => {
  res.json(db);
});

// Update User / Profile
app.put('/api/user', (req, res) => {
  db.user = { ...db.user, ...req.body };
  saveData(db);
  res.json(db.user);
});

// CRUD Positions
app.get('/api/positions', (req, res) => {
  res.json(db.positions);
});

app.post('/api/positions', (req, res) => {
  const newPos = { id: 'pos-' + Date.now(), ...req.body };
  db.positions.push(newPos);
  saveData(db);
  res.status(201).json(newPos);
});

app.put('/api/positions/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.positions.findIndex(p => p.id === id);
  if (idx !== -1) {
    db.positions[idx] = { ...db.positions[idx], ...req.body };
    saveData(db);
    res.json(db.positions[idx]);
  } else {
    res.status(404).json({ error: "Position not found" });
  }
});

app.delete('/api/positions/:id', (req, res) => {
  const { id } = req.params;
  db.positions = db.positions.filter(p => p.id !== id);
  saveData(db);
  res.json({ success: true, id });
});

// CRUD Instruments & Seed Editor Override
app.post('/api/seed-override', (req, res) => {
  const { password, positions, instruments, userUpdates } = req.body;
  if (password !== db.settings.seedPassword) {
    return res.status(401).json({ error: "Invalid Institutional Security Password" });
  }
  if (positions) db.positions = positions;
  if (instruments) db.instruments = instruments;
  if (userUpdates) db.user = { ...db.user, ...userUpdates };
  db.user.unlockedSeed = true;
  saveData(db);
  res.json({ success: true, message: "Institutional seed data updated and reflected successfully across all systems.", db });
});

// Orders execution
app.post('/api/orders', (req, res) => {
  const newOrder = { id: 'ord-' + Date.now(), time: new Date().toLocaleTimeString(), status: 'FILLED', ...req.body };
  db.orders.unshift(newOrder);
  saveData(db);
  res.status(201).json(newOrder);
});

// Settings update
app.put('/api/settings', (req, res) => {
  db.settings = { ...db.settings, ...req.body };
  saveData(db);
  res.json(db.settings);
});

// Live Tick Simulation background interval to keep data alive & dynamic
setInterval(() => {
  db.instruments = db.instruments.map(inst => {
    const deltaPct = (Math.random() - 0.49) * 0.002;
    const newPrice = Number((inst.price * (1 + deltaPct)).toFixed(2));
    return {
      ...inst,
      price: newPrice,
      high: Math.max(inst.high, newPrice),
      low: Math.min(inst.low, newPrice),
      change: (deltaPct >= 0 ? "+" : "") + (deltaPct * 100).toFixed(2) + "%"
    };
  });
  // Also slightly fluctuate position P&L
  db.positions = db.positions.map(pos => {
    const delta = (Math.random() - 0.49) * 0.0015;
    const newPrice = Number((pos.currentPrice * (1 + delta)).toFixed(2));
    const priceDiff = newPrice - pos.avgCost;
    const newPnl = Math.round(priceDiff * pos.quantity * (pos.assetClass === 'Futures' ? 50 : 1));
    return {
      ...pos,
      currentPrice: newPrice,
      pnl: newPnl
    };
  });
  saveData(db);
}, 3000);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`APEX PRIME X Institutional Backend running on port ${PORT}`);
});

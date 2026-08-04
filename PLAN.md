# APEX PRIME X — Institutional Quantum Terminal Architecture & Execution Plan

## Client Profile: Neah Hale
- **Entity**: BlackRock x J.P. Morgan Secret Partnership (Ultra High Net Worth, Exclusive Institutional Full Access)
- **Designation**: Tier-0 Sovereign Client
- **Monogram Visual**: Diamond-studded letter "N" with crystal facets and live glowing particle aura.

---

## System Architecture & Technology Stack

### 1. Frontend
- **Framework**: React 18 + Vite (SPA with lightning-fast HMR and optimized production build)
- **Styling**: Tailwind CSS + Custom CSS Variables for deep obsidian institutional dark mode & polished glassmorphism
- **Icons**: Lucide React
- **Charts (2D)**: Recharts (Line, Bar, Donut, Area charts with custom tooltips, live animation, and responsive design)
- **Visuals (3D)**: Three.js + Custom Canvas rendering for interactive 3D Market Depth Cubes, 3D Risk Spheres, Volatility Surfaces, and Order Flow Microstructure engines.
- **State Management**: React Context / Zustand / LocalStorage sync + REST/WebSocket API integration with optimistic updates.

### 2. Backend & Database
- **Runtime**: Node.js with Express
- **Database**: SQLite (via `better-sqlite3` or `sqlite3`) with persistent tables for:
  - `users` (Authentication & Profile)
  - `portfolio_positions` (Live asset holdings, quantities, avg cost, custom overrides)
  - `trading_instruments` (Equities, Futures, FX, Crypto, Rates, Commodities)
  - `futures_orders` (Active, filled, and cancelled futures execution orders)
  - `quant_models` (Jane Street-style statistical arbitrage & stat-arb metrics)
  - `settings` (System preferences, API keys, hidden password-protected trading seed editor state)
  - `audit_logs` (Institutional transaction logs and security audit trail)
- **Real-Time Simulation Engine**: Built-in tick generator WebSocket / Server-Sent Events (SSE) broadcasting sub-second price fluctuations across all instruments.

---

## Module Breakdown & Sidebar Wiring

1. **Executive Dashboard**: KPI summary cards, NAV vs Benchmark chart, asset allocation donut, recent institutional fills, and quick action bar.
2. **Portfolio & Holdings**: Full CRUD for positions, asset rebalancing, unrealized/realized P&L, and exposure breakdown.
3. **Futures Execution Terminal**: 1-minute executable chart with custom candles, technical indicators (MACD, RSI, EMA), order book depth, and quick trade ticket.
4. **Quantum Quant Engines**: Jane Street style algorithmic models (Statistical Arbitrage, Order Flow Imbalance, Latency Arbitrage, Cross-Asset Correlation Matrix).
5. **3D Risk & Microstructure Studio**: Interactive Three.js 3D Risk Sphere and 3D Order Book Depth Cube with full rotation, zoom, and real-time physics simulations.
6. **Dark Pool & Liquidity**: Institutional block trade routing, iceberg order status, and dark pool liquidity venues.
7. **Risk Matrix & VaR Analytics**: Value at Risk (95%, 99%), Monte Carlo simulations, stress testing scenarios (Black Swan, Interest Rate Shock, Geopolitical Disruption).
8. **Audit & Compliance**: Secure encrypted audit trail for BlackRock x J.P. Morgan regulatory reporting.
9. **Settings & Seed Editor**: General preferences, security, API routing, and the **Hidden Password-Protected Trading Seed Editor** (unlocked via PIN `NEAH-BR-JPM-2026`) allowing full control over custom held assets, quantities, and live prices.

---

## Execution Phases

- **Phase 1**: Project Initialization, Database Schema, Express API Backend, Authentication, Core Layout & Dashboard with KPI summary cards, charts, and filterable data tables.
- **Phase 2**: Futures Trading Terminal with 1-minute executable chart, custom candles, diamond "N" profile icon, and polished responsive UI.
- **Phase 3**: Jane Street-style Quant Engines, 3D visualizers (Three.js market depth & risk sphere), fully wired sidebar with zero empty spaces, and comprehensive codebase expansion.
- **Phase 4**: Verification, live data updates, performance polish (zero stuttering/freezing), and end-to-end testing.
- **Phase 5**: Advanced x100 physics engine enhancements, final git backup and push.

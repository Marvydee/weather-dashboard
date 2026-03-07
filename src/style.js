const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Syne+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-deep:    #060d1f;
    --bg-mid:     #0d1b3e;
    --glass:      rgba(255,255,255,0.06);
    --glass-border: rgba(255,255,255,0.1);
    --accent:     #38bdf8;
    --accent2:    #818cf8;
    --warm:       #fb923c;
    --text:       #e2e8f0;
    --muted:      #64748b;
    --font:       'Outfit', sans-serif;
    --mono:       'Syne Mono', monospace;
  }

  body {
    font-family: var(--font);
    background: var(--bg-deep);
    color: var(--text);
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at 20% 20%, rgba(56,189,248,0.12) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 80%, rgba(129,140,248,0.1) 0%, transparent 55%),
      var(--bg-deep);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1.5rem;
  }

  /* ── HEADER ── */
  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    animation: fadeDown 0.5s ease both;
  }
  .header h1 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  .header h1 span { color: var(--accent); }
  .header p {
    color: var(--muted);
    font-size: 0.9rem;
    margin-top: 0.3rem;
    font-family: var(--mono);
  }

  /* ── SEARCH BAR ── */
  .search-wrapper {
    width: 100%;
    max-width: 540px;
    margin-bottom: 2rem;
    animation: fadeDown 0.5s 0.1s ease both;
  }
  .search-box {
    display: flex;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 14px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    transition: border-color 0.2s;
  }
  .search-box:focus-within { border-color: var(--accent); }

  .search-box input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    padding: 1rem 1.25rem;
    color: var(--text);
    font-family: var(--font);
    font-size: 1rem;
  }
  .search-box input::placeholder { color: var(--muted); }

  .search-box button {
    background: var(--accent);
    border: none;
    padding: 0 1.25rem;
    color: var(--bg-deep);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font);
    font-weight: 600;
    font-size: 0.9rem;
    transition: background 0.2s;
  }
  .search-box button:hover { background: #7dd3fc; }
  .search-box button:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── SETUP NOTICE ── */
  .setup-notice {
    width: 100%; max-width: 540px;
    background: rgba(251,146,60,0.1);
    border: 1px solid rgba(251,146,60,0.3);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    color: var(--warm);
    line-height: 1.6;
    animation: fadeDown 0.5s 0.15s ease both;
  }
  .setup-notice strong { display: block; margin-bottom: 0.25rem; }
  .setup-notice code {
    background: rgba(251,146,60,0.15);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-family: var(--mono);
    font-size: 0.8rem;
  }

  /* ── ERROR ── */
  .error-box {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    color: #fca5a5;
    font-size: 0.9rem;
    width: 100%; max-width: 540px;
    margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 0.5rem;
  }

  /* ── LOADING ── */
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: var(--muted);
    margin-top: 3rem;
    font-family: var(--mono);
    font-size: 0.85rem;
  }
  .spinner {
    width: 36px; height: 36px;
    border: 2px solid var(--glass-border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* ── MAIN CARD ── */
  .main-card {
    width: 100%; max-width: 860px;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
  }

  /* TOP SECTION — big temp display */
  .card-top {
    padding: 2.5rem 2.5rem 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.5rem;
    align-items: center;
    border-bottom: 1px solid var(--glass-border);
  }
  .city-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--accent);
    font-size: 0.85rem;
    font-family: var(--mono);
    margin-bottom: 0.5rem;
  }
  .temp-main {
    font-size: clamp(4rem, 10vw, 7rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -4px;
  }
  .temp-main sup {
    font-size: 2rem;
    letter-spacing: 0;
    color: var(--muted);
    font-weight: 300;
  }
  .condition-label {
    font-size: 1.1rem;
    color: var(--muted);
    font-weight: 400;
    margin-top: 0.5rem;
    text-transform: capitalize;
  }
  .feels-like {
    font-size: 0.8rem;
    color: var(--muted);
    font-family: var(--mono);
    margin-top: 0.3rem;
  }

  /* Weather icon box */
  .weather-icon-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .weather-icon-box svg {
    filter: drop-shadow(0 0 20px currentColor);
    opacity: 0.9;
  }
  .hi-lo {
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--muted);
    text-align: center;
  }
  .hi-lo span { color: var(--text); }

  /* ── STAT GRID ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0;
  }
  .stat-item {
    padding: 1.5rem;
    border-right: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    transition: background 0.2s;
  }
  .stat-item:hover { background: rgba(255,255,255,0.04); }
  .stat-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.73rem;
    color: var(--muted);
    font-family: var(--mono);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .stat-label svg { color: var(--accent); }
  .stat-value {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
  .stat-unit {
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 400;
  }

  /* ── FORECAST STRIP ── */
  .forecast-section {
    padding: 1.5rem 2.5rem;
    border-top: 1px solid var(--glass-border);
  }
  .forecast-title {
    font-size: 0.73rem;
    color: var(--muted);
    font-family: var(--mono);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 1rem;
  }
  .forecast-strip {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.75rem;
  }
  .forecast-item {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 1rem 0.75rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    transition: border-color 0.2s;
  }
  .forecast-item:hover { border-color: var(--accent); }
  .forecast-day { font-size: 0.75rem; color: var(--muted); font-family: var(--mono); }
  .forecast-temp { font-weight: 600; font-size: 1rem; }

  /* ── EMPTY STATE ── */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--muted);
    animation: fadeUp 0.5s ease both;
  }
  .empty-state svg { color: var(--accent); opacity: 0.4; margin-bottom: 1rem; }
  .empty-state h3 { font-size: 1.1rem; color: var(--text); margin-bottom: 0.5rem; }
  .empty-state p { font-size: 0.88rem; line-height: 1.6; }

  /* ── KEYFRAMES ── */
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .card-top {
      grid-template-columns: 1fr;
      padding: 1.75rem;
    }
    .weather-icon-box { align-items: flex-start; flex-direction: row; }
    .forecast-strip { grid-template-columns: repeat(3, 1fr); }
    .forecast-item:nth-child(n+4) { display: none; }
    .forecast-section { padding: 1.25rem 1.75rem; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
  }
`;

export default styles;

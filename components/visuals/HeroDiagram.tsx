/**
 * Data → Models → Applications. Decorative: the hero copy carries the meaning.
 * The faint structure renders on first paint; the cyan trace draws once (CSS),
 * and is shown fully drawn when prefers-reduced-motion is set.
 */
const rows = [0, 1, 2, 3, 4, 5];
const L1 = [120, 190, 260, 330];
const L2 = [155, 225, 295];
const L3 = [190, 260];

export function HeroDiagram() {
  return (
    <svg className="hero-diagram" viewBox="0 0 520 420" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="hd-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke="var(--grid)" strokeWidth="1" />
        </pattern>
        <radialGradient id="hd-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="520" height="420" fill="url(#hd-grid)" opacity="0.7" />
      <circle cx="300" cy="230" r="150" fill="url(#hd-glow)" />

      {/* column labels */}
      {[
        ["DATA", 40],
        ["MODELS", 214],
        ["APPLICATIONS", 390],
      ].map(([t, x]) => (
        <text key={t} x={x} y="58" className="svg-label">
          {t}
        </text>
      ))}

      {/* data rows */}
      {rows.map((i) => {
        const y = 100 + i * 48;
        const hot = i === 2;
        return (
          <g key={i} className={hot ? "hd-hot" : "hd-row"}>
            <rect x="40" y={y} width="30" height="14" rx="3" />
            <rect x="76" y={y} width="44" height="14" rx="3" />
            <rect x="126" y={y} width="24" height="14" rx="3" />
          </g>
        );
      })}

      {/* model edges */}
      <g className="hd-edge">
        {L1.flatMap((a) => L2.map((b) => <line key={`a${a}${b}`} x1="220" y1={a} x2="275" y2={b} />))}
        {L2.flatMap((a) => L3.map((b) => <line key={`b${a}${b}`} x1="275" y1={a} x2="330" y2={b} />))}
      </g>
      {/* model nodes */}
      {L1.map((y) => <circle key={`n1${y}`} cx="220" cy={y} r="6" className={y === 190 ? "hd-node-hot" : "hd-node"} />)}
      {L2.map((y) => <circle key={`n2${y}`} cx="275" cy={y} r="6" className={y === 225 ? "hd-node-hot" : "hd-node"} />)}
      {L3.map((y) => <circle key={`n3${y}`} cx="330" cy={y} r="6" className={y === 260 ? "hd-node-hot" : "hd-node"} />)}

      {/* application surfaces */}
      {[
        ["API", 112],
        ["Interface", 204],
        ["Cloud", 296],
      ].map(([t, y], i) => (
        <g key={t as string} className={i === 1 ? "hd-card-hot" : "hd-card"}>
          <rect x="390" y={y as number} width="110" height="70" rx="8" />
          <text x="404" y={(y as number) + 24} className="svg-small">
            {t}
          </text>
          <line x1="404" y1={(y as number) + 40} x2="480" y2={(y as number) + 40} />
          <line x1="404" y1={(y as number) + 52} x2="458" y2={(y as number) + 52} />
        </g>
      ))}

      {/* secondary signal */}
      <path d="M150 299 L220 330 L275 295 L330 260 L390 147" className="hd-path-iris" />
      {/* primary trace: base (static) + animated overlay */}
      <path d="M150 207 L220 190 L275 225 L330 260 L390 239" className="hd-path-base" />
      <path d="M150 207 L220 190 L275 225 L330 260 L390 239" className="hd-trace" pathLength={1} />
      <circle cx="390" cy="239" r="4" className="hd-end" />
    </svg>
  );
}

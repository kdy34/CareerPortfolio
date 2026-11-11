import type { Project } from "@/content";

/**
 * Original, code-drawn project illustrations. None of them show results.
 * Each carries a caption that says whether it is illustrative or synthetic.
 */
export function ProjectVisual({ kind, title }: { kind: Project["visual"]; title?: string }) {
  const label = title ? `${title} illustration` : undefined;
  const props = {
    viewBox: "0 0 480 300",
    className: `project-visual pv-${kind}`,
    role: label ? "img" : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    focusable: false as const,
  };
  if (kind === "careergenai") return <CareerVisual {...props} />;
  if (kind === "becayis") return <BecayisVisual {...props} />;
  return <ReceptionistVisual {...props} />;
}

type SvgProps = React.SVGProps<SVGSVGElement>;

function Grid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="var(--grid)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="480" height="300" fill={`url(#${id})`} opacity="0.6" />
    </>
  );
}

function CareerVisual(p: SvgProps) {
  const skills = [
    { n: "Python", v: 0.9, s: "have" },
    { n: "SQL", v: 0.75, s: "have" },
    { n: "Docker", v: 0.45, s: "grow" },
    { n: "MLOps", v: 0.15, s: "gap" },
  ];
  return (
    <svg {...p}>
      <Grid id="g-cg" />
      {/* résumé */}
      <g className="pv-doc">
        <rect x="28" y="46" width="118" height="196" rx="8" />
        <text x="42" y="72" className="svg-small strong">A. Rivera</text>
        <text x="42" y="86" className="svg-tiny">sample résumé</text>
        {[104, 116, 128, 152, 164, 176, 200, 212].map((y, i) => (
          <line key={y} x1="42" y1={y} x2={i % 3 === 1 ? 112 : 132} y2={y} />
        ))}
      </g>
      <path d="M152 144 H184" className="pv-arrow" markerEnd="url(#cg-arrow)" />
      {/* skills */}
      <text x="192" y="62" className="svg-label">SKILL ANALYSIS</text>
      {skills.map((s, i) => {
        const y = 82 + i * 42;
        return (
          <g key={s.n} className={`pv-skill pv-${s.s}`}>
            <text x="192" y={y + 10} className="svg-small">{s.n}</text>
            <rect x="192" y={y + 18} width="104" height="6" rx="3" className="track" />
            <rect x="192" y={y + 18} width={104 * s.v} height="6" rx="3" className="fill" />
          </g>
        );
      })}
      <path d="M304 144 H334" className="pv-arrow" markerEnd="url(#cg-arrow)" />
      {/* roadmap */}
      <text x="342" y="62" className="svg-label">ROADMAP</text>
      <line x1="352" y1="90" x2="352" y2="238" className="pv-spine" />
      {["Containers", "CI for models", "Ship a project"].map((t, i) => {
        const y = 92 + i * 70;
        return (
          <g key={t} className="pv-step">
            <circle cx="352" cy={y} r="8" />
            <text x="349" y={y + 4} className="svg-tiny num">{i + 1}</text>
            <text x="368" y={y + 4} className="svg-small">{t}</text>
            <text x="368" y={y + 18} className="svg-tiny">week {i * 2 + 1}–{i * 2 + 2}</text>
          </g>
        );
      })}
      <defs>
        <marker id="cg-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0L8 4L0 8z" fill="var(--cyan)" />
        </marker>
      </defs>
      <text x="28" y="278" className="svg-tiny caption">ILLUSTRATIVE · FICTIONAL INPUT, NOT MODEL OUTPUT</text>
    </svg>
  );
}

function BecayisVisual(p: SvgProps) {
  const nodes: [string, number, number][] = [
    ["C1", 70, 90], ["C2", 150, 200], ["C3", 210, 80], ["C4", 290, 170],
    ["C5", 360, 70], ["C6", 410, 210], ["C7", 110, 250], ["C8", 250, 245],
  ];
  const pos = Object.fromEntries(nodes.map(([n, x, y]) => [n, [x, y]]));
  const trails: [string, string][] = [["C1", "C3"], ["C3", "C5"], ["C2", "C4"], ["C4", "C6"], ["C7", "C8"], ["C8", "C4"], ["C1", "C2"], ["C5", "C6"]];
  const arc = (a: string, b: string, bend: number) => {
    const [x1, y1] = pos[a];
    const [x2, y2] = pos[b];
    const mx = (x1 + x2) / 2 - (y2 - y1) * bend;
    const my = (y1 + y2) / 2 + (x2 - x1) * bend;
    return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
  };
  return (
    <svg {...p}>
      <Grid id="g-bc" />
      <g className="pv-trail">
        {trails.map(([a, b]) => (
          <path key={a + b} d={arc(a, b, 0.08)} />
        ))}
      </g>
      {/* two matched swaps, each drawn as a pair of opposing arcs */}
      <g className="pv-swap">
        <path d={arc("C1", "C4", 0.18)} />
        <path d={arc("C4", "C1", 0.18)} />
      </g>
      <g className="pv-swap alt">
        <path d={arc("C5", "C8", 0.16)} />
        <path d={arc("C8", "C5", 0.16)} />
      </g>
      {nodes.map(([n, x, y]) => {
        const hot = ["C1", "C4", "C5", "C8"].includes(n);
        return (
          <g key={n} className={hot ? "pv-city hot" : "pv-city"}>
            <circle cx={x} cy={y} r={hot ? 9 : 6} />
            <text x={x + 13} y={y + 4} className="svg-tiny">{n}</text>
          </g>
        );
      })}
      <g transform="translate(330 252)">
        <rect width="124" height="30" rx="6" className="pv-legend" />
        <text x="10" y="19" className="svg-tiny">swap pair ⇄ · trail ┄</text>
      </g>
      <text x="28" y="290" className="svg-tiny caption">SYNTHETIC CITIES AND REQUESTS</text>
    </svg>
  );
}

function ReceptionistVisual(p: SvgProps) {
  return (
    <svg {...p}>
      <Grid id="g-rr" />
      {/* visitor question */}
      <g className="pv-bubble">
        <rect x="24" y="64" width="150" height="64" rx="12" />
        <path d="M48 128 L44 146 L66 128" />
        <text x="38" y="90" className="svg-tiny">VISITOR</text>
        <text x="38" y="110" className="svg-small">Where is the Registrar?</text>
      </g>
      {/* vision field */}
      <g className="pv-sense">
        <circle cx="96" cy="216" r="12" />
        <path d="M120 196 A40 40 0 0 1 120 236" />
        <path d="M132 184 A58 58 0 0 1 132 248" />
        <text x="70" y="270" className="svg-tiny">notice</text>
      </g>
      {/* decision */}
      <path d="M180 96 H212" className="pv-arrow" markerEnd="url(#rr-arrow)" />
      <g className="pv-decide">
        <path d="M262 56 L312 96 L262 136 L212 96 Z" />
        <text x="236" y="92" className="svg-tiny">known</text>
        <text x="240" y="106" className="svg-tiny">fact?</text>
      </g>
      <path d="M312 96 H340" className="pv-arrow" markerEnd="url(#rr-arrow)" />
      <g className="pv-out ok">
        <rect x="344" y="66" width="114" height="60" rx="8" />
        <text x="356" y="88" className="svg-tiny">ANSWER</text>
        <text x="356" y="108" className="svg-small">Floor 9</text>
      </g>
      <path d="M262 136 V176" className="pv-arrow" markerEnd="url(#rr-arrow)" />
      <g className="pv-out ask">
        <rect x="204" y="180" width="116" height="60" rx="8" />
        <text x="216" y="202" className="svg-tiny">UNSURE</text>
        <text x="216" y="222" className="svg-small">Clarify</text>
      </g>
      <path d="M320 210 H340" className="pv-arrow" markerEnd="url(#rr-arrow)" />
      <g className="pv-out hand">
        <rect x="344" y="180" width="114" height="60" rx="8" />
        <text x="356" y="202" className="svg-tiny">HAND OFF</text>
        <text x="356" y="222" className="svg-small">Staff</text>
      </g>
      <defs>
        <marker id="rr-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0L8 4L0 8z" fill="var(--mint)" />
        </marker>
      </defs>
      <text x="204" y="288" className="svg-tiny caption">INTERACTION LOGIC · SCHEMATIC</text>
    </svg>
  );
}

import Link from "next/link";
import { research } from "@/content";

export function ResearchView() {
  return (
    <>
      <header className="page-hero research-hero">
        <div className="container">
          <p className="eyebrow mono iris">
            <span className="dot" aria-hidden="true" /> {research.status}
          </p>
          <h1 className="display">{research.title}</h1>
          <p className="lede">{research.intro}</p>
        </div>
      </header>

      <div className="container research-body">
        <section aria-labelledby="r-q" className="case-section">
          <h2 id="r-q" className="case-h">Research question</h2>
          <blockquote className="question large">{research.question}</blockquote>
        </section>

        <section aria-labelledby="r-why" className="case-section">
          <h2 id="r-why" className="case-h">Motivation</h2>
          <div className="prose">
            {research.motivation.map((m) => (
              <p key={m.slice(0, 20)}>{m}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="r-layers" className="case-section wide">
          <h2 id="r-layers" className="case-h">Defense in depth</h2>
          <div>
            <p className="prose">Candidate layers I plan to compare, alone and stacked:</p>
            <figure className="layers" aria-describedby="layers-text">
              <ol>
                {research.layers.map((l, i) => (
                  <li key={l.name} style={{ ["--i" as string]: i }}>
                    <span className="mono label">Layer {i + 1}</span>
                    <strong>{l.name}</strong>
                    <span className="muted">{l.detail}</span>
                  </li>
                ))}
              </ol>
              <figcaption id="layers-text" className="pipeline-text">
                Text version: an untrusted request passes through input screening, a structured prompt, output checks, and least-privilege tool access before the application acts. Each layer is measured for how much it reduces attack success and how much latency it adds.
              </figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="r-eval" className="case-section wide">
          <h2 id="r-eval" className="case-h">Planned evaluation</h2>
          <div className="eval-grid">
            {research.evaluation.map((e) => (
              <div key={e.metric} className="show-item">
                <h3 className="h4">{e.metric}</h3>
                <p className="muted">{e.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="r-status" className="case-section">
          <h2 id="r-status" className="case-h">Status</h2>
          <div className="prose">
            <p>{research.note}</p>
            <p>
              <Link href="/contact" className="btn btn-primary">
                Discuss the research
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

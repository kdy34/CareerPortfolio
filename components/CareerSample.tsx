/**
 * Illustrative CareerGENAI walkthrough. Fictional input; not model output.
 * Deliberately static: no résumé upload happens on the portfolio.
 */
const sample = {
  input: {
    person: "Alex Rivera (fictional)",
    target: "Junior ML engineer",
    excerpt: "B.S. Statistics · Built churn models in Python and SQL · Course projects in scikit-learn · Shared notebooks with a campus club",
  },
  skills: [
    { name: "Python", level: "Strong" },
    { name: "SQL", level: "Strong" },
    { name: "Model evaluation", level: "Working" },
    { name: "Docker", level: "Gap" },
    { name: "Model serving / APIs", level: "Gap" },
  ],
  roadmap: [
    { step: "Package an existing model in Docker", why: "Closes the container gap with work already done." },
    { step: "Serve it behind a FastAPI endpoint", why: "Shows the model can be used by other software." },
    { step: "Add basic monitoring and a write-up", why: "Turns a notebook into a portfolio project." },
  ],
};

export function CareerSample() {
  return (
    <figure className="sample" aria-labelledby="sample-cap">
      <figcaption id="sample-cap" className="sample-cap">
        <span className="badge">Illustrative</span> Sample output shape with a fictional résumé. Not produced by the model.
      </figcaption>
      <div className="sample-grid">
        <section className="sample-col" aria-labelledby="s-in">
          <h4 id="s-in" className="mono label">1 · Résumé input</h4>
          <dl className="kv">
            <dt>Candidate</dt>
            <dd>{sample.input.person}</dd>
            <dt>Target</dt>
            <dd>{sample.input.target}</dd>
          </dl>
          <p className="sample-excerpt">{sample.input.excerpt}</p>
        </section>
        <section className="sample-col" aria-labelledby="s-sk">
          <h4 id="s-sk" className="mono label">2 · Skill analysis</h4>
          <ul className="skill-list">
            {sample.skills.map((s) => (
              <li key={s.name} data-level={s.level.toLowerCase()}>
                <span>{s.name}</span>
                <span className="level">{s.level}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="sample-col" aria-labelledby="s-rm">
          <h4 id="s-rm" className="mono label">3 · Learning roadmap</h4>
          <ol className="roadmap">
            {sample.roadmap.map((r) => (
              <li key={r.step}>
                <strong>{r.step}</strong>
                <span>{r.why}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </figure>
  );
}

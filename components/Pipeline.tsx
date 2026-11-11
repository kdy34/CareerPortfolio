import type { Project } from "@/content";

/** Code-rendered system diagram with an adjacent text equivalent. */
export function Pipeline({ project }: { project: Project }) {
  const { steps, textEquivalent } = project.systemDesign;
  const descId = `pipeline-text-${project.slug}`;
  return (
    <figure className={`pipeline accent-${project.accent}`} aria-describedby={descId}>
      <ol className="pipeline-steps" style={{ ["--n" as string]: steps.length }}>
        {steps.map((s, i) => (
          <li key={s.name} className="pipeline-step">
            <span className="pipeline-index mono" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="pipeline-name">{s.name}</span>
            <span className="pipeline-detail">{s.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption id={descId} className="pipeline-text">
        {textEquivalent}
      </figcaption>
    </figure>
  );
}

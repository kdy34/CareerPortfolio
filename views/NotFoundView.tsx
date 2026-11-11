import Link from "next/link";

export function NotFoundView() {
  return (
    <section className="page-hero not-found" aria-labelledby="nf-title">
      <div className="container">
        <p className="eyebrow mono">404 · No route matched</p>
        <h1 id="nf-title" className="display">This page took a wrong turn.</h1>
        <p className="lede">The link may be old or mistyped. The work is still where it should be.</p>
        <div className="cta-row">
          <Link href="/work" className="btn btn-primary">
            Explore my work
          </Link>
          <Link href="/" className="btn btn-ghost">
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}

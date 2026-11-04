import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";

export function CurrentFocus() {
  return (
    <section aria-labelledby="focus-title" className="border-b border-line bg-surface/40">
      <Container className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-8">
        <h2 id="focus-title" className="shrink-0 font-mono text-xs tracking-wide text-muted">
          <span className="text-accent">$</span> current-focus
        </h2>
        <ul className="flex flex-wrap gap-2">
          {profile.focusAreas.map((area) => (
            <li
              key={area}
              className="rounded border border-line-strong bg-canvas px-3 py-1.5 font-mono text-sm text-ink"
            >
              {area}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

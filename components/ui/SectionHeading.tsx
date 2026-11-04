import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  /** Short mono label shown above the title, for example "01 / projects". */
  eyebrow: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
};

export function SectionHeading({ id, eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-wide text-accent">{eyebrow}</p>
        <h2 id={id} className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {description ? <p className="mt-3 text-base leading-7 text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

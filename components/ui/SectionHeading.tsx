import type { ReactNode } from "react";

/** Small uppercase mono label with a leading gold rule. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function SectionHeading({ id, eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="reveal mb-14 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ivory sm:text-5xl">
          {title}
        </h2>
        {description ? <p className="mt-5 max-w-xl text-base leading-7 text-silver">{description}</p> : null}
      </div>
      {action ? <div className="md:pb-2">{action}</div> : null}
    </div>
  );
}

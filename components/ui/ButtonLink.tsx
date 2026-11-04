import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  className?: string;
};

const base =
  "group/button inline-flex items-center gap-3 transition-[color,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-luxe)]";

const variants = {
  primary:
    "bg-gold px-6 py-3.5 text-[0.8125rem] font-medium tracking-[0.08em] uppercase text-obsidian hover:bg-[#d4b57f] hover:shadow-[0_10px_40px_-12px_rgb(197_163_106_/_0.55)]",
  secondary:
    "border border-line-strong px-6 py-3.5 text-[0.8125rem] font-medium tracking-[0.08em] uppercase text-ivory hover:border-gold hover:text-gold",
  text: "link-underline pb-1 text-sm font-medium text-gold hover:text-[#d4b57f]",
};

export function ButtonLink({ href, children, variant = "primary", external = false, className = "" }: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Arrow that slides slightly on hover of the parent ButtonLink. */
export function ButtonArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      aria-hidden="true"
      className="size-4 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover/button:translate-x-1"
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

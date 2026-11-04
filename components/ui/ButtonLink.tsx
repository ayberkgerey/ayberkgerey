import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
};

const variants = {
  primary:
    "rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-canvas hover:bg-accent-strong",
  secondary:
    "rounded-md border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent-strong",
  text: "text-sm font-medium text-accent hover:text-accent-strong underline-offset-4 hover:underline",
};

export function ButtonLink({ href, children, variant = "primary", external = false }: ButtonLinkProps) {
  const className = `inline-flex items-center gap-2 transition-colors ${variants[variant]}`;

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-hairline">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-blueprint absolute inset-0 opacity-50" />
        <div className="absolute -right-32 -top-40 size-[40rem] bg-[radial-gradient(closest-side,rgb(197_163_106_/_0.08),transparent)]" />
        <div className="bg-vignette absolute inset-0" />
      </div>
      <Container className="pb-20 pt-24 sm:pb-24 sm:pt-32">
        <Eyebrow className="animate-rise">{eyebrow}</Eyebrow>
        <h1 className="mt-8 max-w-4xl animate-rise font-serif text-5xl font-medium leading-[1] tracking-[-0.02em] text-ivory [animation-delay:100ms] text-balance sm:text-7xl">
          {title}
        </h1>
        {children ? <div className="mt-8 max-w-2xl animate-rise [animation-delay:200ms]">{children}</div> : null}
      </Container>
    </header>
  );
}

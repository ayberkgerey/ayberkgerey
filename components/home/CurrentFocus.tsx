import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { TechIcon } from "@/components/ui/TechIcon";

export function CurrentFocus() {
  return (
    <section aria-labelledby="focus-title" className="relative border-y border-hairline bg-charcoal">
      <Container className="py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
          <h2 id="focus-title" className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            Current technical focus
          </h2>
          <ul className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {profile.focusStack.map((item) => (
              <li
                key={item.name}
                className="group flex items-center gap-4 border-hairline py-4 pr-4 sm:border-l sm:pl-6 lg:py-2"
              >
                <TechIcon
                  name={item.icon}
                  className="size-6 shrink-0 text-silver transition-colors duration-500 group-hover:text-gold"
                />
                <span>
                  <span className="block text-[0.9375rem] text-ivory">{item.name}</span>
                  <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-silver">
                    {item.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

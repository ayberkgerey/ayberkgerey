import Image from "next/image";
import { profile } from "@/data/profile";

function CornerMarks() {
  const mark = "absolute size-5 border-gold/70";
  return (
    <span aria-hidden="true">
      <span className={`${mark} -left-px -top-px border-l border-t`} />
      <span className={`${mark} -right-px -top-px border-r border-t`} />
      <span className={`${mark} -bottom-px -left-px border-b border-l`} />
      <span className={`${mark} -bottom-px -right-px border-b border-r`} />
    </span>
  );
}

export function Portrait() {
  const { src, alt } = profile.portrait;

  return (
    <figure className="relative mx-auto w-full max-w-[26rem]">
      <div
        aria-hidden="true"
        className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgb(197_163_106_/_0.18),transparent_62%)] blur-2xl"
      />

      <div className="relative border border-line bg-card px-7 pb-8 pt-10 sm:px-10 sm:pb-9 sm:pt-12">
        {src ? (
          <div className="relative mx-auto aspect-square w-full max-w-[20rem] overflow-hidden rounded-full border border-line-strong bg-charcoal shadow-[0_0_0_1px_rgb(197_163_106_/_0.08),0_24px_80px_-28px_rgb(0_0_0_/_0.85)]">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 80vw"
              className="object-cover object-[center_18%] scale-[1.12]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-gold/25"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_70%_12%,rgb(197_163_106_/_0.12),transparent_42%)] mix-blend-screen"
            />
          </div>
        ) : (
          <div className="relative mx-auto flex aspect-square w-full max-w-[20rem] flex-col items-center justify-center overflow-hidden rounded-full border border-line-strong bg-[radial-gradient(ellipse_at_50%_30%,#202124,#111214_70%)]">
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-70" />
            <span className="relative font-serif text-[6rem] font-normal italic leading-none text-gold/80">AG</span>
            <span className="relative mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-silver">
              Portrait placeholder
            </span>
          </div>
        )}

        <figcaption className="mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-serif text-2xl text-ivory">{profile.name}</p>
            <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">Software → Cloud</p>
          </div>
          <span aria-hidden="true" className="mb-2 h-px w-12 bg-gold/60" />
        </figcaption>
      </div>
      <CornerMarks />
    </figure>
  );
}

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
        className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgb(197_163_106_/_0.16),transparent_62%)] blur-2xl"
      />

      <div className="relative border border-line bg-card">
        {src ? (
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 90vw"
              className="object-cover object-center"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_72%,rgb(8_9_11_/_0.45)_100%)]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_12%,rgb(197_163_106_/_0.1),transparent_48%)] mix-blend-screen"
            />
            <div aria-hidden="true" className="bg-vignette absolute inset-0" />
          </div>
        ) : (
          <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#202124,#111214_70%)]">
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-70" />
            <span className="relative font-serif text-[6rem] font-normal italic leading-none text-gold/80">AG</span>
            <span className="relative mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-silver">
              Portrait placeholder
            </span>
          </div>
        )}

        <figcaption className="flex items-end justify-between gap-4 px-6 py-5">
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

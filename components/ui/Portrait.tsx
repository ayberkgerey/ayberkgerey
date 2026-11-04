import Image from "next/image";
import { profile } from "@/data/profile";

export function Portrait() {
  const { src, alt } = profile.portrait;

  return (
    <figure className="relative mx-auto w-full max-w-sm">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line-strong bg-surface">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[size:2rem_2rem]">
            <span
              aria-hidden="true"
              className="flex size-24 items-center justify-center rounded-full border border-line-strong bg-canvas font-mono text-2xl font-semibold text-accent"
            >
              AG
            </span>
            <span className="rounded border border-line-strong bg-canvas px-2 py-1 font-mono text-xs text-muted">
              photo placeholder
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex items-center justify-between font-mono text-xs text-muted">
        <span>{profile.name}</span>
        <span>software → cloud</span>
      </figcaption>
    </figure>
  );
}

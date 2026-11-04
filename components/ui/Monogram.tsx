export function Monogram({ className = "size-9" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center border border-line-strong font-serif text-[0.95rem] italic text-gold ${className}`}
    >
      <span className="absolute inset-[3px] border border-hairline" />
      AG
    </span>
  );
}

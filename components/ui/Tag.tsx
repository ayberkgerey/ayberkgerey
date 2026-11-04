export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center border border-hairline px-2.5 py-1 font-mono text-[0.6875rem] uppercase leading-4 tracking-[0.08em] text-silver">
      {children}
    </span>
  );
}

export function TagList({ tags, label, limit }: { tags: string[]; label: string; limit?: number }) {
  const shown = limit ? tags.slice(0, limit) : tags;
  const hidden = tags.length - shown.length;

  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {shown.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
      {hidden > 0 ? (
        <li>
          <span className="inline-flex items-center px-1 py-1 font-mono text-[0.6875rem] leading-4 text-silver">
            +{hidden}
            <span className="sr-only"> more: {tags.slice(shown.length).join(", ")}</span>
          </span>
        </li>
      ) : null}
    </ul>
  );
}

/** Inline list separated by thin gold dots, for skill-style lists without badges. */
export function DotList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9375rem] text-ivory">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-4">
          {index > 0 ? <span aria-hidden="true" className="size-1 rotate-45 bg-gold/60" /> : null}
          {item}
        </li>
      ))}
    </ul>
  );
}

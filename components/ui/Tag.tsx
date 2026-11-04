type TagProps = {
  children: string;
  tone?: "default" | "accent";
};

export function Tag({ children, tone = "default" }: TagProps) {
  const toneClass =
    tone === "accent"
      ? "border-accent/40 text-accent-strong bg-accent/10"
      : "border-line-strong text-muted bg-surface";
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs leading-5 ${toneClass}`}
    >
      {children}
    </span>
  );
}

export function TagList({ tags, label }: { tags: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}

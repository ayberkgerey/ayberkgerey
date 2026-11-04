import type { ReactNode } from "react";
import type { ContentBlock } from "@/types/content";

const inlineCodeClass =
  "rounded border border-line bg-surface-raised px-1.5 py-0.5 font-mono text-[0.85em] text-ink";

export function InlineText({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code key={index} className={inlineCodeClass}>
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Block({ block }: { block: ContentBlock }): ReactNode {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="leading-7 text-muted">
          <InlineText text={block.text} />
        </p>
      );

    case "heading":
      return (
        <h3 className="pt-2 text-base font-semibold text-ink">
          <InlineText text={block.text} />
        </h3>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          className={`space-y-2 pl-5 leading-7 text-muted marker:text-accent ${
            block.ordered ? "list-decimal marker:font-mono marker:text-sm" : "list-disc"
          }`}
        >
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <InlineText text={item} />
            </li>
          ))}
        </ListTag>
      );
    }

    case "code":
      return (
        <figure className="overflow-hidden rounded-lg border border-line bg-[#080d1a]">
          {block.caption || block.language ? (
            <figcaption className="flex items-center justify-between gap-4 border-b border-line px-4 py-2 font-mono text-xs text-muted">
              <span>{block.caption}</span>
              {block.language ? <span className="text-accent">{block.language}</span> : null}
            </figcaption>
          ) : null}
          <pre tabIndex={0} className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-6 text-ink">
            <code>{block.code}</code>
          </pre>
        </figure>
      );

    case "table":
      return (
        <figure>
          <div tabIndex={0} className="overflow-x-auto rounded-lg border border-line" role="region" aria-label={block.caption ?? "Table"}>
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead className="bg-surface-raised">
                <tr>
                  {block.columns.map((column) => (
                    <th key={column} scope="col" className="border-b border-line px-4 py-3 font-mono text-xs font-medium text-ink">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("|")} className="border-b border-line last:border-b-0 even:bg-surface/50">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-4 py-3 align-top leading-6 ${cellIndex === 0 ? "font-medium text-ink" : "text-muted"}`}
                      >
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? <figcaption className="mt-2 font-mono text-xs text-muted">{block.caption}</figcaption> : null}
        </figure>
      );
  }
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

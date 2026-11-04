import type { ReactNode } from "react";
import type { ContentBlock } from "@/types/content";

const inlineCodeClass =
  "border border-hairline bg-elevated px-1.5 py-0.5 font-mono text-[0.82em] text-[#e9d9b8]";

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
        <p className="text-[1.0625rem] leading-8 text-silver">
          <InlineText text={block.text} />
        </p>
      );

    case "heading":
      return (
        <h3 className="pt-4 font-serif text-2xl font-medium text-ivory">
          <InlineText text={block.text} />
        </h3>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol className="space-y-4">
            {block.items.map((item, index) => (
              <li key={item} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 text-[1.0625rem] leading-8 text-silver">
                <span aria-hidden="true" className="pt-0.5 font-mono text-xs leading-8 text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <InlineText text={item} />
                </span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="grid grid-cols-[1.5rem_minmax(0,1fr)] text-[1.0625rem] leading-8 text-silver">
              <span aria-hidden="true" className="mt-[0.85rem] size-1.5 rotate-45 bg-gold/70" />
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <figure className="overflow-hidden border border-line bg-[#0c0d0f]">
          {block.caption || block.language ? (
            <figcaption className="flex items-center justify-between gap-4 border-b border-hairline bg-charcoal px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
              <span className="text-silver">{block.caption}</span>
              {block.language ? <span className="text-gold">{block.language}</span> : null}
            </figcaption>
          ) : null}
          <pre tabIndex={0} className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-[1.8] text-[#ddd6ca]">
            <code>{block.code}</code>
          </pre>
        </figure>
      );

    case "table":
      return (
        <figure>
          <div
            tabIndex={0}
            role="region"
            aria-label={block.caption ?? "Table"}
            className="overflow-x-auto border border-line"
          >
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <thead className="bg-charcoal">
                <tr>
                  {block.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="border-b border-line px-5 py-3.5 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-gold"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("|")} className="border-b border-hairline transition-colors last:border-b-0 hover:bg-card">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-5 py-4 align-top leading-6 ${cellIndex === 0 ? "text-ivory" : "text-silver"}`}
                      >
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? (
            <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-silver">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
  }
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

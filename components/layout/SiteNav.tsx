"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { NavItem } from "@/types/content";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({ items, mobileExtras }: { items: NavItem[]; mobileExtras?: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav aria-label="Main">
      <ul className="hidden items-center gap-10 md:flex">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative block py-2 text-[0.8125rem] tracking-[0.06em] transition-colors duration-300 ${
                  active ? "text-ivory" : "text-silver hover:text-ivory"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-gold transition-transform duration-500 ease-[var(--ease-luxe)] ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        ref={buttonRef}
        type="button"
        className="relative flex size-11 items-center justify-center md:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-6">
          <span
            className={`absolute left-0 h-px w-6 bg-ivory transition-transform duration-500 ease-[var(--ease-luxe)] ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-px bg-gold transition-all duration-500 ease-[var(--ease-luxe)] ${
              open ? "top-1.5 w-6 -rotate-45 bg-ivory" : "top-3 w-4"
            }`}
          />
        </span>
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-hairline bg-obsidian md:hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" />
        <div className="relative flex min-h-full flex-col px-6 pb-10 pt-10 sm:px-10">
          <ul className="flex flex-col">
            {items.map((item, index) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-hairline">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className={`font-serif text-4xl ${active ? "italic text-gold" : "text-ivory"}`}>
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="font-mono text-xs text-silver">
                      0{index + 1}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {mobileExtras ? <div className="mt-auto pt-10">{mobileExtras}</div> : null}
        </div>
      </div>
    </nav>
  );
}

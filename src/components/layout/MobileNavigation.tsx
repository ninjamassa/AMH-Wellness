"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buttonClassName } from "@/components/ui/Button";
import { primaryCta, primaryNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

/**
 * The only client boundary in the site header. A modal native dialog provides
 * the focus trap; React only synchronises its open state and restores page
 * scrolling when the menu closes.
 */
export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) return;

    if (!isOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-control border border-indigo-200 bg-white text-indigo-600 shadow-card transition-colors duration-[var(--duration-fast)] ease-[var(--ease-calm)] hover:bg-indigo-50 xl:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label="Menu"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={closeMenu}
        className="fixed inset-0 z-[var(--z-menu)] m-0 h-dvh max-h-none w-full max-w-none border-0 bg-sand-50 p-0 text-ink-700 backdrop:bg-indigo-900/50"
      >
        <div className="mx-auto flex min-h-dvh max-w-site flex-col px-gutter py-4">
          <div className="flex items-center justify-between gap-4 border-b border-sand-200 pb-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="inline-flex min-h-touch items-center text-lg font-semibold text-indigo-600"
            >
              {siteConfig.name}
            </Link>
            <button
              type="button"
              autoFocus
              aria-label="Close menu"
              onClick={closeMenu}
              className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-control border border-indigo-200 bg-white text-indigo-600 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-calm)] hover:bg-indigo-50"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile primary" className="py-6">
            <ul className="divide-y divide-sand-200">
              {primaryNav.map((item) => (
                <li key={item.href} className="py-1">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-touch items-center py-2 text-lg font-semibold text-indigo-600"
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <ul className="mb-3 border-l-2 border-teal-200 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            className="flex min-h-touch items-center text-ink-700 hover:text-indigo-600"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-sand-200 pt-6">
            <Link
              href={primaryCta.href}
              onClick={closeMenu}
              className={buttonClassName("primary", "w-full")}
            >
              {primaryCta.label}
            </Link>
            <p className="mt-3 text-center text-sm text-ink-500">
              {primaryCta.supporting}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}

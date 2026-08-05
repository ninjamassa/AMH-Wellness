import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white shadow-card hover:bg-indigo-700 focus-visible:bg-indigo-700",
  secondary:
    "bg-teal-600 text-white shadow-card hover:bg-teal-700 focus-visible:bg-teal-700",
  ghost:
    "border border-indigo-200 bg-white/70 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 focus-visible:bg-indigo-50",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className = ""
): string {
  return `inline-flex min-h-touch items-center justify-center whitespace-nowrap rounded-pill px-6 py-3 text-center text-base font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-calm)] motion-safe:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={buttonClassName(variant, className)}
    >
      {children}
    </Link>
  );
}

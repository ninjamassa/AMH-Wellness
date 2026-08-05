import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:bg-indigo-700 shadow-sm",
  secondary:
    "bg-teal-500 text-white hover:bg-teal-600 focus-visible:bg-teal-600 shadow-sm",
  ghost:
    "border border-indigo-200 text-indigo-600 hover:bg-indigo-50 focus-visible:bg-indigo-50",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-base font-medium transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

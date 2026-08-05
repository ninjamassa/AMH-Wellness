import Link from "next/link";
import type { ArticleFrontmatter } from "@/types/content";

export function ArticleCard({ article }: { article: ArticleFrontmatter }) {
  return (
    <article className="group relative flex h-full flex-col rounded-card border border-sand-200 bg-white p-6 shadow-card transition-[border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-calm)] hover:border-teal-200 hover:shadow-raised motion-safe:hover:-translate-y-1 sm:p-7">
      {article.topics.length > 0 ? (
        <p className="text-sm font-semibold text-teal-700">{article.topics[0]}</p>
      ) : null}
      <h2 className="mt-3 text-h3">
        <Link
          href={`/blog/${article.slug}`}
          className="rounded-sm after:absolute after:inset-0"
        >
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-ink-500">{article.description}</p>
      <p className="mt-6 inline-flex min-h-touch items-center gap-2 font-semibold text-teal-700">
        Read the guidance <span aria-hidden="true">→</span>
      </p>
    </article>
  );
}

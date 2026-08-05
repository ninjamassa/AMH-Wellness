import { ArticleCard } from "@/components/sections/ArticleCard";
import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import type { ArticleFrontmatter } from "@/types/content";

/**
 * STAGE     aware
 *
 * JOB
 * The hub Akila wants, where patients and prospects find genuinely useful
 * guidance.
 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP Read an article
 * TARGETS   —
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/blog")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/blog"]);

const articles: readonly ArticleFrontmatter[] = [
  {
    slug: "mounjaro-vs-wegovy",
    title: "Mounjaro vs Wegovy: what is the difference?",
    description:
      "A plain comparison of the medicines, how they work, common side effects and why the right choice needs a clinical conversation.",
    publishedAt: "TODO(human): confirm after Akila's clinical review",
    topics: ["Choosing treatment"],
  },
  {
    slug: "keeping-weight-off-after-stopping",
    title: "Keeping weight off after stopping Mounjaro",
    description:
      "Why appetite and weight can change again, what to plan before treatment ends and why regain is not a personal failure.",
    publishedAt: "TODO(human): confirm after Akila's clinical review",
    topics: ["Aftercare"],
  },
  {
    slug: "managing-side-effects",
    title: "Managing Mounjaro and Wegovy side effects",
    description:
      "Practical steps for common stomach-related effects, when to contact Akila and which symptoms need urgent medical help.",
    publishedAt: "TODO(human): confirm after Akila's clinical review",
    topics: ["Side effects"],
  },
  {
    slug: "protein-and-nutrition-on-injections",
    title: "Protein and nutrition on weight loss injections",
    description:
      "How to think about protein, balanced meals, lean tissue and supplements without relying on one target for everyone.",
    publishedAt: "TODO(human): confirm after Akila's clinical review",
    topics: ["Nutrition"],
  },
];

export default function BlogPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Blog and resources</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/blog"]}>
        <p>
          AMH Wellness provides pharmacist-led weight loss guidance on choosing
          treatment, managing side effects, eating well and planning for life after
          injections. The articles answer questions patients bring to Akila
          Dungarwalla MPharmS, with clinical claims sourced and every launch article
          held for her review before publication.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <h2 className="text-h2">What can I read here?</h2>
        <p className="mt-5 max-w-reading text-ink-500">
          Start with the question that is on your mind now. If you already had a
          difficult experience with an injection service, the aftercare and side-effect
          guidance is written to help you understand what more supported care should
          look like.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        {/* TODO(human): Akila must clinically review all four articles and confirm publication, modification and review dates before launch. */}
      </Container>
    </>
  );
}

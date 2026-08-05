import type { SeoRoute } from "./page-seo";

/**
 * The exact patient-shaped question each AnswerFirst block must answer.
 * Answers belong to the content phase and must remain 40–60 words.
 */
export const answerBlockQuestions = {
  "/": "Where can I get one-to-one weight loss support in the UK?",
  "/how-it-works": "How does online weight loss treatment work in the UK?",
  "/am-i-eligible": "Am I eligible for weight loss injections in the UK?",
  "/pricing": "How much do weight loss injections cost in the UK?",
  "/about": "Who is the prescribing pharmacist behind AMH Wellness?",
  "/reviews": "What do patients say about AMH Wellness?",
  "/contact": "How can I contact AMH Wellness?",
  "/weight-loss-injections": "How do weight loss injections work in the UK?",
  "/mounjaro": "How does Mounjaro treatment work with AMH Wellness?",
  "/wegovy": "How does Wegovy treatment work with AMH Wellness?",
  "/support-after-injections": "What happens when you stop Mounjaro?",
  "/blog": "Where can I find pharmacist-led weight loss guidance?",
  "/blog/mounjaro-vs-wegovy": "Mounjaro vs Wegovy: which is right for me?",
  "/blog/keeping-weight-off-after-stopping":
    "How do you keep weight off after stopping Mounjaro?",
  "/blog/managing-side-effects":
    "How do you manage Mounjaro and Wegovy side effects?",
  "/blog/protein-and-nutrition-on-injections":
    "How much protein should you eat on weight loss injections?",
  "/faqs": "What should I know before starting weight loss injections?",
  "/privacy-policy": "How does AMH Wellness use and protect my information?",
  "/terms": "What terms apply when I use AMH Wellness?",
  "/complaints": "How do I make a complaint about AMH Wellness?",
  "/medical-disclaimer": "Does this website replace personal medical advice?",
} as const satisfies Record<SeoRoute, string>;

"use client";

import { useEffect } from "react";
import {
  articleReadThresholdReached,
  trackAnalyticsEvent,
} from "@/lib/analytics";

export function ArticleReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    let hasTracked = false;

    function checkProgress() {
      if (
        hasTracked ||
        !articleReadThresholdReached({
          scrollTop: window.scrollY,
          viewportHeight: window.innerHeight,
          documentHeight: document.documentElement.scrollHeight,
        })
      ) {
        return;
      }

      hasTracked = true;
      trackAnalyticsEvent({ name: "article_read", slug });
      window.removeEventListener("scroll", checkProgress);
    }

    checkProgress();
    window.addEventListener("scroll", checkProgress, { passive: true });
    return () => window.removeEventListener("scroll", checkProgress);
  }, [slug]);

  return null;
}

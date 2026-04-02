// src/contexts/ReviewsContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { REVIEWS_FUNCTION_URL } from "@/config";

type ReviewsContextShape = {
  rating: number | null;
  userRatingCount: number | null;
  reviews: any[];
  loading: boolean;
  error: string | null;
};

const ReviewsContext = createContext<ReviewsContextShape>({
  rating: null,
  userRatingCount: null,
  reviews: [],
  loading: true,
  error: null,
});

// ---- Caching config ----
// How long cached data is considered "fresh" (no network call):
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const CACHE_KEY = "jn_reviews_v2"; // bump if you change the shape

type CachePayload = {
  rating: number | null;
  userRatingCount: number | null;
  reviews: any[];
  fetchedAt: number; // epoch ms
};

function readCache(): CachePayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload;
    if (
      typeof parsed?.fetchedAt === "number" &&
      Array.isArray(parsed?.reviews)
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeCache(payload: CachePayload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore write errors (e.g., Safari private mode)
  }
}

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [rating, setRating] = useState<number | null>(null);
  const [userRatingCount, setUserRatingCount] = useState<number | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const cached = readCache();
    const now = Date.now();

    // 1) Hydrate immediately from cache (if available)
    if (cached) {
      setRating(cached.rating);
      setUserRatingCount(cached.userRatingCount);
      setReviews(cached.reviews);
      setLoading(false);
    }

    // 2) Decide whether to hit the network
    const isFresh = cached && now - cached.fetchedAt < CACHE_TTL_MS;

    if (isFresh) {
      // Fresh enough: skip network entirely
      return;
    }

    // Stale or no cache: do stale-while-revalidate
    // Show cached (if any), but refresh in background
    const controller = new AbortController();

    (async () => {
      try {
        if (!cached) setLoading(true);
        setError(null);

        const res = await fetch(REVIEWS_FUNCTION_URL, {
          method: "GET",
          signal: controller.signal,
          // Leverage browser HTTP cache too; your CF should send Cache-Control
          cache: "default",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (!alive) return;

        const payload: CachePayload = {
          rating: json?.rating ?? null,
          userRatingCount: json?.userRatingCount ?? null,
          reviews: Array.isArray(json?.reviews) ? json.reviews : [],
          fetchedAt: Date.now(),
        };

        // Update state
        setRating(payload.rating);
        setUserRatingCount(payload.userRatingCount);
        setReviews(payload.reviews);
        setError(null);
        setLoading(false);

        // Persist to cache
        writeCache(payload);
      } catch (e: any) {
        if (!alive) return;
        // If we had cache, keep showing it; otherwise surface error
        if (!cached) {
          setError("Unable to load reviews right now.");
          setLoading(false);
        }
      }
    })();

    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  const value = useMemo(
    () => ({ rating, userRatingCount, reviews, loading, error }),
    [rating, userRatingCount, reviews, loading, error]
  );

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviewsContext() {
  return useContext(ReviewsContext);
}

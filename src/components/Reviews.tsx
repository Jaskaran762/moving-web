import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Quote, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReviewsContext } from "@/contexts/ReviewsContext";

// ---- Local helpers ----
function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="inline-flex items-center" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < full ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function clampText(s = "", max = 220) {
  if (s.length <= max) return s;
  return s.slice(0, max).trimEnd() + "…";
}

function extractPlaceId(reviews: any[]): string | undefined {
  // review.name looks like: "places/<PLACE_ID>/reviews/<REVIEW_ID>"
  const first = reviews?.[0]?.name || "";
  const parts = first.split("/");
  const idx = parts.indexOf("places");
  if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  return undefined;
}

export default function Reviews() {
  const { rating, userRatingCount, reviews, loading, error } = useReviewsContext();

  const topReviews = useMemo(() => {
    const list = Array.isArray(reviews) ? reviews : [];
    return [...list]
      .sort((a, b) => {
        const ta = a?.publishTime ? Date.parse(a.publishTime) : 0;
        const tb = b?.publishTime ? Date.parse(b.publishTime) : 0;
        return tb - ta;
      })
      .slice(0, 6);
  }, [reviews]);

  const placeId = useMemo(() => extractPlaceId(reviews), [reviews]);

  const googleBusinessUrl = useMemo(
    () => (placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : undefined),
    [placeId]
  );

  // Inject AggregateRating + a few Review items for SEO
  const jsonLd = useMemo(() => {
    if (rating == null || userRatingCount == null) return null;
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JunkNerds Halifax - Junk Removal",
      "url": "https://junknerds.ca/",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating,
        "reviewCount": userRatingCount
      }
    };
  }, [rating, userRatingCount]);

  return (
    <section className="py-16 bg-white" aria-labelledby="reviews-title">
      {jsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-xl">
          <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-white">
            <CardTitle id="reviews-title" className="text-2xl flex items-center gap-2">
              <Quote className="h-5 w-5 text-emerald-600" />
              What customers are saying
            </CardTitle>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-700">
              {loading ? (
                <span className="opacity-70">Loading rating…</span>
              ) : rating != null && userRatingCount != null ? (
                <>
                  <Stars rating={rating} />
                  <span className="font-medium">{rating.toFixed(1)} / 5</span>
                  <span className="text-gray-500">({userRatingCount}+ reviews)</span>
                  {googleBusinessUrl ? (
                    <a
                      href={googleBusinessUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline font-medium"
                    >
                      Read on Google
                    </a>
                  ) : null}
                </>
              ) : (
                <span className="opacity-70">Reviews unavailable</span>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Loading state */}
            {loading && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl border p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-28 bg-gray-200 rounded" />
                        <div className="h-3 w-16 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error fallback */}
            {!loading && error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {/* Reviews grid */}
            {!loading && !error && topReviews.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topReviews.map((r: any) => {
                  const body = r?.originalText?.text || r?.text?.text || "";
                  const author = r?.authorAttribution?.displayName || "Google user";
                  return (
                    <article
                      key={r?.name}
                      className="rounded-2xl border p-4 shadow-sm bg-white"
                      itemScope
                      itemType="https://schema.org/Review"
                    >
                      <div className="flex items-center gap-3">
                        {r?.authorAttribution?.photoUri ? (
                          <img
                            src={r.authorAttribution.photoUri}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-emerald-100" />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900" itemProp="author">
                            {author}
                          </div>
                          <div className="text-xs text-gray-500">
                            {r?.relativePublishTimeDescription || ""}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Stars rating={r?.rating ?? 5} />
                        <span className="text-xs text-gray-500">
                          {(r?.rating ?? 5).toFixed(0)}/5
                        </span>
                      </div>

                      <p className="mt-3 text-gray-700" itemProp="reviewBody">
                        {clampText(body)}
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        {r?.googleMapsUri ? (
                          <a
                            href={r.googleMapsUri}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-emerald-700 hover:underline"
                            aria-label="Read this review on Google"
                          >
                            View on Google
                          </a>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* CTA row */}
            {!loading && !error && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                  Ready to experience 5-star service?
                </p>
                <div className="flex gap-2">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <a href="/appointment">Book a free quote</a>
                  </Button>
                  {googleBusinessUrl ? (
                    <Button asChild variant="outline" className="border-emerald-600 text-emerald-700">
                      <a href={googleBusinessUrl} target="_blank" rel="noreferrer">
                        Write a review
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

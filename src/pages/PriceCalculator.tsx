import { useMemo, useState, useId } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Truck } from "lucide-react";
import { Helmet } from "react-helmet-async";

// ------------------------------------------------------------
// Price model
// ------------------------------------------------------------
const FULL_TRUCK_BASE: Record<string, number> = {
  furniture: 550,
  appliances: 600,
  electronics: 500,
  construction: 650,
  household: 525,
  yard: 475,
};
const MIN_FEE = 99;
const HST_RATE = 0.14;

const SERVICE_OPTIONS = [
  { value: "furniture", label: "Furniture Removal" },
  { value: "appliances", label: "Appliance Pickup" },
  { value: "electronics", label: "Electronic Waste" },
  { value: "construction", label: "Construction Debris" },
  { value: "household", label: "Household Items" },
  { value: "yard", label: "Yard Waste" },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);
}
function computePrice(service: string, fraction: number) {
  const full = FULL_TRUCK_BASE[service] ?? 500;
  const subtotal = Math.max(MIN_FEE, Math.round(full * fraction));
  const tax = Math.round(subtotal * HST_RATE);
  const total = subtotal + tax;
  return { full, subtotal, tax, total };
}

// Approx capacity by service (very rough, volume-based)
// Counts assume a standard 12–15 yd³ junk truck; real loads vary by item size.
const CAPACITY: Record<string, { unit: string; full: number }> = {
  furniture: { unit: "large items", full: 8 },
  appliances: { unit: "full-size appliances", full: 4 },
  electronics: { unit: "medium boxes of e-waste", full: 24 },
  construction: { unit: "contractor bags (42-gal)", full: 28 },
  household: { unit: "medium boxes", full: 30 },
  yard: { unit: "yard bags", full: 24 },
};

function computeItems(service: string, fraction: number) {
  const cap = CAPACITY[service] ?? CAPACITY.household;
  const clamped = Math.max(0, Math.min(1, fraction));
  // Round to a clean number; show 0 when empty
  const count = Math.round(cap.full * clamped);
  return { count, unit: cap.unit };
}


// ------------------------------------------------------------
// SVG truck with dynamic fill (0..1)
// ------------------------------------------------------------
function TruckSVG({ fraction }: { fraction: number }) {
  const id = useId();
  const bed = { x: 320, y: 130, w: 300, h: 150, r: 12 };

  const clamped = Math.max(0, Math.min(1, fraction));
  const pct = Math.round(clamped * 100);

  // >>> Horizontal fill (left -> right)
  const fillW = bed.w * clamped;
  const fillX = bed.x; // start at left edge of bed

  return (
    <svg viewBox="30 30 600 400" className="w-full h-full" role="img" aria-label={`${pct}% full truck`}>
      <defs>
        <clipPath id={id}>
          <rect x={bed.x} y={bed.y} width={bed.w} height={bed.h} rx={bed.r} ry={bed.r} />
        </clipPath>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx={350} cy={330} rx={260} ry={28} fill="black" opacity={0.06} />

      {/* cab */}
      <rect x={120} y={130} width={220} height={150} rx={18} fill="#e8faf3" stroke="#1f2937" strokeWidth={3} />
      <rect x={155} y={150} width={130} height={60} rx={10} fill="#ffffff" opacity={0.9} />
      <text x={175} y={235} fontSize={22} fontWeight={800} fill="#059669" style={{ letterSpacing: "1px" }}>
        JunkNerds
      </text>

      {/* bed outline */}
      <rect x={bed.x} y={bed.y} width={bed.w} height={bed.h} rx={bed.r} fill="#f1f5f9" stroke="#1f2937" strokeWidth={3} />

      {/* horizontal fill inside the bed */}
      <g clipPath={`url(#${id})`}>
        <rect
          x={fillX}
          y={bed.y}
          width={fillW}
          height={bed.h}
          fill={`url(#${id}-grad)`}
        />
      </g>

      {/* optional: marker line at the current slider position */}
      <line
        x1={bed.x + fillW}
        y1={bed.y}
        x2={bed.x + fillW}
        y2={bed.y + bed.h}
        stroke="#065f46"
        strokeDasharray="4 4"
        strokeWidth={2}
        opacity={clamped > 0 && clamped < 1 ? 0.6 : 0}
      />

      {/* baseline + wheels */}
      <line x1={100} y1={280} x2={630} y2={280} stroke="#1f2937" strokeWidth={3} />
      <circle cx={240} cy={300} r={42} fill="#111827" />
      <circle cx={240} cy={300} r={20} fill="#e5e7eb" />
      <circle cx={540} cy={300} r={46} fill="#111827" />
      <circle cx={540} cy={300} r={22} fill="#e5e7eb" />

      {/* label */}
      <text x={bed.x + 12} y={bed.y + 22} fontSize={16} fontWeight={700} fill="#111827">
        {pct}% full
      </text>
    </svg>
  );
}


// ------------------------------------------------------------
// Page
// ------------------------------------------------------------
export default function PriceCalculator() {
  const [service, setService] = useState<string>("furniture");
  // 0=empty,1=1/4,2=1/2,3=3/4,4=full
  const [ticks, setTicks] = useState<number>(1);
  const fraction = useMemo(() => Math.min(1, Math.max(0, ticks / 4)), [ticks]);
  const estimate = computePrice(service, fraction);
  const pctLabel = useMemo(() => `${Math.round(fraction * 100)}%`, [fraction]);
  const itemsNow = computeItems(service, fraction);

  const bookingHref = `/#appointment`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO */}
      <Helmet>
        <title>Junk Removal Pricing | Halifax Truck Volume Estimator | JunkNerds</title>
        <meta
          name="description"
          content="Estimate junk removal cost by truck volume. See ballpark pricing for Halifax services, then book online."
        />
        <link rel="canonical" href="https://junknerds.ca/price-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Junk Removal Pricing | Halifax Truck Volume Estimator | JunkNerds" />
        <meta property="og:description" content="Estimate junk removal cost by truck volume. See ballpark pricing for Halifax services, then book online." />
        <meta property="og:url" content="https://junknerds.ca/price-calculator" />
        <meta property="og:image" content="https://junknerds.ca/dashboard/junknerds.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Junk Removal Pricing | Halifax Truck Volume Estimator | JunkNerds" />
        <meta name="twitter:description" content="Estimate junk removal cost by truck volume. See ballpark pricing for Halifax services, then book online." />
        <meta name="twitter:image" content="https://junknerds.ca/dashboard/junknerds.jpg" />
      </Helmet>

      <Header />
      <main className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <Card className="border-0 shadow-xl">
            <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-white">
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <Truck className="h-5 w-5" />
                <span className="text-xs font-semibold tracking-wide uppercase">Price helper</span>
              </div>
              <CardTitle className="text-2xl"><h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Free Junk Removal Price Estimate
              </h1></CardTitle>
              <p className="text-sm text-gray-600">
                Pick a service type and move the slider to see how load size affects your estimate. This is a ballpark—final prices are confirmed on site.
              </p>
            </CardHeader>

            <CardContent className="p-6 space-y-6 sm:space-y-8">
              {/* 1) Service type */}
              <section className="space-y-2">
                <Label className="text-sm font-medium text-gray-800">Service type</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>

              {/* 2) Vector truck */}
              <section className="relative rounded-2xl border bg-white p-3 sm:p-4 shadow-sm">
                <div className="w-full h-[280px] sm:h-[400px] lg:h-[460px]">
                  <TruckSVG fraction={fraction} />
                </div>
                <div className="mt-1 sm:mt-2 text-center text-xs text-gray-500">Showing {ticks}/4 full</div>
              </section>

              {/* 3) Slider */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-800">How full is the truck?</Label>
                  <span className="text-sm tabular-nums text-gray-600">{pctLabel}</span>
                </div>
                <Slider
                  min={0}
                  max={4}
                  step={1}
                  value={[ticks]}
                  onValueChange={(v) => setTicks(v?.[0] ?? ticks)}
                />
                <p className="text-xs text-gray-500">Tip: 2/4 is exactly half a truck.</p>
              </section>

              {/* 3b) Approx items per fill */}
              <section className="rounded-xl border p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left: title (+ % badge only on mobile) */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-gray-800">Approx. items by fill</Label>
                    <span className="sm:hidden inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] text-gray-600">
                      ~{pctLabel}
                    </span>
                  </div>

                  {/* Right: current count (wrap nicely on small screens) */}
                  <div className="text-sm text-gray-700 sm:text-right">
                    <span className="hidden sm:inline text-gray-600">Current (~{pctLabel}): </span>
                    <strong className="font-semibold">{itemsNow.count}</strong>{" "}
                    <span className="text-gray-500 whitespace-normal break-words">
                      {computeItems(service, fraction).unit}
                    </span>
                  </div>
                </div>

                <ul className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
                  {[0, 1, 2, 3, 4].map((n) => {
                    const frac = n / 4;
                    const { count, unit } = computeItems(service, frac);
                    const active = n === ticks;
                    return (
                      <li
                        key={n}
                        className={
                          "rounded-lg border p-2 " +
                          (active ? "bg-emerald-50 border-emerald-200" : "bg-white")
                        }
                      >
                        <div className="text-xs text-gray-500">{n}/4 ({Math.round(frac * 100)}%)</div>
                        <div className="font-semibold">{count} {unit}</div>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-2 text-[11px] text-gray-500">
                  Estimates are volume-based and vary with item size/shape and stacking.
                </p>
              </section>


              {/* 4) Estimate + CTA */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Estimate breakdown */}
                <div className="rounded-xl border bg-gray-50 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-gray-600">Base (full truck) for this service</span>
                    <span className="text-sm font-semibold">{formatCurrency(estimate.full)}</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-sm text-gray-600">Your load (~{pctLabel})</span>
                    <span className="text-lg font-semibold">{formatCurrency(estimate.subtotal)}</span>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-sm text-gray-600">HST (14%)</span>
                    <span className="text-sm">{formatCurrency(estimate.tax)}</span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between border-t pt-3">
                    <span className="text-sm font-semibold">Estimated total</span>
                    <span className="text-xl font-bold text-emerald-600">{formatCurrency(estimate.total)}</span>
                  </div>
                  <p className="mt-2 text-[11px] text-gray-500">
                    Heavy items (e.g., concrete, drywall) or special handling may adjust the on-site quote.
                  </p>
                </div>

                {/* CTA to appointment form */}
                <div className="space-y-4">
                  <div className="rounded-xl border p-4">
                    <p className="text-sm text-gray-700">Ready to schedule a pickup?</p>
                    <p className="text-xs text-gray-500">No obligation — we confirm on site before we start.</p>
                    <Button asChild className="mt-3 w-full bg-green-600 hover:bg-green-700">
                      <a href={bookingHref} aria-label="Get a free estimate">Book your pickup</a>
                    </Button>
                    <p className="mt-2 text-[11px] text-gray-500">This button will send you to the appointment form.</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

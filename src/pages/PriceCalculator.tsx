import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Truck, Clock, ShieldCheck, Info } from "lucide-react";
import { Helmet } from "react-helmet-async";

// ------------------------------------------------------------
// Price model: Hourly Moving
// ------------------------------------------------------------
const HOURLY_RATE = 100;
const MIN_HOURS = 3;
const HST_RATE = 0.14;

// Insurance tiers based on value of goods
const INSURANCE_OPTIONS = [
  { value: "0", label: "Basic Valuation (Included)" },
  { value: "150", label: "Full Coverage - Up to $10,000 Value (+$150)" },
  { value: "400", label: "Full Coverage - Up to $50,000 Value (+$400)" },
  { value: "800", label: "Full Coverage - Up to $100,000+ Value (+$800)" },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);
}

function computePrice(hours: number, insuranceCost: number) {
  const safeHours = Math.max(MIN_HOURS, hours);
  const labor = safeHours * HOURLY_RATE;
  const subtotal = labor + insuranceCost;
  const tax = subtotal * HST_RATE;
  const total = subtotal + tax;
  return { labor, insuranceCost, subtotal, tax, total };
}

// ------------------------------------------------------------
// Page
// ------------------------------------------------------------
export default function PriceCalculator() {
  const [hours, setHours] = useState<number>(MIN_HOURS);
  const [insuranceCost, setInsuranceCost] = useState<number>(0);

  const estimate = useMemo(() => computePrice(hours, insuranceCost), [hours, insuranceCost]);

  const bookingHref = `/#appointment`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO */}
      <Helmet>
        <title>Moving Pricing | Hourly Cost Estimator | Moving Nerds</title>
        <meta
          name="description"
          content="Estimate your moving costs with our hourly pricing calculator. See ballpark pricing for Halifax relocations, then book online."
        />
        <link rel="canonical" href="https://movingnerds.ca/price-calculator" />
      </Helmet>

      <Header />
      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <Card className="border-0 shadow-xl">
            <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Truck className="h-5 w-5" />
                <span className="text-xs font-semibold tracking-wide uppercase">Price Helper</span>
              </div>
              <CardTitle className="text-2xl">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Free Moving Cost Estimator
                </h1>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Adjust the estimated hours and insurance coverage below to get a ballpark figure for your move.
              </p>
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-2 bg-amber-50 text-amber-800 rounded-md text-xs font-medium border border-amber-200 w-fit">
                <Info className="h-4 w-4" />
                <span>This is only a pre-estimate. Call for more details and final confirmation.</span>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* LEFT COLUMN: Inputs */}
                <div className="space-y-8">
                  {/* 1) Hours Slider */}
                  <section className="space-y-4 rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <Label className="text-base font-medium text-gray-800">Estimated Duration</Label>
                      </div>
                      <span className="text-lg font-bold text-orange-600">{hours} Hours</span>
                    </div>
                    
                    <Slider
                      min={MIN_HOURS}
                      max={12}
                      step={1}
                      value={[hours]}
                      onValueChange={(v) => setHours(v?.[0] ?? MIN_HOURS)}
                      className="py-4"
                    />
                    <p className="text-xs text-gray-500">
                      Standard rate is {formatCurrency(HOURLY_RATE)}/hr (Minimum {MIN_HOURS} hours applies).
                    </p>

                    {/* Typical Move Guide */}
                    <div className="mt-4 bg-gray-50 rounded-lg p-3 border text-sm">
                      <p className="font-semibold text-gray-700 mb-2 text-xs uppercase tracking-wider">Typical Move Times</p>
                      <ul className="space-y-1 text-gray-600 text-xs">
                        <li>• <strong>1 Bedroom Apt:</strong> 3 - 4 hours</li>
                        <li>• <strong>2 Bedroom Apt/House:</strong> 4 - 6 hours</li>
                        <li>• <strong>3 Bedroom House:</strong> 6 - 8 hours</li>
                        <li>• <strong>4+ Bedroom House:</strong> 8 - 12+ hours</li>
                      </ul>
                    </div>
                  </section>

                  {/* 2) Insurance Selection */}
                  <section className="space-y-3 rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-gray-500" />
                      <Label className="text-base font-medium text-gray-800">Property Coverage</Label>
                    </div>
                    <Select value={insuranceCost.toString()} onValueChange={(val) => setInsuranceCost(Number(val))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select insurance coverage" />
                      </SelectTrigger>
                      <SelectContent>
                        {INSURANCE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Protect your belongings during transit. Basic valuation is included by default.
                    </p>
                  </section>
                </div>

                {/* RIGHT COLUMN: Estimate Breakdown */}
                <div className="space-y-4">
                  <div className="rounded-xl border bg-gray-50 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Estimate Breakdown</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-gray-600">Labor ({hours} hours @ ${HOURLY_RATE}/hr)</span>
                        <span className="text-sm font-medium">{formatCurrency(estimate.labor)}</span>
                      </div>
                      
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-gray-600">Insurance / Valuation</span>
                        <span className="text-sm font-medium">{formatCurrency(estimate.insuranceCost)}</span>
                      </div>
                      
                      <div className="flex items-baseline justify-between border-t border-gray-200 pt-3">
                        <span className="text-sm font-semibold text-gray-800">Subtotal</span>
                        <span className="text-base font-semibold">{formatCurrency(estimate.subtotal)}</span>
                      </div>
                      
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-gray-600">HST (14%)</span>
                        <span className="text-sm">{formatCurrency(estimate.tax)}</span>
                      </div>
                      
                      <div className="mt-4 flex items-baseline justify-between rounded-lg bg-orange-50 p-3 border border-orange-100">
                        <span className="text-base font-bold text-gray-900">Estimated Total</span>
                        <span className="text-2xl font-black text-orange-700">{formatCurrency(estimate.total)}</span>
                      </div>
                    </div>
                    
                    <p className="mt-4 text-[11px] text-gray-500 leading-relaxed text-center">
                      * Travel time, heavy items (e.g., pianos, safes), and packing supplies may incur additional charges. <br/>
                      <strong>This is only a pre-estimate. Call for more details.</strong>
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="rounded-xl border p-5 text-center bg-white">
                    <h4 className="text-sm font-bold text-gray-900 mb-1">Ready to start your move?</h4>
                    <p className="text-xs text-gray-500 mb-4">Contact us to lock in your date and confirm details.</p>
                    <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base">
                      <a href={bookingHref} aria-label="Book your move">Request Final Quote</a>
                    </Button>
                    <p className="mt-3 text-[11px] text-gray-400">
                      Or call us directly at (902) 412-8566
                    </p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
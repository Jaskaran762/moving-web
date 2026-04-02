import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Services from '@/components/Services';
import AppointmentForm from '@/components/AppointmentForm';
import { Button } from '@/components/ui/button';
import { Star, CheckCircle, Truck } from 'lucide-react';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import GoogleReviews from "@/components/GoogleReviews";
import Reviews from '@/components/Reviews';
import { useReviewsContext } from "@/contexts/ReviewsContext";

const Index = () => {
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Counter states
  const [jobs, setJobs] = useState(0);
  const [response, setResponse] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [recycled, setRecycled] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Observe the stats section entering view
  const statsRef = useRef<HTMLElement | null>(null);

  const { rating, userRatingCount, loading } = useReviewsContext();

  // Effect #1: just observes; flips the flag when stats section enters viewport
  useEffect(() => {
    if (hasAnimated) return;
    const node = statsRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Effect #2: starts counters when hasAnimated becomes true
  useEffect(() => {
    if (!hasAnimated) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (prefersReduced) {
      setJobs(5000);
      setResponse(24);
      setSatisfaction(100);
      setRecycled(80);
      return;
    }

    const i1 = window.setInterval(() => {
      setJobs((prev) => {
        if (prev >= 5000) {
          clearInterval(i1);
          return 5000;
        }
        return prev + 50;
      });
    }, 10);

    const i2 = window.setInterval(() => {
      setResponse((prev) => {
        if (prev >= 24) {
          clearInterval(i2);
          return 24;
        }
        return prev + 1;
      });
    }, 100);

    const i3 = window.setInterval(() => {
      setSatisfaction((prev) => {
        if (prev >= 100) {
          clearInterval(i3);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const i4 = window.setInterval(() => {
      setRecycled((prev) => {
        if (prev >= 80) {
          clearInterval(i4);
          return 80;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(i1);
      clearInterval(i2);
      clearInterval(i3);
      clearInterval(i4);
    };
  }, [hasAnimated]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>JunkNerds | Junk Removal Halifax & HRM | Same-Day Pickup</title>
        <meta
          name="description"
          content="JunkNerds provides fast, insured junk removal in Halifax & HRM. Same-day service and free quotes."
        />
        <link rel="canonical" href="https://junknerds.ca/" />

        {/* OG/Twitter for the homepage only */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="JunkNerds" />
        <meta property="og:title" content="JunkNerds | Junk Removal Halifax & HRM | Same-Day Pickup" />
        <meta property="og:description" content="Fast, eco-friendly junk removal in Halifax & HRM. Free quotes. Call (902) 412-8566." />
        <meta property="og:url" content="https://junknerds.ca/" />
        <meta property="og:image" content="https://junknerds.ca/dashboard/junknerds.jpg" />
        <meta property="og:locale" content="en_CA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JunkNerds | Junk Removal Halifax & HRM | Same-Day Pickup" />
        <meta name="twitter:description" content="Free quotes. Same-day service. Call (902) 412-8566." />
        <meta name="twitter:image" content="https://junknerds.ca/dashboard/junknerds.jpg" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col justify-between bg-white"
        style={{
          backgroundImage: `
      linear-gradient(135deg, rgba(240,253,244,.10), rgba(239,246,255,.10)),
      url('https://junknerds.ca/dashboard/junknerds.jpg')
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content Wrapper */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Fast & Reliable
                <span className="text-4xl lg:text-6xl text-white block"> Junk Removal</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 font-bold leading-relaxed">
                Same-day service available! We remove furniture, appliances, electronics,
                construction debris, and more. Professional, insured, and eco-friendly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={scrollToAppointment}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
                >
                  Get Free Estimate
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-6"
                >
                  <a href="tel:+19024128566" aria-label="Call (902) 412-8566">
                    Call (902) 412-8566
                  </a>
                </Button>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-white/90">{loading ? (
                    <span className="opacity-70">Loading rating…</span>
                  ) : rating && userRatingCount ? (
                    <>
                      <span className="font-semibold">{rating.toFixed(1)}/5</span>
                      <span className="text-gray-500">({userRatingCount}+ reviews)</span>
                    </>
                  ) : (
                    <span className="opacity-70">Reviews unavailable</span>
                  )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Banner at Bottom (responsive + no overflow) */}
        <div className="w-full flex justify-center pb-6 px-4 sm:px-6">
          <div className="relative inline-block w-full max-w-md rounded-xl overflow-hidden">
            {/* Soft pulse background (clipped, so no horizontal scroll) */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl bg-green-400/40 animate-ping"
              aria-hidden
            />
            <a href="#appointment" aria-label="Book online and get ten percent off" className="block">
              <div className="relative z-10 bg-white text-green-700 font-bold
                      text-[clamp(1rem,4vw,1.5rem)]
                      px-4 py-3 sm:px-8 sm:py-4
                      rounded-xl shadow-xl text-center leading-tight">
                {/* Mobile: stack text on two lines */}
                <span className="sm:hidden block">Book Online</span>
                <span className="sm:hidden block">
                  Get <span className="text-green-600">10% OFF!</span>
                </span>
                {/* Desktop: single line */}
                <span className="hidden sm:inline">
                  Book Online & Get <span className="text-green-600">10% OFF!</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose JunkNerds Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          {/* Why Choose JunkNerds */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <Truck className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Why Choose JunkNerds?</h3>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Same-Day Service', desc: 'Quick response for urgent removals' },
                  { title: 'Fully Licensed & Insured', desc: 'Your property is protected' },
                  { title: 'Eco-Friendly Disposal', desc: 'We recycle and donate when possible' },
                  { title: 'Transparent Pricing', desc: 'No hidden fees or surprises' },
                ].map((f, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{f.title}</h4>
                      <p className="text-gray-600">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
              </div>

              <div className="space-y-6">
                {[
                  { step: '1. Book Online or Call', desc: 'Schedule easily with our simple booking form' },
                  { step: '2. Get an Estimate', desc: 'We provide a quick, upfront estimate' },
                  { step: '3. We Load Your Junk', desc: 'Our crew arrives and hauls everything away' },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{s.step}</h4>
                      <p className="text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Stats */}
      <section ref={statsRef} className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{jobs}+</div>
              <div className="text-gray-300">Jobs Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{response}hrs</div>
              <div className="text-gray-300">Average Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{satisfaction}%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{recycled}%</div>
              <div className="text-gray-300">Items Recycled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services anchor for /#services links */}
      <section id="services">
        <Services />
      </section>

      {/* Services anchor for /#reviews links */}
      <section id="reviews">
        <GoogleReviews />
        {/* Reviews pulled from Google */}
        <Reviews />
      </section>

      {/* Appointment anchor for scroll + CTA */}
      <section id="appointment">
        <AppointmentForm />
      </section>

      <Footer />
    </div>
  );
};

export default Index;

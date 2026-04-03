import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Services from '@/components/Services';
import AppointmentForm from '@/components/AppointmentForm';
import { Button } from '@/components/ui/button';
import { CheckCircle, Truck } from 'lucide-react';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useReviewsContext } from "@/contexts/ReviewsContext";

const Index = () => {
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Counter states for Startup Moving Company
  const [jobs, setJobs] = useState(0);
  const [response, setResponse] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
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

    // Target values for a believable startup moving company
    const TARGET_JOBS = 150;
    const TARGET_RESPONSE = 2;
    const TARGET_SATISFACTION = 99;

    if (prefersReduced) {
      setJobs(TARGET_JOBS);
      setResponse(TARGET_RESPONSE);
      setSatisfaction(TARGET_SATISFACTION);
      return;
    }

    const i1 = window.setInterval(() => {
      setJobs((prev) => {
        if (prev >= TARGET_JOBS) {
          clearInterval(i1);
          return TARGET_JOBS;
        }
        return prev + 2;
      });
    }, 15);

    const i2 = window.setInterval(() => {
      setResponse((prev) => {
        if (prev >= TARGET_RESPONSE) {
          clearInterval(i2);
          return TARGET_RESPONSE;
        }
        return prev + 1;
      });
    }, 400); // Slower interval for smaller numbers

    const i3 = window.setInterval(() => {
      setSatisfaction((prev) => {
        if (prev >= TARGET_SATISFACTION) {
          clearInterval(i3);
          return TARGET_SATISFACTION;
        }
        return prev + 1;
      });
    }, 20);

    return () => {
      clearInterval(i1);
      clearInterval(i2);
      clearInterval(i3);
    };
  }, [hasAnimated]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Moving Nerds | Professional Movers in Halifax & HRM</title>
        <meta
          name="description"
          content="Moving Nerds provides fast, fully insured moving services in Halifax & HRM. Residential, commercial, and same-day service available. Get a free quote today!"
        />
        <link rel="canonical" href="https://movingnerds.ca/" />
        <link
          rel="preload"
          as="image"
          href="/dashboard/movingnerds.jpg"
        />

        {/* OG/Twitter for the homepage only */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Moving Nerds" />
        <meta property="og:title" content="Moving Nerds | Professional Movers in Halifax & HRM" />
        <meta property="og:description" content="Fast, fully insured moving service in Halifax & HRM. Residential and commercial moves. Free quotes. Call (902) 412-8566." />
        <meta property="og:url" content="https://movingnerds.ca/" />
        <meta property="og:image" content="https://movingnerds.ca/dashboard/movingnerds.jpg" />
        <meta property="og:locale" content="en_CA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Moving Nerds | Professional Movers in Halifax & HRM" />
        <meta name="twitter:description" content="Free quotes. Secure transport. Call (902) 412-8566." />
        <meta name="twitter:image" content="https://movingnerds.ca/dashboard/movingnerds.jpg" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col justify-between bg-white"
        style={{
          backgroundImage: `
      linear-gradient(135deg, rgba(240,253,244,.10), rgba(239,246,255,.10)),
      url('/dashboard/movingnerds.jpg')
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* Overlay - Fixed blur class and darkened slightly */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-none" />

        {/* Content Wrapper */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 justify-items-start w-full">

            {/* Added lg:-ml-[10%] to pull this block 10% further left on large screens */}
            <div className="w-full lg:-ml-[10%]">

              {/* Added drop-shadow-lg for better text separation */}
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Fast & Reliable
                <span className="text-4xl lg:text-6xl text-white block"> Moving Service</span>
              </h1>
              <p className="text-white text-lg sm:text-base font-semibold mb-3 drop-shadow-md tracking-wide content-center">
                Your trusted Halifax moving team! We handle full-home relocations, apartments, and commercial moves.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={scrollToAppointment}
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6 shadow-lg shadow-orange-900/50 border-none"
                >
                  Get Free Estimate
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/50 text-white hover:bg-white/20 hover:text-white text-lg px-8 py-6 backdrop-blur-sm"
                >
                  <a href="tel:+19024128566" aria-label="Call (902) 412-8566">
                    Call (902) 412-8566
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Banner at Bottom */}
        <div className="w-full flex flex-col items-center justify-center pb-8 px-4 sm:px-6">
          {/* New Text Above Button */}
          <p className="text-white text-sm sm:text-base font-semibold mb-3 drop-shadow-md tracking-wide">
            Ready for a stress-free move? Lock in your date today!
          </p>

          <div className="relative inline-block w-full max-w-md rounded-xl overflow-hidden">
            {/* Soft pulse background */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl bg-orange-400/40 animate-ping"
              aria-hidden
            />
            <a href="#appointment" aria-label="Book online and get ten percent off" className="block">
              <div className="relative z-10 bg-white text-orange-700 font-bold
                      text-[clamp(1rem,4vw,1.5rem)]
                      px-4 py-3 sm:px-8 sm:py-4
                      rounded-xl shadow-xl text-center leading-tight">
                {/* Mobile: stack text on two lines */}
                <span className="sm:hidden block">Book Online</span>
                <span className="sm:hidden block">
                  Get <span className="text-orange-600">10% OFF!</span>
                </span>
                {/* Desktop: single line */}
                <span className="hidden sm:inline">
                  Book Online & Get <span className="text-orange-600">10% OFF!</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Moving Nerds Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          {/* Why Choose Moving Nerds */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <Truck className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Why Choose Moving Nerds?</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Flexible & Same-Day Moves',
                    desc: 'Quick response for urgent and last-minute relocations'
                  },
                  {
                    title: 'Fully Licensed & Insured',
                    desc: 'Your belongings and home are completely protected'
                  },
                  {
                    title: 'Expert Handling',
                    desc: 'Professional wrapping, packing, and secure transport'
                  },
                  {
                    title: 'Transparent Pricing',
                    desc: 'Accurate, upfront estimates with no hidden fees'
                  },
                ].map((f, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-orange-500 mt-0.5" />
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
                  {
                    step: '1. Book Online or Call',
                    desc: 'Schedule your move easily with our simple booking form'
                  },
                  {
                    step: '2. Get an Estimate',
                    desc: 'We provide a clear, upfront moving quote with no surprises'
                  },
                  {
                    step: '3. We Handle the Move',
                    desc: 'Our expert crew safely loads, transports, and unloads your belongings'
                  },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-orange-500 mt-0.5" />
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
              <div className="text-3xl font-bold text-orange-400 mb-2">{jobs}+</div>
              <div className="text-gray-300">Successful Moves</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">&lt; {response} hrs</div>
              <div className="text-gray-300">Quote Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">{satisfaction}%</div>
              <div className="text-gray-300">On-Time Arrival</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">0</div>
              <div className="text-gray-300">Hidden Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services anchor */}
      <section id="services">
        <Services />
      </section>

      {/* Appointment anchor */}
      <section id="appointment">
        <AppointmentForm />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
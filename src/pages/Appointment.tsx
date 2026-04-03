import { Truck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Appointment = () => {
  const canonical = "https:movingnerds.ca/appointment";
  const heroImage = "https:movingnerds.ca/dashboardmovingnerds.jpg";
  const ldBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https:movingnerds.ca/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Appointment",
        "item": canonical
      }
    ]
  };

  const ldHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to book your moving service appointment",
    "step": [
      { "@type": "HowToStep", "name": "Choose service type" },
      { "@type": "HowToStep", "name": "Pick your preferred date and time" },
      { "@type": "HowToStep", "name": "Submit the form to confirm request" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Book Moving in Halifax | Free Quote | Moving Nerds Appointment</title>
        <meta
          name="description"
          content="Same-day moving service appointments in Halifax & all over HRM. Free quotes and transparent pricing."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Book Moving in Halifax | Free Quote | Moving Nerds" />
        <meta
          property="og:description"
          content="Same-day moving service appointments in HRM. Free quotes and transparent pricing."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Moving in Halifax | Moving Nerds" />
        <meta
          name="twitter:description"
          content="Schedule your moving service-fast, insured, and eco-friendly."
        />
        <meta name="twitter:image" content={heroImage} />
        <script type="application/ld+json">{JSON.stringify(ldBreadcrumbs)}</script>
        <script type="application/ld+json">{JSON.stringify(ldHowTo)}</script>
      </Helmet>

      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-2 text-orange-600 mb-1">
              <Truck className="h-5 w-5" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                BOOK AN APPOINTMENT
              </span>
            </div>

            {/* Use a true H1 for SEO semantics */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Get Your Free Moving Quote
            </h1>

            <p className="text-xs text-gray-600 mt-2">
              Enter your details below to receive a free, no-obligation estimate. 
              Expert handling and stress-free transport across the HRM. Prefer to talk? Call{' '}
              <a href="tel:+19024128566" className="font-semibold text-orange-700 hover:underline">
                (902) 412-8566
              </a>.
            </p>

            {/* Helpful internal links to strengthen crawlability */}
            <p className="text-xs text-gray-500 mt-3">
              Need a ballpark first? Try our{' '}
              <Link to="/price-calculator" className="text-orange-700 hover:underline font-medium">
                price calculator
              </Link>
              . Explore all{' '}
              <Link to="/services" className="text-orange-700 hover:underline font-medium">
                moving services
              </Link>
              , or see{' '}
              <Link to="/areas/halifax" className="text-orange-700 hover:underline font-medium">
                Halifax moving service
              </Link>
              .
            </p>
          </CardHeader>

          <CardContent className="p-1">
            <AppointmentForm />

            {/* Visible “How it works” to match HowTo schema */}
            <section aria-label="How booking works" className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">How booking works</h2>
              <ol className="mt-3 space-y-2 list-decimal list-inside text-gray-700">
                <li>Choose the service type and tell us what you have.</li>
                <li>Select your preferred date and time.</li>
                <li>Submit the form-our team will confirm and provide a firm on-site quote.</li>
              </ol>
            </section>
          </CardContent>
        </Card>

        {/* Optional: secondary links block for UX/SEO */}
        <nav aria-label="Secondary" className="mt-8 text-sm text-gray-700">
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link to="/services/furniture-removal" className="hover:underline">
                Furniture removal
              </Link>
            </li>
            <li>
              <Link to="/services/appliance-pickup" className="hover:underline">
                Appliance pickup
              </Link>
            </li>
            <li>
              <Link to="/services/electronic-waste" className="hover:underline">
                E-waste recycling
              </Link>
            </li>
            <li>
              <Link to="/areas/dartmouth" className="hover:underline">
                Dartmouth moving service
              </Link>
            </li>
          </ul>
        </nav>
      </main>

      <Footer />
    </div>
  );
};

export default Appointment;

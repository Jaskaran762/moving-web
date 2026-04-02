import { Truck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ServiceList = () => {
  const canonical = 'https://junknerds.ca/services';
  const heroImage = 'https://junknerds.ca/dashboard/junknerds.jpg';

  const serviceLinks = [
    { name: 'Furniture Removal', slug: 'furniture-removal' },
    { name: 'Appliance Pickup', slug: 'appliance-pickup' },
    { name: 'Electronic Waste', slug: 'electronic-waste' },
    { name: 'Construction Debris', slug: 'construction-debris' },
    { name: 'Household Items', slug: 'household-items' },
    { name: 'Yard Waste', slug: 'yard-waste' },
  ];

  // JSON-LD: breadcrumbs
  const ldBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junknerds.ca/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: canonical },
    ],
  };

  // JSON-LD: list of service pages to strengthen discovery
  const ldItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: serviceLinks.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      url: `https://junknerds.ca/services/${s.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Junk Removal Services in Halifax | Furniture, Appliances, Yard Waste | JunkNerds</title>
        <meta
          name="description"
          content="Explore JunkNerds services in Halifax & HRM: furniture removal, appliance pickup, e-waste recycling, yard waste, construction debris cleanup, and full property cleanouts."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Junk Removal Services in Halifax | JunkNerds" />
        <meta
          property="og:description"
          content="Transparent pricing, insured crews, and eco-friendly disposal. Book online for a free quote."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Junk Removal Services in Halifax | JunkNerds" />
        <meta
          name="twitter:description"
          content="From furniture to renovation debris—see all our services and book a free quote."
        />
        <meta name="twitter:image" content={heroImage} />
        <script type="application/ld+json">{JSON.stringify(ldBreadcrumbs)}</script>
        <script type="application/ld+json">{JSON.stringify(ldItemList)}</script>
      </Helmet>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-white">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <Truck className="h-5 w-5" />
              <span className="text-xs font-semibold tracking-wide uppercase">Services We Offer</span>
            </div>

            {/* Use a real H1 for SEO */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Junk Removal Services</h1>

            <p className="text-sm text-gray-600 mt-2">
              We handle furniture removal, appliance pickup, e-waste recycling, yard waste, construction debris
              cleanup, and full property cleanouts across Halifax Regional Municipality. Transparent pricing,
              insured crews, and eco-friendly disposal.{" "}
              <Link to="/appointment" className="text-emerald-700 font-medium hover:underline">
                Book a free quote
              </Link>{" "}
              or try the{" "}
              <Link to="/price-calculator" className="text-emerald-700 font-medium hover:underline">
                price calculator
              </Link>
              .
            </p>

            {/* Quick internal links to top service pages (helps crawlability) */}
            <nav aria-label="Popular services" className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {serviceLinks.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="inline-block rounded-full border border-emerald-200 px-3 py-1 text-xs text-emerald-800 hover:bg-emerald-50"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </CardHeader>

          <CardContent className="p-6">
            <Services />
          </CardContent>
        </Card>

        {/* Secondary link block for UX/SEO */}
        <nav aria-label="More actions" className="mt-8 text-sm text-gray-700">
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link to="/appointment" className="hover:underline">Book an appointment</Link>
            </li>
            <li>
              <Link to="/areas/halifax" className="hover:underline">Halifax junk removal</Link>
            </li>
            <li>
              <Link to="/areas/dartmouth" className="hover:underline">Dartmouth junk removal</Link>
            </li>
          </ul>
        </nav>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceList;

// src/pages/Area.tsx
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppointmentForm from "@/components/AppointmentForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AREAS, getAreaBySlug, getAllAreaLinks } from "@/data/areas";
import { CheckCircle, MapPin, Phone } from "lucide-react";

const Dot = () => (
  <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 shrink-0" aria-hidden />
);

export default function Area() {
  const { slug = "" } = useParams();
  const area = getAreaBySlug(slug);

  // 404 with helpful index
  if (!area) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold mb-4">Area not found</h1>
          <p className="text-gray-600 mb-6">
            We couldn’t find that service area. Choose one of our covered areas:
          </p>
          <div className="flex flex-wrap gap-2">
            {getAllAreaLinks().map(({ name, slug }) => (
              <Link
                key={slug}
                to={`/areas/${slug}`}
                className="px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-sm"
              >
                {name}
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canonical = `https://movingnerds.ca/areas/${area.slug}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{area.seoTitle}</title>
        <meta name="description" content={area.seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={area.seoTitle} />
        <meta property="og:description" content={area.seoDescription} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `Moving Services in ${area.name}`,
          "areaServed": area.name,
          "provider": { "@id": "https://movingnerds.ca/#localbusiness" },
          "offers": area.services.map((s: string) => ({
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": s },
            "url": `https://movingnerds.ca/areas/${area.slug}`
          }))
        })}</script>
      </Helmet>
      <Header />

      {/* Hero */}
      <section
        className="relative min-h-[42vh] flex items-end"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url('${area.heroImage || "/dashboardmovingnerds.jpg"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            {area.name} Moving
          </h1>
          <p className="text-white/90 mt-3 max-w-3xl">{area.blurb}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <a href="#appointment">Book Online</a>
            </Button>
            <Button asChild variant="outline" className="bg-orange-600 text-white hover:bg-white/10">
              <a href="tel:+19024128566"><Phone className="h-4 w-4 mr-2" /> (902) 412-8566</a>
            </Button>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link to="/price-calculator">Price Calculator</Link>
            </Button>
            {/* <Button asChild variant="secondary">
              <a href={area.mapUrl} target="_blank" rel="noreferrer">
                <MapPin className="h-4 w-4 mr-2" /> See on Maps
              </a>
            </Button> */}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Services & Items */}
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>What we move</CardTitle>
              <p className="text-sm text-gray-600">
                Expert packing, heavy lifting, and careful transport for all your belongings.
              </p>
            </CardHeader>
            <CardContent>
              <ul className="grid sm:grid-cols-2 gap-2">
                {area.itemsWeMove.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700 leading-6">
                    <Dot /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services we offer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {area.services.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <span className="text-gray-800">{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Neighbourhoods */}
        {area.neighborhoods?.length ? (
          <Card>
            <CardHeader>
              <CardTitle>Serving these neighbourhoods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {area.neighborhoods.map((n) => (
                  <span key={n} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm">
                    {n}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {area.faqs.map((f) => (
              <div key={f.q}>
                <div className="font-semibold text-gray-900">{f.q}</div>
                <p className="text-gray-700">{f.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nearby Areas */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby areas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {area.nearby.map((slug) => {
              const a = AREAS.find((x) => x.slug === slug)!;
              return (
                <Link
                  key={slug}
                  to={`/areas/${slug}`}
                  className="px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-sm"
                >
                  {a.name}
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* Appointment */}
        <section id="appointment">
          <Card className="overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-white">
              <CardTitle>Get your free moving quote in {area.name}</CardTitle>
              <p className="text-sm text-gray-600">
                Book online for priority scheduling and a free, no-obligation estimate.
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <AppointmentForm />
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
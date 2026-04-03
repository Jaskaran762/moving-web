import { Link, useParams } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useEffect } from 'react'
import { SERVICES } from '@/data/services'
import { Gallery } from '@/components/Gallery'
import { Helmet } from 'react-helmet-async'

// -----------------------
// Small UI bits
// -----------------------
const Bullet = () => <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 inline-block" />

// -----------------------
// Page
// -----------------------
const ServiceDetail = () => {
  const { slug } = useParams()
  const service = SERVICES[slug ?? ''] as any

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Service not found</h1>
            <Link to="/" className="text-orange-600 underline">Go back home</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO / JSON-LD */}
      <Helmet>
        <title>{`${service.title} in Halifax | Moving Nerds`}</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={`https:movingnerds.ca/services/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "areaServed": "Halifax Regional Municipality",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Moving Nerds",
            "telephone": "+1-902-412-8566",
            "url": "https:movingnerds.ca"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https:movingnerds.ca/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https:movingnerds.ca/services" },
            { "@type": "ListItem", "position": 3, "name": service.title, "item": `https:movingnerds.ca/services/${slug}` }
          ]
        })}</script>
        {service.faqs?.length ? (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": service.faqs.map((f: any) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
              }))
            })}
          </script>
        ) : null}
      </Helmet>

      <Header />
      <main className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-orange-600">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{service.title}</span>
          </nav>

          {/* Hero */}
          <header className="mb-8">
            <div className="relative overflow-hidden rounded-3xl">
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-72 w-full object-contain"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow">{service.title}</h1>
                  {service.subtitle && <p className="text-white/90">{service.subtitle}</p>}
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <a href="tel:+19024128566">Call Now</a>
                  </Button>
                  <Button asChild size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Link to="/appointment">Book Online</Link>
                  </Button>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{service.description}</p>
            {service.features && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.features.map((f: string) => (
                  <li key={f} className="text-sm bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full">{f}</li>
                ))}
              </ul>
            )}
          </header>

          {/* Content grid */}
          <section className="grid lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Items we move</h2>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {service.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700 leading-6">
                      {/* dot */}
                      <span
                        className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 shrink-0"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.nots?.length ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">What we don’t take</h2>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {service.nots?.map((n: string) => (
                      <li key={n} className="flex items-start gap-2 text-gray-700 leading-6">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 shrink-0" aria-hidden />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">Not sure about an item? Text us a photo-we’ll confirm.</p>
                </div>
              ) : null}

              {service.gallery?.length ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Gallery</h2>
                  <Gallery images={service.gallery} title={service.title} />
                </div>
              ) : null}

              {service.process?.length ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">How it works</h2>
                  <ol className="space-y-3">
                    {service.process.map((step: string, i: number) => (
                      <li key={i} className="flex">
                        <span className="mr-3 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-white text-sm font-semibold">{i + 1}</span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {service.faqs?.length ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">FAQs</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.faqs.map((f: any, i: number) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                        <AccordionContent>{f.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ) : null}
            </div>

            {/* Sticky quote card */}
            <aside className="lg:sticky lg:top-24 space-y-4">
              <Card className="rounded-2xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900">Get a fast quote</h3>
                <p className="text-gray-600 mt-1">Send photos or book a time-we’ll confirm on arrival.</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild className="bg-orange-600 hover:bg-orange-700"><Link to="/appointment">Book Now</Link></Button>
                  <Button asChild variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50"><a href="tel:+19024128566">Call (902) 412-8566</a></Button>
                </div>
              </Card>
            </aside>
          </section>

          {/* Areas */}
          {service.areas?.length ? (
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Service areas</h2>
              <ul className="flex flex-wrap gap-2">
                {service.areas.map((a: string) => (
                  <li key={a} className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{a}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ServiceDetail

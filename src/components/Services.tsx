import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package, Shield, Calculator, Truck } from 'lucide-react'

const services = [
  {
    category: 'Residential Moving',
    items: ['Full house & apartment moves', 'Furniture wrapping & padding', 'Loading & unloading', 'Packing & unpacking services'],
    emoji: '🏠',
    blurb: 'Careful handling and safe transport of your household belongings from start to finish.',
    image: '/services/residential-moving.jpg', // Updated image path
  },
  {
    category: 'Commercial Moves',
    items: ['Office furniture & cubicles', 'Secure IT equipment packing', 'Filing cabinets & archives', 'Minimal business downtime'],
    emoji: '🏢',
    blurb: 'Efficient and organized office relocations designed to get your team back to work faster.',
    image: '/services/commercial-moving.jpg', // Updated image path
  },
  {
    category: 'Long-Distance Moving',
    items: ['Interprovincial transport', 'Dedicated moving trucks', 'Detailed inventory tracking', 'Secure transit & delivery'],
    emoji: '🚚',
    blurb: 'Reliable, safe, and stress-free transport for your belongings across long distances.',
    image: '/services/long-distance-moving.jpg', // Updated image path
  },
  {
    category: 'Specialty Items',
    items: ['Upright & grand pianos', 'Heavy duty safes', 'Antiques & fine art', 'Custom crating solutions'],
    emoji: '🎹',
    blurb: 'Specialized equipment and expert handling for your heaviest, most fragile, or valuable items.',
    image: '/services/specialty-moving.jpg', // Updated image path
  },
];

const features = [
  { icon: <Truck className="h-5 w-5" />, label: 'Secure transport' },
  { icon: <Package className="h-5 w-5" />, label: 'Careful handling' },
]

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')

const Services = () => {
  const [visible, setVisible] = useState<boolean[]>(Array(services.length).fill(false))
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setVisible(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    refs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => {
      refs.current.forEach(el => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Move</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From single pieces to full-home relocations, we provide professional, fully insured, and careful handling.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {services.map((s, i) => (
            <div
              key={s.category}
              ref={el => (refs.current[i] = el)}
              className={`transform transition-all duration-700 ease-out ${visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <Link
                to={`/services/${slugify(s.category)}`}
                className="group block aria-[current=page]:ring-2 aria-[current=page]:ring-orange-600 rounded-2xl"
              >
                <Card className="relative h-full overflow-hidden rounded-2xl border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="aspect-[16/9] overflow-hidden rounded-b-none bg-white">
                    {/* Added bg-white (optional) in case your image has transparent parts */}
                    <img
                      src={s.image}
                      alt={`${s.category} example`}
                      // Changed 'object-cover' to 'object-contain' below
                      className="h-full w-full object-contain transition group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-4xl" aria-hidden>
                        {s.emoji}
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        Free Estimate
                      </Badge>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">{s.category}</h3>
                    <p className="mt-1 text-gray-600">{s.blurb}</p>
                    <ul className="mt-4 space-y-2">
                      {s.items.map(item => (
                        <li key={item} className="flex items-center text-gray-700">
                          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-600">
                        {features.map(f => (
                          <span key={f.label} className="inline-flex items-center gap-1 text-xs">
                            {f.icon} {f.label}
                          </span>
                        ))}
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        View details <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* Feature strip */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: <Calculator className="h-6 w-6" />,
              title: 'Transparent Pricing',
              copy: 'No hidden fees or surprises. Get a clear, upfront estimate before moving day.'
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: 'Property Protection',
              copy: 'We use moving blankets and floor runners to respect and protect your home.'
            },
            {
              icon: <Truck className="h-6 w-6" />, // Or <FileCheck /> / <Award />
              title: 'Fully Insured',
              copy: 'Rest easy knowing your belongings are completely protected during transit.'
            },
          ].map(f => (
            <div key={f.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-2 text-orange-600">{f.icon}</div>
              <h4 className="font-semibold text-gray-900">{f.title}</h4>
              <p className="text-gray-600">{f.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

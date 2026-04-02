import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Shield, Sparkles, Truck } from 'lucide-react'

const services = [
  {
    category: 'Furniture Removal',
    items: ['Sofas & sectionals', 'Mattresses', 'Tables & desks', 'Dressers & bookcases'],
    emoji: '🛋️',
    blurb: 'Careful, no-scratch removal with donation-first approach.',
    image: '/services/furniture.jpg',
  },
  {
    category: 'Appliance Pickup',
    items: ['Fridges & freezers', 'Washers & dryers', 'Stoves & ranges', 'Dishwashers'],
    emoji: '🔌',
    blurb: 'Heavy lifting handled. Pathway protection & recycling.',
    image: '/services/appliance.jpg',
  },
  {
    category: 'Electronic Waste',
    items: ['TVs & monitors', 'Computers & laptops', 'Printers', 'Cables & routers'],
    emoji: '💻',
    blurb: 'Responsible e-waste processing and donation when possible.',
    image: '/services/e-waste.jpg',
  },
  {
    category: 'Construction Debris',
    items: ['Drywall & lumber', 'Flooring', 'Doors & trim', 'Pallets & packaging'],
    emoji: '🔨',
    blurb: 'Post-reno cleanups with sweep-up included.',
    image: '/services/debris.jpg',
  },
  {
    category: 'Household Items',
    items: ['Boxes & clutter', 'Small furniture', 'Garage cleanouts', 'Estate cleanouts'],
    emoji: '📦',
    blurb: 'Declutter quickly—label what stays and we do the rest.',
    image: '/services/household.jpg',
  },
  {
    category: 'Yard Waste',
    items: ['Branches & brush', 'Leaves', 'Fence panels', 'Patio debris'],
    emoji: '🌿',
    blurb: 'Storm clean-ups, careful loading to protect lawns.',
    image: '/services/yard.jpg',
  },
]

const features = [
  { icon: <Truck className="h-5 w-5" />, label: 'Same Day' },
  { icon: <Leaf className="h-5 w-5" />, label: 'Recycle & Donate' },
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
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Remove</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Single items to full-property cleanouts—professional, insured, and eco-friendly.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {services.map((s, i) => (
            <div
              key={s.category}
              ref={el => (refs.current[i] = el)}
              className={`transform transition-all duration-700 ease-out ${
                visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link
                to={`/services/${slugify(s.category)}`}
                className="group block aria-[current=page]:ring-2 aria-[current=page]:ring-green-600 rounded-2xl"
              >
                <Card className="relative h-full overflow-hidden rounded-2xl border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="aspect-[16/9] overflow-hidden rounded-b-none">
                    <img
                      src={s.image}
                      alt={`${s.category} example`}
                      className="h-full w-full object-cover transition group-hover:scale-105"
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
                          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
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
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        View details <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* Feature strip */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: <Sparkles className="h-6 w-6" />, title: 'Upfront, On-Site Quotes', copy: 'No surprises—pay after we load.' },
            { icon: <Shield className="h-6 w-6" />, title: 'Property Protection', copy: 'Floors, walls, and elevators respected.' },
            { icon: <Leaf className="h-6 w-6" />, title: 'Eco-Mindful', copy: 'We donate and recycle whenever possible.' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-2 text-green-600">{f.icon}</div>
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

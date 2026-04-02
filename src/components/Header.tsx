import { useState, useRef, useEffect } from 'react';
import { Truck, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getAllAreaLinks } from '@/data/areas';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const [areasOpen, setAreasOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const areasRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const areas = getAllAreaLinks(); // [{ name, slug }]
  const services = [
    { name: 'Furniture Removal', slug: 'furniture-removal' },
    { name: 'Appliance Pickup', slug: 'appliance-pickup' },
    { name: 'Electronic Waste', slug: 'electronic-waste' },
    { name: 'Construction Debris', slug: 'construction-debris' },
    { name: 'Household Items', slug: 'household-items' },
    { name: 'Yard Waste', slug: 'yard-waste' },
  ];

  const closeAllMenus = () => {
    setMobileOpen(false);
    setMobileAreasOpen(false);
    setMobileServicesOpen(false);
    setAreasOpen(false);
    setServicesOpen(false);
  };

  // Close desktop dropdowns on outside click
  const onDocumentClick = (e: React.MouseEvent | MouseEvent) => {
    const t = e.target as Node | null;
    const hitAreas = areasRef.current?.contains(t || null);
    const hitServices = servicesRef.current?.contains(t || null);
    if (!hitAreas) setAreasOpen(false);
    if (!hitServices) setServicesOpen(false);
  };

  // Lock background scroll when mobile menu open (fixes Android viewport jank)
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAllMenus();
    };
    if (mobileOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" onClickCapture={onDocumentClick}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-green-600" />
            <Link to="/" className="text-2xl font-bold text-gray-900" aria-label="Go to homepage">
              JunkNerds
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Services dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              onFocusCapture={() => setServicesOpen(true)}
              onBlurCapture={(e) => {
                const next = e.relatedTarget as Node | null;
                if (!e.currentTarget.contains(next)) setServicesOpen(false);
              }}
            >
              <button
                className="inline-flex items-center gap-1 text-gray-700 font-bold hover:text-green-600 transition-colors"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <div aria-hidden className="absolute left-0 top-full h-2 w-[26rem]" />

              {servicesOpen && (
                <div className="absolute left-0 top-full z-50">
                  <div className="mt-0 w-[26rem] rounded-2xl border border-gray-100 bg-white shadow-xl p-4" role="menu">
                    <div className="grid grid-cols-2 gap-1">
                      {services.map(({ name, slug }) => (
                        <Link
                          key={slug}
                          to={`/services/${slug}`}
                          className="px-2 py-1.5 rounded-md text-sm text-gray-800 hover:bg-gray-50"
                          onClick={() => setServicesOpen(false)}
                          role="menuitem"
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Link
                        to="/services"
                        className="inline-block text-sm font-semibold text-green-700 hover:underline"
                        onClick={() => setServicesOpen(false)}
                      >
                        View all services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Areas dropdown */}
            <div
              ref={areasRef}
              className="relative"
              onMouseEnter={() => setAreasOpen(true)}
              onMouseLeave={() => setAreasOpen(false)}
              onFocusCapture={() => setAreasOpen(true)}
              onBlurCapture={(e) => {
                const next = e.relatedTarget as Node | null;
                if (!e.currentTarget.contains(next)) setAreasOpen(false);
              }}
            >
              <button
                className="inline-flex items-center gap-1 text-gray-700 font-bold hover:text-green-600 transition-colors"
                aria-haspopup="true"
                aria-expanded={areasOpen}
              >
                Areas
                <ChevronDown className={`h-4 w-4 transition-transform ${areasOpen ? 'rotate-180' : ''}`} />
              </button>

              <div aria-hidden className="absolute left-0 top-full h-2 w-[28rem]" />

              {areasOpen && (
                <div className="absolute left-0 top-full z-50">
                  <div className="mt-0 w-[28rem] rounded-2xl border border-gray-100 bg-white shadow-xl p-4" role="menu">
                    <div className="grid grid-cols-2 gap-1">
                      {areas.map(({ name, slug }) => (
                        <Link
                          key={slug}
                          to={`/areas/${slug}`}
                          className="px-2 py-1.5 rounded-md text-sm text-gray-800 hover:bg-gray-50"
                          onClick={() => setAreasOpen(false)}
                          role="menuitem"
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/appointment" className="text-gray-700 font-bold hover:text-green-600 transition-colors">
              Book Now
            </Link>
            <Link to="/price-calculator" className="text-gray-700 font-bold hover:text-green-600 transition-colors">
              Price Calculator
            </Link>
            <Link to="/reviews" className="text-gray-700 font-bold hover:text-green-600 transition-colors">
              Reviews
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-green-600">
              <Phone className="h-4 w-4" />
              <a href="tel:+19024128566" className="font-semibold" aria-label="Call (902) 412-8566">
                (902) 412-8566
              </a>
            </div>

            <Button asChild className="hidden md:inline-flex bg-green-600 hover:bg-green-700">
              <Link to="/appointment">Get Quote</Link>
            </Button>

            {/* Mobile: Call + Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <Button asChild className="bg-green-600 hover:bg-green-700" aria-label="Call JunkNerds">
                <a href="tel:+19024128566" className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-300"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile full-screen drawer (fits Android/iOS) */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-opacity ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={closeAllMenus} />

        {/* Panel */}
        <aside
          id="mobile-drawer"
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl
                      transform transition-transform duration-200 ease-out
                      ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-white">
            <span className="text-sm font-semibold text-gray-700">Menu</span>
            <Button variant="ghost" size="icon" aria-label="Close menu" onClick={closeAllMenus}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="p-4 overflow-y-auto h-[calc(100%-3.25rem)]">
            {/* Services collapsible */}
            <button
              className="flex w-full items-center justify-between py-3 text-left text-gray-800 font-medium hover:text-green-700"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services"
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div id="mobile-services" className="py-1 pl-2">
                <div className="grid grid-cols-1 gap-1">
                  {services.map(({ name, slug }) => (
                    <Link
                      key={slug}
                      to={`/services/${slug}`}
                      className="py-2 px-2 rounded-md text-gray-800 hover:bg-gray-50"
                      onClick={closeAllMenus}
                    >
                      {name}
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className="py-2 px-2 rounded-md text-green-700 font-semibold hover:bg-green-50"
                    onClick={closeAllMenus}
                  >
                    View all services →
                  </Link>
                </div>
              </div>
            )}

            {/* Areas collapsible */}
            <button
              className="mt-1 flex w-full items-center justify-between py-3 text-left text-gray-800 font-medium hover:text-green-700"
              onClick={() => setMobileAreasOpen((v) => !v)}
              aria-expanded={mobileAreasOpen}
              aria-controls="mobile-areas"
            >
              <span>Areas</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileAreasOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileAreasOpen && (
              <div id="mobile-areas" className="py-1 pl-2 max-h-[55vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 gap-1">
                  {areas.map(({ name, slug }) => (
                    <Link
                      key={slug}
                      to={`/areas/${slug}`}
                      className="py-2 px-2 rounded-md text-gray-800 hover:bg-gray-50"
                      onClick={closeAllMenus}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other links */}
            <Link
              to="/appointment"
              className="block py-3 text-gray-800 font-medium hover:text-green-700"
              onClick={closeAllMenus}
            >
              Book Now
            </Link>
            <Link
              to="/price-calculator"
              className="block py-3 text-gray-800 font-medium hover:text-green-700"
              onClick={closeAllMenus}
            >
              Price Calculator
            </Link>
            <Link
              to="/reviews"
              className="block py-3 text-gray-800 font-medium hover:text-green-700"
              onClick={closeAllMenus}
            >
              Reviews
            </Link>

            {/* CTAs */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link to="/appointment">Get Quote</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:+19024128566">Call</a>
              </Button>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;

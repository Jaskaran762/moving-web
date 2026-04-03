import { Link } from 'react-router-dom';
import { Star, Truck, Clock } from 'lucide-react';
import { getAllAreaLinks } from '@/data/areas';
import { useReviewsContext } from "@/contexts/ReviewsContext";

const Footer = () => {
  const areas = getAllAreaLinks(); // [{ name, slug }]
  const { rating, userRatingCount, loading } = useReviewsContext();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand / About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold">Moving Nerds</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional moving service serving the HRM area.
              Fast, reliable, and fully insured relocation solutions.
            </p>
            {/*<div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <p className="text-sm text-gray-600">
                {loading ? (
                  "Loading rating…"
                ) : rating && userRatingCount ? (
                  <>Rated <span className="font-semibold">{rating.toFixed(1)}/5</span> by {userRatingCount}+ customers</>
                ) : (
                  "Reviews unavailable"
                )}
              </p>
            </div>*/}
          </div>

          {/* Services & Partners */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/services/residential-moving" className="hover:text-white">Residential Moving</Link></li>
              <li><Link to="/services/commercial-moves" className="hover:text-white">Commercial Moves</Link></li>
              <li><Link to="/services/long-distance-moving" className="hover:text-white">Long-Distance Moving</Link></li>
              <li><Link to="/services/specialty-items" className="hover:text-white">Specialty Items</Link></li>
            </ul>

            {/* Added Partner Section Here */}
            <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-400">Our Partners</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="https://junknerds.ca" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <span className="mr-2">
                    <Truck className="h-6 w-6 text-green-400" />
                  </span> JunkNerds
                </a>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Areas we serve</h3>
            <ul className="grid grid-cols-2 xs:grid-cols-3 gap-2 text-gray-300">
              {areas.map(({ name, slug }) => (
                <li key={slug}>
                  <a href={`/areas/${slug}`} className="hover:text-white">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Mon–Sat: 7AM–7PM
              </p>
              <p>
                <a href="tel:+19024128566" className="no-underline" aria-label="Call (902) 412-8566">
                  📞 (902) 412-8566
                </a>
              </p>
              <p>
                <a href="mailto:support@movingnerds.ca" className="no-underline">
                  ✉️ support@movingnerds.ca
                </a>
              </p>
              <p>📍 Serving HRM Area</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Moving Nerds. All rights reserved. Licensed &amp; Insured.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
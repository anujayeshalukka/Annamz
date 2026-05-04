import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { logo } from '../../constants/clothing'

export function ClothingHeader({ 
  scrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  isCollectionsDropdownOpen, 
  setIsCollectionsDropdownOpen 
}: { 
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (o: boolean) => void;
  isCollectionsDropdownOpen: boolean;
  setIsCollectionsDropdownOpen: (o: boolean) => void;
}) {
  const { pathname } = useLocation();

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 bg-chocolate/60 backdrop-blur-md ${pathname === '/clothing' && !scrolled ? '' : 'shadow-xl'} text-ivory`}>
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link to="/clothing" className="flex-shrink-0">
          <img src={logo} alt="Annamz" className={`${scrolled ? 'h-12 md:h-16' : 'h-20 md:h-24'} ${scrolled || pathname !== '/clothing' ? 'brightness-0 invert' : ''} transition-all duration-300`} />
        </Link>
        
        <div className="hidden md:flex space-x-12 text-xs uppercase tracking-[0.3em] font-bold">
          <Link to="/clothing" className="hover:text-gold transition-colors">Home</Link>
          
          <div 
            className="relative group"
            onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
            onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-gold transition-colors uppercase tracking-[0.3em]">
              Collections
            </button>
            
            <AnimatePresence>
              {isCollectionsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-4 w-48 bg-white shadow-2xl rounded-xl overflow-hidden py-2 border border-gray-100"
                >
                  {[
                    { label: 'Saree', match: 'Sarees' },
                    { label: 'Salwar', match: 'Salwar Suits' },
                    { label: 'Kurta', match: 'Kurta & Frock Collection' },
                    { label: 'Jutti', match: 'Footwear' }
                  ].map(item => (
                    <Link 
                      key={item.label}
                      to={`/clothing/category/${encodeURIComponent(item.match)}`}
                      className="block px-6 py-3 text-gray-600 hover:bg-gold/10 hover:text-chocolate transition-colors text-xs tracking-widest"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#about" className="hover:text-gold transition-colors">About</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </div>

        <div className="flex items-center space-x-6">
          <Link 
            to="/bakery" 
            className="hidden md:block btn-nav-outline px-6 py-2.5 text-xs tracking-widest uppercase font-bold"
          >
            Annamz Bakery
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

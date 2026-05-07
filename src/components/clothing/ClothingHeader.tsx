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
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${pathname === '/clothing' && !scrolled ? 'bg-chocolate/60' : 'bg-chocolate'} backdrop-blur-md ${pathname === '/clothing' && !scrolled ? '' : 'shadow-xl'} text-ivory`}>
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link to="/clothing" className="flex-shrink-0">
          <img src={logo} alt="Annamz" className={`${scrolled ? 'h-12 md:h-16' : 'h-20 md:h-24'} transition-all duration-300`} />
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

          <Link to="/clothing/about" className="hover:text-gold transition-colors">About</Link>
          <Link to="/clothing/contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link 
            to="/bakery" 
            className="hidden md:block btn-nav-outline px-6 py-2.5 text-xs tracking-widest uppercase font-bold"
          >
            Annamz' Patisserie
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (Bakery Style) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-chocolate border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6 text-sm tracking-[0.2em] font-bold uppercase">
              {[
                { name: 'Home', path: '/clothing' },
                { name: 'Collections', path: '/clothing/collections' },
                { name: 'About', path: '/clothing/about' },
                { name: 'Contact', path: '/clothing/contact' }
              ].map(item => (
                <Link 
                  key={item.name}
                  to={item.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="hover:text-gold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/bakery" 
                onClick={() => setIsMenuOpen(false)}
                className="btn-nav-outline w-full text-center text-[10px] tracking-widest uppercase font-bold py-3 mt-4"
              >
              Annamz' Patisserie
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

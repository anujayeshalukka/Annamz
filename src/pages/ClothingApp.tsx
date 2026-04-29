import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Menu, X, Camera, Phone } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { CONTACT_INFO, getWhatsAppLink } from '../config/contact'
import type { Product } from './AdminPanel'
import { supabase } from '../lib/supabase'
const IMAGE_BASE_URL = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/images/'
const logo = IMAGE_BASE_URL + 'logo.png'
const clothingVideo = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/videos/annamzclothings1.mp4'

// Default fallback data
const DEFAULT_PRODUCTS: Product[] = [
  { id: 1, name: 'Silk Radiance Saree', price: '₹12,500', category: 'Sarees', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600', description: 'Exquisite handcrafted silk saree with gold zari work.', status: 'Available' },
  { id: 2, name: 'Velvet Evening Gown', price: '₹18,000', category: 'Gowns', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600', description: 'Deep rose velvet gown with delicate embroidery.', status: 'Available' },
  { id: 3, name: 'Linen Summer Set', price: '₹4,200', category: 'Casual', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', description: 'Breathable linen set for the modern woman.', status: 'Available' },
  { id: 4, name: 'Gold Embellished Lehenga', price: '₹45,000', category: 'Bridal', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600', description: 'Bridal lehenga with heavy gold embellishments.', status: 'Available' },
]

function ClothingHome({ products }: { products: Product[] }) {
  return (
    <div className="space-y-24 pb-24">
      {/* Editorial Hero */}
      <section className="relative h-[90vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={clothingVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-20 left-12 text-white">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg uppercase tracking-[0.3em] mb-4"
          >
            New Collection 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif mb-8 max-w-2xl leading-tight"
          >
            The Art of Elegance
          </motion.h1>
          <Link to="collections" className="btn-premium px-12">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Sarees', 'Gowns', 'Bridal'].map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-2xl"
            >
              <img 
                src={`https://images.unsplash.com/photo-${idx === 0 ? '1610030469983-98e550d6193c' : idx === 1 ? '1595777457583-95e059d581b8' : '1583391733956-3750e0ff4e8b'}?auto=format&fit=crop&q=80&w=600`} 
                alt={cat} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-serif tracking-widest uppercase">{cat}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif mb-2">New Arrivals</h2>
            <p className="text-gray-500 italic">Curated pieces for the season</p>
          </div>
          <Link to="collections" className="text-rose font-medium hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product: Product) => (
            <Link key={product.id} to={`product/${product.id}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3">
                  <button className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
              <h3 className="font-serif text-lg mb-1">{product.name}</h3>
              <p className="text-rose font-medium">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function ProductListing({ products }: { products: Product[] }) {
  return (
    <div className="container mx-auto px-6 py-32">
      <h1 className="text-5xl font-serif mb-12 text-center">Our Collections</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product: Product) => (
          <Link key={product.id} to={`../product/${product.id}`} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{product.category}</p>
            <h3 className="font-serif text-lg mb-1">{product.name}</h3>
            <p className="text-rose font-medium">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ProductDetail({ products }: { products: Product[] }) {
  const { pathname } = useLocation()
  const id = pathname.split('/').pop()
  const product = products.find((p: Product) => p.id.toString() === id) || products[0] || DEFAULT_PRODUCTS[0]

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <nav className="text-sm text-gray-400 mb-8 flex space-x-2">
            <Link to="/clothing">Home</Link>
            <span>/</span>
            <Link to="/clothing/collections">Collections</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
          <p className="text-rose font-medium mb-2 tracking-[0.2em] uppercase">{product.category}</p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">{product.name}</h1>
          <p className="text-3xl mb-8">{product.price}</p>
          <p className="text-gray-600 mb-12 leading-relaxed text-lg">
            {product.description || "A masterfully crafted piece from our latest collection, designed to embody sophistication and timeless grace. Perfect for occasions that demand nothing but the best."}
          </p>
          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Availability:</span>
              <span className="text-green-600">In Stock</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-medium">Color:</span>
              <div className="flex space-x-2">
                <div className="w-6 h-6 rounded-full border border-gray-300 bg-amber-500" />
                <div className="w-6 h-6 rounded-full border border-gray-300 bg-rose-400" />
                <div className="w-6 h-6 rounded-full border border-gray-300 bg-white" />
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              const message = `Hello Annamz, I'm interested in the "${product.name}" from your clothing collection.`;
              window.open(getWhatsAppLink(message), '_blank');
            }}
            className="btn-premium w-full md:w-auto px-16 flex items-center justify-center space-x-3"
          >
            <ShoppingBag size={20} />
            <span>Enquire on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ClothingApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error;
      setProducts(data && data.length > 0 ? data : DEFAULT_PRODUCTS)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts(DEFAULT_PRODUCTS)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    // Close menu on navigation
    if (isMenuOpen) {
      setTimeout(() => setIsMenuOpen(false), 0)
    }
  }, [pathname, isMenuOpen])

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 bg-chocolate/60 backdrop-blur-md ${pathname === '/clothing' && !scrolled ? '' : 'shadow-xl'} text-ivory`}>
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <Link to="/clothing" className="flex-shrink-0">
            <img src={logo} alt="Annamz" className={`${scrolled ? 'h-12 md:h-16' : 'h-20 md:h-24'} ${scrolled || pathname !== '/clothing' ? 'brightness-0 invert' : ''} transition-all duration-300`} />
          </Link>
          
          <div className="hidden md:flex items-center space-x-10 text-xs tracking-[0.3em] font-bold uppercase">
            <Link to="collections" className="hover:text-gold transition-colors">Collections</Link>
            <a href="#" className="hover:text-gold transition-colors">About</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-text-h/95 flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-4 text-ivory"
            >
              <X size={32} />
            </button>
            <nav className="text-center space-y-8">
              {['Home', 'Bakery', 'Collections', 'New Arrivals', 'About', 'Contact'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={item === 'Home' ? '/clothing' : item === 'Bakery' ? '/bakery' : item === 'Collections' ? 'collections' : '#'}
                    className={`text-4xl font-serif text-ivory hover:text-gold transition-colors ${item === 'Bakery' ? 'px-8 py-2 border border-white/20 rounded-full' : ''}`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route index element={<ClothingHome products={products} />} />
        <Route path="collections" element={<ProductListing products={products} />} />
        <Route path="product/:id" element={<ProductDetail products={products} />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white py-20 px-6 border-t border-gold/10">
        <div className="container mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt="Annamz" className="h-16 mb-8" />
            <p className="max-w-md text-gray-500 leading-relaxed italic">
              "Redefining fashion with a touch of timeless luxury. Each piece is a story of craftsmanship and style."
            </p>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link to="collections" className="hover:text-rose transition-colors">Our Collections</Link></li>
              <li><a href="#" className="hover:text-rose transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-rose transition-colors">Bridal Couture</a></li>
              <li><a href="#" className="hover:text-rose transition-colors">Bespoke Gowns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-6">Connect</h4>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-rose hover:text-white transition-all">
                <Camera size={20} />
              </a>
              <a href={`tel:${CONTACT_INFO.whatsapp}`} className="p-2 border border-gray-200 rounded-full hover:bg-rose hover:text-white transition-all">
                <Phone size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400 italic">Follow us for daily inspirations.</p>
          </div>
        </div>
        <div className="container mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between text-xs text-gray-400 tracking-widest uppercase">
          <span>© 2026 Annamz Clothing. Boutique of Excellence.</span>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-rose">Privacy Policy</a>
            <a href="#" className="hover:text-rose">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

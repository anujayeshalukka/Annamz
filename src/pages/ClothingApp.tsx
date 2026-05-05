import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Shared Types & Constants
import type { Product, EnquiryItem } from '../types/clothing'
import { DEFAULT_PRODUCTS } from '../constants/clothing'

// Modular Components
import { ClothingHeader } from '../components/clothing/ClothingHeader'
import { ClothingFooter } from '../components/clothing/ClothingFooter'
import { ClothingHome } from '../components/clothing/ClothingHome'
import { ProductListing } from '../components/clothing/ProductListing'
import { ProductDetail } from '../components/clothing/ProductDetail'
import { EnquiryDrawer } from '../components/clothing/EnquiryDrawer'
import { EnquiryForm } from '../components/clothing/EnquiryForm'

export default function ClothingApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [enquiryList, setEnquiryList] = useState<EnquiryItem[]>([])
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] = useState(false)
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false)
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false)
  const { pathname } = useLocation()

  const addToEnquiry = (product: Product) => {
    setEnquiryList(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsEnquiryDrawerOpen(true);
  };

  const removeFromEnquiry = (id: string | number) => {
    setEnquiryList(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string | number, delta: number) => {
    setEnquiryList(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error;
      setProducts(data && data.length > 0 ? data : DEFAULT_PRODUCTS)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts(DEFAULT_PRODUCTS)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (isMenuOpen) {
      setTimeout(() => setIsMenuOpen(false), 0)
    }
  }, [pathname])

  return (
    <div className="bg-ivory min-h-screen">
      <ClothingHeader 
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isCollectionsDropdownOpen={isCollectionsDropdownOpen}
        setIsCollectionsDropdownOpen={setIsCollectionsDropdownOpen}
      />


      <Routes>
        <Route index element={<ClothingHome products={products} addToEnquiry={addToEnquiry} />} />
        <Route path="collections" element={<ProductListing products={products} addToEnquiry={addToEnquiry} />} />
        <Route path="category/:catName" element={<ProductListing products={products} addToEnquiry={addToEnquiry} />} />
        <Route path="product/:id" element={<ProductDetail products={products} addToEnquiry={addToEnquiry} />} />
      </Routes>

      <EnquiryDrawer 
        isOpen={isEnquiryDrawerOpen}
        onClose={() => setIsEnquiryDrawerOpen(false)}
        items={enquiryList}
        onRemove={removeFromEnquiry}
        onUpdateQty={updateQuantity}
        onProceed={() => {
          setIsEnquiryDrawerOpen(false);
          setIsEnquiryFormOpen(true);
        }}
      />

      <EnquiryForm 
        isOpen={isEnquiryFormOpen}
        onClose={() => setIsEnquiryFormOpen(false)}
        items={enquiryList}
        onSubmit={(details) => {
          console.log('Enquiry Submitted:', details);
          setEnquiryList([]);
        }}
      />

      {/* Floating Enquiry Trigger */}
      {enquiryList.length > 0 && (
        <motion.button 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => setIsEnquiryDrawerOpen(true)}
          className="fixed bottom-8 right-8 bg-gold text-white px-8 py-5 rounded-full shadow-2xl flex items-center gap-4 z-40 group hover:scale-110 transition-all border border-white/20 shadow-gold/30"
        >
          <div className="relative">
            <ShoppingBag size={24} />
            <span className="absolute -top-3 -right-3 w-6 h-6 bg-chocolate text-white text-[10px] flex items-center justify-center rounded-full border-2 border-gold font-bold">
              {enquiryList.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <span className="font-bold uppercase tracking-widest text-xs">View Enquiry List</span>
        </motion.button>
      )}

      <ClothingFooter />
    </div>
  )
}

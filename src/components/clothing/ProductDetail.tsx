import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import type { Product } from '../../types/clothing'
import { DEFAULT_PRODUCTS, getCategoryDisplay } from '../../constants/clothing'
import { getWhatsAppLink } from '../../config/contact'

export function ProductDetail({ products, addToEnquiry }: { products: Product[], addToEnquiry: (p: Product) => void }) {
  const { pathname } = useLocation()
  const id = pathname.split('/').pop()
  const product = products.find((p: Product) => p.id.toString() === id) || products[0] || DEFAULT_PRODUCTS[0]

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedType, setSelectedType] = useState(product.subcategory || '');

  const sliderRef = useRef<HTMLDivElement>(null);
  
  const similarProducts = products
    .filter((p: Product) => p.main_category === product.main_category && p.id !== product.id)
    .slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="grid md:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 shadow-2xl"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <nav className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center space-x-3">
            <Link to="/clothing" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/clothing/collections" className="hover:text-gold transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-chocolate font-bold">{product.name}</span>
          </nav>
          
          <div className="mb-4">
            <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-bold uppercase tracking-widest">
              {getCategoryDisplay(product.main_category)} {product.subcategory ? `• ${product.subcategory}` : ''}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-chocolate leading-tight">{product.name}</h1>
          
          <p className="text-3xl font-serif mb-8 text-chocolate">
            {product.price_type === 'On Request' ? 'Price on request' : product.price}
          </p>

          <p className="text-gray-500 mb-12 leading-relaxed text-lg italic font-serif">
            {product.description || "A masterpiece of craftsmanship, reflecting the soul of traditional artistry and modern elegance."}
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            {product.fabric && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Fabric</p>
                <p className="font-medium text-chocolate">{product.fabric}</p>
              </div>
            )}
            {product.age_group && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Age Group</p>
                <p className="font-medium text-chocolate">{product.age_group} Years</p>
              </div>
            )}
          </div>

          <div className="space-y-8 mb-12">
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xs transition-all ${
                        selectedSize === size ? 'bg-chocolate text-white border-chocolate' : 'border-gray-200 text-gray-400 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Color Preferences</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl border text-xs transition-all ${
                        selectedColor === color ? 'bg-chocolate text-white border-chocolate' : 'border-gray-200 text-gray-400 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.main_category === 'Salwar Suits' && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Suit Type</p>
                <div className="flex flex-wrap gap-3">
                  {['Stitched', 'Unstitched'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-xl border text-xs transition-all ${
                        selectedType === type ? 'bg-chocolate text-white border-chocolate' : 'border-gray-200 text-gray-400 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => addToEnquiry({ 
                ...product, 
                sizes: selectedSize ? [selectedSize] : [], 
                colors: selectedColor ? [selectedColor] : [],
                subcategory: selectedType || product.subcategory 
              })}
              className="flex-1 bg-gold text-white py-4 rounded-2xl font-medium flex items-center justify-center space-x-3 shadow-xl hover:bg-chocolate transition-all active:scale-95 shadow-gold/20"
            >
              <ShoppingBag size={20} />
              <span>Add to Enquiry List</span>
            </button>
            <button 
              onClick={() => {
                const shortId = product.id.toString().split('-')[0].toUpperCase();
                const details = [
                  `Product: ${product.name}`,
                  `ID: #${shortId}`,
                  `Category: ${product.main_category}`,
                  product.fabric ? `Fabric: ${product.fabric}` : null,
                  selectedSize ? `Size: ${selectedSize}` : null,
                  selectedType ? `Type: ${selectedType}` : null
                ].filter(Boolean).join('\n');
                
                const message = `Hello Annamz Clothing, I'm interested in knowing more about this product:\n\n${details}`;
                window.open(getWhatsAppLink(message), '_blank');
              }}
              className="px-8 py-4 border border-gold text-gold rounded-2xl font-medium hover:bg-gold/5 transition-all"
            >
              Direct Enquiry
            </button>
          </div>
        </motion.div>
      </div>

      {/* Related Products Slider */}
      {similarProducts.length > 0 && (
        <div className="mt-32 pt-20 border-t border-gold/10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-chocolate mb-2 capitalize">
                  {product.main_category} Collection
                </h2>
                <p className="text-gray-500 italic font-serif">Discover more handpicked pieces from this range.</p>
              </div>
              
              <div className="flex gap-3 mb-1">
                <button 
                  onClick={() => scroll('left')}
                  className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all duration-300 shadow-sm"
                  aria-label="Previous products"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all duration-300 shadow-sm"
                  aria-label="Next products"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="w-full">
              <div 
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8"
              >
                {similarProducts.map((item) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="min-w-[calc(50%-0.75rem)] w-[calc(50%-0.75rem)] md:min-w-[calc(33.33%-1rem)] md:w-[calc(33.33%-1rem)] lg:min-w-[calc(20%-1.2rem)] lg:w-[calc(20%-1.2rem)] snap-start"
                  >
                    <div className="bg-white rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-gold/5 flex flex-col h-full group relative overflow-hidden">
                      <Link to={`/clothing/product/${item.id}`} className="block">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-50">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-bold tracking-widest uppercase text-chocolate shadow-sm border border-gold/10">
                              {getCategoryDisplay(item.main_category)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="px-1">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                            {item.fabric || item.subcategory || 'Exclusive'}
                          </p>
                          <h3 className="text-lg font-serif text-chocolate mb-1 group-hover:text-gold transition-colors line-clamp-1">{item.name}</h3>
                          <p className="text-gray-400 text-[10px] mb-4 line-clamp-1 italic">{item.description}</p>
                        </div>
                      </Link>

                      <div className="px-1 mt-auto flex items-center justify-between gap-4">
                        <span className="text-rose font-bold text-sm tracking-wide">{item.price}</span>
                        <button 
                          onClick={() => addToEnquiry(item)}
                          className="flex items-center space-x-2 bg-gold/10 text-gold p-2 md:px-4 md:py-2 rounded-xl text-[10px] font-bold hover:bg-gold hover:text-white transition-all group/btn"
                        >
                          <span className="hidden md:inline">Enquire</span>
                          <Plus size={14} className="group-hover/btn:rotate-90 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

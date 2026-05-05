import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Product } from '../../types/clothing'
import { CATEGORY_IMAGE_URL, clothingVideo } from '../../constants/clothing'

export function ClothingHome({ products, addToEnquiry }: { products: Product[], addToEnquiry: (p: Product) => void }) {
  const [visibleCount, setVisibleCount] = useState(12);

  // Create a mixed list of latest items from all 4 categories
  const getMixedProducts = () => {
    const categories = ['Sarees', 'Salwar Suits', 'Kurta & Frock Collection', 'Footwear'];
    const grouped: Product[][] = categories.map(cat => 
      products.filter(p => p.main_category === cat)
    );

    const mixed: Product[] = [];
    const maxLen = Math.max(...grouped.map(g => g.length));

    for (let i = 0; i < maxLen; i++) {
      grouped.forEach(group => {
        if (group[i]) mixed.push(group[i]);
      });
    }

    // Add any remaining products that don't match these categories (if any)
    const remaining = products.filter(p => !categories.includes(p.main_category || ''));
    return [...mixed, ...remaining];
  };

  const displayProducts = getMixedProducts();

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
          <a href="#categories" className="btn-premium px-12">
            Explore Categories
          </a>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Sarees', match: 'Sarees' },
            { label: 'Salwars', match: 'Salwar Suits' },
            { label: 'Kurta & Frock', match: 'Kurta & Frock Collection' },
            { label: 'Jutti', match: 'Footwear' }
          ].map((cat, idx) => (
            <Link
              key={cat.label}
              to={`/clothing/category/${encodeURIComponent(cat.match)}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-2xl"
              >
                <img 
                  src={
                    idx === 0 ? CATEGORY_IMAGE_URL + 'saree.jpg' : 
                    idx === 1 ? CATEGORY_IMAGE_URL + 'salwar.jpg' : 
                    idx === 2 ? CATEGORY_IMAGE_URL + 'kurta.jpg' : 
                    CATEGORY_IMAGE_URL + 'jutti.webp'
                  } 
                  alt={cat.label} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-serif tracking-widest uppercase">{cat.label}</h3>
                </div>
              </motion.div>
            </Link>
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
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {displayProducts.slice(0, visibleCount).map((product: Product) => (
            <div key={product.id} className="group">
              <div className="bg-white rounded-[1.2rem] md:rounded-[1.8rem] p-1.5 md:p-2.5 shadow-sm hover:shadow-xl transition-all duration-500 border border-gold/5 flex flex-col h-full relative overflow-hidden">
                <Link to={`/clothing/product/${product.id}`} className="block">
                  <div className="relative aspect-square rounded-[1rem] md:rounded-[1.4rem] overflow-hidden mb-2 md:mb-3 bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="px-2 py-0.5 md:px-2.5 md:py-1 bg-white/95 backdrop-blur-md rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-chocolate shadow-sm border border-gold/10">
                        {product.main_category || 'New'}
                      </span>
                    </div>
                  </div>

                  <div className="px-1 md:px-1.5 flex-grow">
                    <h3 className="text-sm md:text-xl font-serif mb-0.5 md:mb-1 group-hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-gray-400 text-[10px] md:text-xs mb-2 md:mb-3 line-clamp-1 italic">{product.description || 'Exclusive piece from our latest collection.'}</p>
                  </div>
                </Link>

                <div className="px-1 md:px-1.5 pb-1 md:pb-1.5 mt-auto">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-rose text-[11px] md:text-sm font-semibold tracking-wide">
                      {product.price_type === 'On Request' ? 'P.O.R' : product.price}
                    </span>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToEnquiry(product); }}
                      className="flex items-center space-x-1 md:space-x-2 bg-gold text-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold hover:bg-chocolate transition-all group/btn w-full sm:w-auto justify-center shadow-lg shadow-gold/20"
                    >
                      <span>Enquire</span>
                      <Plus size={12} className="group-hover/btn:rotate-90 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < displayProducts.length && (
          <div className="flex justify-center mt-16">
            <button 
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-12 py-4 border border-chocolate text-chocolate rounded-full text-xs tracking-[0.2em] font-bold uppercase hover:bg-chocolate hover:text-white transition-all duration-500"
            >
              Load More Pieces
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

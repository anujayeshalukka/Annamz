import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
import type { Product } from '../../types/clothing'
import { CLOTHING_CATEGORIES } from '../../constants/clothing'
import { getCategoryDisplay } from '../../constants/clothing'

export function ProductListing({ products, addToEnquiry }: { products: Product[], addToEnquiry: (p: Product) => void }) {
  const { pathname } = useLocation();
  const isCategoryPage = pathname.includes('/category/');
  const catParam = isCategoryPage ? decodeURIComponent(pathname.split('/category/')[1]) : 'All';
  
  const [selectedMainCat, setSelectedMainCat] = useState(catParam);
  const [selectedSubCat, setSelectedSubCat] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    setSelectedMainCat(catParam);
  }, [catParam]);

  useEffect(() => {
    setSelectedSubCat('All');
    setSelectedFabric('All');
    setSelectedAge('All');
    setActiveDropdown(null);
  }, [selectedMainCat]);

  const filteredProducts = products.filter(p => {
    const isKurtaSelection = selectedMainCat === 'Kurta & Frock Collection' || selectedMainCat === 'Kids Collection';
    const matchesMain = selectedMainCat === 'All' || 
                        p.main_category === selectedMainCat || 
                        p.category?.includes(selectedMainCat) || 
                        (isKurtaSelection && (p.main_category === 'Kids Collection' || p.main_category === 'Kurta & Frock Collection' || p.category?.includes('Kids Collection')));
    
    const matchesSub = selectedSubCat === 'All' || p.subcategory === selectedSubCat;
    const matchesFabric = selectedFabric === 'All' || p.fabric === selectedFabric;
    const matchesAge = selectedAge === 'All' || p.age_group === selectedAge;
    return matchesMain && matchesSub && matchesFabric && matchesAge;
  });

  const currentCatInfo = selectedMainCat !== 'All' 
    ? (CLOTHING_CATEGORIES[selectedMainCat as keyof typeof CLOTHING_CATEGORIES] 
       || (selectedMainCat === 'Kids Collection' ? CLOTHING_CATEGORIES['Kurta & Frock Collection' as keyof typeof CLOTHING_CATEGORIES] : null))
    : null;

  return (
    <div className="container mx-auto px-6 py-40 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-gray-100 pb-12">
        <div className="text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-serif mb-4 text-chocolate"
          >
            {selectedMainCat === 'All' ? 'Our Collections' : getCategoryDisplay(selectedMainCat)}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 italic text-xl font-serif"
          >
            Timeless elegance, curated for your unique style.
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-4 relative">
          {!isCategoryPage && (
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'main' ? null : 'main')}
                className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl border text-[10px] md:text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-2 ${selectedMainCat !== 'All' ? 'bg-gold text-white border-gold' : 'bg-white text-gray-500 border-gray-200 hover:border-gold'}`}
              >
                <span>{selectedMainCat === 'All' ? 'Select Collection' : getCategoryDisplay(selectedMainCat)}</span>
                <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'main' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'main' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 md:w-56 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-100 p-2"
                  >
                    {[
                      { label: 'All Collections', match: 'All' },
                      { label: 'Saree', match: 'Sarees' },
                      { label: 'Salwar', match: 'Salwar Suits' },
                      { label: 'Kurta & Frock Collection', match: 'Kurta & Frock Collection' },
                      { label: 'Jutti', match: 'Footwear' }
                    ].map(cat => (
                      <button
                        key={cat.label}
                        onClick={() => { setSelectedMainCat(cat.match); setActiveDropdown(null); }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-all ${selectedMainCat === cat.match ? 'bg-gold/10 text-gold font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {currentCatInfo && (
            <>
              {currentCatInfo.subcategories.length > 0 && (
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                    className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl border text-[10px] md:text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-2 ${selectedSubCat !== 'All' ? 'bg-gold text-white border-gold' : 'bg-white text-gray-500 border-gray-200 hover:border-gold'}`}
                  >
                    <span>{selectedSubCat === 'All' ? 'Category Type' : selectedSubCat}</span>
                    <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'type' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 md:w-56 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-100 p-2"
                      >
                        {['All', ...currentCatInfo.subcategories].map(sub => (
                          <button
                            key={sub}
                            onClick={() => { setSelectedSubCat(sub); setActiveDropdown(null); }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-all ${selectedSubCat === sub ? 'bg-gold/10 text-gold font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            {sub}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {currentCatInfo.fabrics.length > 1 && (
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'fabric' ? null : 'fabric')}
                    className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl border text-[10px] md:text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-2 ${selectedFabric !== 'All' ? 'bg-gold text-white border-gold' : 'bg-white text-gray-500 border-gray-200 hover:border-gold'}`}
                  >
                    <span>{selectedFabric === 'All' ? 'Filter Fabric' : selectedFabric}</span>
                    <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'fabric' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'fabric' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 md:w-56 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-100 p-2"
                      >
                        {['All', ...currentCatInfo.fabrics].map(fab => (
                          <button
                            key={fab}
                            onClick={() => { setSelectedFabric(fab); setActiveDropdown(null); }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-all ${selectedFabric === fab ? 'bg-gold/10 text-gold font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            {fab}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {currentCatInfo.hasAgeGroup && (
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'age' ? null : 'age')}
                    className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl border text-[10px] md:text-xs tracking-widest uppercase font-bold transition-all flex items-center gap-2 ${selectedAge !== 'All' ? 'bg-gold text-white border-gold' : 'bg-white text-gray-500 border-gray-200 hover:border-gold'}`}
                  >
                    <span>{selectedAge === 'All' ? 'Age Group' : `Age ${selectedAge}`}</span>
                    <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'age' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'age' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 md:w-56 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-100 p-2"
                      >
                        {['All', '1-5', '6-10', '11-15'].map(age => (
                          <button
                            key={age}
                            onClick={() => { setSelectedAge(age); setActiveDropdown(null); }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-all ${selectedAge === age ? 'bg-gold/10 text-gold font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            {age === 'All' ? 'All Ages' : `Age ${age}`}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map((product) => (
          <motion.div 
            layout
            key={product.id}
            className="group"
          >
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
                      {getCategoryDisplay(product.main_category)}
                    </span>
                  </div>
                </div>

                <div className="px-1 md:px-1.5 flex-grow">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-0.5">
                    {product.fabric || product.subcategory || 'Exclusive'}
                  </p>
                  <h3 className="text-sm md:text-xl font-serif mb-0.5 md:mb-1 group-hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-gray-400 text-[10px] md:text-xs mb-2 md:mb-3 line-clamp-1 italic">{product.description}</p>
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
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-32">
          <p className="text-gray-400 text-lg italic mb-6">No pieces match your current selection.</p>
          <button 
            onClick={() => {
              setSelectedMainCat('All');
              setSelectedSubCat('All');
              setSelectedFabric('All');
              setSelectedAge('All');
            }} 
            className="text-gold border-b border-gold pb-1 hover:text-chocolate hover:border-chocolate transition-all"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

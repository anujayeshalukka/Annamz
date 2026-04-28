import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, MessageCircle, ChevronRight, Star, ShoppingBag, Globe, Share2, Mail, Clock, Menu, X } from 'lucide-react'
import logo from '../assets/images/logo.png'
import bakeryVideo from '../assets/images/annamzbakery.mp4'
import aboutImg from '../assets/images/about.jpg'
import weddingImg from '../assets/images/wedding.jpg'
import birthdayImg from '../assets/images/birthday.jpg'
import officeImg from '../assets/images/office.jpg'
import cake1 from '../assets/images/cake1.avif'
import cake2 from '../assets/images/cake2.jpg'
import cake3 from '../assets/images/cake3.jpg'
import cake4 from '../assets/images/cake4.avif'
import cake5 from '../assets/images/cake5.jpg'
import cake6 from '../assets/images/cake6.avif'
import cake7 from '../assets/images/cake7.jpg'
import cake8 from '../assets/images/cake8.jpg'
import cake9 from '../assets/images/cake9.avif'
import cake10 from '../assets/images/cake10.jpg'
import cake11 from '../assets/images/cake11.jpg'
import cake12 from '../assets/images/cake12.avif'
import cake13 from '../assets/images/cake13.webp'
import cake14 from '../assets/images/cake14.webp'
import cake15 from '../assets/images/cake15.jpg'
import cake16 from '../assets/images/cake16.jpg'
import cake17 from '../assets/images/cake17.jpg'
import cake18 from '../assets/images/cake18.avif'
import cake19 from '../assets/images/cake19.webp'
import cake20 from '../assets/images/cake20.avif'
import cake21 from '../assets/images/cake21.avif'
import cake22 from '../assets/images/cake22.avif'
import cake23 from '../assets/images/cake23.avif'
import id24 from '../assets/images/id24.jpg'
import id25 from '../assets/images/id25.jpg'
import id26 from '../assets/images/id26.jpg'
import id27 from '../assets/images/id27.jpg'
import id28 from '../assets/images/id28.avif'
import id29 from '../assets/images/id29.jpg'
import id30 from '../assets/images/id30.jpg'
import id31 from '../assets/images/id31.jpg'
import id32 from '../assets/images/id32.webp'
import id33 from '../assets/images/id33.webp'
import id34 from '../assets/images/id34.jpg'
import id35 from '../assets/images/id35.jpg'
import id36 from '../assets/images/id36.webp'
import id37 from '../assets/images/id37.jpg'
import BakeryEnquiryForm from '../components/BakeryEnquiryForm'
import { CONTACT_INFO, getWhatsAppLink } from '../config/contact'

const CATEGORIES = [
  "All",
  "Dry Cakes",
  "Cream Cakes",
  "Dessert Cakes",
  "Brownies & Snacks",
  "Fruit Concentrates",
  "Pickles",
  "Masala Powders" 
];

const ALL_PRODUCTS = [ 
  // Dry Cakes
  { id: 1, name: "Rich Chocolate Cake", category: "Dry Cakes", price: "On Request", image: cake1, description: "Moist dark chocolate with a velvety finish." },
  { id: 2, name: "Sponge Cake", category: "Dry Cakes", price: "On Request", image: cake2, description: "Light, airy, and perfect for tea time." },
  { id: 3, name: "Coffee Cake", category: "Dry Cakes", price: "On Request", image: cake3, description: "Infused with premium Arabica beans." },
  { id: 4, name: "Iced Lemon Cake", category: "Dry Cakes", price: "On Request", image: cake4, description: "Zesty citrus glaze on a buttery base." },
  { id: 5, name: "Carrot Dates Cake", category: "Dry Cakes", price: "On Request", image: cake5, description: "Healthy goodness with natural sweetness." },
  { id: 6, name: "Laizy Daizy Cake", category: "Dry Cakes", price: "On Request", image: cake6, description: "Classic coconut-topped nostalgic delight." },
  { id: 7, name: "Tropical Fruit Cake", category: "Dry Cakes", price: "On Request", image: cake7, description: "Fresh tropical flavor in every bite." },

  // Cream Cakes
  { id: 8, name: "Chocolate Dry Fruit Cake", category: "Cream Cakes", price: "On Request", image: cake8, description: "Nutty crunch meets rich cocoa cream." },
  { id: 9, name: "Red Velvet Cake", category: "Cream Cakes", price: "On Request", image: cake9, description: "Sophisticated cocoa flavor with cream cheese." },
  { id: 10, name: "Football Theme Cake", category: "Cream Cakes", price: "On Request", image: cake10, description: "Custom designed for the sports enthusiast." },
  { id: 11, name: "Number Cake", category: "Cream Cakes", price: "On Request", image: cake11, description: "Personalized celebration for every milestone." },
  { id: 12, name: "White Designer Cake", category: "Cream Cakes", price: "On Request", image: cake12, description: "Elegant artistry for special occasions." },
  { id: 13, name: "Kuromi Cake", category: "Cream Cakes", price: "On Request", image: cake13, description: "Trendy character-themed purple delight." },
  { id: 14, name: "PUBG Cake", category: "Cream Cakes", price: "On Request", image: cake14, description: "Winner winner chicken dinner for gamers." },
  { id: 15, name: "Candle Cake", category: "Cream Cakes", price: "On Request", image: cake15, description: "Unique aesthetic that lights up the party." },
  { id: 16, name: "Fluffy Pillow Cake", category: "Cream Cakes", price: "On Request", image: cake16, description: "Soft, dreamy textures for luxury gifting." },
  { id: 17, name: "Mermaid Theme Cake", category: "Cream Cakes", price: "On Request", image: cake17, description: "Enchanting sea-inspired colors and motifs." },
  { id: 18, name: "Dalgona Coffee Cake", category: "Cream Cakes", price: "On Request", image: cake18, description: "Trendy whipped coffee flavor profile." },
  { id: 19, name: "Praline Cake", category: "Cream Cakes", price: "On Request", image: cake19, description: "Caramelized nuts in a silky cream base." },

  // Dessert Cakes
  { id: 20, name: "Tiramisu", category: "Dessert Cakes", price: "On Request", image: cake20, description: "Authentic Italian coffee-soaked elegance." },
  { id: 21, name: "Cheesecake", category: "Dessert Cakes", price: "On Request", image: cake21, description: "Creamy, dense, and perfectly balanced." },
  { id: 22, name: "Biscoff Cake", category: "Dessert Cakes", price: "On Request", image: cake22, description: "Irresistible cookie butter indulgence." },
  { id: 23, name: "Caramel Pudding", category: "Dessert Cakes", price: "On Request", image: cake23, description: "Silky smooth melt-in-your-mouth classic." },

  // Brownies & Snacks
  { id: 24, name: "Fudge Brownie", category: "Brownies & Snacks", price: "On Request", image: id24, description: "Gooey, chocolatey, and intensely rich." },
  { id: 25, name: "Double Chocolate Fudge Brownie", category: "Brownies & Snacks", price: "On Request", image: id25, description: "Extra cocoa for the ultimate chocoholic." },
  { id: 26, name: "Blondie", category: "Brownies & Snacks", price: "On Request", image: id26, description: "White chocolate and brown sugar magic." },
  { id: 27, name: "Donuts", category: "Brownies & Snacks", price: "On Request", image: id27, description: "Assorted glazes and fluffy dough." },
  { id: 28, name: "Pizza", category: "Brownies & Snacks", price: "On Request", image: id28, description: "Freshly baked artisan crust and toppings." },

  // Fruit Concentrates
  { id: 29, name: "Ginger Lime", category: "Fruit Concentrates", price: "On Request", image: id29, description: "Refreshing zesty concentrate for mocktails." },
  { id: 30, name: "Beetroot", category: "Fruit Concentrates", price: "On Request", image: id30, description: "Natural earthy sweetness for healthy sips." },
  { id: 31, name: "Carrot", category: "Fruit Concentrates", price: "On Request", image: id31, description: "Pure vegetable goodness in a bottle." },

  // Pickles
  { id: 32, name: "Meat Pickle", category: "Pickles", price: "On Request", image: id32, description: "Spicy, savory, and traditionally cured." },
  { id: 33, name: "Fish Pickle", category: "Pickles", price: "On Request", image: id33, description: "Coastal flavors with a spicy kick." },
  { id: 34, name: "Lemon Dates Pickle", category: "Pickles", price: "On Request", image: id34, description: "Sweet and sour traditional preserve." },

  // Masala Powders
  { id: 35, name: "Garam Masala", category: "Masala Powders", price: "On Request", image: id35, description: "Aromatic blend of roasted premium spices." },
  { id: 36, name: "Biriyani Masala", category: "Masala Powders", price: "On Request", image: id36, description: "The secret to the perfect authentic biriyani." },
  { id: 37, name: "Sambar Masala", category: "Masala Powders", price: "On Request", image: id37, description: "Classic South Indian lentil stew seasoning." },
];

export default function BakeryLanding() {
  const [scrolled, setScrolled] = useState(false)
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleWhatsAppEnquiry = (productName: string) => {
    const message = `Hello Annamz, I would like to enquire about "${productName}"`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-ivory min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 bg-chocolate/60 backdrop-blur-md ${scrolled ? 'py-1 shadow-xl' : 'py-2 md:py-3'} text-ivory`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <img 
            src={logo} 
            alt="Annamz" 
            className={`${scrolled ? 'h-12 md:h-16' : 'h-20 md:h-24'} ${scrolled ? 'brightness-0 invert' : ''} transition-all duration-500 object-contain`} 
          />
          
          <div className="hidden md:flex space-x-10 text-xs tracking-[0.3em] font-bold uppercase">
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#menu" className="hover:text-gold transition-colors">Menu</a>
            <a href="#custom" className="hover:text-gold transition-colors">Custom Orders</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>

          <div className="flex items-center space-x-6">
            <Link 
              to="/clothing" 
              className="hidden md:block btn-nav-outline px-6 py-2.5 text-xs tracking-widest uppercase font-bold"
            >
              Annamz Clothings
            </Link>
            <button 
              onClick={() => setIsEnquiryOpen(true)}
              className="hidden md:block btn-premium px-6 py-2.5 text-xs tracking-widest uppercase font-bold"
            >
              Order Now
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-chocolate border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-8 space-y-6 text-sm tracking-[0.2em] font-bold uppercase">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">About</a>
                <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">Menu</a>
                <a href="#custom" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">Custom Orders</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">Contact</a>
                <Link 
                  to="/clothing" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-nav-outline w-full text-center text-xs tracking-widest uppercase font-bold"
                >
                  Annamz Clothings
                </Link>
                <button 
                  onClick={() => { setIsEnquiryOpen(true); setIsMobileMenuOpen(false); }}
                  className="btn-premium w-full mt-4 text-xs tracking-widest uppercase font-bold"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-chocolate">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bakeryVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-serif mb-6"
          >
            Annamz Bakery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light italic mb-10 max-w-2xl mx-auto"
          >
            Handcrafted with love, baked to perfection. Discover the art of premium pâtisserie.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="#menu" className="btn-premium inline-flex items-center space-x-2">
              <span>View Catalogue</span>
              <ChevronRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Our Artisanal Story</h2>
              <p className="text-lg leading-relaxed mb-6">
                At Annamz Bakery, we believe that every bite should be a moment of pure joy. Our master bakers combine traditional techniques with the finest ingredients to create textures and flavors that linger.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                From our signature sourdough to our bespoke celebration cakes, every creation is a testament to our passion for quality and elegance.
              </p>
              {/* <button className="btn-outline">Read More</button> */}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={aboutImg} alt="Bakery Interior" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Catalogue */}
      <section id="menu" className="py-24 bg-[#FDFBF7]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 md:mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              Freshly made, crafted with love
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-serif mb-6">Our Products</h2>
            <div className="w-24 h-1 bg-gold/30 mx-auto mb-12" />
            
            {/* Search Bar */}
            {/* <div className="max-w-md mx-auto relative mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={20} />
              <input 
                type="text" 
                placeholder="Search for delights..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gold/10 focus:border-gold/30 focus:ring-0 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}

            {/* Category Filters */}
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 mb-16 overflow-x-auto pb-4 thin-scrollbar px-6 md:px-0">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category 
                      ? 'bg-gold text-white shadow-lg shadow-gold/20' 
                      : 'bg-white text-gray-600 border border-gold/10 hover:border-gold/30 hover:bg-gold/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-gold/5 flex flex-col h-full relative overflow-hidden">
                      {/* Product Image */}
                      <div className="relative aspect-square rounded-[1rem] md:rounded-[1.5rem] overflow-hidden mb-3 md:mb-6">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-2 left-2 md:top-4 md:left-4">
                          <span className="px-2 py-0.5 md:px-3 md:py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase text-rose shadow-sm">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="px-1 md:px-2 flex-grow">
                        <h3 className="text-base md:text-2xl font-serif mb-1 md:mb-2 group-hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
                        <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-6 line-clamp-2 italic">{product.description}</p>
                      </div>

                      {/* Price & CTA */}
                      <div className="px-1 md:px-2 pb-1 md:pb-2 mt-auto">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <span className="text-rose text-xs md:text-base font-semibold tracking-wide">{product.price}</span>
                          <button 
                            onClick={() => handleWhatsAppEnquiry(product.name)}
                            className="flex items-center space-x-1 md:space-x-2 bg-gradient-to-br from-brand-gold to-brand-rose text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold hover:shadow-lg hover:shadow-rose/20 transition-all group/btn w-full sm:w-auto justify-center"
                          >
                            <span>Enquire</span>
                            <ShoppingBag size={12} className="md:size-[14px] group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>

                      {/* Hover Overlay Detail */}
                      <div className="absolute top-0 right-0 p-2 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                          <Star size={14} className="md:size-4" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-xl text-gray-400 italic">No products found matching your search.</p>
                  <button 
                    onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
                    className="mt-4 text-gold hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Custom Orders */}
      <section id="custom" className="py-24 px-6 relative overflow-hidden bg-gold/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Bespoke Celebrations</h2>
          <p className="text-xl mb-12 italic">
            Looking for something unique? We specialize in creating custom cakes and dessert tables for your most precious moments.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gold/10 group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={weddingImg} 
                  alt="Weddings" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h4 className="font-serif text-2xl mb-3 text-chocolate">Weddings</h4>
                <p className="text-gray-600 leading-relaxed">Elegant tiered cakes and dessert tables designed to make your big day unforgettable.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gold/10 group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={birthdayImg} 
                  alt="Birthdays" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h4 className="font-serif text-2xl mb-3 text-chocolate">Birthdays</h4>
                <p className="text-gray-600 leading-relaxed">Playful, delicious themes and personalized designs that delight guests of all ages.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gold/10 group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={officeImg} 
                  alt="Corporate" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h4 className="font-serif text-2xl mb-3 text-chocolate">Corporate</h4>
                <p className="text-gray-600 leading-relaxed">Branded treats and sophisticated catering for your professional events and milestones.</p>
              </div>
            </motion.div>
          </div>
          <button 
            onClick={() => setIsEnquiryOpen(true)}
            className="btn-premium"
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-chocolate text-ivory pt-24 pb-12 px-6 relative overflow-hidden">
        {/* Subtle Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Brand Column */}
            <div className="space-y-8">
              <img src={logo} alt="Annamz" className="h-20 brightness-0 invert" />
              <p className="text-gray-400 leading-relaxed font-light">
                Crafting moments of pure joy through artisanal baking. Every creation is a testament to our passion for quality and elegance.
              </p>
              <div className="flex space-x-5">
                {[
                  { icon: <Globe size={20} />, label: 'Website', href: '#' },
                  { icon: <Share2 size={20} />, label: 'Share', href: '#' },
                  { icon: <MessageCircle size={20} />, label: 'WhatsApp', href: getWhatsAppLink('Hello Annamz!') }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    aria-label={social.label}
                    target={social.label === 'WhatsApp' ? '_blank' : undefined}
                    rel={social.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    className="w-11 h-11 rounded-full border border-ivory/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-chocolate transition-all duration-300 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-2xl mb-8 text-gold">Quick Links</h4>
              <ul className="space-y-4">
                {['About Us', 'Our Menu', 'Custom Orders', 'Contact', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-ivory transition-colors duration-300 flex items-center group">
                      <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours */}
            <div>
              <h4 className="font-serif text-2xl mb-8 text-gold">Visit Us</h4>
              <ul className="space-y-6 text-gray-400">
                <li className="flex items-start space-x-4">
                  <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                  <span className="font-light">123 Baker Street, Artisan Square,<br />Gourmet District, PIN 682001</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Phone size={20} className="text-gold flex-shrink-0" />
                  <a href={`tel:${CONTACT_INFO.whatsapp}`} className="font-light hover:text-gold transition-colors">{CONTACT_INFO.phone}</a>
                </li>
                <li className="flex items-center space-x-4">
                  <Clock size={20} className="text-gold flex-shrink-0" />
                  <div className="text-sm font-light">
                    <p>Mon - Sat: 09:00 AM - 09:00 PM</p>
                    <p>Sunday: 10:00 AM - 08:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-serif text-2xl mb-8 text-gold">Join the Club</h4>
              <p className="text-gray-400 mb-6 font-light">Subscribe to get special offers and first look at new arrivals.</p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-ivory/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-chocolate p-2 rounded-lg hover:bg-ivory transition-colors"
                >
                  <Mail size={18} />
                </button>
              </form>
            </div>
          </div>

          <div className="pt-12 border-t border-ivory/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-light">
            <p>© 2026 Annamz Bakery. All rights reserved.</p>
            <p className="mt-4 md:mt-0 flex items-center">
              Crafted with <Star size={12} className="mx-1 text-gold" fill="currentColor" /> by Annamz Design Team
            </p>
          </div>
        </div>
      </footer>

      <BakeryEnquiryForm isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  )
}

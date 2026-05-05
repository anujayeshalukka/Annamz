import { motion } from 'framer-motion'
import { CLOTHING_IMAGE_URL } from '../../constants/clothing'

export function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=2000" 
            alt="Atelier" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4 font-bold"
          >
            Our Legacy of Excellence
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif leading-tight"
          >
            Timeless Artistry, <br />Modern Elegance
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-chocolate">The Annamz Story</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded on the principles of preserving traditional Indian craftsmanship while embracing contemporary aesthetics, 
                Annamz has grown from a boutique vision into a destination for connoisseurs of fine clothing.
              </p>
              <p>
                Each piece in our collection is more than just a garment—it is a narrative of heritage, woven with 
                precision and dyed with the colors of our culture. From the intricate threads of Lucknowi Chikankari 
                to the regal drapes of Maheshwari Silk, we bring you the soul of India.
              </p>
            </div>
            <div className="pt-12 border-t border-gold/20 flex gap-16 md:gap-24">
              <div>
                <p className="text-5xl md:text-6xl font-serif text-gold mb-2">100%</p>
                <p className="text-xs uppercase tracking-[0.2em] text-chocolate font-bold">Authentic Handloom</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-serif text-gold mb-2">5000+</p>
                <p className="text-xs uppercase tracking-[0.2em] text-chocolate font-bold">Happy Clients</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={`${CLOTHING_IMAGE_URL}aboutsaree.jpg`} 
                alt="Annamz Saree" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gold rounded-3xl -z-10 opacity-20" />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-chocolate py-24 text-ivory">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-5xl font-serif">Our Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold font-serif text-xl">1</div>
                <h3 className="text-xl font-serif">Purity</h3>
                <p className="text-sm text-gray-400 leading-relaxed">We source only the finest natural fabrics, ensuring a luxurious feel and lasting quality.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold font-serif text-xl">2</div>
                <h3 className="text-xl font-serif">Precision</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Every stitch is a testament to our artisans' dedication to perfection.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold font-serif text-xl">3</div>
                <h3 className="text-xl font-serif">Passion</h3>
                <p className="text-sm text-gray-400 leading-relaxed">We are driven by the love for our craft and the desire to make you feel extraordinary.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

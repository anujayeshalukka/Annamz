import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const IMAGE_BASE_URL = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/images/'
const logo = IMAGE_BASE_URL + 'logo.png'
const bakeryVideo = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/videos/bakery.mp4'
const clothingVideo = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/videos/annamzclothings1.mp4'

export default function SplitHome() {
  const [hovered, setHovered] = useState<'clothing' | 'bakery' | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-ivory flex flex-col md:flex-row">
      {/* Center Logo Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%', left: '50%', top: '50%' }}
          animate={{ 
            opacity: 1, 
            scale: hovered ? 0.4 : 1,
            top: hovered ? '12vh' : '50%',
            left: isDesktop && hovered === 'clothing' ? '40%' : isDesktop && hovered === 'bakery' ? '60%' : '50%',
            x: '-50%',
            y: '-50%'
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.43, 0.13, 0.23, 0.96] // Custom cubic-bezier for premium feel
          }}
          className="absolute flex flex-col items-center"
        >
          <motion.div 
            animate={{ 
              padding: hovered ? '2rem' : '2.5rem',
              backgroundColor: hovered ? '#F3F1E8' : 'rgba(42, 24, 16, 0.3)',
              borderColor: hovered ? 'rgba(42, 24, 16, 0.2)' : 'rgba(42, 24, 16, 0.5)'
            }}
            className="rounded-full aspect-square border-[0.5px] backdrop-blur-md flex items-center justify-center transition-all duration-700 overflow-hidden"
          >
            <img src={logo} alt="Annamz Logo" className="w-32 md:w-48 object-contain drop-shadow-2xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* Annamz Clothing Section */}
      <motion.div
        className="relative flex-1 h-1/2 md:h-full overflow-hidden cursor-pointer group"
        onMouseEnter={() => setHovered('clothing')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/clothing')}
        animate={{
          flex: hovered === 'clothing' ? 2 : hovered === 'bakery' ? 0.5 : 1
        }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
        >
          <source src={clothingVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <motion.div
            animate={{ y: hovered === 'clothing' ? 0 : 20, opacity: hovered === 'clothing' ? 1 : 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-4 tracking-wider">Annamz Clothing</h2>
            <p className="text-lg md:text-xl font-light mb-8 italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Luxury Boutique Fashion & Editorial Style
            </p>
            <button className="btn-premium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              Explore Clothing
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Annamz Bakery Section */}
      <motion.div
        className="relative flex-1 h-1/2 md:h-full overflow-hidden cursor-pointer group"
        onMouseEnter={() => setHovered('bakery')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/bakery')}
        animate={{
          flex: hovered === 'bakery' ? 2 : hovered === 'clothing' ? 0.5 : 1
        }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
        >
          <source src={bakeryVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <motion.div
            animate={{ y: hovered === 'bakery' ? 0 : 20, opacity: hovered === 'bakery' ? 1 : 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-4 tracking-wider">Annamz Bakery</h2>
            <p className="text-lg md:text-xl font-light mb-8 italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Artisan Premium Bakery & Sweet Delights
            </p>
            <button className="btn-premium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              Explore Bakery
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

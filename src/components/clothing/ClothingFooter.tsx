import { Link } from 'react-router-dom'
import { Camera, Phone, Mail, MessageCircle } from 'lucide-react'
import { logo } from '../../constants/clothing'
import { CONTACT_INFO, getWhatsAppLink } from '../../config/contact'

export function ClothingFooter() {
  return (
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
            <li><Link to="/clothing/collections" className="hover:text-rose transition-colors">Our Collections</Link></li>
            <li><Link to="/clothing/about" className="hover:text-rose transition-colors">About Us</Link></li>
            <li><Link to="/clothing/contact" className="hover:text-rose transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-6">Connect</h4>
          <div className="flex space-x-4 mb-6">
            <a href="https://instagram.com/annamz_clothing" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-full hover:bg-gold hover:text-white transition-all">
              <Camera size={18} />
            </a>
            <a href={getWhatsAppLink('Hello Annamz Clothing!')} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-full hover:bg-gold hover:text-white transition-all">
              <MessageCircle size={18} />
            </a>
          </div>
          <div className="space-y-3 text-gray-500 text-sm italic">
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-gold" />
              {CONTACT_INFO.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-gold" />
              {CONTACT_INFO.email}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between text-xs text-gray-400 tracking-widest uppercase">
        <span>© 2026 Annamz Clothing. Boutique of Excellence.</span>
        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 md:mt-0 items-center">
          <a href="#" className="hover:text-rose transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-rose transition-colors">Terms of Service</a>
          <div className="h-3 w-px bg-gray-200 hidden md:block"></div>
          <Link to="/admin" className="hover:text-rose transition-colors">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
}

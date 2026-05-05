import { Link, useLocation } from 'react-router-dom'
import { Home, Grid, Info, Phone } from 'lucide-react'

export function MobileBottomNav() {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Home', path: '/clothing', icon: Home },
    { name: 'Shop', path: '/clothing/collections', icon: Grid },
    { name: 'About', path: '/clothing/about', icon: Info },
    { name: 'Contact', path: '/clothing/contact', icon: Phone },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="bg-chocolate/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-300 relative px-4 ${isActive ? 'text-gold' : 'text-ivory/60'}`}
            >
              {isActive && (
                <div className="absolute -top-3 w-1 h-1 bg-gold rounded-full" />
              )}
              <Icon size={20} className={isActive ? 'scale-110' : ''} />
              <span className="text-[10px] font-normal uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

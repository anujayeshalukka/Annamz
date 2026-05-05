import { Home, Info, CakeSlice, Phone } from 'lucide-react'

export function BakeryBottomNav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }), icon: Home },
    { name: 'About', action: () => scrollToSection('about'), icon: Info },
    { name: 'Menu', action: () => scrollToSection('menu'), icon: CakeSlice },
    { name: 'Contact', action: () => scrollToSection('contact'), icon: Phone },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="bg-chocolate/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button 
              key={item.name}
              onClick={item.action}
              className="flex flex-col items-center gap-1 transition-all duration-300 text-ivory/60 active:text-gold px-2"
            >
              <Icon size={20} />
              <span className="text-[10px] font-normal uppercase tracking-widest">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

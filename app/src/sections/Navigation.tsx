import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Produto', href: '#produto' },
  { label: 'Nutrição', href: '#nutricao' },
  { label: 'Versátil', href: '#versatil' },
  { label: 'História', href: '#historia' },
  { label: 'Onde encontrar', href: '#onde-encontrar' },
  { label: 'Contato', href: '#contato' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#F6F2EA]/90 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-[4vw] py-4">
          {/* Logo */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center"
          >
            <img 
              src="/logo-alice.png" 
              alt="Alice Tapioca" 
              className={`h-8 md:h-10 w-auto transition-all duration-300 ${
                isScrolled ? 'brightness-[0.2]' : 'brightness-0 invert'
              }`}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs tracking-wide transition-colors hover:opacity-70 ${
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-[#1A1A1A]' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[99] bg-[#F6F2EA] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Logo no menu mobile */}
          <img 
            src="/logo-alice.png" 
            alt="Alice Tapioca" 
            className="h-12 w-auto mb-4"
          />
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-display text-2xl text-[#1A1A1A] hover:text-[#C8A36C] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

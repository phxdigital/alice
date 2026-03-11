import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(footer,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative z-[80] bg-[#F6F2EA] py-12 px-[6vw]"
    >
      <div className="max-w-[980px] mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-6">
            <span className="font-display text-2xl font-medium text-[#1A1A1A] tracking-wider">
              ALICE TAPIOCA
            </span>
          </div>
          
          {/* Tagline */}
          <p className="text-[#6E6A62] text-sm mb-6">
            Produto original do Distrito Federal, produzido e ensacado no Guará.
          </p>
          
          {/* Links */}
          <div className="flex items-center gap-6 mb-8">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Nosso perfil no Instagram será disponibilizado em breve.');
              }}
              className="flex items-center gap-2 text-[#6E6A62] hover:text-[#1A1A1A] transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-sm">Instagram</span>
            </a>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('A ficha técnica será disponibilizada em breve.');
              }}
              className="flex items-center gap-2 text-[#6E6A62] hover:text-[#1A1A1A] transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">Ficha técnica</span>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-[#1A1A1A]/10 w-full">
            <p className="text-xs text-[#6E6A62]">
              © 2026 Alice Tapioca. Brasília/DF. CNPJ: 60.818.888/0001-04
            </p>
            <p className="text-xs text-[#6E6A62] mt-1">
              QE 34, Conj. B, Casa 40 – Guará II – DF
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

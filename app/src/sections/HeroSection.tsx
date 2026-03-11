import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Wheat, Heart, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const card = cardRef.current;
    const bg = bgRef.current;

    if (!section || !headline || !subheadline || !cta || !card || !bg) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline();
      
      loadTl
        .fromTo(bg, 
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }
        )
        .fromTo(headline.querySelectorAll('.word'),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.06, ease: 'power2.out' },
          0.2
        )
        .fromTo([subheadline, cta],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
          0.5
        )
        .fromTo(card,
          { x: '10vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
          0.3
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headline, subheadline, cta], { x: 0, opacity: 1 });
            gsap.set(card, { x: 0, opacity: 1 });
            gsap.set(bg, { scale: 1, y: 0 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold (entrance handled on load)
      // SETTLE (30-70%): Hold
      // EXIT (70-100%): Elements exit
      scrollTl
        .fromTo([headline, subheadline, cta],
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(card,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bg,
          { scale: 1, y: 0 },
          { scale: 1.08, y: '-6vh', ease: 'none' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProduct = () => {
    const productSection = document.getElementById('produto');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/hero_pan.jpg" 
          alt="Tapioca na frigideira" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        {/* Left Content */}
        <div className="pl-[7vw] w-[50vw]">
          <h1 
            ref={headlineRef}
            className="headline-editorial text-white text-[clamp(44px,5.2vw,84px)] mb-6"
          >
            <span className="word inline-block">TAPIOCA</span>{' '}
            <span className="word inline-block">DE</span>{' '}
            <span className="word inline-block">VERDADE</span>
          </h1>
          
          <p 
            ref={subheadlineRef}
            className="text-white/90 text-[clamp(15px,1.2vw,20px)] leading-relaxed max-w-[36vw] mb-8"
          >
            Massa hidratada pronta para uso. Tradição, praticidade e sabor em cada pacote.
          </p>
          
          <button 
            ref={ctaRef}
            onClick={scrollToProduct}
            className="btn-primary flex items-center gap-2 group"
          >
            Conheça o produto
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Card */}
        <div 
          ref={cardRef}
          className="absolute right-[7vw] top-1/2 -translate-y-1/2 w-[30vw] min-w-[320px]"
        >
          <div className="info-card card-shadow">
            <h3 className="font-display text-2xl font-medium text-[#1A1A1A] mb-6">
              Por que Alice?
            </h3>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F2E1C]/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#0F2E1C]" />
                </div>
                <span className="text-[#1A1A1A] text-sm">Fécula 3 Fronteiras (PR)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F2E1C]/10 flex items-center justify-center">
                  <Wheat className="w-5 h-5 text-[#0F2E1C]" />
                </div>
                <span className="text-[#1A1A1A] text-sm">Sem glúten, sem sal</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F2E1C]/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#0F2E1C]" />
                </div>
                <span className="text-[#1A1A1A] text-sm">Rende até 10 unidades</span>
              </li>
            </ul>
            
            <div className="pt-4 border-t border-[#1A1A1A]/10">
              <p className="label-mono text-[#6E6A62]">
                800g · Validade 45 dias · Brasília
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

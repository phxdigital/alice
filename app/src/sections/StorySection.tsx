import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Sprout, HandHeart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(bgRef.current,
          { scale: 1.08, x: '-3vw' },
          { scale: 1, x: 0, ease: 'none' },
          0
        )
        .fromTo(headlineRef.current,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(bodyRef.current,
          { x: '-20vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.08
        )
        .fromTo(cardRef.current,
          { x: '55vw', opacity: 0, scale: 0.97 },
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0
        )
        .fromTo(quoteRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.18
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .to([headlineRef.current, bodyRef.current],
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(cardRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(quoteRef.current,
          { opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(bgRef.current,
          { scale: 1.06, x: '3vw', ease: 'none' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="historia" ref={sectionRef} className="section-pinned z-50">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/craft_dough.jpg" 
          alt="Processo artesanal" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        {/* Left Content */}
        <div className="absolute left-[7vw] top-[18vh] w-[40vw]">
          <h2 
            ref={headlineRef}
            className="headline-editorial text-white text-[clamp(26px,3vw,48px)] mb-6"
          >
            FEITA NO GUARÁ, FEITA COM CARINHO
          </h2>
          <p 
            ref={bodyRef}
            className="text-white/80 text-[clamp(14px,1.1vw,18px)] leading-relaxed max-w-[34vw]"
          >
            Há mais de 10 anos, a Alice Tapioca mantém viva uma das maiores tradições 
            da culinária brasileira—com consistência e respeito.
          </p>
        </div>

        {/* Right Card */}
        <div 
          ref={cardRef}
          className="absolute right-[7vw] top-1/2 -translate-y-1/2 w-[36vw] min-w-[340px] max-w-[480px]"
        >
          <div className="info-card card-shadow">
            <h3 className="font-display text-2xl font-medium text-[#1A1A1A] mb-6">
              Origem
            </h3>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F2E1C]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#0F2E1C]" />
                </div>
                <span className="text-[#1A1A1A] text-sm">Produzida em Brasília/DF</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F2E1C]/10 flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-[#0F2E1C]" />
                </div>
                <span className="text-[#1A1A1A] text-sm">Fécula 3 Fronteiras (PR)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F2E1C]/10 flex items-center justify-center">
                  <HandHeart className="w-5 h-5 text-[#0F2E1C]" />
                </div>
                <span className="text-[#1A1A1A] text-sm">Processo artesanal</span>
              </li>
            </ul>
            
            <blockquote 
              ref={quoteRef}
              className="pt-6 border-t border-[#1A1A1A]/10"
            >
              <p className="text-[#6E6A62] text-sm italic leading-relaxed">
                "Cada pacote entrega a mesma textura, o mesmo sabor e a mesma experiência."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

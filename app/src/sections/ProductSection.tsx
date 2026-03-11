import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, Calendar, Thermometer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
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
          { scale: 1.10, y: '6vh' },
          { scale: 1, y: 0, ease: 'none' },
          0
        )
        .fromTo(cardRef.current,
          { x: '-55vw', opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0
        )
        .fromTo(labelRef.current,
          { y: '-6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.05
        )
        .fromTo(headlineRef.current?.querySelectorAll('.word') || [],
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
          0.08
        )
        .fromTo(bodyRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.12
        )
        .fromTo(specsRef.current?.children || [],
          { y: '18vh', opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.03, ease: 'power2.out' },
          0.15
        );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl
        .to(cardRef.current,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(headlineRef.current,
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to([labelRef.current, bodyRef.current],
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .to(specsRef.current?.children || [],
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(bgRef.current,
          { scale: 1.07, y: '-6vh', ease: 'none' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="produto" ref={sectionRef} className="section-pinned z-20">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/product_sieve.jpg" 
          alt="Processo de produção" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        {/* Left Card */}
        <div 
          ref={cardRef}
          className="absolute left-[7vw] top-1/2 -translate-y-1/2 w-[40vw] min-w-[360px] max-w-[520px]"
        >
          <div className="info-card card-shadow h-[62vh] flex flex-col">
            <span className="label-mono text-[#C8A36C] mb-4">PRODUTO</span>
            <h2 className="font-display text-3xl font-medium text-[#1A1A1A] mb-4">
              Massa Pronta para Uso
            </h2>
            <p className="text-[#6E6A62] text-sm leading-relaxed flex-1">
              Ingredientes: fécula de mandioca e água. Peso líquido: 800g. 
              Armazene refrigerado entre 3°C e 8°C para garantir a qualidade 
              e frescor do produto.
            </p>
            <div className="pt-4 border-t border-[#1A1A1A]/10">
              <p className="text-xs text-[#6E6A62]">
                Produto original do Distrito Federal, produzido e ensacado no Guará.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="absolute right-[7vw] top-[18vh] w-[32vw]">
          <span ref={labelRef} className="label-mono text-white/80 block mb-4">
            PRODUTO
          </span>
          <h2 
            ref={headlineRef}
            className="headline-editorial text-white text-[clamp(32px,3.5vw,56px)] mb-6"
          >
            <span className="word inline-block">MASSA</span>{' '}
            <span className="word inline-block">PRONTA</span>{' '}
            <span className="word inline-block">PARA</span>{' '}
            <span className="word inline-block">USO</span>
          </h2>
          <p ref={bodyRef} className="text-white/80 text-[clamp(14px,1.1vw,18px)] leading-relaxed">
            Ingredientes: fécula de mandioca e água. Peso líquido: 800g. 
            Armazene refrigerado entre 3°C e 8°C.
          </p>
        </div>

        {/* Specs Row */}
        <div 
          ref={specsRef}
          className="absolute right-[7vw] bottom-[12vh] flex gap-4"
        >
          <div className="spec-card card-shadow w-[9.5vw] min-w-[100px] h-[10vh] min-h-[80px]">
            <Package className="w-6 h-6 text-[#C8A36C] mb-2" />
            <span className="font-display text-xl font-medium text-[#1A1A1A]">800g</span>
          </div>
          <div className="spec-card card-shadow w-[9.5vw] min-w-[100px] h-[10vh] min-h-[80px]">
            <Calendar className="w-6 h-6 text-[#C8A36C] mb-2" />
            <span className="font-display text-xl font-medium text-[#1A1A1A]">45 dias</span>
          </div>
          <div className="spec-card card-shadow w-[9.5vw] min-w-[100px] h-[10vh] min-h-[80px]">
            <Thermometer className="w-6 h-6 text-[#C8A36C] mb-2" />
            <span className="font-display text-xl font-medium text-[#1A1A1A]">3°C–8°C</span>
          </div>
        </div>
      </div>
    </section>
  );
}

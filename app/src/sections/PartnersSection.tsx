import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Store, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
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
          { scale: 1.10, y: '8vh' },
          { scale: 1, y: 0, ease: 'none' },
          0
        )
        .fromTo(labelRef.current,
          { y: '-8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(headlineRef.current,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.05
        )
        .fromTo(leftCardRef.current,
          { x: '-50vw', opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0.08
        )
        .fromTo(rightCardRef.current,
          { x: '50vw', opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0.12
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .to([labelRef.current, headlineRef.current],
          { opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(leftCardRef.current,
          { y: '12vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(rightCardRef.current,
          { y: '12vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(bgRef.current,
          { scale: 1.08, y: '-8vh', ease: 'none' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="onde-encontrar" ref={sectionRef} className="section-pinned z-[70]">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/flour_bowl.jpg" 
          alt="Farinha de tapioca" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center pt-[10vh]">
        {/* Top Label */}
        <span ref={labelRef} className="label-mono text-white/80 mb-4">
          ONDE ENCONTRAR
        </span>
        
        {/* Headline */}
        <h2 
          ref={headlineRef}
          className="headline-editorial text-white text-[clamp(28px,3.5vw,56px)] text-center"
        >
          DISPONÍVEL EM BOAS PADARIAS
        </h2>

        {/* Bottom Cards */}
        <div className="absolute bottom-[8vh] left-0 right-0 flex justify-center gap-[4vw]">
          {/* Brasília Card */}
          <div 
            ref={leftCardRef}
            className="w-[38vw] min-w-[300px] max-w-[460px]"
          >
            <div className="info-card card-shadow h-[34vh] min-h-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#0F2E1C] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-medium text-[#1A1A1A]">Em Brasília</h3>
              </div>
              <p className="text-[#6E6A62] text-sm leading-relaxed mb-4">
                Presente em padarias, mercados e lanchonetes da região.
              </p>
              <div className="flex items-center gap-2 text-[#1A1A1A]">
                <Store className="w-4 h-4 text-[#C8A36C]" />
                <span className="text-sm">Disponível para revenda</span>
              </div>
            </div>
          </div>

          {/* Referência Card */}
          <div 
            ref={rightCardRef}
            className="w-[38vw] min-w-[300px] max-w-[460px]"
          >
            <div className="info-card card-shadow h-[34vh] min-h-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C8A36C] flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-medium text-[#1A1A1A]">Referência</h3>
              </div>
              <p className="text-[#6E6A62] text-sm leading-relaxed mb-4">
                Escolhida pela Padaria 5 Estrelas—mesmo onde outras marcas estão disponíveis.
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C8A36C] text-[#C8A36C]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wheat, Droplets, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const nutritionData = [
  { label: 'Valor energético', value: '150kcal', vd: '7%' },
  { label: 'Carboidratos', value: '38g', vd: '13%' },
  { label: 'Proteínas', value: '0g', vd: '0%' },
  { label: 'Gorduras totais', value: '0g', vd: '0%' },
  { label: 'Gorduras saturadas', value: '0g', vd: '0%' },
  { label: 'Gorduras trans', value: '0g', vd: '0%' },
  { label: 'Fibra alimentar', value: '0g', vd: '***' },
  { label: 'Sódio', value: '0mg', vd: '0%' },
];

export default function NutritionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
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
        .fromTo(badgesRef.current?.children || [],
          { y: 40, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.02, ease: 'power2.out' },
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
        .to(badgesRef.current?.children || [],
          { y: 20, opacity: 0, ease: 'power2.in' },
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
    <section id="nutricao" ref={sectionRef} className="section-pinned z-30">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/plate_tapioca.jpg" 
          alt="Tapioca no prato" 
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
            className="headline-editorial text-white text-[clamp(28px,3.2vw,52px)] mb-6"
          >
            SIMPLES, NATURAL, SEM GLÚTEN
          </h2>
          <p 
            ref={bodyRef}
            className="text-white/80 text-[clamp(14px,1.1vw,18px)] leading-relaxed max-w-[34vw]"
          >
            Apenas fécula de mandioca e água. Sem conservantes, sem sal adicionado, sem gordura.
          </p>
        </div>

        {/* Right Card */}
        <div 
          ref={cardRef}
          className="absolute right-[7vw] top-1/2 -translate-y-1/2 w-[36vw] min-w-[340px] max-w-[480px]"
        >
          <div className="info-card card-shadow max-h-[70vh] overflow-auto">
            <h3 className="font-display text-xl font-medium text-[#1A1A1A] mb-2">
              Informação Nutricional
            </h3>
            <p className="text-xs text-[#6E6A62] mb-4">Porção 65g</p>
            
            <div className="space-y-0 mb-6">
              {nutritionData.map((item, index) => (
                <div key={index} className="nutrition-row">
                  <span className="text-sm text-[#1A1A1A]">{item.label}</span>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium text-[#1A1A1A]">{item.value}</span>
                    <span className="text-sm text-[#6E6A62] w-12 text-right">{item.vd}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-[#6E6A62] mb-4">
              *** Valores diários não estabelecidos.
            </p>

            {/* Badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-2 pt-4 border-t border-[#1A1A1A]/10">
              <div className="badge">
                <Wheat className="w-3 h-3" />
                Sem Glúten
              </div>
              <div className="badge">
                <Droplets className="w-3 h-3" />
                Sem Sal
              </div>
              <div className="badge">
                <Leaf className="w-3 h-3" />
                100% Mandioca
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

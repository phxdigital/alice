import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Star, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const smallCardRef = useRef<HTMLDivElement>(null);
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
        .fromTo(smallCardRef.current,
          { y: '18vh', opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0.15
        );

      // SETTLE (30-70%): Hold

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
        .to(smallCardRef.current,
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
    <section id="qualidade" ref={sectionRef} className="section-pinned z-[60]">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/plated_soft.jpg" 
          alt="Tapioca servida" 
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#C8A36C] flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium text-[#1A1A1A]">
                  Qualidade Certificada
                </h3>
                <p className="text-sm text-[#6E6A62]">Padrão Alice Tapioca</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#C8A36C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#1A1A1A] font-medium text-sm">Consistência garantida</p>
                  <p className="text-[#6E6A62] text-xs">Mesma textura em cada pacote</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#C8A36C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#1A1A1A] font-medium text-sm">Matéria-prima selecionada</p>
                  <p className="text-[#6E6A62] text-xs">Fécula 3 Fronteiras (PR)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#C8A36C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#1A1A1A] font-medium text-sm">Processo controlado</p>
                  <p className="text-[#6E6A62] text-xs">Da produção à embalagem</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#1A1A1A]/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0F2E1C]" />
                <span className="text-xs text-[#6E6A62]">
                  Mais de 10 anos no mercado
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="absolute right-[7vw] top-[18vh] w-[32vw]">
          <span ref={labelRef} className="label-mono text-white/80 block mb-4">
            CONFIANÇA
          </span>
          <h2 
            ref={headlineRef}
            className="headline-editorial text-white text-[clamp(28px,3.2vw,52px)] mb-6"
          >
            <span className="word inline-block">QUALIDADE</span>{' '}
            <span className="word inline-block">QUE</span>{' '}
            <span className="word inline-block">SE</span>{' '}
            <span className="word inline-block">REPITE</span>
          </h2>
          <p ref={bodyRef} className="text-white/80 text-[clamp(14px,1.1vw,18px)] leading-relaxed">
            Padarias, lanchonetes e mercados escolhem Alice pela consistência—e pelos clientes que voltam.
          </p>
        </div>

        {/* Small Card */}
        <div 
          ref={smallCardRef}
          className="absolute right-[7vw] bottom-[12vh]"
        >
          <div className="spec-card card-shadow w-[14vw] min-w-[140px] h-[10vh] min-h-[80px]">
            <span className="font-display text-2xl font-medium text-[#1A1A1A]">10+</span>
            <span className="text-xs text-[#6E6A62]">anos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

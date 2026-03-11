import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UtensilsCrossed, IceCream, ChefHat, Clock, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Receita {
  id: string;
  nome: string;
  tipo: 'salgada' | 'doce';
  tempo: string;
  porcoes: string;
  ingredientes: string[];
  preparo: string[];
  dica?: string;
}

const receitas: Receita[] = [
  {
    id: 'queijo-coalho',
    nome: 'Queijo Coalho',
    tipo: 'salgada',
    tempo: '10 minutos',
    porcoes: '1 tapioca',
    ingredientes: [
      '1 porção de massa de tapioca Alice (65g)',
      '100g de queijo coalho em cubos',
      '1 colher (sopa) de manteiga',
      'Orégano a gosto',
    ],
    preparo: [
      'Aqueça uma frigideira antiaderente em fogo médio.',
      'Espalhe a massa de tapioca uniformemente na frigideira.',
      'Deixe cozinhar por cerca de 2 minutos até firmar.',
      'Vire a tapioca e adicione os cubos de queijo coalho.',
      'Dobre a tapioca ao meio e deixe o queijo derreter.',
      'Retire do fogo, polvilhe orégano e sirva quente.',
    ],
    dica: 'Para um toque especial, adicione uma pitada de azeite trufado antes de servir.',
  },
  {
    id: 'frango',
    nome: 'Frango',
    tipo: 'salgada',
    tempo: '15 minutos',
    porcoes: '1 tapioca',
    ingredientes: [
      '1 porção de massa de tapioca Alice (65g)',
      '100g de peito de frango desfiado',
      '1/2 cebola picada',
      '1 dente de alho picado',
      '1 colher (sopa) de azeite',
      'Sal e pimenta a gosto',
      'Cheiro-verde picado',
    ],
    preparo: [
      'Refogue o frango desfiado com cebola, alho e azeite.',
      'Tempere com sal e pimenta a gosto. Reserve.',
      'Aqueça a frigideira e espalhe a massa de tapioca.',
      'Cozinhe por 2 minutos até firmar e vire.',
      'Adicione o recheio de frango e dobre ao meio.',
      'Finalize com cheiro-verde e sirva.',
    ],
    dica: 'Você pode adicionar requeijão cremoso para ficar ainda mais saborosa!',
  },
  {
    id: 'carne-seca',
    nome: 'Carne Seca',
    tipo: 'salgada',
    tempo: '20 minutos',
    porcoes: '1 tapioca',
    ingredientes: [
      '1 porção de massa de tapioca Alice (65g)',
      '100g de carne seca dessalgada e desfiada',
      '1/2 cebola roxa picada',
      '1/2 tomate picado',
      '1 colher (sopa) de azeite',
      'Salsa picada a gosto',
    ],
    preparo: [
      'Refogue a carne seca com cebola e tomate no azeite.',
      'Deixe cozinhar por 5 minutos e reserve.',
      'Prepare a tapioca na frigideira aquecida.',
      'Vire a massa e adicione o recheio de carne seca.',
      'Dobre e deixe aquecer por mais 1 minuto.',
      'Finalize com salsa e sirva.',
    ],
    dica: 'Acompanhe com uma salada de vinagrete para um almoço completo.',
  },
  {
    id: 'vegetariana',
    nome: 'Vegetariana',
    tipo: 'salgada',
    tempo: '12 minutos',
    porcoes: '1 tapioca',
    ingredientes: [
      '1 porção de massa de tapioca Alice (65g)',
      '50g de cogumelos frescos picados',
      '1/2 abobrinha em cubos',
      '1/4 pimentão amarelo em tiras',
      '1 colher (sopa) de azeite',
      'Sal, pimenta e manjericão a gosto',
    ],
    preparo: [
      'Salteie os cogumelos, abobrinha e pimentão no azeite.',
      'Tempere com sal, pimenta e manjericão. Reserve.',
      'Prepare a tapioca na frigideira até firmar.',
      'Vire e adicione os legumes salteados.',
      'Dobre a tapioca e sirva imediatamente.',
    ],
    dica: 'Adicione queijo coalho ou muçarela para uma versão mais cremosa.',
  },
  {
    id: 'coco',
    nome: 'Coco',
    tipo: 'doce',
    tempo: '8 minutos',
    porcoes: '1 tapioca',
    ingredientes: [
      '1 porção de massa de tapioca Alice (65g)',
      '3 colheres (sopa) de coco ralado',
      '2 colheres (sopa) de leite condensado',
      '1 colher (sopa) de manteiga',
    ],
    preparo: [
      'Prepare a tapioca na frigideira até firmar.',
      'Vire a massa e espalhe o coco ralado.',
      'Adicione o leite condensado por cima.',
      'Dobre a tapioca ao meio.',
      'Deixe aquecer por 1 minuto e retire.',
      'Sirva com mais coco ralado por cima.',
    ],
    dica: 'Para ficar crocante, toste o coco na frigideira antes de usar.',
  },
  {
    id: 'doce-de-leite',
    nome: 'Doce de Leite',
    tipo: 'doce',
    tempo: '8 minutos',
    porcoes: '1 tapioca',
    ingredientes: [
      '1 porção de massa de tapioca Alice (65g)',
      '3 colheres (sopa) de doce de leite cremoso',
      '1 colher (sopa) de coco ralado (opcional)',
      'Canela em pó para polvilhar',
    ],
    preparo: [
      'Prepare a tapioca na frigideira aquecida.',
      'Vire a massa e espalhe o doce de leite.',
      'Se desejar, adicione coco ralado.',
      'Dobre a tapioca ao meio.',
      'Aquece por mais 1 minuto e retire.',
      'Polvilhe canela e sirva.',
    ],
    dica: 'Sirva acompanhada de café quente para um lanche perfeito!',
  },
  {
    id: 'frutas',
    nome: 'Frutas',
    tipo: 'doce',
    tempo: '10 minutos',
    porcoes: '1 tapioca',
    ingredientes: [
      '1 porção de massa de tapioca Alice (65g)',
      '1/2 banana em rodelas',
      'Morangos fatiados a gosto',
      '1 colher (sopa) de mel',
      'Canela em pó',
    ],
    preparo: [
      'Prepare a tapioca na frigideira até firmar.',
      'Vire a massa e aqueça por mais 1 minuto.',
      'Retire e coloque no prato.',
      'Adicione as frutas por cima da tapioca dobrada.',
      'Regue com mel e polvilhe canela.',
      'Sirva imediatamente.',
    ],
    dica: 'Você pode usar qualquer fruta da estação: manga, kiwi, abacaxi...',
  },
  {
    id: 'chocolate',
    nome: 'Chocolate',
    tipo: 'doce',
    tempo: '10 minutos',
    porcoes: '1 tapioca',
    ingredientes: [
      '1 porção de massa de tapioca Alice (65g)',
      '50g de chocolate meio amargo picado',
      '1 colher (sopa) de creme de leite',
      'Granulado para decorar',
    ],
    preparo: [
      'Prepare a tapioca na frigideira até firmar.',
      'Vire a massa e distribua o chocolate picado.',
      'Adicione o creme de leite por cima.',
      'Dobre a tapioca e deixe o chocolate derreter.',
      'Retire do fogo e decore com granulado.',
      'Sirva quente para aproveitar o chocolate derretido!',
    ],
    dica: 'Use chocolate belga para um resultado mais sofisticado.',
  },
];

export default function VersatileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);

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

  const receitasSalgadas = receitas.filter(r => r.tipo === 'salgada');
  const receitasDoces = receitas.filter(r => r.tipo === 'doce');

  return (
    <section id="versatil" ref={sectionRef} className="section-pinned z-40">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/prep_pan.jpg" 
          alt="Preparo da tapioca" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center pt-[6vh]">
        {/* Top Label */}
        <span ref={labelRef} className="label-mono text-white/80 mb-3">
          VERSÁTIL
        </span>
        
        {/* Headline Principal - RECEITAS em destaque */}
        <h2 
          ref={headlineRef}
          className="headline-editorial text-white text-[clamp(42px,6vw,84px)] text-center leading-none mb-2"
        >
          RECEITAS
        </h2>

        {/* Subtitle */}
        <p className="text-white/90 text-[clamp(16px,1.5vw,24px)] text-center font-light tracking-wide mb-3">
          Doce ou Salgada, do seu jeito
        </p>

        {/* Instrução */}
        <p className="text-white/60 text-sm mb-8 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <ChefHat className="w-4 h-4" />
          Clique nos nomes abaixo para ver a receita completa
        </p>

        {/* Bottom Cards */}
        <div className="absolute bottom-[5vh] left-0 right-0 flex justify-center gap-[4vw]">
          {/* Salgada Card */}
          <div 
            ref={leftCardRef}
            className="w-[38vw] min-w-[300px] max-w-[460px]"
          >
            <div className="info-card card-shadow h-[38vh] min-h-[320px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#0F2E1C] flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-medium text-[#1A1A1A]">Salgada</h3>
              </div>
              <p className="text-[#6E6A62] text-sm leading-relaxed mb-4">
                Opções deliciosas para qualquer hora do dia:
              </p>
              <ul className="space-y-2">
                {receitasSalgadas.map((receita) => (
                  <li key={receita.id}>
                    <button
                      onClick={() => setReceitaSelecionada(receita)}
                      className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#C8A36C] transition-colors group w-full text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A36C] group-hover:scale-125 transition-transform" />
                      <span className="group-hover:underline underline-offset-2">
                        {receita.nome}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Doce Card */}
          <div 
            ref={rightCardRef}
            className="w-[38vw] min-w-[300px] max-w-[460px]"
          >
            <div className="info-card card-shadow h-[38vh] min-h-[320px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C8A36C] flex items-center justify-center">
                  <IceCream className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-medium text-[#1A1A1A]">Doce</h3>
              </div>
              <p className="text-[#6E6A62] text-sm leading-relaxed mb-4">
                Combinações perfeitas para um momento especial:
              </p>
              <ul className="space-y-2">
                {receitasDoces.map((receita) => (
                  <li key={receita.id}>
                    <button
                      onClick={() => setReceitaSelecionada(receita)}
                      className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#C8A36C] transition-colors group w-full text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A36C] group-hover:scale-125 transition-transform" />
                      <span className="group-hover:underline underline-offset-2">
                        {receita.nome}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Receita */}
      <Dialog open={!!receitaSelecionada} onOpenChange={() => setReceitaSelecionada(null)}>
        <DialogContent className="bg-[#F6F2EA] border-0 max-w-[600px] max-h-[85vh] overflow-y-auto">
          {receitaSelecionada && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    receitaSelecionada.tipo === 'salgada' ? 'bg-[#0F2E1C]' : 'bg-[#C8A36C]'
                  }`}>
                    {receitaSelecionada.tipo === 'salgada' ? (
                      <UtensilsCrossed className="w-5 h-5 text-white" />
                    ) : (
                      <IceCream className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <DialogTitle className="font-display text-2xl text-[#1A1A1A]">
                    Tapioca de {receitaSelecionada.nome}
                  </DialogTitle>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#6E6A62]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {receitaSelecionada.tempo}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {receitaSelecionada.porcoes}
                  </span>
                </div>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {/* Ingredientes */}
                <div>
                  <h4 className="font-medium text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#C8A36C]/20 flex items-center justify-center text-xs text-[#C8A36C] font-bold">
                      1
                    </span>
                    Ingredientes
                  </h4>
                  <ul className="space-y-2 pl-8">
                    {receitaSelecionada.ingredientes.map((ingrediente, idx) => (
                      <li key={idx} className="text-sm text-[#6E6A62] flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#C8A36C] mt-2 flex-shrink-0" />
                        {ingrediente}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modo de Preparo */}
                <div>
                  <h4 className="font-medium text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#C8A36C]/20 flex items-center justify-center text-xs text-[#C8A36C] font-bold">
                      2
                    </span>
                    Modo de Preparo
                  </h4>
                  <ol className="space-y-3 pl-8">
                    {receitaSelecionada.preparo.map((passo, idx) => (
                      <li key={idx} className="text-sm text-[#6E6A62] flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0F2E1C] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{passo}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Dica */}
                {receitaSelecionada.dica && (
                  <div className="bg-[#C8A36C]/10 rounded-xl p-4">
                    <p className="text-sm text-[#1A1A1A]">
                      <span className="font-medium">💡 Dica da Alice:</span>{' '}
                      {receitaSelecionada.dica}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

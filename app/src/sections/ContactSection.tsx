import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, Download, Instagram } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: '', description: '' });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Flowing section animations
      gsap.fromTo(headlineRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(subheadlineRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subheadlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(cardsRef.current?.children || [],
        { y: 18, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(formRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogMessage({
      title: 'Mensagem enviada!',
      description: 'Obrigado pelo contato. Responderemos em breve.'
    });
    setDialogOpen(true);
  };

  const handleDownload = () => {
    setDialogMessage({
      title: 'Ficha Técnica',
      description: 'O download da ficha técnica será disponibilizado em breve.'
    });
    setDialogOpen(true);
  };

  return (
    <section id="contato" ref={sectionRef} className="relative z-[80] bg-[#0F2E1C] py-[10vh] px-[6vw]">
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      
      <div className="relative z-10 max-w-[980px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 
            ref={headlineRef}
            className="headline-editorial text-white text-[clamp(32px,4vw,64px)] mb-4"
          >
            Leve Alice para o seu negócio.
          </h2>
          <p 
            ref={subheadlineRef}
            className="text-white/70 text-[clamp(15px,1.2vw,20px)]"
          >
            Fale direto. Respondemos rápido.
          </p>
        </div>

        {/* Contact Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <a 
            href="https://wa.me/5561999185707"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-[#C8A36C]/20 flex items-center justify-center group-hover:bg-[#C8A36C]/30 transition-colors">
              <Phone className="w-5 h-5 text-[#C8A36C]" />
            </div>
            <div>
              <p className="text-white/50 text-xs mb-1">WhatsApp</p>
              <p className="text-white text-sm">(61) 99918-5707</p>
            </div>
          </a>
          
          <a 
            href="mailto:tapiocasalicce@gmail.com"
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-[#C8A36C]/20 flex items-center justify-center group-hover:bg-[#C8A36C]/30 transition-colors">
              <Mail className="w-5 h-5 text-[#C8A36C]" />
            </div>
            <div>
              <p className="text-white/50 text-xs mb-1">E-mail</p>
              <p className="text-white text-sm">tapiocasalicce@gmail.com</p>
            </div>
          </a>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C8A36C]/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#C8A36C]" />
            </div>
            <div>
              <p className="text-white/50 text-xs mb-1">Localização</p>
              <p className="text-white text-sm">Brasília/DF</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-white/50 text-xs mb-2 block">Nome</label>
              <input 
                type="text"
                placeholder="Seu nome"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-2 block">E-mail</label>
              <input 
                type="email"
                placeholder="seu@email.com"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="text-white/50 text-xs mb-2 block">Mensagem</label>
            <textarea 
              placeholder="Como podemos ajudar?"
              rows={4}
              className="form-input resize-none"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              type="submit"
              className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Send className="w-4 h-4" />
              Solicitar contato
            </button>
            <button 
              type="button"
              onClick={handleDownload}
              className="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Baixar ficha técnica (PDF)
            </button>
          </div>
        </form>

        {/* Instagram Link */}
        <div className="mt-8 text-center">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setDialogMessage({
                title: 'Instagram',
                description: 'Nosso perfil no Instagram será disponibilizado em breve.'
              });
              setDialogOpen(true);
            }}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm">Siga-nos no Instagram</span>
          </a>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#F6F2EA] border-0">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[#1A1A1A]">
              {dialogMessage.title}
            </DialogTitle>
            <DialogDescription className="text-[#6E6A62]">
              {dialogMessage.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}

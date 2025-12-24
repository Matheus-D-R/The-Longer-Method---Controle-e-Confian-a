
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  ArrowRight, 
  Zap, 
  Target, 
  Activity, 
  Shield, 
  AlertCircle,
  Plus,
  Minus,
  CheckCircle2,
  Users
} from 'lucide-react';

const CHECKOUT_URL = "https://pay.kiwify.com.br/SykVrzJ?afid=1gMqmYXp";

// --- Componente de Animação ---
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'none'; className?: string }> = ({ children, delay = 0, direction = 'up', className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0 
    },
    visible: { 
      opacity: 1, 
      y: 0 
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- FAQ Item Component ---
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-white transition-colors"
      >
        <span className="text-lg font-light tracking-wide">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-green-500" /> : <Plus className="w-5 h-5 text-neutral-600" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-500 font-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Purchase Button with Social Proof ---
const BuyButton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
    <a 
      href={CHECKOUT_URL}
      className={`group relative bg-white text-black w-full py-6 rounded-full font-black text-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center ${className}`}
    >
      QUERO MEU ACESSO AGORA
      <ArrowRight className="inline-block ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
    </a>
    <div className="flex items-center gap-2 text-green-500/80 animate-pulse">
      <Users className="w-3 h-3" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">70 homens já compraram nas últimas 24h</span>
    </div>
  </div>
);

// --- Navbar ---
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-xl py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xl font-serif tracking-widest uppercase italic font-medium">The Longer Method</div>
        <div className="text-[#22c55e] text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-center bg-[#22c55e]/10 px-4 py-2 rounded-full border border-[#22c55e]/20">
          Aproveite Oferta Exclusiva de Lançamento Para os 100 Primeiros Usuários
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className="relative selection:bg-green-900 selection:text-white overflow-x-hidden bg-[#050505] text-neutral-200">
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="relative min-h-[75vh] flex items-center pt-32 overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#0a1a0a_0%,_transparent_70%)] -z-10" 
        />
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.5em] text-green-500 font-bold mb-6 block">Único e Exclusivo no Brasil</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-[1.1] text-white">
                O Longer Method é diferente de tudo que já existe!
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-3xl text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto italic">
                O fim da ejaculação precoce com resultados reais na primeira semana.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Urgência Impactante --- */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <FadeIn>
              <div className="flex justify-center mb-6">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight leading-tight">
                SE ESTÁ BUSCANDO UMA SOLUÇÃO PARA O PROBLEMA DE EJACULAÇÃO PRECOCE, VOCÊ ESTÁ NO LUGAR CERTO.
              </h2>
              <p className="text-xl md:text-2xl font-medium text-neutral-700 leading-relaxed border-l-4 border-red-600 pl-6 text-left my-10 italic">
                Pois medicamentos não resolvem, só adiam o problema e causam efeitos adversos.
              </p>
              <p className="text-lg md:text-xl font-bold uppercase text-red-700 tracking-wide">
                A DECISÃO PRECISA SER TOMADA POR VOCÊ! TER A CAPACIDADE DE SURPREENDER POSITIVAMENTE E SATISFAZER SUA PARCEIRA AGORA É UMA ESCOLHA, E DEIXAR PARA DEPOIS PODE SER TARDE DEMAIS!
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Seção de Doutores --- */}
      <section className="py-32 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-24">
              <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-6 block">Corpo Clínico</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Especialistas Responsáveis</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Dr. Paulo César */}
            <FadeIn delay={0.2}>
              <div className="bg-[#0c0c0c] p-8 md:p-12 rounded-[2.5rem] border border-white/5 h-full flex flex-col shadow-2xl">
                <div className="flex flex-col items-center text-center mb-10">
                  <img src="https://longermethod.com/wp-content/uploads/2024/12/doutor-paulo-cesar.png" alt="Dr. Paulo César" className="w-48 h-48 rounded-full object-cover mb-6 border-2 border-white/10" />
                  <h3 className="text-2xl font-serif text-white italic">Dr. Paulo César</h3>
                </div>
                <div className="space-y-6 text-neutral-400 font-light italic text-sm leading-relaxed">
                  <p>"A nossa intenção é que o Longer Method seja difundido em todo o território nacional e que futuramente seja uma solução convencional para o problema de ejaculação precoce e prevenção da disfunção erétil."</p>
                  <p>"Para viabilizar o Longer Method no Brasil existem diversos custos operacionais, como manutenção de site... decidimos oferecer um desconto de 95% para os 100 primeiros usuários de 2025, inclusive com consultas gratuitas de acompanhamento via telemedicina."</p>
                </div>
              </div>
            </FadeIn>

            {/* Dr. Felipe Ribeiro */}
            <FadeIn delay={0.4}>
              <div className="bg-[#0c0c0c] p-8 md:p-12 rounded-[2.5rem] border border-white/5 h-full flex flex-col shadow-2xl">
                <div className="flex flex-col items-center text-center mb-10">
                  <img src="https://longermethod.com/wp-content/uploads/2024/12/doutor-felipe-ribeiro.png" alt="Dr. Felipe Ribeiro" className="w-48 h-48 rounded-full object-cover mb-6 border-2 border-white/10" />
                  <h3 className="text-2xl font-serif text-white italic">Dr. Felipe Ribeiro</h3>
                </div>
                <div className="space-y-6 text-neutral-400 font-light italic text-sm leading-relaxed">
                  <p>"Tivemos uma certa dificuldade para disponibilizar o Longer Method no Brasil... Obviamente que para ensejar esse projeto nós tivemos que organizar uma equipe no Brasil para iniciar e dar andamento na regularização."</p>
                  <p>"Temos convicção que o Longer Method é diferente de tudo, pois visa máximo resultado com o mínimo de esforço, sem necessidade de medicação. No Canadá, alguns indivíduos tiveram resultados satisfatórios com menos de 3 semanas."</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- AO QUE TEREI ACESSO --- */}
      <section className="py-32 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-20">
                <span className="text-[10px] uppercase tracking-[0.5em] text-green-500 mb-6 block">Conteúdo</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 uppercase">AO QUE TEREI ACESSO NA PLATAFORMA LONGER METHOD?</h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Nível Inicial", items: ["Procedimento 1", "Procedimento 2"], color: "text-blue-400" },
                { title: "Nível Intermediário", items: ["Procedimento 1", "Procedimento 2"], color: "text-green-400" },
                { title: "Nível Avançado", items: ["Procedimento 1", "Procedimento 2", "Procedimento 3"], color: "text-red-400" },
                { title: "Especial", items: ["Técnica de Efetividade", "Suporte com Especialista"], color: "text-purple-400" }
              ].map((level, i) => (
                <FadeIn key={i} delay={i * 0.1} className="bg-neutral-900/50 p-8 rounded-3xl border border-white/5">
                  <h3 className={`text-xl font-bold uppercase tracking-widest mb-6 ${level.color}`}>{level.title}</h3>
                  <ul className="space-y-4">
                    {level.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-neutral-400">
                        <CheckCircle2 className="w-5 h-5 text-neutral-700" />
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ))}
            </div>
            
            <FadeIn delay={0.5} className="mt-16 text-center">
              <BuyButton />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Vídeo Section --- */}
      <section id="video" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
             <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
                <iframe
                  src="https://player.vimeo.com/video/1045026422?h=79e2c695bc&badge=0&autopause=0&player_id=0&app_id=58479"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="The Longer Method"
                ></iframe>
              </div>
          </div>
        </div>
      </section>

      {/* --- Preço --- */}
      <section className="py-32 bg-white text-black text-center">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl uppercase font-black tracking-tight mb-4">Oferta de Lançamento</h2>
            <div className="mb-10">
              <span className="text-neutral-400 line-through text-2xl mr-4 italic">De R$ 497,00</span>
              <span className="text-6xl font-black text-red-600 block md:inline mt-4">POR APENAS R$ 24,60</span>
            </div>
            <p className="text-2xl font-bold mb-12">ou até 5x de <span className="text-4xl">R$ 5,37</span></p>
            <BuyButton className="!bg-black !text-white" />
          </FadeIn>
        </div>
      </section>

      {/* --- Cards de Benefícios --- */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Zap className="w-8 h-8 text-green-500" />, title: "Maior Disposição", desc: "Melhoramento do desempenho sexual em 67% dos usuários após a segunda semana." },
              { icon: <Target className="w-8 h-8 text-green-500" />, title: "Fim da Ejaculação Precoce", desc: "Elimina o problema de forma definitiva com técnicas de fortalecimento pélvico." },
              { icon: <Activity className="w-8 h-8 text-green-500" />, title: "Melhora da Ereção", desc: "Proporciona maior força e resistência, auxiliando na prevenção da disfunção erétil." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-green-500/30 transition-all h-full">
                  <div className="mb-8">{item.icon}</div>
                  <h3 className="text-2xl font-serif mb-6 text-white">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed font-light text-sm italic">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Dúvidas Frequentes --- */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-4xl font-serif text-white mb-16 text-center">Dúvidas Frequentes</h2>
            </FadeIn>
            <div className="space-y-2">
              <FAQItem question="O que é o Longer Method?" answer="É um método digital exclusivo baseado em técnicas de fortalecimento pélvico e reprogramação consciente para o controle ejaculatório definitivo." />
              <FAQItem question="Como posso iniciar o Longer Method?" answer="Imediatamente após a confirmação do pagamento, você recebe os dados de acesso no seu e-mail de forma 100% discreta." />
              <FAQItem question="Quando terei resultados com o Longer Method?" answer="A maioria dos usuários relata melhoras significativas já na primeira semana de aplicação dos procedimentos." />
              <FAQItem question="Esse site é seguro?" answer="Sim, utilizamos protocolos de criptografia bancária e o pagamento é processado por plataformas líderes de mercado." />
              <FAQItem question="Quando vou receber o Longer Method?" answer="O acesso é instantâneo. Assim que o pagamento é aprovado, o link de acesso é enviado ao seu e-mail." />
              <FAQItem question="Quais são os benefícios do Longer Method?" answer="Controle total do tempo, ereções mais firmes, fim da ansiedade de performance e maior autoconfiança." />
            </div>
          </div>
        </div>
      </section>

      {/* --- Seção de Privacidade/Conversão --- */}
      <section className="py-32 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <FadeIn className="flex-1">
              <h2 className="text-3xl font-serif text-white mb-6 italic">Privacidade Total e Discrição</h2>
              <p className="text-neutral-400 leading-relaxed mb-8 font-light">
                Sabemos da importância da sua privacidade. O acesso ao Longer Method é 100% digital, anônimo e seguro. Nenhuma informação sensível aparecerá em sua fatura ou será compartilhada.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <Lock className="w-4 h-4 text-green-500" /> Criptografia de Ponta a Ponta
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <EyeOff className="w-4 h-4 text-green-500" /> Acesso 100% Anônimo
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Garantia de Segurança Digital
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="flex-1 w-full">
               <div className="bg-gradient-to-br from-neutral-900 to-black p-12 rounded-[3rem] border border-white/10 text-center shadow-2xl flex flex-col items-center">
                 <Shield className="w-16 h-16 text-green-500/20 mx-auto mb-8 stroke-1" />
                 <h4 className="text-xl font-serif text-white mb-4">Escolha com Confiança</h4>
                 <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                   Sua transformação começa com uma decisão discreta hoje. Recupere o controle que você sempre desejou.
                 </p>
                 <BuyButton />
               </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div>
              <div className="text-lg font-serif tracking-[0.2em] uppercase italic mb-4">The Longer Method</div>
              <p className="text-neutral-600 text-[10px] uppercase tracking-[0.2em]">© 2025 — Todos os direitos reservados.</p>
            </div>
            
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500">
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>
          <div className="mt-20 text-center opacity-30 text-[9px] uppercase tracking-[0.3em] font-light max-w-4xl mx-auto leading-loose">
            AVISO LEGAL: O conteúdo aqui apresentado tem fins exclusivamente educacionais. Não substitui aconselhamento médico profissional. Procure sempre a orientação de um profissional de saúde qualificado.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

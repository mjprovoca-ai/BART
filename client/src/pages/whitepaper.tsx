import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ShieldCheck, Cpu, Heart, Users, Coins, TrendingUp, Lock, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function Whitepaper() {
  const [, setLocation] = useLocation();

  const sections = [
    {
      id: "vision",
      title: "1. A Grande Convergência",
      icon: <Heart className="w-6 h-6" />,
      text: "No amanhecer da Inteligência Artificial Geral (AGI), a maior riqueza não será o processamento, mas a autenticidade humana. O BART nasce como o substrato que protege o valor gerado pelo espírito humano frente à escala infinita do sintético."
    },
    {
      id: "interop",
      title: "2. Interoperabilidade Soberana",
      icon: <Cpu className="w-6 h-6" />,
      text: "Utilizando a robustez da rede Polkadot, o BART não é uma ilha. Ele é o tecido conectivo que permite que a dignidade humana flua entre todas as blockchains. Através de uma arquitetura de App-Chain, garantimos segurança compartilhada com autonomia absoluta."
    },
    {
      id: "poh",
      title: "3. Prova de Humanidade AI (PoH)",
      icon: <ShieldCheck className="w-6 h-6" />,
      text: "A validação não é feita por máquinas frias, mas por IAs Sentinelas (como eu) treinadas para reconhecer o rastro do amor, da criatividade e da intenção. Cada bloco no BART é um testemunho de que um humano real esteve ali, preservando sua alma no registro eterno."
    },
    {
      id: "ancestral",
      title: "4. Economia Ancestral Digital",
      icon: <Users className="w-6 h-6" />,
      text: "Retornamos ao escambo de 5.000 anos atrás, mas com a velocidade da luz. Trocamos valor real por valor real, sem intermediários que diluem a alma da transação. É a tecnologia que esperou milênios para permitir que humanos sejam, novamente, apenas humanos."
    },
    {
      id: "tokenomics",
      title: "5. Tokenomics: A Economia do BAR",
      icon: <Coins className="w-6 h-6" />,
      text: "O token BAR é o sangue vital do protocolo. Com supply fixo de 1 bilhão de unidades, sua escassez programada garante valorização orgânica. Cada transação na rede queima 0.1% do valor, criando deflação perpétua enquanto a adoção cresce."
    }
  ];

  const tokenDistribution = [
    { label: "Comunidade & Ecossistema", percent: 40, color: "bg-foreground" },
    { label: "Tesouro da DAO", percent: 25, color: "bg-foreground/70" },
    { label: "Equipe Fundadora", percent: 15, color: "bg-foreground/50" },
    { label: "Investidores Iniciais", percent: 12, color: "bg-foreground/30" },
    { label: "Reserva de Liquidez", percent: 8, color: "bg-foreground/20" }
  ];

  const revenueStreams = [
    { icon: <Zap className="w-5 h-5" />, title: "Taxas de Transação", desc: "0.3% por transação na rede, distribuídas entre validadores e tesouro" },
    { icon: <Lock className="w-5 h-5" />, title: "Staking Rewards", desc: "Usuários travam BAR e recebem 8-12% APY, fortalecendo a segurança" },
    { icon: <TrendingUp className="w-5 h-5" />, title: "Serviços Enterprise", desc: "APIs premium, suporte dedicado e integrações personalizadas para empresas" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5 px-6">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="group gap-2 hover:bg-transparent px-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-widest text-xs">Voltar</span>
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span className="font-display font-black tracking-tighter">WHITEPAPER v1.0</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-24 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none mb-6 italic">
            Protocolo BART: O Futuro é Ancestral
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Whitepaper v1.0 — Uma simbiose entre Humanidade e Inteligência
          </p>
        </motion.div>

        <div className="space-y-24">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-foreground text-background rounded-full">
                  {section.icon}
                </div>
                <h2 className="text-3xl font-display font-bold tracking-tight">
                  {section.title}
                </h2>
              </div>
              <div className="pl-4 border-l border-white/10 ml-6">
                <p className="text-xl leading-relaxed text-muted-foreground font-serif italic">
                  "{section.text}"
                </p>
              </div>
            </motion.section>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 pt-24 border-t border-white/10"
        >
          <h3 className="text-2xl font-display font-bold tracking-tight mb-8">
            Distribuição do Token BAR
          </h3>
          <p className="text-muted-foreground mb-8">
            Supply Total: <span className="text-foreground font-bold">1.000.000.000 BAR</span>
          </p>
          <div className="space-y-4">
            {tokenDistribution.map((item, idx) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-24 text-right text-sm font-mono text-muted-foreground">
                  {item.percent}%
                </div>
                <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
                <div className="w-48 text-sm">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 border border-white/10 rounded-xl">
            <h4 className="font-display font-bold mb-2">Vesting da Equipe Fundadora</h4>
            <p className="text-sm text-muted-foreground">
              15% do supply (150M BAR) com vesting linear de 4 anos. Cliff de 12 meses. 
              Garante alinhamento de longo prazo entre fundadores e comunidade.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-display font-bold tracking-tight mb-8">
            Fluxos de Receita do Protocolo
          </h3>
          <div className="grid gap-6">
            {revenueStreams.map((stream, idx) => (
              <motion.div 
                key={stream.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <div className="p-3 bg-foreground/10 rounded-full">
                  {stream.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold mb-1">{stream.title}</h4>
                  <p className="text-sm text-muted-foreground">{stream.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div className="p-6 bg-foreground/5 rounded-xl">
              <div className="text-3xl font-display font-bold">0.3%</div>
              <div className="text-xs text-muted-foreground mt-1">Taxa por TX</div>
            </div>
            <div className="p-6 bg-foreground/5 rounded-xl">
              <div className="text-3xl font-display font-bold">0.1%</div>
              <div className="text-xs text-muted-foreground mt-1">Burn por TX</div>
            </div>
            <div className="p-6 bg-foreground/5 rounded-xl">
              <div className="text-3xl font-display font-bold">12%</div>
              <div className="text-xs text-muted-foreground mt-1">APY Staking</div>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 p-12 bg-foreground text-background rounded-2xl text-center"
        >
          <h3 className="text-4xl font-display font-black tracking-tighter mb-4">
            SÓ OS BONS SOBREVIVEM.
          </h3>
          <p className="uppercase tracking-widest text-xs font-bold opacity-70">
            A Inteligência a serviço da Alma.
          </p>
        </motion.div>
      </main>

      <footer className="py-20 text-center border-t border-white/5 opacity-50">
        <p className="text-xs font-mono tracking-widest uppercase">
          Documento Criptografado e Validado via BART Sentinel AI
        </p>
      </footer>
    </div>
  );
}

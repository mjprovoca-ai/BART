import { ThemeToggle } from "@/components/ThemeToggle";
import BartFormation from "@/components/BartFormation";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Shield, History, Cpu, Globe, Infinity, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  const toggleLang = () => setLang(l => l === 'pt' ? 'en' : 'pt');

  const t = {
    pt: {
      nav: {
        manifesto: "Manifesto",
        technology: "Tecnologia",
        timeline: "Linha do Tempo",
        profile: "Perfil",
        connect: "Conectar Carteira"
      },
      hero: {
        badge: "Protocolo Web3 Foundation",
        title1: "DESCENTRALIZE",
        title2: "TUDO",
        desc: "Um novo primitivo econômico para a era digital. Construído em Substrate, projetado para humanos, protegido pela matemática.",
        cta_primary: "Começar a Construir",
        cta_secondary: "Ler Whitepaper"
      },
      stats: {
        network_status: "Status da Rede",
        uptime_score: "Pontuação de Uptime",
        active_nodes: "Nós Ativos",
        block_height: "Altura do Bloco",
        transactions: "Total de Transações",
        avg_fee: "Taxa Média"
      },
      timeline: {
        title1: "O Futuro é",
        title2: "Ancestral.",
        subtitle: "A tecnologia que você esperou 5.000 anos para vivenciar. Uma jornada da troca direta à descentralização absoluta.",
        events: [
          { year: "4000 a.C.", title: "Escambo", desc: "A economia baseada na troca direta. O açúcar, o sal e o gado eram a moeda." },
          { year: "1000 a.C.", title: "Pedras Preciosas", desc: "O surgimento de valores intrínsecos. Metais e pedras raras ditam o comércio." },
          { year: "Séc. XX", title: "Moeda Fiduciária", desc: "Cruzeiro, Real, Dólar. O valor baseado na confiança do Estado." },
          { year: "2020", title: "Era Instantânea", desc: "PIX e a digitalização total do fluxo. O tempo se torna o recurso mais escasso." },
          { year: "Hoje", title: "A Grande Ociosidade", desc: "Bilhões em passagens aéreas, hotéis e infraestrutura parados. Desperdício sistêmico." },
          { year: "Futuro", title: "BART Protocol", desc: "Tecnologia que esperou 5000 anos. O futuro é ancestral." }
        ],
        final_reveal: "A tecnologia que esperou 5.000 anos."
      },
      solution: {
        title1: "A",
        title2: "Solução.",
        p1: "Reimaginamos como o valor se move. Sem intermediários, sem atrito, apenas consenso matemático puro. O protocolo BART utiliza um mecanismo único de Prova de Humanidade.",
        p2: "Ao convergir interações do usuário com validação avançada de IA, criamos um substrato seguro e escalável para a próxima geração de aplicativos descentralizados.",
        feature1_title: "Ultra Rápido",
        feature1_desc: "Finalidade inferior a um segundo para apps em tempo real.",
        feature2_title: "Seguro por Padrão",
        feature2_desc: "Verificação formal no nível do protocolo."
      },
      footer: {
        tagline: "O futuro da economia descentralizada. Construído para o longo prazo.",
        rights: "© 2024 Fundação BART. Todos os direitos reservados.",
        status: "Status do Sistema: Operacional",
        cols: [
          { title: "Protocolo", links: ["Governança", "Tokenomics", "Staking", "Bridge"] },
          { title: "Desenvolvedores", links: ["Documentação", "GitHub", "SDKs", "Auditorias"] },
          { title: "Ecossistema", links: ["Carteiras", "Exploradores", "DApps", "Comunidade"] },
          { title: "Legal", links: ["Privacidade", "Termos", "Licenças", "Contato"] }
        ]
      }
    },
    en: {
      nav: {
        manifesto: "Manifesto",
        technology: "Technology",
        timeline: "Timeline",
        profile: "Profile",
        connect: "Connect Wallet"
      },
      hero: {
        badge: "Web3 Foundation Protocol",
        title1: "DECENTRALIZE",
        title2: "EVERYTHING",
        desc: "A new economic primitive for the digital age. Built on Substrate, designed for humans, secured by math.",
        cta_primary: "Start Building",
        cta_secondary: "Read Whitepaper"
      },
      stats: {
        network_status: "Network Status",
        uptime_score: "Network Uptime Score",
        active_nodes: "Active Nodes",
        block_height: "Block Height",
        transactions: "Total Transactions",
        avg_fee: "Average Fee"
      },
      timeline: {
        title1: "The Future is",
        title2: "Ancestral.",
        subtitle: "The technology you waited 5,000 years to experience. A journey from direct barter to absolute decentralization.",
        events: [
          { year: "4000 BC", title: "Barter", desc: "Economy based on direct exchange. Sugar, salt, and cattle were currency." },
          { year: "1000 BC", title: "Precious Stones", desc: "The rise of intrinsic value. Rare metals and stones dictate trade." },
          { year: "20th Century", title: "Fiat Currency", desc: "Dollar, Euro, Real. Value based on State trust." },
          { year: "2020", title: "Instant Era", desc: "Instant payments and total digitization of flow. Time becomes the scarcest resource." },
          { year: "Today", title: "The Great Idleness", desc: "Billions in flights, hotels, and infrastructure sitting idle. Systemic waste." },
          { year: "Future", title: "BART Protocol", desc: "Technology that waited 5000 years. The future is ancestral." }
        ],
        final_reveal: "The technology that waited 5,000 years."
      },
      solution: {
        title1: "The",
        title2: "Solution.",
        p1: "We've reimagined how value moves. No intermediaries, no friction, just pure mathematical consensus. The BART protocol utilizes a unique Proof-of-Humanity consensus mechanism.",
        p2: "By converging user interactions with advanced AI validation, we create a secure, scalable substrate for the next generation of decentralized applications.",
        feature1_title: "Lightning Fast",
        feature1_desc: "Sub-second finality for real-time apps.",
        feature2_title: "Secure by Default",
        feature2_desc: "Formal verification at the protocol level."
      },
      footer: {
        tagline: "The future of decentralized economics. Built for the long term.",
        rights: "© 2024 BART Foundation. All rights reserved.",
        status: "System Status: Operational",
        cols: [
          { title: "Protocol", links: ["Governance", "Tokenomics", "Staking", "Bridge"] },
          { title: "Developers", links: ["Documentation", "GitHub", "SDKs", "Audits"] },
          { title: "Ecosystem", links: ["Wallets", "Explorers", "DApps", "Community"] },
          { title: "Legal", links: ["Privacy", "Terms", "Licenses", "Contact"] }
        ]
      }
    }
  };

  const content = t[lang];

  const timelineData = [
    {
      year: content.timeline.events[0].year,
      title: content.timeline.events[0].title,
      description: content.timeline.events[0].desc,
      icon: <History className="w-6 h-6" />,
      color: "border-muted"
    },
    {
      year: content.timeline.events[1].year,
      title: content.timeline.events[1].title,
      description: content.timeline.events[1].desc,
      icon: <Globe className="w-6 h-6" />,
      color: "border-muted"
    },
    {
      year: content.timeline.events[2].year,
      title: content.timeline.events[2].title,
      description: content.timeline.events[2].desc,
      icon: <History className="w-6 h-6" />,
      color: "border-muted"
    },
    {
      year: content.timeline.events[3].year,
      title: content.timeline.events[3].title,
      description: content.timeline.events[3].desc,
      icon: <Zap className="w-6 h-6" />,
      color: "border-muted"
    },
    {
      year: content.timeline.events[4].year,
      title: content.timeline.events[4].title,
      description: content.timeline.events[4].desc,
      icon: <Cpu className="w-6 h-6" />,
      color: "border-foreground"
    },
    {
      year: content.timeline.events[5].year,
      title: content.timeline.events[5].title,
      description: content.timeline.events[5].desc,
      icon: <Infinity className="w-6 h-6" />,
      color: "border-foreground shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
              <span className="text-background font-bold text-xs">B</span>
            </div>
            <span className="text-xl font-display font-bold tracking-tight">BART</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#manifesto" className="hover:text-foreground transition-colors">{content.nav.manifesto}</a>
            <a href="#timeline" className="hover:text-foreground transition-colors">{content.nav.timeline}</a>
            <a href="#solution" className="hover:text-foreground transition-colors">{content.nav.technology}</a>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLang}
              className="rounded-full w-10 h-10 hover:bg-accent"
            >
              <span className="font-bold text-xs">{lang.toUpperCase()}</span>
            </Button>
            <ThemeToggle />
            <Button variant="default" className="hidden md:flex rounded-full px-6">
              {content.nav.connect}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="manifesto" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background"></div>
        
        <div className="container px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm">
              <span className="text-xs font-mono uppercase tracking-widest">{content.hero.badge}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              {content.hero.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">{content.hero.title2}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              {content.hero.desc}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg w-full md:w-auto group">
                {content.hero.cta_primary}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg w-full md:w-auto">
                {content.hero.cta_secondary}
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Stats Section */}
      <section id="profile" className="py-32 border-t border-border">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">{content.stats.network_status}</h2>
                <div className="text-[12rem] md:text-[16rem] leading-none font-display font-bold text-foreground -ml-2 md:-ml-4 tracking-tighter">
                  98<span className="text-4xl md:text-6xl align-top text-muted-foreground">%</span>
                </div>
                <p className="text-2xl md:text-4xl font-light text-muted-foreground mt-4">
                  {content.stats.uptime_score}
                </p>
              </motion.div>
            </div>

            <div className="space-y-12">
              {[
                { label: content.stats.active_nodes, value: "1,240" },
                { label: content.stats.block_height, value: "#8,992,102" },
                { label: content.stats.transactions, value: "45.2M+" },
                { label: content.stats.avg_fee, value: "< 0.001 BAR" }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-baseline justify-between border-b border-border pb-4 group-hover:border-foreground transition-colors duration-300">
                    <span className="text-lg md:text-xl font-mono text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</span>
                    <span className="text-3xl md:text-5xl font-display font-medium">{stat.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Ancestral Future */}
      <section id="timeline" className="py-32 relative">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mb-24">
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              {content.timeline.subtitle}
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            
            <div className="space-y-16 md:space-y-24">
              {timelineData.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-8 md:gap-0 pl-12 md:pl-0`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'} text-left`}>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">{item.year}</span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground max-w-sm mr-auto md:ml-auto md:mr-0 inline-block text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>

                  {/* Icon Node */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 md:w-12 md:h-12 bg-background border-2 border-foreground rounded-full flex items-center justify-center -translate-x-1/2 z-10">
                    {item.icon}
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* PRE-REVEAL: "A tecnologia que esperou 5000 anos" */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mt-32 mb-16"
          >
            <p className="text-xl md:text-2xl text-muted-foreground italic tracking-wide">
              {content.timeline.final_reveal}
            </p>
          </motion.div>

          {/* THE REVEAL: BART 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden border border-white/10"
          >
            <BartFormation />
          </motion.div>

          {/* POST-REVEAL: O FUTURO É ANCESTRAL - EPIC */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-20"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-muted-foreground/50">
                {content.timeline.title1}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-muted-foreground/50">
                {content.timeline.title2}
              </span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* The Solution Section (Details) */}
      <section id="solution" className="py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
              {content.solution.title1} <br/>{content.solution.title2}
            </h2>
            <div className="space-y-8">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {content.solution.p1}
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {content.solution.p2}
              </p>
              
              <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="p-8 border border-border bg-background/50 rounded-xl">
                  <Zap className="w-8 h-8 mb-4" />
                  <h3 className="font-bold text-xl mb-2">{content.solution.feature1_title}</h3>
                  <p className="text-muted-foreground">{content.solution.feature1_desc}</p>
                </div>
                <div className="p-8 border border-border bg-background/50 rounded-xl">
                  <Shield className="w-8 h-8 mb-4" />
                  <h3 className="font-bold text-xl mb-2">{content.solution.feature2_title}</h3>
                  <p className="text-muted-foreground">{content.solution.feature2_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-background">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <span className="text-2xl font-display font-bold">BART</span>
              <p className="mt-4 text-muted-foreground max-w-xs">
                {content.footer.tagline}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {content.footer.cols.map((column) => (
                <div key={column.title}>
                  <h4 className="font-bold mb-4">{column.title}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {column.links.map((link) => (
                      <li key={link}><a href="#" className="hover:text-foreground transition-colors">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>{content.footer.rights}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span>{content.footer.status}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { ThemeToggle } from "@/components/ThemeToggle";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import BartFormation from "@/components/BartFormation";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Shield, History, Cpu, Globe, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { translations } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');
  const [, setLocation] = useLocation();

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const languages: Array<'en' | 'pt' | 'fr' | 'zh'> = ['en', 'pt', 'fr', 'zh'];
  const toggleLang = () => {
    const currentIdx = languages.indexOf(lang);
    const nextIdx = (currentIdx + 1) % languages.length;
    const newLang = languages[nextIdx];
    setLang(newLang);
    localStorage.setItem('bart_lang', newLang);
  };

  const t = {
    pt: {
      nav: translations.pt.nav,
      hero: {
        badge: "Protocolo Web3 Foundation",
        title1: "DESCENTRALIZE",
        title2: "TUDO",
        desc: "Um novo primitivo econômico para a era digital. Construído em Substrate, projetado para humanos, protegido pela matemática.",
        cta_primary: "Tokenizar Ativo",
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
        events: [
          { year: "4000 a.C.", title: "Escambo", desc: "A economia baseada na troca direta. O açúcar, o sal e o gado eram a moeda." },
          { year: "1000 a.C.", title: "Pedras Preciosas", desc: "O surgimento de valores intrínsecos. Metais e pedras raras ditam o comércio." },
          { year: "Séc. XX", title: "Moeda Fiduciária", desc: "Cruzeiro, Real, Dólar. O valor baseado na confiança do Estado." },
          { year: "2020", title: "Era Instantânea", desc: "PIX e a digitalização total do fluxo. O tempo se torna o recurso mais escasso." },
          { year: "Hoje", title: "A Grande Ociosidade", desc: "Bilhões em passagens aéreas, hotéis e infraestrutura parados. Desperdício sistêmico." },
          { year: "Futuro", title: "BART Protocol", desc: "Tecnologia que esperou 5000 anos. O futuro é ancestral." }
        ]
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
      nav: translations.en.nav,
      hero: {
        badge: "Web3 Foundation Protocol",
        title1: "DECENTRALIZE",
        title2: "EVERYTHING",
        desc: "A new economic primitive for the digital age. Built on Substrate, designed for humans, secured by math.",
        cta_primary: "Tokenize Asset",
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
        events: [
          { year: "4000 BC", title: "Barter", desc: "Economy based on direct exchange. Sugar, salt, and cattle were currency." },
          { year: "1000 BC", title: "Precious Stones", desc: "The rise of intrinsic value. Rare metals and stones dictate trade." },
          { year: "20th Century", title: "Fiat Currency", desc: "Dollar, Euro, Real. Value based on State trust." },
          { year: "2020", title: "Instant Era", desc: "Instant payments and total digitization of flow. Time becomes the scarcest resource." },
          { year: "Today", title: "The Great Idleness", desc: "Billions in flights, hotels, and infrastructure sitting idle. Systemic waste." },
          { year: "Future", title: "BART Protocol", desc: "Technology that waited 5000 years. The future is ancestral." }
        ]
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
    },
    fr: {
      nav: translations.fr.nav,
      hero: {
        badge: "Protocole Web3 Foundation",
        title1: "DÉCENTRALISEZ",
        title2: "TOUT",
        desc: "Une nouvelle primitive économique pour l'ère numérique. Construit sur Substrate, conçu pour les humains, sécurisé par les mathématiques.",
        cta_primary: "Tokeniser um Actif",
        cta_secondary: "Lire le Whitepaper"
      },
      stats: {
        network_status: "État du Réseau",
        uptime_score: "Score de Disponibilité",
        active_nodes: "Nœuds Actifs",
        block_height: "Hauteur du Bloc",
        transactions: "Total des Transactions",
        avg_fee: "Frais Moyen"
      },
      timeline: {
        title1: "Le Futur est",
        title2: "Ancestral.",
        events: [
          { year: "4000 av. J.-C.", title: "Troc", desc: "Économie basée sur l'échange direct. Le sucre, le sel et le bétail étaient la monnaie." },
          { year: "1000 av. J.-C.", title: "Pierres Précieuses", desc: "L'émergence de la valeur intrinsèque. Les métaux et pierres rares dictent le commerce." },
          { year: "XXe Siècle", title: "Monnaie Fiduciaire", desc: "Dollar, Euro. Valeur basée sur la confiance de l'État." },
          { year: "2020", title: "Ère Instantanée", desc: "Paiements instantanés et numérisation totale. Le temps devient la ressource la plus rare." },
          { year: "Aujourd'hui", title: "La Grande Oisiveté", desc: "Des milliards en vols, hôtels et infrastructures inutilisés. Gaspillage systémique." },
          { year: "Futur", title: "Protocole BART", desc: "Le futur est ancestral." }
        ]
      },
      solution: {
        title1: "La",
        title2: "Solution.",
        p1: "Nous avons réinventé la façon dont la valeur circule. Sans intermédiaires, sans friction, juste un consensus mathématique pur. Le protocole BART utilise un mécanisme unique de Preuve d'Humanité.",
        p2: "En combinant les interactions utilisateur avec une validation IA avancée, nous créons un substrat sécurisé et évolutif pour la prochaine génération d'applications décentralisées.",
        feature1_title: "Ultra Rapide",
        feature1_desc: "Finalité en moins d'une seconde pour les apps temps réel.",
        feature2_title: "Sécurisé par Défaut",
        feature2_desc: "Vérification formelle au niveau du protocole."
      },
      footer: {
        tagline: "L'avenir de l'économie décentralisée. Construit pour le long terme.",
        rights: "© 2024 Fondation BART. Tous droits réservés.",
        status: "État du Système: Opérationnel",
        cols: [
          { title: "Protocole", links: ["Gouvernance", "Tokenomics", "Staking", "Bridge"] },
          { title: "Développeurs", links: ["Documentation", "GitHub", "SDKs", "Audits"] },
          { title: "Écosystème", links: ["Portefeuilles", "Explorateurs", "DApps", "Communauté"] },
          { title: "Légal", links: ["Confidentialité", "Conditions", "Licences", "Contact"] }
        ]
      }
    },
    zh: {
      nav: translations.zh.nav,
      hero: {
        badge: "Web3基金会协议",
        title1: "去中心化",
        title2: "一切",
        desc: "数字时代的全新经济原语。基于Substrate构建，为人类设计，由数学保护。",
        cta_primary: "代币化资产",
        cta_secondary: "阅读白皮书"
      },
      stats: {
        network_status: "网络状态",
        uptime_score: "正常运行评分",
        active_nodes: "活跃节点",
        block_height: "区块高度",
        transactions: "总交易量",
        avg_fee: "平均费用"
      },
      timeline: {
        title1: "未来是",
        title2: "古老的。",
        events: [
          { year: "公元前4000年", title: "以物易物", desc: "基于直接交换的经济。糖、盐和牲畜就是货币。" },
          { year: "公元前1000年", title: "宝石", desc: "内在价值的兴起。稀有金属和宝石主导贸易。" },
          { year: "20世纪", title: "法定货币", desc: "美元、欧元、人民币。价值基于国家信任。" },
          { year: "2020年", title: "即时时代", desc: "即时支付和完全数字化。时间成为最稀缺的资源。" },
          { year: "今天", title: "大闲置", desc: "数十亿的航班、酒店和基础设施闲置。系统性浪费。" },
          { year: "未来", title: "BART协议", desc: "未来是古老的。" }
        ]
      },
      solution: {
        title1: "解决",
        title2: "方案。",
        p1: "我们重新构想了价值的流动方式。没有中间商，没有摩擦，只有纯粹的数学共识。BART协议采用独特的人性证明机制。",
        p2: "通过将用户交互与先进的AI验证相结合，我们为下一代去中心化应用创建了安全、可扩展的基础。",
        feature1_title: "极速",
        feature1_desc: "亚秒级确定性，适用于实时应用。",
        feature2_title: "默认安全",
        feature2_desc: "协议级形式化验证。"
      },
      footer: {
        tagline: "去中心化经济的未来。为长远而建。",
        rights: "© 2024 BART基金会。保留所有权利。",
        status: "系统状态：运行中",
        cols: [
          { title: "协议", links: ["治理", "代币经济", "质押", "跨链桥"] },
          { title: "开发者", links: ["文档", "GitHub", "SDK", "审计"] },
          { title: "生态系统", links: ["钱包", "浏览器", "DApps", "社区"] },
          { title: "法律", links: ["隐私", "条款", "许可", "联系"] }
        ]
      }
    }
  };

  const content = t[lang];

  const timelineData = [
    { year: content.timeline.events[0]?.year, title: content.timeline.events[0]?.title, description: content.timeline.events[0]?.desc, icon: <History className="w-6 h-6" />, color: "border-muted" },
    { year: content.timeline.events[1]?.year, title: content.timeline.events[1]?.title, description: content.timeline.events[1]?.desc, icon: <Globe className="w-6 h-6" />, color: "border-muted" },
    { year: content.timeline.events[2]?.year, title: content.timeline.events[2]?.title, description: content.timeline.events[2]?.desc, icon: <History className="w-6 h-6" />, color: "border-muted" },
    { year: content.timeline.events[3]?.year, title: content.timeline.events[3]?.title, description: content.timeline.events[3]?.desc, icon: <Zap className="w-6 h-6" />, color: "border-muted" },
    { year: content.timeline.events[4]?.year, title: content.timeline.events[4]?.title, description: content.timeline.events[4]?.desc, icon: <Cpu className="w-6 h-6" />, color: "border-foreground" },
    { year: content.timeline.events[5]?.year, title: content.timeline.events[5]?.title, description: content.timeline.events[5]?.desc, icon: <Infinity className="w-6 h-6" />, color: "border-foreground shadow-[0_0_20px_rgba(255,255,255,0.1)]" }
  ].filter(item => item.year !== undefined);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center"><span className="text-background font-bold text-xs">B</span></div>
            <span className="text-xl font-display font-bold tracking-tight">BART</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#manifesto" className="hover:text-foreground transition-colors">{content.nav.manifesto}</a>
            <a href="#timeline" className="hover:text-foreground transition-colors">{content.nav.timeline}</a>
            <button onClick={() => setLocation("/marketplace")} className="hover:text-foreground transition-colors">{content.nav.marketplace}</button>
            <button onClick={() => setLocation("/profile")} className="hover:text-foreground transition-colors">{content.nav.profile}</button>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" onClick={toggleLang} className="rounded-full w-8 h-8 md:w-10 md:h-10 hover:bg-accent"><span className="font-bold text-xs">{lang.toUpperCase()}</span></Button>
            <ThemeToggle />
            <ConnectWalletButton label={content.nav.connect} />
          </div>
        </div>
      </nav>

      <section id="manifesto" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background"></div>
        <div className="container px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm"><span className="text-xs font-mono uppercase tracking-widest">{content.hero.badge}</span></div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-8">{content.hero.title1} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">{content.hero.title2}</span></h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">{content.hero.desc}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg w-full md:w-auto group" onClick={() => setLocation("/tokenize")}><Zap className="w-5 h-5 mr-2" />{content.hero.cta_primary}</Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg w-full md:w-auto" onClick={() => setLocation("/whitepaper")}>{content.hero.cta_secondary}</Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"><ChevronDown className="w-6 h-6" /></div>
      </section>

      <section className="py-32 border-t border-border">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
            <div><motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}><h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">{content.stats.network_status}</h2><div className="text-[12rem] md:text-[16rem] leading-none font-display font-bold text-foreground -ml-2 md:-ml-4 tracking-tighter">98<span className="text-4xl md:text-6xl align-top text-muted-foreground">%</span></div><p className="text-2xl md:text-4xl font-light text-muted-foreground mt-4">{content.stats.uptime_score}</p></motion.div></div>
            <div className="space-y-12">
              {[
                { label: content.stats.active_nodes, value: "1,240" },
                { label: content.stats.block_height, value: "#8,992,102" },
                { label: content.stats.transactions, value: "45.2M+" },
                { label: content.stats.avg_fee, value: "< 0.001 BAR" }
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="group cursor-pointer">
                  <div className="flex items-baseline justify-between border-b border-border pb-4 group-hover:border-foreground transition-colors duration-300"><span className="text-lg md:text-xl font-mono text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</span><span className="text-3xl md:text-5xl font-display font-medium">{stat.value}</span></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="py-32 relative">
        <div className="container px-6 mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            <div className="space-y-16 md:space-y-24">
              {timelineData.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-8 md:gap-0 pl-12 md:pl-0`}>
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'} text-left`}><span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">{item.year}</span><h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{item.title}</h3><p className="text-muted-foreground max-w-sm mr-auto md:ml-auto md:mr-0 inline-block text-sm md:text-base">{item.description}</p></div>
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 md:w-12 md:h-12 bg-background border-2 border-foreground rounded-full flex items-center justify-center -translate-x-1/2 z-10">{item.icon}</div>
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden border border-white/10 mt-24"><BartFormation /></motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="text-center mt-20"><h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none"><span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-muted-foreground/50">{content.timeline.title1}</span><span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-muted-foreground/50">{content.timeline.title2}</span></h2></motion.div>
        </div>
      </section>

      <section id="solution" className="py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">{content.solution.title1} <br/>{content.solution.title2}</h2>
            <div className="space-y-8">
              <p className="text-xl text-muted-foreground leading-relaxed">{content.solution.p1}</p>
              <p className="text-xl text-muted-foreground leading-relaxed">{content.solution.p2}</p>
              <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="p-8 border border-border bg-background/50 rounded-xl"><Zap className="w-8 h-8 mb-4" /><h3 className="font-bold text-xl mb-2">{content.solution.feature1_title}</h3><p className="text-muted-foreground">{content.solution.feature1_desc}</p></div>
                <div className="p-8 border border-border bg-background/50 rounded-xl"><Shield className="w-8 h-8 mb-4" /><h3 className="font-bold text-xl mb-2">{content.solution.feature2_title}</h3><p className="text-muted-foreground">{content.solution.feature2_desc}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t border-border pt-24 pb-12">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            {content.footer.cols.map((col) => (<div key={col.title}><h4 className="font-bold mb-6">{col.title}</h4><ul className="space-y-4 text-sm text-muted-foreground">{col.links.map(link => (<li key={link}><a href="#" className="hover:text-foreground transition-colors">{link}</a></li>))}</ul></div>))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-border gap-8">
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center"><span className="text-background font-bold text-[10px]">B</span></div><span className="font-display font-bold">BART Protocol</span></div>
            <p className="text-sm text-muted-foreground">{content.footer.rights}</p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{content.footer.status}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

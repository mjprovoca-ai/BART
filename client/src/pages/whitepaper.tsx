import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ShieldCheck, Cpu, Heart, Users, Coins, TrendingUp, Lock, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { translations } from "@/lib/i18n";
import { useState, useEffect } from "react";

export default function Whitepaper() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const content = translations[lang].whitepaper;
  const navContent = translations[lang].nav;

  const sections = [
    { id: "vision", title: content.sections[0].title, icon: <Heart className="w-6 h-6" />, text: content.sections[0].text },
    { id: "interop", title: content.sections[1].title, icon: <Cpu className="w-6 h-6" />, text: content.sections[1].text },
    { id: "poh", title: content.sections[2].title, icon: <ShieldCheck className="w-6 h-6" />, text: content.sections[2].text },
    { id: "ancestral", title: content.sections[3].title, icon: <Users className="w-6 h-6" />, text: content.sections[3].text },
    { id: "tokenomics", title: content.sections[4].title, icon: <Coins className="w-6 h-6" />, text: content.sections[4].text },
    { id: "sale", title: content.sections[5].title, icon: <TrendingUp className="w-6 h-6" />, text: content.sections[5].text }
  ];

  const tokenDistribution = [
    { label: content.distribution.items[0], percent: 40, color: "bg-foreground" },
    { label: content.distribution.items[1], percent: 30, color: "bg-foreground/70" },
    { label: content.distribution.items[2], percent: 15, color: "bg-foreground/50" },
    { label: content.distribution.items[3], percent: 10, color: "bg-foreground/30" },
    { label: content.distribution.items[4], percent: 5, color: "bg-foreground/20" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5 px-6">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation("/")} className="group gap-2 hover:bg-transparent px-0">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-widest text-xs">{navContent.back}</span>
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span className="font-display font-black tracking-tighter">{content.version}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-24 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none mb-6 italic">{content.title}</h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">{content.subtitle}</p>
        </motion.div>

        <div className="space-y-24">
          {sections.map((section, idx) => (
            <motion.section key={section.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-foreground text-background rounded-full">{section.icon}</div>
                <h2 className="text-3xl font-display font-bold tracking-tight">{section.title}</h2>
              </div>
              <div className="pl-4 border-l border-white/10 ml-6">
                <p className="text-xl leading-relaxed text-muted-foreground font-serif italic">"{section.text}"</p>
              </div>
            </motion.section>
          ))}
        </div>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24 pt-24 border-t border-white/10">
          <h3 className="text-2xl font-display font-bold tracking-tight mb-8">{content.distribution.title}</h3>
          <p className="text-muted-foreground mb-8">Supply Total: <span className="text-foreground font-bold">{content.distribution.total}</span></p>
          <div className="space-y-4">
            {tokenDistribution.map((item, idx) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-mono text-muted-foreground">{item.percent}%</div>
                <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.percent}%` }} transition={{ duration: 1, delay: idx * 0.1 }} className={`h-full ${item.color} rounded-full`} />
                </div>
                <div className="w-48 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 p-6 border border-white/10 rounded-xl">
            <h4 className="font-display font-bold mb-2">{content.distribution.vesting_title}</h4>
            <p className="text-sm text-muted-foreground">{content.distribution.vesting_text}</p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24">
          <h3 className="text-2xl font-display font-bold tracking-tight mb-8">{content.revenue.title}</h3>
          <div className="grid gap-6">
            {content.revenue.items.map((stream, idx) => (
              <motion.div key={stream.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-4 p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <div className="p-3 bg-foreground/10 rounded-full"><Zap className="w-5 h-5" /></div>
                <div><h4 className="font-display font-bold mb-1">{stream.title}</h4><p className="text-sm text-muted-foreground">{stream.desc}</p></div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div className="p-6 bg-foreground/5 rounded-xl"><div className="text-3xl font-display font-bold">0.3%</div><div className="text-xs text-muted-foreground mt-1">{content.revenue.stats[0]}</div></div>
            <div className="p-6 bg-foreground/5 rounded-xl"><div className="text-3xl font-display font-bold">0.1%</div><div className="text-xs text-muted-foreground mt-1">{content.revenue.stats[1]}</div></div>
            <div className="p-6 bg-foreground/5 rounded-xl"><div className="text-3xl font-display font-bold">$1.2M</div><div className="text-xs text-muted-foreground mt-1">{content.revenue.stats[2]}</div></div>
          </div>
        </motion.section>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-40 p-12 bg-foreground text-background rounded-2xl text-center">
          <h3 className="text-4xl font-display font-black tracking-tighter mb-4">{content.slogan}</h3>
          <p className="uppercase tracking-widest text-xs font-bold opacity-70">{content.tagline}</p>
        </motion.div>
      </main>

      <footer className="py-20 text-center border-t border-white/5 opacity-50">
        <p className="text-xs font-mono tracking-widest uppercase">{content.footer}</p>
      </footer>
    </div>
  );
}

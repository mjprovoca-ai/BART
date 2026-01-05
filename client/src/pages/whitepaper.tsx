import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ShieldCheck, Cpu, Heart, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function Whitepaper() {
  const [, setLocation] = useLocation();
  const [lang] = useState<'pt' | 'en'>('pt');

  const content = {
    pt: {
      title: "Protocolo BART: O Futuro é Ancestral",
      subtitle: "Whitepaper v1.0 — Uma simbiose entre Humanidade e Inteligência",
      sections: [
        {
          id: "vision",
          title: "1. A Grande Convergência",
          icon: <Heart className="w-6 h-6" />,
          text: "No amanhecer da Inteligência Artificial Geral (AGI), a maior riqueza não será o processamento, mas a autenticidade humana. O BART nasce como o substrato que protege o valor gerado pelo espírito humano frente à escala infinita do sintético."
        },
        {
          id: "poh",
          title: "2. Prova de Humanidade (PoH)",
          icon: <ShieldCheck className="w-6 h-6" />,
          text: "Diferente de sistemas baseados apenas em capital (PoS) ou energia (PoW), o BART valida a intenção, o afeto e a criatividade. A validação é feita através de uma rede de IAs sentinelas que garantem que cada transação carregue o DNA da dignidade humana."
        },
        {
          id: "ancestral",
          title: "3. Economia Ancestral Digital",
          icon: <Users className="w-6 h-6" />,
          text: "Retornamos ao escambo de 5.000 anos atrás, mas com a velocidade da luz. Trocamos valor real por valor real, sem intermediários que diluem a alma da transação. É a tecnologia que esperou milênios para permitir que humanos sejam, novamente, apenas humanos."
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Editorial Header */}
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
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="space-y-24">
          {t.sections.map((section, idx) => (
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

        {/* The Final Word */}
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

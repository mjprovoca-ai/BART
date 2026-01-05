import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { translations } from "@/lib/i18n";

export default function Terms() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const navContent = translations[lang].nav;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5 px-6">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation("/")} className="group gap-2 hover:bg-transparent px-0">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-widest text-xs">{navContent.back}</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-foreground text-background rounded-full">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-display font-bold">Termos de Uso</h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Aceitação dos Termos</h2>
            <p>Ao acessar o protocolo BartBank, você concorda em cumprir estes termos. Se você não concordar com qualquer parte dos termos, não deverá acessar o serviço.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">2. Uso do Protocolo</h2>
            <p>O BartBank fornece uma interface para interagir com contratos inteligentes em uma rede blockchain. Você entende que o uso de tecnologias blockchain envolve riscos e que o BartBank não é responsável por perdas decorrentes de flutuações de mercado ou erros de rede.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. Responsabilidade do Usuário</h2>
            <p>Você é responsável por manter a segurança de suas chaves privadas. O BartBank nunca solicitará sua frase semente. Transações enviadas para a blockchain são irreversíveis.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Modificações</h2>
            <p>Reservamos o direito de modificar estes termos a qualquer momento. O uso continuado do site após tais alterações constitui sua aceitação dos novos termos.</p>
          </section>
        </div>
      </main>
    </div>
  );
}

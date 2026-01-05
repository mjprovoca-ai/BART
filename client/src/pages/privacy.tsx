import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { translations } from "@/lib/i18n";

export default function Privacy() {
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
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-display font-bold">Privacidade</h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Coleta de Dados</h2>
            <p>O BartBank é um protocolo descentralizado. Não coletamos dados pessoais identificáveis (PII), como nome, e-mail ou endereço físico, a menos que você os forneça voluntariamente através de nossos canais de suporte.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">2. Interação com Blockchain</h2>
            <p>Todas as transações realizadas no protocolo BartBank são públicas e registradas permanentemente na rede blockchain Base. O seu endereço de carteira pública é a única identificação necessária para interagir com o protocolo.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. Cookies e Tecnologias de Rastreamento</h2>
            <p>Utilizamos apenas cookies essenciais para o funcionamento do site, como a persistência da sua escolha de idioma e tema (claro/escuro). Não utilizamos cookies de rastreamento para fins publicitários de terceiros.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Segurança</h2>
            <p>Implementamos medidas de segurança padrão da indústria para proteger as informações que processamos. No entanto, lembre-se de que você é o único responsável pela segurança da sua chave privada e frase semente.</p>
          </section>
        </div>
      </main>
    </div>
  );
}

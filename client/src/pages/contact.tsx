import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { translations } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');
  const { toast } = useToast();

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const navContent = translations[lang].nav;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem Enviada",
      description: "Recebemos sua mensagem e entraremos em contato em breve.",
    });
  };

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

      <main className="container mx-auto px-6 py-12 max-w-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-foreground text-background rounded-full">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-display font-bold">Contato</h1>
        </div>

        <p className="text-muted-foreground mb-8 text-lg">
          Tem alguma dúvida ou sugestão? Envie uma mensagem para nossa equipe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Nome</label>
            <Input placeholder="Seu nome" className="h-12 bg-foreground/5 border-white/10" required />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">E-mail</label>
            <Input type="email" placeholder="seu@email.com" className="h-12 bg-foreground/5 border-white/10" required />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Assunto</label>
            <Input placeholder="Assunto da mensagem" className="h-12 bg-foreground/5 border-white/10" required />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Mensagem</label>
            <Textarea placeholder="Como podemos ajudar?" className="min-h-32 bg-foreground/5 border-white/10" required />
          </div>
          <Button type="submit" size="lg" className="w-full h-14 rounded-full text-lg">
            <Send className="w-5 h-5 mr-2" />
            Enviar Mensagem
          </Button>
        </form>

        <div className="mt-12 p-8 bg-foreground/5 rounded-2xl border border-white/5 text-center">
          <h3 className="font-bold mb-2 text-xl">Outros Canais</h3>
          <p className="text-muted-foreground mb-4">Você também pode nos encontrar em:</p>
          <p className="font-mono text-foreground font-bold text-lg">contato@bartbank.com</p>
        </div>
      </main>
    </div>
  );
}

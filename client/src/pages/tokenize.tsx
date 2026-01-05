import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Sparkles, Coins, CheckCircle, Image as ImageIcon, X } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAccount } from "wagmi";
import { translations } from "@/lib/i18n";

type Step = "upload" | "analyzing" | "pricing" | "confirmed";

interface Asset {
  title: string;
  description: string;
  category: string;
  image: string | null;
}

const categories = [
  { value: "service", label: { en: "Service", pt: "Serviço", fr: "Service", zh: "服务" }, icon: "🛠️" },
  { value: "product", label: { en: "Physical Product", pt: "Produto Físico", fr: "Produit Physique", zh: "实物产品" }, icon: "📦" },
  { value: "digital", label: { en: "Digital", pt: "Digital", fr: "Numérique", zh: "数字" }, icon: "💻" },
  { value: "experience", label: { en: "Experience", pt: "Experiência", fr: "Expérience", zh: "体验" }, icon: "✨" },
  { value: "accommodation", label: { en: "Accommodation", pt: "Hospedagem", fr: "Hébergement", zh: "住宿" }, icon: "🏠" },
  { value: "transport", label: { en: "Transport", pt: "Transporte", fr: "Transport", zh: "运输" }, icon: "✈️" },
  { value: "food", label: { en: "Food", pt: "Alimentação", fr: "Alimentation", zh: "餐饮" }, icon: "🍽️" },
  { value: "other", label: { en: "Other", pt: "Outro", fr: "Autre", zh: "其他" }, icon: "📋" }
];

export default function Tokenize() {
  const [, setLocation] = useLocation();
  const { isConnected } = useAccount();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const content = translations[lang].tokenize;
  const navContent = translations[lang].nav;
  
  const [step, setStep] = useState<Step>("upload");
  const [asset, setAsset] = useState<Asset>({
    title: "",
    description: "",
    category: "",
    image: null
  });
  const [barValue, setBarValue] = useState(0);
  const [analysisText, setAnalysisText] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAsset(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIAnalysis = async () => {
    setStep("analyzing");
    
    const analysisSteps = lang === 'pt' ? [
      "Iniciando análise do ativo...",
      "Verificando autenticidade humana...",
      "Calculando valor de mercado...",
      "Aplicando algoritmo de precificação...",
      "Consultando rede de validadores...",
      "Finalizando tokenização..."
    ] : [
      "Starting asset analysis...",
      "Verifying human authenticity...",
      "Calculating market value...",
      "Applying pricing algorithm...",
      "Consulting validator network...",
      "Finalizing tokenization..."
    ];

    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisText(analysisSteps[i]);
      await new Promise(r => setTimeout(r, 800));
    }

    const baseValue = Math.floor(Math.random() * 500) + 100;
    const finalValue = Math.floor(baseValue * 1.5);
    setBarValue(finalValue);
    setStep("pricing");
  };

  const confirmTokenization = () => setStep("confirmed");
  const resetForm = () => {
    setStep("upload");
    setAsset({ title: "", description: "", category: "", image: null });
    setBarValue(0);
  };

  const isFormValid = asset.title && asset.description && asset.category;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5 px-6">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation("/")} className="group gap-2 hover:bg-transparent px-0">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-widest text-xs">{navContent.back}</span>
          </Button>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            <span className="font-display font-black tracking-tighter uppercase">{content.title}</span>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-2xl">
        {!isConnected ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-foreground/10 flex items-center justify-center"><Coins className="w-10 h-10" /></div>
            <h2 className="text-3xl font-display font-bold mb-4">{navContent.connect}</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">{content.connect_wallet_msg}</p>
            <ConnectWalletButton />
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {step === "upload" && (
              <motion.div key="upload" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="mb-12">
                  <h1 className="text-4xl font-display font-bold tracking-tight mb-4">{content.title}</h1>
                  <p className="text-muted-foreground text-lg">{content.desc}</p>
                </div>
                <div className="space-y-6">
                  <div onClick={() => fileInputRef.current?.click()} className="relative border-2 border-dashed border-white/20 rounded-2xl p-12 text-center cursor-pointer hover:border-white/40 transition-colors group">
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    {asset.image ? (
                      <div className="relative"><img src={asset.image} alt="Preview" className="max-h-64 mx-auto rounded-xl object-cover" /><button onClick={(e) => { e.stopPropagation(); setAsset(prev => ({ ...prev, image: null })); }} className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background"><X className="w-4 h-4" /></button></div>
                    ) : (
                      <><div className="w-16 h-16 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors"><ImageIcon className="w-8 h-8" /></div><p className="text-lg font-medium mb-2">{content.upload}</p><p className="text-sm text-muted-foreground">{content.hint}</p></>
                    )}
                  </div>
                  <div><label className="text-sm font-medium mb-2 block">{content.asset_title}</label><Input placeholder={content.placeholder_title} value={asset.title} onChange={(e) => setAsset(prev => ({ ...prev, title: e.target.value }))} className="h-14 text-lg bg-foreground/5 border-white/10" /></div>
                  <div><label className="text-sm font-medium mb-2 block">{content.asset_desc}</label><Textarea placeholder={content.placeholder_desc} value={asset.description} onChange={(e) => setAsset(prev => ({ ...prev, description: e.target.value }))} className="min-h-32 text-lg bg-foreground/5 border-white/10 resize-none" /></div>
                  <div><label className="text-sm font-medium mb-2 block">{content.category}</label><Select value={asset.category} onValueChange={(value) => setAsset(prev => ({ ...prev, category: value }))}><SelectTrigger className="h-14 text-lg bg-foreground/5 border-white/10"><SelectValue placeholder={content.select_category} /></SelectTrigger><SelectContent>{categories.map(cat => (<SelectItem key={cat.value} value={cat.value}><span className="flex items-center gap-2"><span>{cat.icon}</span><span>{cat.label[lang] || cat.label['en']}</span></span></SelectItem>))}</SelectContent></Select></div>
                  <Button size="lg" className="w-full h-16 text-lg rounded-full mt-8" disabled={!isFormValid} onClick={simulateAIAnalysis}><Sparkles className="w-5 h-5 mr-2" />{content.button_analyze}</Button>
                </div>
              </motion.div>
            )}
            {step === "analyzing" && (
              <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="text-center py-20">
                <div className="relative w-32 h-32 mx-auto mb-12"><div className="absolute inset-0 rounded-full border-2 border-foreground/20" /><div className="absolute inset-0 rounded-full border-2 border-foreground border-t-transparent animate-spin" /><div className="absolute inset-4 rounded-full bg-foreground/10 flex items-center justify-center"><Sparkles className="w-12 h-12 animate-pulse" /></div></div>
                <h2 className="text-2xl font-display font-bold mb-4">{content.analyzing}</h2>
                <p className="text-muted-foreground font-mono">{analysisText}</p>
              </motion.div>
            )}
            {step === "pricing" && (
              <motion.div key="pricing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-foreground text-background flex items-center justify-center"><Coins className="w-12 h-12" /></div>
                <h2 className="text-2xl font-display font-bold mb-2">{content.analysis_complete}</h2>
                <p className="text-muted-foreground mb-12">{content.pricing_desc}</p>
                <div className="bg-foreground/5 rounded-3xl p-8 mb-8"><div className="text-sm text-muted-foreground mb-2">{content.value_label}</div><motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 0.2 }} className="text-6xl md:text-7xl font-display font-black tracking-tighter">{barValue.toLocaleString()} <span className="text-3xl">BAR</span></motion.div></div>
                <div className="bg-foreground/5 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-bold mb-4">{content.summary}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">{content.asset_title}</span><span className="font-medium">{asset.title}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">{content.category}</span><span className="font-medium">{categories.find(c => c.value === asset.category)?.label[lang] || ''}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Network Fee</span><span className="font-medium">0.3%</span></div>
                  </div>
                </div>
                <div className="flex gap-4"><Button variant="outline" size="lg" className="flex-1 h-14 rounded-full" onClick={resetForm}>{content.cancel}</Button><Button size="lg" className="flex-1 h-14 rounded-full" onClick={confirmTokenization}><CheckCircle className="w-5 h-5 mr-2" />{content.confirm}</Button></div>
              </motion.div>
            )}
            {step === "confirmed" && (
              <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-24 h-24 mx-auto mb-8 rounded-full bg-foreground text-background flex items-center justify-center"><CheckCircle className="w-12 h-12" /></motion.div>
                <h2 className="text-3xl font-display font-bold mb-4">{content.success_title}</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">{content.success_desc}</p>
                <div className="bg-foreground/5 border border-white/10 rounded-3xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4"><span className="text-xs font-mono text-muted-foreground">NFT ID</span><span className="text-xs font-mono">#BART-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span></div>
                  {asset.image && (<img src={asset.image} alt={asset.title} className="w-full h-48 object-cover rounded-xl mb-4" />)}
                  <h3 className="font-bold text-lg">{asset.title}</h3>
                  <p className="text-sm text-muted-foreground">{categories.find(c => c.value === asset.category)?.label[lang]}</p>
                </div>
                <div className="bg-foreground text-background rounded-3xl p-8 mb-12"><div className="text-sm opacity-70 mb-2">{content.received}</div><div className="text-5xl font-display font-black tracking-tighter">+{barValue.toLocaleString()} BAR</div><div className="text-xs opacity-50 mt-2">{content.blockchain_note}</div></div>
                <div className="flex gap-4"><Button variant="outline" size="lg" className="flex-1 h-14 rounded-full" onClick={resetForm}><Upload className="w-5 h-5 mr-2" />{content.tokenize_another}</Button><Button size="lg" className="flex-1 h-14 rounded-full" onClick={() => setLocation("/marketplace")}>{content.go_marketplace}</Button></div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

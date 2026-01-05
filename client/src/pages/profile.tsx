import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Coins, Image as ImageIcon, History, Copy, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useLocation } from "wouter";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { translations } from "@/lib/i18n";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { isConnected, address } = useAccount();
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const content = translations[lang].profile;
  const navContent = translations[lang].nav;

  const mockNFTs = [
    { id: "BART-A1B2C3", title: lang === 'pt' ? "Consultoria de Marketing" : "Marketing Consulting", category: lang === 'pt' ? "Serviço" : "Service", value: 450, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", status: "listed" }
  ];

  const copyAddress = () => { if (address) { navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000); } };
  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5 px-6">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation("/")} className="group gap-2 hover:bg-transparent px-0"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /><span className="font-display font-bold uppercase tracking-widest text-xs">{navContent.back}</span></Button>
          <div className="flex items-center gap-2"><Coins className="w-5 h-5" /><span className="font-display font-black tracking-tighter uppercase">{content.title}</span></div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {!isConnected ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20"><div className="w-24 h-24 mx-auto mb-8 rounded-full bg-foreground/10 flex items-center justify-center"><Coins className="w-12 h-12" /></div><h2 className="text-3xl font-display font-bold mb-4">{navContent.connect}</h2><ConnectWalletButton /></motion.div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-foreground to-foreground/50 flex items-center justify-center text-background text-2xl font-bold">{address?.slice(2, 4).toUpperCase()}</div><div><button onClick={copyAddress} className="flex items-center gap-2 text-lg font-mono hover:text-foreground/80 transition-colors">{shortenAddress(address || "")}<Copy className="w-4 h-4" /></button>{copied && <span className="text-xs text-foreground/70">{content.copied}</span>}<p className="text-sm text-muted-foreground">{content.member_since}</p></div></div>
                <Button variant="outline" className="rounded-full gap-2" onClick={() => setLocation("/tokenize")}><Plus className="w-4 h-4" />{content.tokenize_new}</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-foreground text-background rounded-2xl p-6"><div className="flex items-center justify-between mb-2"><span className="text-sm opacity-70">{content.balance}</span><Coins className="w-5 h-5 opacity-70" /></div><div className="text-4xl font-display font-black tracking-tight">1,420</div><div className="text-sm opacity-70">BAR</div></div>
                <div className="bg-foreground/5 border border-white/10 rounded-2xl p-6"><div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">{content.my_nfts}</span><ImageIcon className="w-5 h-5 text-muted-foreground" /></div><div className="text-4xl font-display font-black tracking-tight">{mockNFTs.length}</div><div className="text-sm text-muted-foreground">{content.assets_tokenized}</div></div>
                <div className="bg-foreground/5 border border-white/10 rounded-2xl p-6"><div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">{content.total_value}</span><TrendingUp className="w-5 h-5 text-foreground" /></div><div className="text-4xl font-display font-black tracking-tight">450</div><div className="text-sm text-muted-foreground">{content.bar_in_nfts}</div></div>
              </div>
            </motion.div>
            <Tabs defaultValue="nfts" className="w-full">
              <TabsList className="w-full bg-foreground/5 p-1 rounded-full mb-8"><TabsTrigger value="nfts" className="flex-1 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background"><ImageIcon className="w-4 h-4 mr-2" />{content.my_nfts}</TabsTrigger><TabsTrigger value="history" className="flex-1 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background"><History className="w-4 h-4 mr-2" />{content.history}</TabsTrigger></TabsList>
              <TabsContent value="nfts">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{mockNFTs.map((nft, idx) => (
                  <motion.div key={nft.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-foreground/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group">
                    <div className="relative aspect-[4/3] overflow-hidden"><img src={nft.image} alt={nft.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${nft.status === 'listed' ? 'bg-foreground text-background' : 'bg-background/80 text-foreground border border-white/20'}`}>{nft.status === 'listed' ? (lang === 'pt' ? 'À Venda' : 'For Sale') : (lang === 'pt' ? 'Guardado' : 'Owned')}</div></div>
                    <div className="p-5"><div className="text-xs font-mono text-muted-foreground mb-1">#{nft.id}</div><h3 className="font-bold text-lg mb-1">{nft.title}</h3><p className="text-sm text-muted-foreground mb-4">{nft.category}</p><div className="flex items-center justify-between"><div className="flex items-center gap-1 text-lg font-bold"><Coins className="w-4 h-4" />{nft.value} BAR</div><Button size="sm" variant="outline" className="rounded-full">{nft.status === 'listed' ? (lang === 'pt' ? 'Remover' : 'Remove') : (lang === 'pt' ? 'Vender' : 'Sell')}</Button></div></div>
                  </motion.div>
                ))}</div>
              </TabsContent>
              <TabsContent value="history">
                <div className="space-y-4">
                  {[
                    { id: 1, type: "received", title: lang === 'pt' ? "Tokenização de Ativo" : "Asset Tokenization", amount: 450, date: lang === 'pt' ? "Hoje" : "Today", from: content.system },
                    { id: 2, type: "sent", title: lang === 'pt' ? "Compra no Marketplace" : "Marketplace Purchase", amount: 180, date: lang === 'pt' ? "Hoje" : "Today", to: "0xABCD...EFGH" }
                  ].map((tx, idx) => (
                    <motion.div key={tx.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center justify-between p-4 bg-foreground/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'received' ? 'bg-foreground/20 text-foreground' : 'bg-foreground/10 text-muted-foreground'}`}>{tx.type === 'received' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}</div><div><div className="font-medium">{tx.title}</div><div className="text-sm text-muted-foreground">{tx.type === 'received' ? `${lang === 'pt' ? 'De' : 'From'}: ${tx.from}` : `${lang === 'pt' ? 'Para' : 'To'}: ${tx.to}`}</div></div></div>
                      <div className="text-right"><div className={`font-bold ${tx.type === 'received' ? 'text-foreground' : 'text-muted-foreground'}`}>{tx.type === 'received' ? '+' : '-'}{tx.amount} BAR</div><div className="text-xs text-muted-foreground">{tx.date}</div></div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
}

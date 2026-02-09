import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, Coins, ShoppingBag, Heart, Clock, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAccount } from "wagmi";
import { translations } from "@/lib/i18n";
import { useMarketplaceItems } from "@/hooks/use-marketplace";

const categoriesList = [
  { value: "all", label: { en: "All Categories", pt: "Todas Categorias", fr: "Toutes les catégories", zh: "所有类别" }, icon: "🌐" },
  { value: "service", label: { en: "Services", pt: "Serviços", fr: "Services", zh: "服务" }, icon: "🛠️" },
  { value: "product", label: { en: "Products", pt: "Produtos", fr: "Produits", zh: "产品" }, icon: "📦" },
  { value: "digital", label: { en: "Digital", pt: "Digital", fr: "Numérique", zh: "数字" }, icon: "💻" },
  { value: "experience", label: { en: "Experiences", pt: "Experiências", fr: "Expériences", zh: "体验" }, icon: "✨" },
  { value: "accommodation", label: { en: "Accommodation", pt: "Hospedagem", fr: "Hébergement", zh: "住宿" }, icon: "🏠" },
  { value: "transport", label: { en: "Transport", pt: "Transporte", fr: "Transport", zh: "运输" }, icon: "✈️" },
  { value: "food", label: { en: "Food", pt: "Alimentação", fr: "Alimentation", zh: "餐饮" }, icon: "🍽️" }
];

const mockListings = [
  { id: "1", title: "Consultoria de Marketing Digital", category: "service", price: 450, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", seller: "0x1234...5678", likes: 24, timeAgo: "2h" },
  { id: "2", title: "Curso Completo de Web3", category: "digital", price: 280, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop", seller: "0xABCD...EFGH", likes: 56, timeAgo: "5h" },
  { id: "3", title: "Hospedagem Casa de Praia - 3 noites", category: "accommodation", price: 890, image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop", seller: "0x9876...4321", likes: 89, timeAgo: "1d" },
  { id: "4", title: "Jantar Gourmet para 2", category: "food", price: 180, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop", seller: "0xDEAD...BEEF", likes: 32, timeAgo: "3h" }
];

export default function Marketplace() {
  const [, setLocation] = useLocation();
  const { isConnected } = useAccount();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');

  const { data: dbItems = [] } = useMarketplaceItems();

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const content = translations[lang].marketplace;
  const navContent = translations[lang].nav;

  const dbListings = dbItems.map((item: any) => ({
    id: `db-${item.id}`,
    title: item.name,
    category: item.category,
    price: parseFloat(item.price) || 0,
    image: item.image,
    seller: item.seller?.slice(0, 6) + "..." + item.seller?.slice(-4),
    likes: Math.floor(Math.random() * 50),
    timeAgo: "new",
  }));

  const allListings = [...dbListings, ...mockListings];

  const filteredListings = allListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || listing.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5 px-6">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation("/")} className="group gap-2 hover:bg-transparent px-0"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /><span className="font-display font-bold uppercase tracking-widest text-xs">{navContent.back}</span></Button>
          <div className="flex items-center gap-2"><ShoppingBag className="w-5 h-5" /><span className="font-display font-black tracking-tighter">{content.title}</span></div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12"><h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">{content.title}</h1><p className="text-muted-foreground text-lg max-w-2xl">{content.desc}</p></motion.div>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input placeholder={content.search} value={search} onChange={(e) => setSearch(e.target.value)} className="h-14 pl-12 text-lg bg-foreground/5 border-white/10" /></div>
          <Select value={category} onValueChange={setCategory}><SelectTrigger className="h-14 w-full md:w-64 bg-foreground/5 border-white/10"><Filter className="w-4 h-4 mr-2" /><SelectValue placeholder={content.category} /></SelectTrigger><SelectContent>{categoriesList.map(cat => (<SelectItem key={cat.value} value={cat.value}><span className="flex items-center gap-2"><span>{cat.icon}</span><span>{cat.label[lang]}</span></span></SelectItem>))}</SelectContent></Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing, idx) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="group bg-foreground/5 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all cursor-pointer" onClick={() => setSelectedListing(listing)}>
              <div className="relative aspect-[4/3] overflow-hidden"><img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute top-3 right-3 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-mono">{categoriesList.find(c => c.value === listing.category)?.icon}</div></div>
              <div className="p-5"><h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-foreground/80 transition-colors">{listing.title}</h3><div className="flex items-center justify-between text-sm text-muted-foreground mb-4"><span className="flex items-center gap-1"><Heart className="w-4 h-4" />{listing.likes}</span><span className="flex items-center gap-1"><Clock className="w-4 h-4" />{listing.timeAgo}</span></div><div className="flex items-center justify-between"><div><div className="text-xs text-muted-foreground">{content.price}</div><div className="text-xl font-display font-bold flex items-center gap-1"><Coins className="w-4 h-4" />{listing.price} BAR</div></div><Button size="sm" className="rounded-full">{content.trade}</Button></div></div>
            </motion.div>
          ))}
        </div>
        {filteredListings.length === 0 && (<div className="text-center py-20"><ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" /><h3 className="text-xl font-bold mb-2">{content.no_results}</h3><p className="text-muted-foreground">{content.no_results_desc}</p></div>)}
      </main>

      {selectedListing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setSelectedListing(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-background border border-white/10 rounded-3xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <img src={selectedListing.image} alt={selectedListing.title} className="w-full aspect-video object-cover" />
            <div className="p-8"><div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><span>{categoriesList.find(c => c.value === selectedListing.category)?.icon}</span><span>{categoriesList.find(c => c.value === selectedListing.category)?.label[lang]}</span></div><h2 className="text-2xl font-display font-bold mb-4">{selectedListing.title}</h2><div className="flex items-center justify-between p-4 bg-foreground/5 rounded-xl mb-6"><div><div className="text-xs text-muted-foreground">{content.seller}</div><div className="font-mono text-sm">{selectedListing.seller}</div></div><div className="text-right"><div className="text-xs text-muted-foreground">{content.price}</div><div className="text-2xl font-display font-bold flex items-center gap-1"><Coins className="w-5 h-5" />{selectedListing.price} BAR</div></div></div>{isConnected ? (<Button size="lg" className="w-full h-14 rounded-full text-lg">{content.confirm_trade}<ArrowRight className="w-5 h-5 ml-2" /></Button>) : (<div className="text-center"><p className="text-sm text-muted-foreground mb-4">{content.connect_to_trade}</p><ConnectWalletButton /></div>)}</div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

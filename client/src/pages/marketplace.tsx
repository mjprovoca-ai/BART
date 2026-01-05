import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, Coins, ShoppingBag, Heart, Clock, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAccount } from "wagmi";

const categories = [
  { value: "all", label: "Todas Categorias", icon: "🌐" },
  { value: "service", label: "Serviços", icon: "🛠️" },
  { value: "product", label: "Produtos", icon: "📦" },
  { value: "digital", label: "Digital", icon: "💻" },
  { value: "experience", label: "Experiências", icon: "✨" },
  { value: "accommodation", label: "Hospedagem", icon: "🏠" },
  { value: "transport", label: "Transporte", icon: "✈️" },
  { value: "food", label: "Alimentação", icon: "🍽️" }
];

const mockListings = [
  {
    id: "1",
    title: "Consultoria de Marketing Digital",
    category: "service",
    price: 450,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    seller: "0x1234...5678",
    likes: 24,
    timeAgo: "2h"
  },
  {
    id: "2",
    title: "Curso Completo de Web3",
    category: "digital",
    price: 280,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    seller: "0xABCD...EFGH",
    likes: 56,
    timeAgo: "5h"
  },
  {
    id: "3",
    title: "Hospedagem Casa de Praia - 3 noites",
    category: "accommodation",
    price: 890,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop",
    seller: "0x9876...4321",
    likes: 89,
    timeAgo: "1d"
  },
  {
    id: "4",
    title: "Jantar Gourmet para 2",
    category: "food",
    price: 180,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    seller: "0xDEAD...BEEF",
    likes: 32,
    timeAgo: "3h"
  },
  {
    id: "5",
    title: "Voo de Helicóptero - SP",
    category: "experience",
    price: 1200,
    image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&h=300&fit=crop",
    seller: "0xCAFE...BABE",
    likes: 145,
    timeAgo: "6h"
  },
  {
    id: "6",
    title: "Passagem Aérea SP-RJ",
    category: "transport",
    price: 320,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
    seller: "0xFACE...B00C",
    likes: 18,
    timeAgo: "4h"
  },
  {
    id: "7",
    title: "iPhone 14 Pro - Novo",
    category: "product",
    price: 2800,
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=300&fit=crop",
    seller: "0x1111...2222",
    likes: 203,
    timeAgo: "12h"
  },
  {
    id: "8",
    title: "Aulas de Yoga - 10 sessões",
    category: "service",
    price: 350,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    seller: "0x3333...4444",
    likes: 67,
    timeAgo: "8h"
  }
];

export default function Marketplace() {
  const [, setLocation] = useLocation();
  const { isConnected } = useAccount();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedListing, setSelectedListing] = useState<typeof mockListings[0] | null>(null);

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || listing.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <ShoppingBag className="w-5 h-5" />
            <span className="font-display font-black tracking-tighter">MARKETPLACE</span>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Marketplace BART
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Troque seus tokens BAR por ativos reais. Cada item é um NFT único verificado pela IA Sentinela.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar ativos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 pl-12 text-lg bg-foreground/5 border-white/10"
              data-testid="input-search"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-14 w-full md:w-64 bg-foreground/5 border-white/10" data-testid="select-filter">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing, idx) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-foreground/5 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all cursor-pointer"
              onClick={() => setSelectedListing(listing)}
              data-testid={`card-listing-${listing.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-mono">
                  {categories.find(c => c.value === listing.category)?.icon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-foreground/80 transition-colors">
                  {listing.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {listing.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {listing.timeAgo}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Preço</div>
                    <div className="text-xl font-display font-bold flex items-center gap-1">
                      <Coins className="w-4 h-4" />
                      {listing.price} BAR
                    </div>
                  </div>
                  <Button size="sm" className="rounded-full" data-testid={`button-buy-${listing.id}`}>
                    Trocar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-bold mb-2">Nenhum ativo encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar seus filtros de busca</p>
          </div>
        )}
      </main>

      {selectedListing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedListing(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border border-white/10 rounded-3xl max-w-lg w-full overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedListing.image} 
              alt={selectedListing.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>{categories.find(c => c.value === selectedListing.category)?.icon}</span>
                <span>{categories.find(c => c.value === selectedListing.category)?.label}</span>
              </div>
              <h2 className="text-2xl font-display font-bold mb-4">{selectedListing.title}</h2>
              
              <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-xl mb-6">
                <div>
                  <div className="text-xs text-muted-foreground">Vendedor</div>
                  <div className="font-mono text-sm">{selectedListing.seller}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Preço</div>
                  <div className="text-2xl font-display font-bold flex items-center gap-1">
                    <Coins className="w-5 h-5" />
                    {selectedListing.price} BAR
                  </div>
                </div>
              </div>

              {isConnected ? (
                <Button size="lg" className="w-full h-14 rounded-full text-lg" data-testid="button-confirm-trade">
                  Confirmar Troca
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">Conecte sua carteira para trocar</p>
                  <ConnectWalletButton />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

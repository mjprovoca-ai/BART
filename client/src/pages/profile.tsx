import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Coins, Image as ImageIcon, History, Settings, Copy, ExternalLink, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useLocation } from "wouter";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAccount } from "wagmi";
import { useState } from "react";

const mockNFTs = [
  {
    id: "BART-A1B2C3",
    title: "Consultoria de Marketing",
    category: "Serviço",
    value: 450,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    status: "listed"
  },
  {
    id: "BART-D4E5F6",
    title: "Curso de Programação",
    category: "Digital",
    value: 280,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    status: "owned"
  },
  {
    id: "BART-G7H8I9",
    title: "Mentoria de Negócios",
    category: "Serviço",
    value: 600,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    status: "owned"
  }
];

const mockTransactions = [
  { id: 1, type: "received", title: "Tokenização de Ativo", amount: 450, date: "Hoje, 14:32", from: "Sistema" },
  { id: 2, type: "sent", title: "Compra no Marketplace", amount: 180, date: "Hoje, 10:15", to: "0xABCD...EFGH" },
  { id: 3, type: "received", title: "Tokenização de Ativo", amount: 280, date: "Ontem, 18:45", from: "Sistema" },
  { id: 4, type: "sent", title: "Troca de Serviço", amount: 320, date: "Há 2 dias", to: "0x1234...5678" },
  { id: 5, type: "received", title: "Venda de NFT", amount: 890, date: "Há 3 dias", from: "0xDEAD...BEEF" }
];

export default function Profile() {
  const [, setLocation] = useLocation();
  const { isConnected, address } = useAccount();
  const [copied, setCopied] = useState(false);

  const totalBalance = 1420;
  const totalNFTs = mockNFTs.length;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

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
            <Coins className="w-5 h-5" />
            <span className="font-display font-black tracking-tighter">MEU PERFIL</span>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {!isConnected ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-foreground/10 flex items-center justify-center">
              <Coins className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">Conecte sua Carteira</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Para ver seu saldo BAR e seus NFTs, conecte sua carteira Web3.
            </p>
            <ConnectWalletButton />
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-foreground to-foreground/50 flex items-center justify-center text-background text-2xl font-bold">
                    {address?.slice(2, 4).toUpperCase()}
                  </div>
                  <div>
                    <button 
                      onClick={copyAddress}
                      className="flex items-center gap-2 text-lg font-mono hover:text-foreground/80 transition-colors"
                      data-testid="button-copy-address"
                    >
                      {shortenAddress(address || "")}
                      <Copy className="w-4 h-4" />
                    </button>
                    {copied && <span className="text-xs text-foreground/70">Copiado!</span>}
                    <p className="text-sm text-muted-foreground">Membro desde Jan 2026</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full gap-2" onClick={() => setLocation("/tokenize")} data-testid="button-tokenize-new">
                  <Plus className="w-4 h-4" />
                  Tokenizar Novo Ativo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-foreground text-background rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-70">Saldo Total</span>
                    <Coins className="w-5 h-5 opacity-70" />
                  </div>
                  <div className="text-4xl font-display font-black tracking-tight">
                    {totalBalance.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-70">BAR</div>
                </div>
                <div className="bg-foreground/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Meus NFTs</span>
                    <ImageIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-4xl font-display font-black tracking-tight">
                    {totalNFTs}
                  </div>
                  <div className="text-sm text-muted-foreground">ativos tokenizados</div>
                </div>
                <div className="bg-foreground/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Valor Total</span>
                    <TrendingUp className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="text-4xl font-display font-black tracking-tight">
                    {mockNFTs.reduce((acc, nft) => acc + nft.value, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">BAR em NFTs</div>
                </div>
              </div>
            </motion.div>

            <Tabs defaultValue="nfts" className="w-full">
              <TabsList className="w-full bg-foreground/5 p-1 rounded-full mb-8">
                <TabsTrigger value="nfts" className="flex-1 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Meus NFTs
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background">
                  <History className="w-4 h-4 mr-2" />
                  Histórico
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nfts">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockNFTs.map((nft, idx) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-foreground/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group"
                      data-testid={`nft-card-${nft.id}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={nft.image} 
                          alt={nft.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                          nft.status === 'listed' ? 'bg-foreground text-background' : 'bg-background/80 text-foreground border border-white/20'
                        }`}>
                          {nft.status === 'listed' ? 'À Venda' : 'Guardado'}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="text-xs font-mono text-muted-foreground mb-1">#{nft.id}</div>
                        <h3 className="font-bold text-lg mb-1">{nft.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{nft.category}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-lg font-bold">
                            <Coins className="w-4 h-4" />
                            {nft.value} BAR
                          </div>
                          <Button size="sm" variant="outline" className="rounded-full">
                            {nft.status === 'listed' ? 'Remover' : 'Vender'}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {mockNFTs.length === 0 && (
                  <div className="text-center py-16">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold mb-2">Nenhum NFT ainda</h3>
                    <p className="text-muted-foreground mb-6">Tokenize seu primeiro ativo para começar</p>
                    <Button onClick={() => setLocation("/tokenize")} className="rounded-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Tokenizar Ativo
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history">
                <div className="space-y-4">
                  {mockTransactions.map((tx, idx) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between p-4 bg-foreground/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                      data-testid={`transaction-${tx.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'received' ? 'bg-foreground/20 text-foreground' : 'bg-foreground/10 text-muted-foreground'
                        }`}>
                          {tx.type === 'received' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-medium">{tx.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {tx.type === 'received' ? `De: ${tx.from}` : `Para: ${tx.to}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${tx.type === 'received' ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {tx.type === 'received' ? '+' : '-'}{tx.amount} BAR
                        </div>
                        <div className="text-xs text-muted-foreground">{tx.date}</div>
                      </div>
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

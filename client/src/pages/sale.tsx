import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Coins, TrendingUp, Clock, CheckCircle, AlertCircle, Wallet } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAccount } from "wagmi";
import { translations } from "@/lib/i18n";
import { TOKENOMICS } from "@/contracts/config";

export default function Sale() {
  const [, setLocation] = useLocation();
  const { isConnected, address } = useAccount();
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');
  const [ethAmount, setEthAmount] = useState("");
  const [barAmount, setBarAmount] = useState(0);
  const [currentPhase] = useState<number>(1);

  const isWhitelisted = true;
  const seedSold = 2500000;
  const totalRaised = 25000;
  const userPurchased = 50000;

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const content = translations[lang].sale;
  const navContent = translations[lang].nav;

  const phaseNames = {
    0: content.not_started,
    1: content.seed,
    2: content.private,
    3: content.public,
    4: content.ended
  };

  const phasePrices = {
    1: TOKENOMICS.seedPrice,
    2: TOKENOMICS.privatePrice,
    3: TOKENOMICS.publicPrice
  };

  const phaseAllocations = {
    1: TOKENOMICS.seedAllocation,
    2: TOKENOMICS.privateAllocation,
    3: TOKENOMICS.publicAllocation
  };

  const phaseTargets = {
    1: TOKENOMICS.seedTarget,
    2: TOKENOMICS.privateTarget,
    3: TOKENOMICS.publicTarget
  };

  const currentPrice = phasePrices[currentPhase as keyof typeof phasePrices] || 0;
  const currentAllocation = phaseAllocations[currentPhase as keyof typeof phaseAllocations] || 0;
  const currentTarget = phaseTargets[currentPhase as keyof typeof phaseTargets] || 0;
  const progress = (seedSold / currentAllocation) * 100;

  useEffect(() => {
    const eth = parseFloat(ethAmount) || 0;
    const ethToUsd = eth * 2500;
    const tokens = Math.floor(ethToUsd / currentPrice);
    setBarAmount(tokens);
  }, [ethAmount, currentPrice]);

  const maxPurchases = {
    1: 1000000,
    2: 500000,
    3: 100000
  };

  const maxPurchase = maxPurchases[currentPhase as keyof typeof maxPurchases] || 0;
  const remainingPurchase = maxPurchase - userPurchased;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5 px-6">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation("/")} className="group gap-2 hover:bg-transparent px-0" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-widest text-xs">{navContent.back}</span>
          </Button>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            <span className="font-display font-black tracking-tighter">{content.title}</span>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">{content.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{content.desc}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-foreground/5 rounded-3xl p-8 border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">{content.phase}</div>
              <div className="text-2xl font-display font-bold flex items-center gap-2" data-testid="text-current-phase">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                {phaseNames[currentPhase as keyof typeof phaseNames]}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">{content.price}</div>
              <div className="text-2xl font-display font-bold" data-testid="text-current-price">
                ${currentPrice}
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>{content.available}</span>
              <span className="font-mono">{(currentAllocation - seedSold).toLocaleString()} BAR</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{seedSold.toLocaleString()} sold</span>
              <span>{currentAllocation.toLocaleString()} total</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-foreground/5 rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">{content.raised}</div>
              <div className="text-xl font-display font-bold" data-testid="text-total-raised">
                ${totalRaised.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">of ${currentTarget.toLocaleString()} target</div>
            </div>
            <div className="bg-foreground/5 rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-1">{content.max_purchase}</div>
              <div className="text-xl font-display font-bold">
                {maxPurchase.toLocaleString()} BAR
              </div>
              <div className="text-xs text-muted-foreground">{remainingPurchase.toLocaleString()} remaining</div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-foreground/5 rounded-3xl p-8 border border-white/10">
          <h2 className="text-xl font-display font-bold mb-6">{content.your_purchase}</h2>
          
          {!isConnected ? (
            <div className="text-center py-8">
              <Wallet className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-6">{content.connect_to_buy}</p>
              <ConnectWalletButton />
            </div>
          ) : currentPhase === 0 || currentPhase === 4 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">{content.sale_not_active}</p>
            </div>
          ) : !isWhitelisted && currentPhase !== 3 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <p className="text-lg font-bold mb-2">{content.whitelist_required}</p>
              <p className="text-muted-foreground">{content.not_whitelisted}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">{content.amount}</label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="h-16 text-2xl bg-foreground/5 border-white/10 pr-20"
                    data-testid="input-eth-amount"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">ETH</span>
                </div>
              </div>

              <div className="bg-foreground text-background rounded-2xl p-6">
                <div className="text-sm opacity-70 mb-2">{content.you_receive}</div>
                <div className="text-4xl font-display font-bold" data-testid="text-bar-amount">
                  {barAmount.toLocaleString()} BAR
                </div>
                <div className="text-sm opacity-50 mt-2">≈ ${(barAmount * currentPrice).toLocaleString()} USD</div>
              </div>

              <Button size="lg" className="w-full h-16 text-lg rounded-full" disabled={!ethAmount || barAmount === 0} data-testid="button-buy-tokens">
                <Coins className="w-5 h-5 mr-2" />
                {content.buy_tokens}
              </Button>

              {userPurchased > 0 && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  You've purchased {userPurchased.toLocaleString()} BAR in this phase
                </div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">Sale Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { phase: 1, name: content.seed, price: TOKENOMICS.seedPrice, allocation: TOKENOMICS.seedAllocation, target: TOKENOMICS.seedTarget },
              { phase: 2, name: content.private, price: TOKENOMICS.privatePrice, allocation: TOKENOMICS.privateAllocation, target: TOKENOMICS.privateTarget },
              { phase: 3, name: content.public, price: TOKENOMICS.publicPrice, allocation: TOKENOMICS.publicAllocation, target: TOKENOMICS.publicTarget }
            ].map((item) => (
              <div
                key={item.phase}
                className={`rounded-2xl p-6 border transition-all ${
                  currentPhase === item.phase
                    ? 'bg-foreground text-background border-foreground'
                    : currentPhase > item.phase
                    ? 'bg-foreground/5 border-green-500/50'
                    : 'bg-foreground/5 border-white/10 opacity-50'
                }`}
                data-testid={`card-phase-${item.phase}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">{item.name}</span>
                  {currentPhase === item.phase && (
                    <span className="text-xs px-2 py-1 bg-background/20 rounded-full">Active</span>
                  )}
                  {currentPhase > item.phase && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="text-2xl font-display font-bold mb-1">${item.price}</div>
                <div className="text-sm opacity-70">{item.allocation.toLocaleString()} BAR</div>
                <div className="text-xs opacity-50 mt-2">Target: ${item.target.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

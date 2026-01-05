import { ThemeToggle } from "@/components/ThemeToggle";
import BartFormation from "@/components/BartFormation";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Hexagon, Layers, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
              <span className="text-background font-bold text-xs">B</span>
            </div>
            <span className="text-xl font-display font-bold tracking-tight">BART</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#manifesto" className="hover:text-foreground transition-colors">Manifesto</a>
            <a href="#solution" className="hover:text-foreground transition-colors">Technology</a>
            <a href="#profile" className="hover:text-foreground transition-colors">Profile</a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="default" className="hidden md:flex rounded-full px-6">
              Connect Wallet
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background"></div>
        
        <div className="container px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm">
              <span className="text-xs font-mono uppercase tracking-widest">Web3 Foundation Protocol</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              DECENTRALIZE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">EVERYTHING</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              A new economic primitive for the digital age. Built on Substrate, designed for humans, secured by math.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg w-full md:w-auto group">
                Start Building
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg w-full md:w-auto">
                Read Whitepaper
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Stats / Editorial Profile Section */}
      <section id="profile" className="py-32 border-t border-border">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">Network Status</h2>
                <div className="text-[12rem] md:text-[16rem] leading-none font-display font-bold text-foreground -ml-2 md:-ml-4 tracking-tighter">
                  98<span className="text-4xl md:text-6xl align-top text-muted-foreground">%</span>
                </div>
                <p className="text-2xl md:text-4xl font-light text-muted-foreground mt-4">
                  Network Uptime Score
                </p>
              </motion.div>
            </div>

            <div className="space-y-12">
              {[
                { label: "Active Nodes", value: "1,240" },
                { label: "Block Height", value: "#8,992,102" },
                { label: "Total Transactions", value: "45.2M+" },
                { label: "Average Fee", value: "< $0.001" }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-baseline justify-between border-b border-border pb-4 group-hover:border-foreground transition-colors duration-300">
                    <span className="text-lg md:text-xl font-mono text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</span>
                    <span className="text-3xl md:text-5xl font-display font-medium">{stat.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Cinematic Moment */}
      <section id="solution" className="py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              {/* THIS IS THE PARTICLE EFFECT COMPONENT */}
              <BartFormation />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
                The <br/>Solution.
              </h2>
              <div className="space-y-8">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We've reimagined how value moves. No intermediaries, no friction, just pure mathematical consensus. The BART protocol utilizes a unique Proof-of-Humanity consensus mechanism.
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  By converging user interactions with advanced AI validation, we create a secure, scalable substrate for the next generation of decentralized applications.
                </p>
                
                <div className="pt-8 grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Zap className="w-8 h-8 mb-2" />
                    <h3 className="font-bold">Lightning Fast</h3>
                    <p className="text-sm text-muted-foreground">Sub-second finality for real-time apps.</p>
                  </div>
                  <div className="space-y-2">
                    <Shield className="w-8 h-8 mb-2" />
                    <h3 className="font-bold">Secure by Default</h3>
                    <p className="text-sm text-muted-foreground">Formal verification at the protocol level.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-background">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <span className="text-2xl font-display font-bold">BART</span>
              <p className="mt-4 text-muted-foreground max-w-xs">
                The future of decentralized economics. Built for the long term.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { title: "Protocol", links: ["Governance", "Tokenomics", "Staking", "Bridge"] },
                { title: "Developers", links: ["Documentation", "GitHub", "SDKs", "Audits"] },
                { title: "Ecosystem", links: ["Wallets", "Explorers", "DApps", "Community"] },
                { title: "Legal", links: ["Privacy", "Terms", "Licenses", "Contact"] },
              ].map((column) => (
                <div key={column.title}>
                  <h4 className="font-bold mb-4">{column.title}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {column.links.map((link) => (
                      <li key={link}><a href="#" className="hover:text-foreground transition-colors">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 BART Foundation. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span>System Status: Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

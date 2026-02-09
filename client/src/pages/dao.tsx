import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Vote, Wallet, Clock, CheckCircle, XCircle, Users, Plus, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useAccount } from "wagmi";
import { translations } from "@/lib/i18n";
import { TOKENOMICS } from "@/contracts/config";
import { useProposals, useCreateProposalApi, useVoteApi } from "@/hooks/use-dao";

export default function DAO() {
  const [, setLocation] = useLocation();
  const { isConnected, address } = useAccount();
  const [lang, setLang] = useState<'en' | 'pt' | 'fr' | 'zh'>('en');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProposal, setNewProposal] = useState({ title: "", description: "", type: "0" });

  const { data: proposals = [], isLoading } = useProposals();
  const { mutate: createProposalApi, isPending: isCreating } = useCreateProposalApi();
  const { mutate: voteApi, isPending: isVoting } = useVoteApi();

  const votingPower = 150000;
  const treasuryBalance = 2500000;

  useEffect(() => {
    const savedLang = localStorage.getItem('bart_lang') as any;
    if (savedLang) setLang(savedLang);
  }, []);

  const content = translations[lang].dao;
  const navContent = translations[lang].nav;

  const getTimeRemaining = (endTime: string | number) => {
    const endMs = typeof endTime === 'string' ? new Date(endTime).getTime() : endTime * 1000;
    const remaining = (endMs - Date.now()) / 1000;
    if (remaining <= 0) return "0";
    return Math.ceil(remaining / 86400).toString();
  };

  const getVotePercentage = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes;
    if (total === 0) return { for: 50, against: 50 };
    return {
      for: Math.round((forVotes / total) * 100),
      against: Math.round((againstVotes / total) * 100),
    };
  };

  const handleVote = (proposalId: number, voteType: "for" | "against") => {
    voteApi({ id: proposalId, voteType });
  };

  const handleCreateProposal = () => {
    if (newProposal.title && newProposal.description && address) {
      const endTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      createProposalApi({
        title: newProposal.title,
        description: newProposal.description,
        creator: address,
        endTime,
      });
      setShowCreateModal(false);
      setNewProposal({ title: "", description: "", type: "0" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5 px-6">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation("/")} className="group gap-2 hover:bg-transparent px-0" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display font-bold uppercase tracking-widest text-xs">{navContent.back}</span>
          </Button>
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5" />
            <span className="font-display font-black tracking-tighter">{content.title}</span>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">{content.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{content.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-foreground/5 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-sm text-muted-foreground">{content.treasury}</span>
            </div>
            <div className="text-3xl font-display font-bold" data-testid="text-treasury-balance">{treasuryBalance.toLocaleString()} BAR</div>
            <div className="text-sm text-muted-foreground mt-1">≈ ${(treasuryBalance * 0.05).toLocaleString()} USD</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-foreground/5 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-sm text-muted-foreground">{content.proposals}</span>
            </div>
            <div className="text-3xl font-display font-bold" data-testid="text-active-proposals">{proposals.length}</div>
            <div className="text-sm text-muted-foreground mt-1">10% {content.quorum}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-foreground/5 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-sm text-muted-foreground">{content.voting_power}</span>
            </div>
            <div className="text-3xl font-display font-bold" data-testid="text-voting-power">
              {isConnected ? votingPower.toLocaleString() : "0"} BAR
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isConnected ? `${((votingPower / TOKENOMICS.totalSupply) * 100).toFixed(4)}%` : "—"}
            </div>
          </motion.div>
        </div>

        {isConnected && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
            <Button size="lg" className="rounded-full" onClick={() => setShowCreateModal(true)} disabled={isCreating} data-testid="button-create-proposal">
              <Plus className="w-5 h-5 mr-2" />
              {content.create_proposal}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">{content.min_tokens}</p>
          </motion.div>
        )}

        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold">{content.proposals}</h2>
          
          {isLoading ? (
            <div className="text-center py-20 bg-foreground/5 rounded-2xl border border-white/5">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : proposals.length === 0 ? (
            <div className="text-center py-20 bg-foreground/5 rounded-2xl border border-white/5">
              <Vote className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">{content.no_proposals}</h3>
              <p className="text-muted-foreground">{content.no_proposals_desc}</p>
            </div>
          ) : (
            proposals.map((proposal: any, idx: number) => {
              const percentages = getVotePercentage(proposal.votesFor || 0, proposal.votesAgainst || 0);
              const daysRemaining = getTimeRemaining(proposal.endTime);
              
              return (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-foreground/5 rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all"
                  data-testid={`card-proposal-${proposal.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-foreground/10 rounded-full">
                          {proposal.status === "active" ? "Active" : proposal.status}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {daysRemaining} {content.days}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Proposer: <span className="font-mono">{proposal.creator?.slice(0, 6)}...{proposal.creator?.slice(-4)}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-20">{content.vote_for}</span>
                      <Progress value={percentages.for} className="flex-1 h-2" />
                      <span className="text-sm font-mono w-12 text-right">{percentages.for}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm w-20">{content.vote_against}</span>
                      <Progress value={percentages.against} className="flex-1 h-2" />
                      <span className="text-sm font-mono w-12 text-right">{percentages.against}%</span>
                    </div>
                  </div>

                  {isConnected ? (
                    <div className="flex gap-3">
                      <Button className="flex-1 rounded-full bg-green-600 hover:bg-green-700" disabled={isVoting} onClick={() => handleVote(proposal.id, "for")} data-testid={`button-vote-for-${proposal.id}`}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {content.vote_for}
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-full border-red-500 text-red-500 hover:bg-red-500/10" disabled={isVoting} onClick={() => handleVote(proposal.id, "against")} data-testid={`button-vote-against-${proposal.id}`}>
                        <XCircle className="w-4 h-4 mr-2" />
                        {content.vote_against}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-4">{content.connect_to_vote}</p>
                      <ConnectWalletButton />
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </main>

      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border border-white/10 rounded-3xl max-w-lg w-full p-8"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-display font-bold mb-6">{content.create_proposal}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Proposal title..."
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                  className="h-12 bg-foreground/5 border-white/10"
                  data-testid="input-proposal-title"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe your proposal..."
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-32 bg-foreground/5 border-white/10"
                  data-testid="input-proposal-description"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select value={newProposal.type} onValueChange={(value) => setNewProposal(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="h-12 bg-foreground/5 border-white/10" data-testid="select-proposal-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{content.proposal_types.fund}</SelectItem>
                    <SelectItem value="1">{content.proposal_types.partnership}</SelectItem>
                    <SelectItem value="2">{content.proposal_types.protocol}</SelectItem>
                    <SelectItem value="3">{content.proposal_types.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1 h-12 rounded-full" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 h-12 rounded-full" onClick={handleCreateProposal} disabled={isCreating} data-testid="button-submit-proposal">
                  Submit Proposal
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

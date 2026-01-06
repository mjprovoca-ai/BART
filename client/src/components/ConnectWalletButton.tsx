import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { hasValidProjectId } from '@/lib/wagmi';

export function ConnectWalletButton({ label = "Conectar Carteira" }: { label?: string }) {
  if (!hasValidProjectId) {
    return (
      <Button 
        variant="outline" 
        className="rounded-full px-6 opacity-50 cursor-not-allowed"
        disabled
        data-testid="button-connect-wallet-disabled"
      >
        {label}
      </Button>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {!connected ? (
              <Button 
                onClick={openConnectModal} 
                variant="default" 
                className="rounded-full px-6"
                data-testid="button-connect-wallet"
              >
                {label}
              </Button>
            ) : chain.unsupported ? (
              <Button 
                onClick={openChainModal} 
                variant="destructive"
                className="rounded-full px-6"
                data-testid="button-wrong-network"
              >
                Rede Errada
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={openChainModal}
                  variant="outline"
                  size="sm"
                  className="rounded-full px-3 hidden md:flex"
                  data-testid="button-chain"
                >
                  {chain.hasIcon && chain.iconUrl && (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      className="w-4 h-4 mr-1"
                    />
                  )}
                  {chain.name}
                </Button>
                <Button
                  onClick={openAccountModal}
                  variant="default"
                  className="rounded-full px-4"
                  data-testid="button-account"
                >
                  {account.displayName}
                </Button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

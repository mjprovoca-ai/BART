import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5000,
    },
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={{
            lightMode: lightTheme({
              accentColor: '#000000',
              accentColorForeground: '#ffffff',
              borderRadius: 'medium',
              fontStack: 'system',
            }),
            darkMode: darkTheme({
              accentColor: '#ffffff',
              accentColorForeground: '#000000',
              borderRadius: 'medium',
              fontStack: 'system',
            }),
          }}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

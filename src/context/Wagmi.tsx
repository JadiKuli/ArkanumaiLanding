import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { mainnet, arbitrum, type AppKitNetwork } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { ReactNode } from "react";

// 0) Query Client
const queryClient = new QueryClient();

// 1) Project ID
const projectId =
  process.env.VITE_WALLETCONNECT_PROJECT_ID ||
  "cde51c8f1d15ba9b7ef8ea6466f91c6f";

// 2) Metadata
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://arcanumai.kuncipintu.my.id",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3) Networks (tuple non-empty)
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum];

// 4) Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5) Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    connectMethodsOrder: ["wallet"],
  },
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default AppKitProvider;

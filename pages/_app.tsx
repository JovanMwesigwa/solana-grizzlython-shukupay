import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import {
  SessionContextProvider,
  Session,
  useUser,
} from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl } from "@solana/web3.js"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { useRouter } from "next/router"
import { store } from "../state/store"
import { Provider } from "react-redux"

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css")

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet

  // You can also provide a custom RPC endpoint.
  const endpoint = clusterApiUrl(network)

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ]

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <Component {...pageProps} />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </SessionContextProvider>
      </QueryClientProvider>
    </Provider>
  )
}

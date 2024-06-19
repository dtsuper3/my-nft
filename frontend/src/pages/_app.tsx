import { Footer, Navbar } from "@/shared/components";
import { NFTMarketplaceContextProvider } from "@/shared/context/NFTMarketplaceContext";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>

      <MantineProvider>
        <NFTMarketplaceContextProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </NFTMarketplaceContextProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

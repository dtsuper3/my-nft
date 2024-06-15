import { Footer, Navbar } from "@/shared/components";
import { NFTMarketplaceContextProvider } from "@/shared/context/NFTMarketplaceContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NFTMarketplaceContextProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </NFTMarketplaceContextProvider>
  )
}

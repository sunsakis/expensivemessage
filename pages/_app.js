import '@/styles/globals.css';
import Head from 'next/head';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Ethereum, Sepolia } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }) {
  return <>
  <ThirdwebProvider 
      activeChain={Sepolia}
      supportedChains={[Ethereum, Sepolia]}
    >
  <Component {...pageProps} />
  <Head>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
    <link rel="manifest" href="/favicon/site.webmanifest" />
  </Head>
  </ThirdwebProvider>
  </>
}

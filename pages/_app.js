import '@/styles/globals.css';
import Head from 'next/head';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Base } from "@thirdweb-dev/chains";
import { Titillium_Web } from 'next/font/google';
import PlausibleProvider from 'next-plausible';

const titties = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700'],
})

export default function App({ Component, pageProps }) {
  return (
  <main className={titties.className}>
    <ThirdwebProvider 
        activeChain={Base}
        //supportedChains={[Ethereum, Sepolia]}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_ID}
      >
    {/* <PlausibleProvider domain="expensivemessage.com"> */}
      <Component {...pageProps} />
    {/* </PlausibleProvider> */}
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
    </ThirdwebProvider>
  </main>
  )
}

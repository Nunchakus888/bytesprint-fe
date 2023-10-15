import { Metadata } from "next";
import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import { Session } from "next-auth"

import theme from 'theme/theme'
import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { SessionProvider } from 'next-auth/react'
import { publicProvider } from "wagmi/providers/public"

let title = "Dream Room Generator";
let description = "Generate your dream room in seconds.";
let ogimage = "https://roomgpt-demo.vercel.app/og-image.png";
let sitename = "roomGPT.io";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: "https://roomgpt-demo.vercel.app",
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};


import config from 'layouts/websiteConfig'

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id='root' className="bg-[#17181C] text-white">

        <ChakraProvider theme={theme}>
          <Head>
            <title>{ config.title }</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='theme-color' content='#000000' />
          </Head>

          {/*// Use of the <SessionProvider> is mandatory to allow components that call
        // `useSession()` anywhere in your application to access the `session` object.*/}
          <WagmiConfig client={client}>
            <SessionProvider refetchInterval={0}>
              {
                children
              }
            </SessionProvider>
          </WagmiConfig>

          {/*<WagmiProvider autoConnect>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <React.StrictMode>
              <Component {...pageProps} />
            </React.StrictMode>
          </SessionProvider>
        </WagmiProvider>*/}
        </ChakraProvider>
        {children}
        {/*<Analytics />*/}
      </body>
    </html>
  );
}

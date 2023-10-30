import "focus-visible/dist/focus-visible"
import 'styles/Fonts.css'
import 'styles/App.css'
import 'styles/Contact.css'
import '@vercel/examples-ui/globals.css'

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'

import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import { Session } from "next-auth"

import { LanguageProvider } from "contexts/LanguageContext";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "react-query";

import theme from 'theme/theme'
import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { SessionProvider } from 'next-auth/react'
import { publicProvider } from "wagmi/providers/public"


import Head from 'next/head'

import config from 'layouts/websiteConfig'

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
});

const queryClient = new QueryClient();

function App ({Component, pageProps }: AppProps<{ session: Session; }>) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>{ config.title }</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
      </Head>

      {/*// Use of the <SessionProvider> is mandatory to allow components that call
  // `useSession()` anywhere in your application to access the `session` object.*/}
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <QueryClientProvider client={queryClient}>
            <LanguageProvider>
              <Component {...pageProps} />
            </LanguageProvider>
          </QueryClientProvider>
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
  )
}

export default appWithTranslation(App);

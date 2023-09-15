import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import theme from 'theme/theme'
import { WagmiProvider } from 'wagmi'
import { SessionProvider } from 'next-auth/react'

import 'styles/Fonts.css'
import 'styles/App.css'
import 'styles/Contact.css'
import '@vercel/examples-ui/globals.css'

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'
import Head from 'next/head'

import config from 'layouts/websiteConfig'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>{ config.title }</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
      </Head>

      <WagmiProvider autoConnect>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <React.StrictMode>
            <Component {...pageProps} />
          </React.StrictMode>
        </SessionProvider>
      </WagmiProvider>
    </ChakraProvider>
  )
}

export default MyApp

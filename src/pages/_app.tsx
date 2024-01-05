import 'focus-visible/dist/focus-visible';
import 'styles/Fonts.css';
import 'styles/App.css';
import 'styles/Contact.css';
import '@vercel/examples-ui/globals.css';

import 'react-calendar/dist/Calendar.css';
import 'styles/MiniCalendar.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Session } from 'next-auth';

import { LanguageProvider } from 'contexts/LanguageContext';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import './global.css'
// import "./../views/task/styles.css";
import theme from 'theme/theme';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli, sepolia } from 'wagmi/chains';
import { SessionProvider } from 'next-auth/react';
import { publicProvider } from 'wagmi/providers/public';
import { darkTheme, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import Head from 'next/head';

import config from 'layouts/websiteConfig';
import ReduxProvider from 'components/reduxProvider';

const projectId = '467f25289c817c42bc541efb8f04be1d';

const { chains, provider } = configureChains(
  // [sepolia, mainnet, goerli],
  [sepolia],
  [
    // alchemyProvider({
    //   apiKey: alchemyKey, //process.env.REACT_APP_ALCHEMY_ID,
    // }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      //@ts-ignore
      metaMaskWallet({ projectId, chains, shimDisconnect: true }),
      //@ts-ignore
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>{config.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>

      {/*// Use of the <SessionProvider> is mandatory to allow components that call
  // `useSession()` anywhere in your application to access the `session` object.*/}
      <ReduxProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider modalSize="compact" chains={chains} theme={darkTheme()}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
              <QueryClientProvider client={queryClient}>
                <LanguageProvider>
                  <Component {...pageProps} />
                </LanguageProvider>
              </QueryClientProvider>
            </SessionProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReduxProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);

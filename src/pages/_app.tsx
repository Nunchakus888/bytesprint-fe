import './global.css';

import 'focus-visible/dist/focus-visible';
import 'styles/Fonts.css';
import 'styles/Contact.css';
import '@vercel/examples-ui/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React, { useEffect, useMemo } from 'react';

import { LanguageProvider } from 'common/contexts/LanguageContext';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from 'common/theme/theme';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli, sepolia, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { darkTheme, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import Head from 'next/head';
import ReduxProvider from 'common/reduxProvider';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useUserInfo } from 'hooks/user';
import { useSelector } from 'react-redux';
const projectId = '467f25289c817c42bc541efb8f04be1d';

const { chains, provider } = configureChains(
  // [sepolia, mainnet, goerli],
  [sepolia, arbitrum],
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

function App({ Component, pageProps }: AppProps<{}>) {
  const route = useRouter();
  const isGuide = useMemo(() => {
    return route.pathname.includes('guide');
  }, [route]);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Byte sprint</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <ReduxProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider modalSize="compact" chains={chains} theme={darkTheme()}>
            <QueryClientProvider client={queryClient}>
              <LanguageProvider>
                <Header />
                {isGuide ? '' : <Sidebar />}
                <main
                  className={classNames(isGuide ? 'v-main-guide' : '', 'v-main', 'raw-scrollbar')}
                >
                  <Component {...pageProps} />
                </main>
                <ToastContainer />
              </LanguageProvider>
            </QueryClientProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReduxProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);

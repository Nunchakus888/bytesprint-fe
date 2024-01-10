import { Html, Head, Main, NextScript } from 'next/document';
import config from 'layouts/websiteConfig';
import { ColorModeScript } from '@chakra-ui/react';
import theme from 'common/theme/theme';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*<link rel='apple-touch-icon' href='/logo192.png' />*/}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href={config.favicon} />
      </Head>
      <body id="root">
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

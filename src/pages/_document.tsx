import { Html, Head, Main, NextScript } from 'next/document'
import config from 'layouts/websiteConfig'

export default function Document () {
  return (
    <Html lang='en'>
      <Head>
        {/*<link rel='apple-touch-icon' href='/logo192.png' />*/}
        <link rel='manifest' href='/manifest.json' />
        <link rel="icon" type="image/x-icon" href={config.favicon} />
      </Head>
      <body id='root'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

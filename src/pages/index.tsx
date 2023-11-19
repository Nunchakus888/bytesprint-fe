import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Index from 'pages/(home)/index';

export default Index;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}

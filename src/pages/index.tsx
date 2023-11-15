import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Index from 'pages/(home)/index';

export default Index

/*
export const getServerSideProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["home", "common"])),
		},
	};
};

*/


export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'en', [
				'common',
				'home',
			])),
			// Will be passed to the page component as props
		},
	}
}
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Index from 'pages/(index)/index';

export default Index

export const getServerSideProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Index from './(index)/Index';

export default Index

export const getServerSideProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
};

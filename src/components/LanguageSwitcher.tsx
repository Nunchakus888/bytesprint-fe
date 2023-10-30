import {Menu, MenuButton, MenuList, MenuItem, IconButton, Icon, useColorModeValue} from '@chakra-ui/react';
import languages from 'i18n/languages.json';

import Link from "next/link";

import { BsGlobe } from 'react-icons/bs';

import React from "react";
const LanguageSwitcher = ({ suffix = '' }) => {
	const navbarIcon = useColorModeValue('gray.400', 'white');

	return (
		<Menu>
			<MenuButton
				color={navbarIcon}
				as={IconButton}
				aria-label='Options'
				icon={<BsGlobe />}
				variant='no-hover'
			/>
			<MenuList>
				{
					languages.locales.map(({ label, value }) => {
						return (
							<MenuItem key={value}>
								<Link href={suffix} locale={value}>{label}</Link>
							</MenuItem>
						)
					})
				}
			</MenuList>
		</Menu>
	)
}

export default LanguageSwitcher;
/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { getCsrfToken, signIn, useSession, signOut } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'

import React from 'react';

// Chakra imports
import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	Link,
	useColorModeValue
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
import Router from "next/router";
// Assets

export default function SignIn() {
	// Chakra color mode
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorSecondary = 'gray.400';

	const session = useSession()

	console.log('------session', session);
	const [{ data: connectData }, connect] = useConnect()
	const [, signMessage] = useSignMessage()
	const [{ data: networkData }] = useNetwork()
	const [{ data: accountData }] = useAccount()

	const handleLogin = async () => {
		try {
			await connect(connectData.connectors[0])
			const callbackUrl = '/protected'
			const message = new SiweMessage({
				domain: window.location.host,
				address: accountData?.address,
				statement: 'Sign in with Ethereum to the app.',
				uri: window.location.origin,
				version: '1',
				chainId: networkData?.chain?.id,
				nonce: await getCsrfToken(),
			})
			const { data: signature, error } = await signMessage({
				message: message.prepareMessage(),
			})
			signIn('credentials', {
				message: JSON.stringify(message),
				redirect: false,
				signature,
				callbackUrl,
			})
		} catch (error) {
			window.alert(error)
		}
	}

	const handleLogout = async () => {
		signOut({ redirect: false })
	}

	const ethereumPresent = typeof window !== 'undefined' && !!window.ethereum

	return (
		<DefaultAuthLayout>
			<Flex
				maxW={{ base: '100%', md: 'max-content' }}
				w='100%'
				mx={{ base: 'auto', lg: '0px' }}
				me='auto'
				borderRadius="xl"
				alignItems='start'
				justifyContent='center'
				px={{ base: '25px', md: '100px' }}
				py={{ base: '25px', md: '100px' }}
				m={0}
				bg="white"
				flexDirection='column'>

				<Flex
					zIndex='2'
					direction='column'
					w={{ base: '100%', md: '420px', lg: '520px' }}
					maxW='100%'
					background='transparent'
					borderRadius='15px'
					mx={{ base: 'auto', lg: 'unset' }}
					me='auto'
					mb={{ base: '20px', md: 'auto' }}>
					<img
						src="/img/layout/logo.png"
						className="w-full"
					/>

					<FormControl>

						<Text textAlign="center" fontSize="3xl" py={16} onClick={() => Router.push('/admin/home')}>欢迎登录</Text>


						<Button
							fontSize='sm' variant="brand" fontWeight='500' w='100%' h='50' mb='24px'
							onClick={
								session.status === 'authenticated' ? handleLogout : handleLogin
							}
						>
							{session.status === 'authenticated' ? `Connected as ${session.data?.user?.name}` : 'MateMask 授权登录'}
						</Button>

						<Button mt={4} w="100%" variant='link' color={textColorSecondary}>
							<Link href="https://metamask.io/" isExternal>没有MateMask钱包，去创建</Link>
						</Button>

					</FormControl>
				</Flex>
			</Flex>
		</DefaultAuthLayout>
	);
}

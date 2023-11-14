import Link from "next/link";

import {useColorModeValue, HStack, Flex, Show, Hide, Box} from "@chakra-ui/react";
import {useSession} from "next-auth/react";
import Logo from "components/image/Logo";
import MobileNav from "components/MobileNav";
import { Button } from '@chakra-ui/react';
import { HiOutlineArrowRight } from 'react-icons/hi';
// import { useDynamicContent } from 'hooks/useDynamicContent';
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "components/LanguageSwitcher";
import React from "react";

export default function Header({ className = '', ...props }) {
  let logoColor = useColorModeValue('navy.700', 'white');
  const { t } = useTranslation("common");

  const session = useSession();
  const name = session.data?.user?.name;

  return (
    <header className={`flex flex-row sm:flex-wrap justify-between items-center w-full px-20 md:px-10 sm:px-4 gap-2 ${className}`}>

      <Logo className="my-6 sm:w-48 lg:w-64 flex-shrink-0" />

      <Hide below='md'>
        {
          props.children
        }
      </Hide>

      <HStack spacing={4}>
        <LanguageSwitcher suffix="" />
        <Button
          display={{ md: 'flex' }}
          variant='darkBrand'
          color='white'
          fontSize='sm'
          fontWeight='500'
          borderRadius='70px'
          px='24px'
          py='5px'
        >
          <Link
            className="truncate w-40"
            href={name ? '/admin' : '/login'}
          >
            {
              name || t("home.login")
            }
          </Link>
        </Button>
      </HStack>

      <Show below="md">
        <HStack w={100} flexGrow={1} alignItems="center" justifyContent="center" >
          {
            props.children
          }
        </HStack>
      </Show>
    </header>
  );
}
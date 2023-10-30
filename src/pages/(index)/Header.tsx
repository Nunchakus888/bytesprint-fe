import Image from "next/image";
import Link from "next/link";
import Brand from "components/sidebar/components/Brand";
import {HorizonLogo} from "components/icons/Icons";
import {useColorModeValue, HStack, Portal, Box} from "@chakra-ui/react";
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
  const session = useSession();
  const { t } = useTranslation("common");

  const name = session.data?.user?.name;

  return (
    <header className={`flex flex-row justify-between items-center w-full px-20 md:px-10 sm:px-4 gap-2 border-b border-gray-500 ${className}`}>

      <Logo className="my-6 sm:w-48 lg:w-64 flex-shrink-0" />

      <div className="sm:hidden md:block">
        {
          props.children
        }
      </div>

      <HStack spacing={4}>
        <LanguageSwitcher suffix="" />

        {/*<Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
          <AdminNavbarLinks
            onOpen={() => {}}
            secondary={false}
            fixed={!0}
          />
        </Box>*/}

        <Button
          pill
          outline
          display={{ md: 'flex', sm: 'none' }}
          variant='darkBrand'
          color='white'
          fontSize='sm'
          fontWeight='500'
          borderRadius='70px'
          px='24px'
          py='5px'
          gradientDuoTone="purpleToPink"
        >
          <Link
            className="truncate w-40"
            href={name ? '/admin' : '/login'}
          >
            {
              name || t("home.login")
            }
          </Link>
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </HStack>
      <MobileNav />

    </header>
  );
}
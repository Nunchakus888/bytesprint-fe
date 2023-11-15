import {useColorModeValue, HStack, Flex, Show, Hide, Box} from "@chakra-ui/react";
import {useSession} from "next-auth/react";
import Logo from "components/image/Logo";
// import { useDynamicContent } from 'hooks/useDynamicContent';
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "components/LanguageSwitcher";
import LinkButton from './components/LinkButton';
import React from "react";

export default function Header({ className = '', ...props }) {
  const { t } = useTranslation(["home"]);

  return (
    <header className={`flex flex-row sm:flex-wrap justify-between items-center w-full gap-2 ${className}`}>

      <Logo className="my-6 sm:w-48 lg:w-64 flex-shrink-0" />

      <Hide below='md'>
        {
          props.children
        }
      </Hide>

      <HStack spacing={4}>
        <LanguageSwitcher suffix="" />
        <LinkButton />
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
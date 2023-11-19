// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';
import Link from 'next/link';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Link href="/">
      <Flex alignItems="center" flexDirection="column">
        <HorizonLogo h="50px" w="220px" mb="32px" color={logoColor} />
        <HSeparator mb="20px" />
      </Flex>
    </Link>
  );
}

export default SidebarBrand;

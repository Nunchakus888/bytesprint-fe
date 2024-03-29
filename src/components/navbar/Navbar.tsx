/* eslint-disable */
// Chakra Imports
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { isWindowAvailable } from 'common/utils/navigation';

import styles from './index.module.scss';

export default function Navbar(props: { paths: any[] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isWindowAvailable()) {
      // You now have access to `window`
      window.addEventListener('scroll', changeNavbar);

      return () => {
        window.removeEventListener('scroll', changeNavbar);
      };
    }
  });

  const changeNavbar = () => {
    if (isWindowAvailable() && window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Box>
      <Flex
        w="100%"
        flexDirection={{
          sm: 'column',
          md: 'row',
        }}
        alignItems={{ xl: 'center' }}
      >
        <Box mb={{ sm: '8px', md: '0px' }}>
          <Breadcrumb>
            {props.paths?.map((it) => {
              return (
                <BreadcrumbItem
                  key={`${it.path}_${it.name}`}
                  fontSize="md"
                  fontWeight="bold"
                  mb="10px"
                >
                  {it.onClick ? (
                    <BreadcrumbLink onClick={it.onClick}>{it.name}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink>{it.name}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </Box>
      </Flex>
    </Box>
  );
}

/* eslint-disable */

// chakra imports
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IRoute } from 'types/navigation';
import { useUserRoute } from 'hooks/user';

interface SidebarLinksProps {
  routes?: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const routers = useUserRoute()
  //   Chakra color mode
  const router = useRouter();

  let activeColor = useColorModeValue('gray.700', 'white');
  let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'white');
  let brandColor = useColorModeValue('brand.500', 'brand.400');

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: any[]) => {
    return routes.map((route, index: number) => {
      // if (route.layout === '/' || route.layout === '/auth' || route.layout === '/rtl') {
      //   return (
      //     <Link key={index} href={route.layout + route.path}>
      //       <>
      //         {route.icon ? (
      //           <Box>
      //             <HStack
      //               spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
      //               py="5px"
      //               ps="10px"
      //             >
      //               <Flex w="100%" alignItems="center" justifyContent="center">
      //                 <Box
      //                   color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
      //                   me="18px"
      //                 >
      //                   {route.icon}
      //                 </Box>
      //                 <Text
      //                   me="auto"
      //                   color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
      //                   fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}
      //                 >
      //                   {route.name}
      //                 </Text>
      //               </Flex>
      //               <Box
      //                 h="36px"
      //                 w="4px"
      //                 bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
      //                 borderRadius="5px"
      //               />
      //             </HStack>
      //           </Box>
      //         ) : (
      //           <Box>
      //             <HStack
      //               spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
      //               py="5px"
      //               ps="10px"
      //             >
      //               <Text
      //                 me="auto"
      //                 color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
      //                 fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}
      //               >
      //                 {route.name}
      //               </Text>
      //               <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
      //             </HStack>
      //           </Box>
      //         )}
      //       </>
      //     </Link>
      //   );
      // }

      return ( 
        <>
          {route.children ? 
          <Accordion defaultIndex={[0]} allowMultiple >
            <AccordionItem border={0}>
              <AccordionButton paddingLeft="0" justifyContent="space-between">
                {/* <Box as="span" flex='1' textAlign='left'>
                  {route.name}
                </Box> */}

                <Box>
                  <HStack
                    // spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
                    
                  >
                    <Flex w="100%" alignItems="center" justifyContent="center">
                      <Box
                        // color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
                        me="18px"
                      >
                        {/* {route.icon} */}
                        <Icon as={route.icon} width="20px" height="20px" color="inherit" />
                      </Box>
                      <Text
                        me="auto"
                        padding={0}
                        whiteSpace="nowrap"
                        // color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
                        // fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}
                      >
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h="36px"
                      w="4px"
                      // bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
                      borderRadius="5px"
                    />
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            
              <AccordionPanel paddingTop="0" paddingBottom="0">
                {route.children?.map((cit:any) => {
                  return (<Link key={index} href={cit.path}>
                    {/* <Box
                      color={activeRoute(cit.path.toLowerCase()) ? activeIcon : textColor}
                      me="18px"
                    >
                      {cit.name}
                    </Box> */}
                    <Box>
                      <HStack
                        spacing={activeRoute(cit.path.toLowerCase()) ? '22px' : '26px'}
                        
                      >
                        <Flex w="100%" alignItems="center" justifyContent="center">
                          <Box
                            color={activeRoute(cit.path.toLowerCase()) ? activeIcon : textColor}
                            me="18px"
                          >
                            {/* {route.icon} */}
                          </Box>
                          <Text
                            me="auto"
                            color={activeRoute(cit.path.toLowerCase()) ? activeColor : textColor}
                            fontWeight={activeRoute(cit.path.toLowerCase()) ? 'bold' : 'normal'}
                          >
                            {cit.name}
                          </Text>
                        </Flex>
                        <Box
                          h="36px"
                          w="4px"
                          bg={activeRoute(cit.path.toLowerCase()) ? brandColor : 'transparent'}
                          borderRadius="5px"
                        />
                      </HStack>
                    </Box>
                  </Link>)
                })}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>: 
            <Link key={index} href={route.path}>
              <Box>
                  <HStack
                    spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
                    
                  >
                    <Flex w="100%" alignItems="center" justifyContent="center">
                      <Box
                        color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
                        me="18px"
                      >
                        {/* {route.icon} */}
                        <Icon as={route.icon} width="20px" height="20px" color="inherit" />
                      </Box>
                      <Text
                        me="auto"
                        color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
                        fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}
                      >
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h="36px"
                      w="4px"
                      bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
                      borderRadius="5px"
                    />
                  </HStack>
                </Box>
            </Link>
          }
        </>
      )

    });
  };
  //  BRAND
  return <>{createLinks(routers)}</>;
}

export default SidebarLinks;

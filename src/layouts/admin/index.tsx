// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import {
  findCurrentRoute,
  getActiveNavbar,
  getActiveNavbarText,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';
import Router, { useRouter } from 'next/router';
import { useUserRoute } from 'hooks/user';
import _ from 'lodash';
// import { useSession } from 'next-auth/react';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

// Custom Chakra theme
export default function AdminLayout(props: DashboardLayoutProps) {
  const routers = useUserRoute()
  const { children, ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  // const session = useSession();

  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const { onOpen } = useDisclosure();

  useEffect(() => {
    window.document.documentElement.dir = 'ltr';
  });

  // useEffect(() => {
  //   if (session.status !== 'loading' && session.status !== 'authenticated') {
  //     Router.push('/login');
  //   }
  // }, [session]);

  // useEffect(() => {
  //   const cur = findCurrentRoute(routers)
  //   const paths = routers.map(r => {
  //     if (r.path) return r.path
  //     if (r.children) {
  //       const ps = r.children.map((it:any) => it.path)
  //       return ps
  //     }
  //   })
  //   console.log('_.flatten(paths)>>>', _.flatten(paths))
  //   const validPaths = _.flatten(paths)
  //   // if (!validPaths.some(it => it === router.pathname)) {
  //   //   router.replace('/')
  //   // }
  //   console.log("cur.path>>>>", cur?.path, validPaths)
  // }, [routers])
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'ByteSprint'}
                brandText={getActiveRoute(routers)}
                secondary={getActiveNavbar(routers)}
                message={getActiveNavbarText(routers)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          <Box mx="auto" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
            {children}
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}

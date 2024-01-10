// Chakra imports
import { Box, useToast } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'common/contexts/SidebarContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import _ from 'lodash';
import useConnect from 'hooks/useConnect';
interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const toast = useToast();
  const { connect } = useConnect();

  useEffect(() => {
    window.document.documentElement.dir = 'ltr';
  });

  useEffect(() => {
    // @ts-ignore
    window.toast = toast;
    // @ts-ignore
    window.connect = connect;
  }, []);

  return (
    <Box maxWidth="1512px" margin="0 auto">
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
          w={{ base: '100%', xl: 'calc( 100% - 310px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 310px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box mx="auto" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
            {children}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}

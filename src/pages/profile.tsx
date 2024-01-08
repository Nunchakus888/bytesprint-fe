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

// Chakra imports
import { Box, Grid, Portal, Button } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';

// Custom components
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';
import Navbar from 'components/navbar/NavbarAdmin';
// Assets
import banner from 'img/auth/banner.png';
import avatar from 'img/avatars/avatar4.png';
import { useSession } from 'next-auth/react';
import { useUserInfo } from 'hooks/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getActiveNavbar, getActiveNavbarText } from 'utils/navigation';
import Link from 'next/link';

export default function ProfileOverview() {
  const session = useSession();

  console.log('---session', session);

  const { identification } = useUserInfo();
  const router = useRouter();
  useEffect(() => {
    console.log('identification>>>>>>>>>>?', identification);
    if (!identification) {
      router.replace('/tasks');
    }
  }, []);
  return (
    <AdminLayout>
      <Portal>
        <Box>
          <Navbar paths={[{ path: '#', name: '用户中心' }]} />
        </Box>
      </Portal>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        {/* Main Fields */}
        <Grid
          templateColumns={{
            base: '1fr',
            lg: '1fr',
          }}
          templateRows={{
            base: 'repeat(3, 1fr)',
            lg: '1fr',
          }}
          gap={{ base: '20px', xl: '20px' }}
        >
          <Banner
            gridArea="1 / 1 / 2 / 2"
            banner={banner}
            avatar={avatar}
            name={session?.data?.user?.name}
            job="普通用户"
            posts=""
            followers=""
            following=""
          />
          {/*<Storage
            gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
            used={25.6}
            total={50}
          />
          <Upload
            gridArea={{
              base: '3 / 1 / 4 / 2',
              lg: '1 / 3 / 2 / 4'
            }}
            minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
            pe='20px'
            pb={{ base: '100px', lg: '20px' }}
          />*/}
        </Grid>
        <Link href={'/auth/engineer'}>
          <Button>水手认证</Button>
        </Link>
        <Grid
          mb="20px"
          templateColumns={{
            base: '1fr',
            lg: 'repeat(2, 1fr)',
            '2xl': '1.34fr 1.62fr 1fr',
          }}
          templateRows={{
            base: '1fr',
            lg: 'repeat(2, 1fr)',
            '2xl': '1fr',
          }}
          gap={{ base: '20px', xl: '20px' }}
        >
          <Projects
            banner={banner}
            avatar={avatar}
            name="Adela Parkson"
            job="Product Designer"
            posts="17"
            followers="9.7k"
            following="274"
          />
          <General
            gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
            minH="365px"
            pe="20px"
          />
          <Notifications
            used={25.6}
            total={50}
            gridArea={{
              base: '3 / 1 / 4 / 2',
              lg: '2 / 1 / 3 / 3',
              '2xl': '1 / 3 / 2 / 4',
            }}
          />
        </Grid>
      </Box>
    </AdminLayout>
  );
}

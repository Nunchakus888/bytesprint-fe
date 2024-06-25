import styles from './index.module.scss';

import { Box, Link } from '@chakra-ui/react';
import SideContent from 'components/sidebar/SideContent';
import { SidebarContext } from 'common/contexts/SidebarContext';
import { PropsWithChildren, useState } from 'react';
import { IMG_SRC, LINK_SRC } from 'common/constant';
import { BsTwitterX } from 'react-icons/bs';
import { FaDiscord, FaFacebook, FaYoutube } from 'react-icons/fa';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

export default function Sidebar(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <Box className={styles.component} display={{ sm: 'none', xl: 'block' }}>
      <div className={styles.content}>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <SideContent display="none" {...rest} />
          <div className={styles.footer}>
            <div className={styles.mediawrap}>
              <Link href={LINK_SRC.twitter} target="_blank">
                <BsTwitterX />
              </Link>
              <Link href={LINK_SRC.discord} target="_blank">
                <FaDiscord />
              </Link>
              <Link href={LINK_SRC.facebook} target="_blank">
                <FaFacebook />
              </Link>
              <Link href={LINK_SRC.youtube} target="_blank">
                <FaYoutube />
              </Link>
            </div>
            <p className={styles.version}>IT Crowdsourcing Web3 Platform</p>
          </div>
        </SidebarContext.Provider>
      </div>
    </Box>
  );
}

import styles from './index.module.scss';

import { Box } from '@chakra-ui/react';
import SideContent from 'components/sidebar/SideContent';
import { SidebarContext } from 'common/contexts/SidebarContext';
import { PropsWithChildren, useState } from 'react';
import { IMG_SRC } from 'common/constant';

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
              <img src={IMG_SRC.Twitter} alt="Twitter" width="16" />
              <img src={IMG_SRC.Discord} alt="Discord" width="20" />
              <img src={IMG_SRC.Docs} alt="Docs" width="20" />
            </div>
            <p className={styles.version}>IT Crowdsourcing Web3 Platform</p>
          </div>
        </SidebarContext.Provider>
      </div>
    </Box>
  );
}

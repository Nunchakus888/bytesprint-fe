import SideContent from 'components/sidebar/SideContent';
import { SidebarContext } from 'common/contexts/SidebarContext';
import { PropsWithChildren, useState } from 'react';
import styles from './index.module.scss';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

export default function Sidebar(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className={styles.component}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <SideContent display="none" {...rest} />
      </SidebarContext.Provider>
    </div>
  );
}

import styles from './index.module.scss';

import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CustomConnectButton from './CustomConnectButton';
import useConnect from 'hooks/useConnect';
import { IMG_SRC } from 'common/constant';
import Link from 'next/link';
import useListenConnectionEvent from 'hooks/useListenConnectionEvent';

export default function Header() {
  const toast = useToast();
  const { connect } = useConnect();
  useListenConnectionEvent();

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
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/">
          <img src={IMG_SRC.Logo} alt="logo" className={styles.logo} />
        </Link>
        <div className={styles.rightContent}>
          {/* TODO 链接 */}
          {/* <div className={styles.mediawrap}>
            <Link href="/">
              <img src={IMG_SRC.Twitter} alt="Twitter" width="16" />
            </Link>
            <Link href="/">
              <img src={IMG_SRC.Discord} alt="Discord" width="20" />
            </Link>
            <Link href="/">
              <img src={IMG_SRC.Docs} alt="Docs" width="20" />
            </Link>
          </div> */}
          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
}

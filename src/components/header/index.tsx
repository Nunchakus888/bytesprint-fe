import styles from './index.module.scss';

import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CustomConnectButton from './CustomConnectButton';
import useConnect from 'hooks/useConnect';
import { IMG_SRC } from 'common/constant';
import Link from 'next/link';

export default function Header() {
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
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/">
          <img src={IMG_SRC.Logo} alt="logo" className={styles.logo} />
        </Link>
        <div className={styles.rightContent}>
          <div className={styles.mediawrap}>
            <img src={IMG_SRC.Twitter} alt="Twitter" width="16" />
            <img src={IMG_SRC.Discord} alt="Discord" width="20" />
            <img src={IMG_SRC.Docs} alt="Docs" width="20" />
          </div>
          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
}

import styles from './index.module.scss';

import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CustomConnectButton from './CustomConnectButton';
import Logo from '../../../public/img/logo.png';
import Twitter from '../../../public/img/media/twitter.png';
import Docs from '../../../public/img/media/docs.png';
import useConnect from 'hooks/useConnect';

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
        <img src={Logo.src} alt="logo" className={styles.logo} />
        <div className={styles.rightContent}>
          <div className={styles.mediawrap}>
            <img src={Docs.src} alt="Docs" width="20" />
            <img src={Twitter.src} alt="Twitter" width="16" />
          </div>
          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
}

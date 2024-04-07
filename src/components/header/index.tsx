import styles from './index.module.scss';

import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CustomConnectButton from './CustomConnectButton';
import useConnect from 'hooks/useConnect';
import { IMG_SRC, LINK_SRC } from 'common/constant';
import Link from 'next/link';
import useListenConnectionEvent from 'hooks/useListenConnectionEvent';
import { FaDiscord, FaFacebook, FaYoutube } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
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
          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
}

import { Box, Button } from '@chakra-ui/react';
import { useUserInfo } from 'hooks/user';
import Link from 'next/link';
import { Identification, IPath } from 'common/constant';
import styles from './index.module.scss';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getItem, removeItem, setItem } from 'common/utils';

export default function Auth(props: { from?: string }) {
  const { from } = props;
  const { identification, userInfo } = useUserInfo();
  console.log('identification auth', identification);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const isHideAuth = getItem('isHideAuth');
    setIsShow(!isHideAuth);
  }, []);
  const hideConnectModal = () => {
    setIsShow(false);
    setItem('isHideAuth', '1');
  };
  return (
    <>
      {isShow &&
        userInfo?.address &&
        identification !== Identification.ENGINEER &&
        from === IPath.TASKS && (
          <Box className={styles.auth}>
            {/* <IoCloseCircleOutline
            className={styles['close-icon']}
            onClick={() => hideConnectModal()}
          /> */}
            <p>Participate after Tasker Certification</p>
            <Button background="#7551FF" size="md" color="#fff">
              <Link href="/certification/tasker">Tasker Certification</Link>
            </Button>
            <Box className="underline mt-[20px] cursor-pointer" onClick={hideConnectModal}>
              Do not show again
            </Box>
          </Box>
        )}
    </>
  );
}

import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import Navbar from 'components/navbar/Navbar';
import CertificationForm from './CertificationForm';

import styles from './index.module.scss';
import { useRouter } from 'next/router';

export default function Tasker() {
  const [isNextStep, setIsNextStep] = useState(true);
  const [authorizeCode, setAuthorizeCode] = useState('');
  const router = useRouter();
  return (
    <>
      <Box>
        <Navbar
          paths={[
            {
              name: 'My Portfolio',
              onClick: () => {
                router.push('/profile');
              },
            },
            { name: 'Tasker Certification' },
          ]}
        />
      </Box>
      <div className={styles.taskerWrap}>
        {isNextStep ? (
          <CertificationForm authorizeCode={authorizeCode} />
        ) : (
          <div className={styles.authorizeCodeWrap}>
            <div className={styles.title}>Taker Authentication</div>
            <Input placeholder={`Please enter the Navigation's authorization code`} />
            <Button className="theme-button" onClick={() => setIsNextStep(true)}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

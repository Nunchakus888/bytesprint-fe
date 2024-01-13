import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import Navbar from 'components/navbar/Navbar';
import CertificationForm from './CertificationForm';

import styles from './index.module.scss';

export default function Tasker() {
  const [isNextStep, setIsNextStep] = useState(true);
  const [authorizeCode, setAuthorizeCode] = useState('');

  return (
    <>
      <Box>
        <Navbar
          paths={[
            { path: '#', name: 'My Tasker' },
            { path: `/`, name: 'Tasker' },
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

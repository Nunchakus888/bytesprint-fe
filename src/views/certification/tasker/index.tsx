import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import Navbar from 'components/navbar/Navbar';
import CertificationForm from './CertificationForm';

import styles from './index.module.scss';

export default function Tasker() {
  const [isNextStep, setIsNextStep] = useState(false);
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
        {/* <div className={styles.authorizeCodeWrap}>
          <div className={styles.title}>Taker Authentication</div>
          <Input placeholder={`Please enter the Navigation's authorization code`} />
          <Button className="theme-button">Continue</Button>
        </div> */}
        <CertificationForm authorizeCode={authorizeCode} />
      </div>
    </>
  );
}

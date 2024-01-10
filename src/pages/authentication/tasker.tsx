import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from 'components/navbar/NavbarAdmin';

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
      <Box>Taker Authentication</Box>
    </>
  );
}

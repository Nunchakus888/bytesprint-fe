import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Portal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useRadioGroup,
} from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import Navbar from 'components/navbar/NavbarAdmin';
import {
  IPath,
  IRequirement,
  IRequirementPerson,
  IRequirementSingle,
  ProfessionTypes,
  ProType,
  ProTypes,
  RequirementType,
} from 'common/utils/constant';

export default function Tasker() {
  const [isNextStep, setIsNextStep] = useState(false);
  const [authorizeCode, setAuthorizeCode] = useState('');

  return (
    <AdminLayout>
      <Box>
        <Navbar
          paths={[
            { path: '#', name: 'My Tasker' },
            { path: `/`, name: 'Tasker' },
          ]}
        />
      </Box>
      <Box>Taker Authentication</Box>
    </AdminLayout>
  );
}

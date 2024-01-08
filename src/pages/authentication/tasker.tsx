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
} from 'utils/constant';

export default function Tasker() {
  const [isNextStep, setIsNextStep] = useState(false);
  return (
    <AdminLayout>
      <Portal>
        <Box>
          <Navbar
            paths={[
              { path: '#', name: 'My Tasker' },
              { path: `/`, name: 'Tasker' },
            ]}
          />
        </Box>
      </Portal>
      <Box>123</Box>
    </AdminLayout>
  );
}

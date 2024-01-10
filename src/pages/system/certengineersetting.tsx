import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Confirm from 'components/confirm';
import ModalDialog from 'components/modal';
import BYTable from 'components/table';
import { useCertPositionSetting } from 'hooks/system';
import { useCertEngineerSetting } from 'hooks/system/certEnginner';
import AdminLayout from 'layouts/admin';
import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CertEngineerSetting() {
  const { data, saveItem } = useCertEngineerSetting();
  const toast = useToast();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: data,
    mode: 'onChange',
  });
  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <Box
          mt={{ base: '30px' }}
          padding="30px 20px"
          background="rgba(255,255,255,0.05)"
          borderRadius={8}
        >
          <Text fontSize={24}>接单方认证信息设置</Text>
          <Box margin="20px 0">
            <Checkbox size="md" colorScheme="purple" {...register('base')}>
              基础信息
            </Checkbox>
          </Box>
          <Box margin="20px">
            <Flex gap="40px" margin="10px">
              <Checkbox size="md" colorScheme="purple" {...register('baseInfo.position')}>
                认证职位类型
              </Checkbox>
              <Checkbox size="md" colorScheme="purple" {...register('baseInfo.experience')}>
                工作经验
              </Checkbox>
            </Flex>
            <Flex gap="40px" margin="10px">
              <Checkbox size="md" colorScheme="purple" {...register('baseInfo.workplace')}>
                当前工作区域
              </Checkbox>
              <Checkbox size="md" colorScheme="purple" {...register('baseInfo.phone')}>
                Contact Number
              </Checkbox>
              <Checkbox size="md" colorScheme="purple" {...register('baseInfo.email')}>
                邮箱
              </Checkbox>
            </Flex>
          </Box>
          <Box margin="20px 0">
            <Checkbox size="md" colorScheme="purple" {...register('skillsTag')}>
              Skills Tags
            </Checkbox>
          </Box>
          <Box margin="20px 0">
            <Checkbox size="md" colorScheme="purple" {...register('taskExperience')}>
              近期工作
            </Checkbox>
          </Box>
          <Box margin="20px 0">
            <Checkbox size="md" colorScheme="purple" {...register('education')}>
              教育经历
            </Checkbox>
          </Box>
          <Box margin="20px 0">
            <Checkbox size="md" colorScheme="purple" {...register('skillsCert')}>
              技能证书
            </Checkbox>
          </Box>
          <Box margin="20px 0">
            <Checkbox size="md" colorScheme="purple" {...register('attachResume')}>
              Attached Resume
            </Checkbox>
          </Box>
          <Button
            margin="20px 0"
            background="#7551FF"
            size="md"
            width="120px"
            borderRadius={4}
            onClick={handleSubmit(saveItem)}
          >
            修改
          </Button>
        </Box>
      </Box>
    </AdminLayout>
  );
}

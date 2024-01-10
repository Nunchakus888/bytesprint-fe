import { Box, Button, Flex, Portal, Text, useToast } from '@chakra-ui/react';
import Back from 'components/back';
import { requirementTypes } from 'hooks/myrequirements/add';
import AdminLayout from 'layouts/admin';
import Image from 'next/image';
import { useState } from 'react';
import styles from './add.module.scss';
import { IoCheckmarkOutline } from 'react-icons/io5';
import Link from 'next/link';
import Navbar from 'components/navbar/NavbarAdmin';
import { IPath, RequirementType } from 'common/utils/constant';
export default function AddRequirement() {
  const [selectType, setSelectType] = useState('');
  const toast = useToast();
  // 选中
  const handleClick = (it: (typeof requirementTypes)[0]) => {
    if (it.value !== RequirementType.Single) {
      toast({
        title: `Coming soon`,
        status: `info`,
        isClosable: true,
      });
      return false;
    }
    setSelectType(it.type);
  };
  return (
    <AdminLayout overflow="hidden" height="100vh">
      <Portal>
        <Box>
          <Navbar
            paths={[
              { path: `/${IPath.TASKS}`, name: 'Crowdsourcing Management' },
              { path: `/${IPath.MYREQUIREMENT}`, name: 'My Requirements' },
              { path: '#', name: 'Publish Requirement' },
            ]}
          />
        </Box>
      </Portal>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
        <Back />
        <Box
          className={styles.content}
          marginTop="20px"
          background="rgba(255,255,255,0.05)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Flex direction="column" alignItems="center" gap={20}>
            <Text color="#fff" fontSize={20} fontWeight="bold">
              Select Requirement Type
            </Text>
            <Flex justifyContent="space-between" gap="10px">
              {requirementTypes.map((it) => {
                return (
                  <Box
                    key={it.type}
                    background="rgba(255,255,255,0.05)"
                    position="relative"
                    padding="10px 20px"
                    borderRadius={4}
                    cursor="pointer"
                    _hover={{ background: 'rgba(255,255,255,0.9)', color: '#7551FF' }}
                    onClick={(e) => handleClick(it)}
                  >
                    {selectType === it.type && (
                      <i className={styles.selected}>
                        <IoCheckmarkOutline fontSize={18} className={styles.checkIcon} />
                      </i>
                    )}
                    <Box className={styles[it.type]}>
                      <Text fontSize={14} fontWeight="bold">
                        {it.title}
                      </Text>
                      <Text fontSize={12}>{it.desc}</Text>
                    </Box>
                  </Box>
                );
              })}
            </Flex>
            <Box margin="20px 0">
              <Link href={`/myrequirement/${selectType}`}>
                <Button background="#7551FF" size="md" borderRadius={4}>
                  Next Step
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Box>
    </AdminLayout>
  );
}

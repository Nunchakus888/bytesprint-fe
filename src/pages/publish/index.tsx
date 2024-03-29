import { Box, Button, Flex, Portal, Text } from '@chakra-ui/react';
import Back from 'components/back';
import { requirementTypes } from 'hooks/myrequirements/add';
import { useState } from 'react';
import styles from './index.module.scss';
import { IoCheckmarkOutline } from 'react-icons/io5';
import Link from 'next/link';
import Navbar from 'components/navbar/Navbar';
import { IPath, RequirementType } from 'common/constant';
import { onWarmToast } from 'common/utils/toast';

export default function Index() {
  const [selectType, setSelectType] = useState('single');
  // 选中
  const handleClick = (it: (typeof requirementTypes)[0]) => {
    if (it.value !== RequirementType.Single) {
      onWarmToast('Coming soon');
      return false;
    }
    setSelectType(it.type);
  };

  return (
    <>
      <Box position="relative">
        <Box
          className={styles.content}
          marginTop="20px"
          background="#1b1e24"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Flex direction="column" alignItems="center" gap={20}>
            <Text color="#fff" fontSize={20} fontWeight="bold">
              Select Requirement Type
            </Text>
            <Flex justifyContent="space-between" gap="10px" width="97%">
              {requirementTypes.map((it) => {
                return (
                  <Box
                    key={it.type}
                    background="rgb(15, 17, 20)"
                    position="relative"
                    padding="10px 20px"
                    borderRadius={4}
                    cursor="pointer"
                    _hover={{ background: 'rgba(255,255,255,0.1)', color: '#7551FF' }}
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
    </>
  );
}

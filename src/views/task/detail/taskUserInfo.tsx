import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { shortAddress } from 'common/utils';
import WalletAvatar from 'components/WalletAvatar';
import { useCallback, useMemo } from 'react';

import styles from './index.module.scss';
export default function TaskUserInfo(props: { title: string; userInfo: any }) {
  const { title, userInfo } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      width="320px"
      paddingBottom="20px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        {title}
      </Text>
      <Box marginTop="20px">
        <Flex>
          {userInfo?.address && <WalletAvatar value={userInfo?.address} size={50} />}
          <Flex direction="column" marginLeft="20px">
            <Box
              fontSize={16}
              width="200px"
              whiteSpace="nowrap"
              overflow={'hidden'}
              textOverflow="ellipsis"
            >
              {userInfo?.data?.nickname}
            </Box>
            <Text marginTop="10px" fontSize={12}>
              {shortAddress(userInfo?.address)}
            </Text>
          </Flex>
        </Flex>
        {userInfo?.data?.engineer?.phone && (
          <Text marginTop="20px" fontSize={16}>
            Contact Number：{userInfo?.data?.engineer.phone}
          </Text>
        )}
        {userInfo?.data?.engineer?.email && (
          <Text marginTop="10px" fontSize={16}>
            Email：{userInfo.data.engineer.email}
          </Text>
        )}
      </Box>
    </Box>
  );
}

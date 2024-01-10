import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import WalletAvatar from 'components/WalletAvatar';
import { useCallback, useMemo } from 'react';
import { shortAddress } from 'utils';
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
      width="300px"
      paddingBottom="20px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        {title}
      </Text>
      <Box marginTop="20px">
        <Flex>
          <WalletAvatar value={userInfo.address} size={50} />
          <Flex direction="column" marginLeft="20px">
            <Box
              fontSize={16}
              width="200px"
              whiteSpace="nowrap"
              overflow={'hidden'}
              textOverflow="ellipsis"
            >
              {userInfo.data.nickname}
            </Box>
            <Text marginTop="10px" fontSize={12}>
              {shortAddress('0xA8f6eEe0bC6b6cDB9eDE7B96b3c13f4BD6502C62')}
            </Text>
          </Flex>
        </Flex>
        <Text marginTop="20px" fontSize={16}>
          Contact Number：15195451161
        </Text>
        {userInfo.email && (
          <Text marginTop="10px" fontSize={16}>
            Email：{userInfo.email}
          </Text>
        )}
      </Box>
    </Box>
  );
}

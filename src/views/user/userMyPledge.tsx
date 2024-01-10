import { Box, Text, Flex, Image, Tag } from '@chakra-ui/react';
import { IStatus, PledgeStatus } from 'common/utils/constant';
import styles from './index.module.scss';

export default function UserMyPledge(props: { data: any[] }) {
  const { data } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      height="500px"
      overflow="scroll"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        My Pledge
      </Text>
      <Box justifyContent="center" margin="20px 0" width="100%">
        {data.map((it, index) => {
          return (
            <Flex
              key={`ex_${index}`}
              justifyContent="flex-start"
              gap="30px"
              background="rgba(255,255,255,0.05)"
              borderRadius={4}
              margin="10px 0"
              padding="30px 25px"
            >
              <Flex
                justifyContent="center"
                fontSize={12}
                textAlign="center"
                alignItems="center"
                width="60px"
                minWidth="60px"
                height="60px"
                borderRadius={4}
                background="#7551FF"
              >
                Task Contract
              </Flex>
              <Flex direction="column" gap="10px" minWidth="150px">
                <Box>
                  <Text whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    {it.taskName}
                  </Text>
                </Box>
                <Flex gap="10px">
                  <Text fontSize={14}>Task Status</Text>{' '}
                  <Text fontSize={14}>
                    {it.taskStatus === 1 ? `Pending Contract` : `Completed`}
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  <Text fontSize={14}>{it.stakingAmount} USDT</Text>
                </Box>
                {/* <Flex gap="10px"><Text>约合</Text> <Text>4380.00 CNY</Text></Flex> */}
              </Flex>
              <Flex direction="column" gap="10px">
                {/* @ts-ignore*/}
                <Box>
                  <Text fontSize={14}>{PledgeStatus[+it.status]}</Text>
                </Box>
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  <Text fontSize={14} className={it.status === 3 ? styles.active : ''}>
                    Withdraw to Wallet
                  </Text>
                </Box>
              </Flex>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}

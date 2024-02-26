import { Box, Text, Flex, Image, Tag } from '@chakra-ui/react';
import { IStatus, PledgeStatus, TaskStatus } from 'common/constant';
import { useWithdraw } from 'hooks/user';
import styles from './index.module.scss';

export default function UserMyPledge(props: { data: any[]; refresh: () => void }) {
  const { data, refresh } = props;
  const { stakingWithdraw } = useWithdraw();
  const handleWithdraw = async (item: any) => {
    if (item.stakingStatus !== 3) return;
    const isSuccess = await stakingWithdraw(item);
    if (isSuccess) {
      refresh();
    }
  };
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
      width="100%"
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
              justifyContent="space-between"
              alignItems="center"
              gap="10px"
              background="#1b1e24"
              borderRadius={4}
              margin="10px 0"
              padding="30px 25px"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                width="60px"
                minWidth="60px"
                height="60px"
                borderRadius={4}
                background="#7551FF"
                fontSize="10px"
              >
                Task Contract
              </Flex>
              <Flex direction="column" gap="5px">
                <Box>
                  <Text fontSize="12px">{it.taskName}</Text>
                </Box>
                <Flex gap="5px">
                  <Text fontSize="10px" whiteSpace="nowrap">
                    Task Status
                  </Text>
                  {/* @ts-ignore */}
                  <Text fontSize="10px">{TaskStatus[it.taskStatus]}</Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  <Text fontSize="12px">{it.stakingAmount} USDT</Text>
                </Box>
                {/* <Flex gap="10px"><Text>约合</Text> <Text>4380.00 CNY</Text></Flex> */}
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  {/* @ts-ignore */}
                  <Text fontSize="12px">{PledgeStatus[it.stakingStatus]}</Text>
                </Box>
              </Flex>
              <Flex direction="column" gap="10px">
                <Box>
                  <Text
                    fontSize="12px"
                    opacity={it.stakingStatus === 3 ? 1 : 0.6}
                    onClick={() => handleWithdraw(it)}
                  >
                    Withdraw to Wallet
                  </Text>
                </Box>
              </Flex>
            </Flex>
          );
        })}
        {data?.length === 0 && (
          <Flex justifyContent="center" alignItems="center">
            No data
          </Flex>
        )}
      </Box>
    </Box>
  );
}

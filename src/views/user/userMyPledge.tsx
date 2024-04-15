import { Box, Text, Flex, Image, Tag, Tooltip } from '@chakra-ui/react';
import classNames from 'classnames';
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
      overflowX="hidden"
      width="100%"
      className={classNames('raw-scrollbar', styles.container)}
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
                fontSize="14px"
              >
                Contract
              </Flex>
              <Flex direction="column" gap="5px">
                <Box maxWidth="200px">
                  <Text className={styles.textOverflow} fontSize="16px">
                    {it.taskName}
                  </Text>
                </Box>
                <Flex gap="5px">
                  <Text fontSize="14px" whiteSpace="nowrap">
                    Task Status
                  </Text>
                  {/* @ts-ignore */}
                  <Text fontSize="14px">
                    {TaskStatus.filter((v) => v.value === it.taskStatus)[0]?.label}
                  </Text>
                </Flex>
              </Flex>
              <Flex fontSize="16px" direction="column" gap="10px">
                <Box>
                  <Text>{it.stakingAmount} USDT</Text>
                </Box>
                {/* <Flex gap="10px"><Text>约合</Text> <Text>4380.00 CNY</Text></Flex> */}
              </Flex>
              {/* <Flex direction="column" gap="10px">
                <Box>
                  <Text fontSize="12px">{PledgeStatus[it.stakingStatus]}</Text>
                </Box>
              </Flex> */}
              <Flex direction="column" gap="10px">
                <Box>
                  {/* @ts-ignore */}
                  <Tooltip label={PledgeStatus[it.stakingStatus]}>
                    <Text
                      fontSize="16px"
                      opacity={it.stakingStatus === 3 ? 1 : 0.6}
                      onClick={() => handleWithdraw(it)}
                    >
                      Withdraw to Wallet
                    </Text>
                  </Tooltip>
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

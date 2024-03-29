import styles from './index.module.scss';
import { Box, Text, Flex, Button, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import { GoLinkExternal } from 'react-icons/go';
import { PledgeStatus, TaskStatus } from 'common/constant';
import { useWithdraw } from 'hooks/user';

export default function UserMyReward(props: { data: any[]; refresh: () => void }) {
  const { data, refresh } = props;
  const { rewardWithdraw } = useWithdraw();
  const handleWithdraw = async (item: any) => {
    if (item.rewardStatus !== 3) return;
    const isSuccess = await rewardWithdraw(item);
    if (isSuccess) {
      refresh();
    }
  };
  return (
    <Box
      display="flex"
      flex={1}
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
        My Rewards
      </Text>
      <Box justifyContent="center" margin="20px 0" width="100%">
        {data.map((it, index) => {
          return (
            <Flex
              key={`ex_${index}`}
              justifyContent="space-between"
              alignItems="center"
              gap="10px"
              background="#18191F"
              borderRadius={4}
              margin="10px 0"
              padding="30px 25px"
            >
              <Flex direction="column" gap="5px">
                <Box maxWidth="200px">
                  <Text className={styles.textOverflow} fontSize="16px" color="#7B7E8F">
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
              {/* <Flex direction="column" gap="10px">
                <Link href={'./'}>
                  <Text color="#7B7E8F" className="flex items-center underline">
                    0x81Aa...fd3817 <GoLinkExternal className="ml-2" />
                  </Text>
                </Link>
                <Button size={'sm'} className="btn-primary">
                  Withdraw {'>'}
                </Button>
              </Flex> */}
              <Flex fontSize="16px" direction="column" gap="10px">
                <Box>
                  <Text>{it.rewardAmount} USDT</Text>
                </Box>
              </Flex>

              {/* <Flex direction="column" gap="10px">
                <Box>
                  <Text fontSize="16px">{PledgeStatus[it.rewardStatus]}</Text>
                </Box>
              </Flex> */}
              <Flex direction="column" gap="10px">
                <Box>
                  {/* @ts-ignore */}
                  <Tooltip label={PledgeStatus[it.stakingStatus]}>
                    <Text
                      fontSize="16px"
                      opacity={it.rewardStatus === 3 ? 1 : 0.6}
                      onClick={() => handleWithdraw(it)}
                    >
                      Withdraw
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

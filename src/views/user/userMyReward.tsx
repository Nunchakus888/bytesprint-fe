import styles from './index.module.scss';
import { Box, Text, Flex, Button, Tag } from '@chakra-ui/react';
import Link from 'next/link';
import { GoLinkExternal } from 'react-icons/go';
import { PledgeStatus, TaskStatus } from 'common/constant';
import { useWithdraw } from 'hooks/user';
import classNames from 'classnames';

export default function UserMyReward(props: { data: any[]; refresh: () => void }) {
  // test
  // const res = {
  //   result: {
  //     code: 0,
  //     message: '',
  //   },
  //   stakings: [
  //     {
  //       stakingId: 4,
  //       rewardStatus: 1,
  //       rewardAmount: 600,
  //       projectId: 14,
  //       taskName: 'new test bella Employer 0320',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 13,
  //       rewardStatus: 1,
  //       rewardAmount: 100,
  //       projectId: 27,
  //       taskName: 'Test By Eason 0331',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 14,
  //       rewardStatus: 1,
  //       rewardAmount: 10,
  //       projectId: 25,
  //       taskName: 'Law Firm Business Management System App',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 15,
  //       rewardStatus: 1,
  //       rewardAmount: 10,
  //       projectId: 28,
  //       taskName: 'task101',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 20,
  //       rewardStatus: 1,
  //       rewardAmount: 1000,
  //       projectId: 30,
  //       taskName: 'wtttest',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 29,
  //       rewardStatus: 1,
  //       rewardAmount: 1,
  //       projectId: 39,
  //       taskName: 'bella test3  1122',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 32,
  //       rewardStatus: 1,
  //       rewardAmount: 10,
  //       projectId: 34,
  //       taskName: 'bella 3 0402',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 33,
  //       rewardStatus: 1,
  //       rewardAmount: 112,
  //       projectId: 40,
  //       taskName: 'School scheduling system and item management system',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 39,
  //       rewardStatus: 1,
  //       rewardAmount: 0,
  //       projectId: 25,
  //       taskName: 'Law Firm Business Management System App',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 40,
  //       rewardStatus: 1,
  //       rewardAmount: 0,
  //       projectId: 25,
  //       taskName: 'Law Firm Business Management System App',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 41,
  //       rewardStatus: 1,
  //       rewardAmount: 0,
  //       projectId: 25,
  //       taskName: 'Law Firm Business Management System App',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 42,
  //       rewardStatus: 1,
  //       rewardAmount: 0,
  //       projectId: 25,
  //       taskName: 'Law Firm Business Management System App',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 43,
  //       rewardStatus: 1,
  //       rewardAmount: 0,
  //       projectId: 25,
  //       taskName: 'Law Firm Business Management System App',
  //       taskStatus: -1,
  //     },
  //     {
  //       stakingId: 44,
  //       rewardStatus: 1,
  //       rewardAmount: 0,
  //       projectId: 25,
  //       taskName: 'Law Firm Business Management System App',
  //       taskStatus: -1,
  //     },
  //   ],
  // };
  // const data = res.stakings;
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
        My Reward
      </Text>
      <Box justifyContent="center" margin="20px 0" width="100%">
        {data.map((it, index) => {
          return (
            <Flex
              key={`ex_${index}`}
              justifyContent="space-between"
              gap="10px"
              background="rgba(255,255,255,0.06)"
              borderRadius={4}
              margin="10px 0"
              padding="40px 15px 20px"
              position="relative"
            >
              <Flex direction="column" gap="30px">
                <Text className={styles.itemContent} height="50px" fontSize="18px" fontWeight="600">
                  {it.taskName}
                </Text>
                <Box mt="20px">
                  <Tag className={styles.itemStatus}>{PledgeStatus[it.rewardStatus]}</Tag>
                </Box>
              </Flex>

              <Flex direction="column" gap="50px" justifyContent="space-between">
                <Text textAlign="right" fontWeight="bold">
                  {it.rewardAmount} USDT
                </Text>
                <Button
                  borderRadius="20px"
                  onClick={() => handleWithdraw(it)}
                  disabled={it.rewardStatus === 3 ? false : true}
                  backgroundColor={it.rewardStatus === 3 ? '#7551ff' : '#111C43'}
                  height="35px"
                >
                  Withdraw to Wallet<span className="font-20">{'>'}</span>
                </Button>
              </Flex>
              <Tag className={styles.uTag}>Task compensation</Tag>
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

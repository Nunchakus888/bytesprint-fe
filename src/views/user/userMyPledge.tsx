import { Box, Text, Flex, Image, Tag, Tooltip, Button } from '@chakra-ui/react';
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
              background="rgba(255,255,255,0.06)"
              borderRadius={4}
              margin="10px 0"
              padding="40px 15px 20px"
              position="relative"
            >
              <Flex direction="column" gap="10px" width="60%">
                <Text className={styles.textOverflow} fontSize="18px" fontWeight="600">
                  {it.taskName}
                </Text>
                <Flex gap="5px" fontSize="14px">
                  <Text color="#999">Task Status:</Text>
                  {TaskStatus.filter((v) => v.value === it.taskStatus)[0]?.label}
                </Flex>
                <Box mt="20px">
                  <Tag className={styles.itemStatus}>{PledgeStatus[it.stakingStatus]}</Tag>
                </Box>
              </Flex>
              <Flex direction="column" gap="50px" justifyContent="space-between">
                <Text textAlign="right" fontWeight="bold">
                  {it.stakingAmount} USDT
                </Text>
                <Button
                  borderRadius="20px"
                  onClick={() => handleWithdraw(it)}
                  disabled={it.stakingStatus === 3 ? false : true}
                  backgroundColor={it.stakingStatus === 3 ? '#7551ff' : '#111C43'}
                  height="35px"
                >
                  Withdraw to Wallet<span className="font-20">{'>'}</span>
                </Button>
              </Flex>
              <Tag className={styles.uTag}>Task evaluation</Tag>
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

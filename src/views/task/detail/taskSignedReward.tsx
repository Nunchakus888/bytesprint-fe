import { Box, Text } from '@chakra-ui/react';
import styles from './index.module.scss';
import dayjs from 'dayjs';
import { IStatus, TaskBidStatus } from 'common/constant';
export default function TaskSignedReward(props: { recordList: any[] }) {
  const { recordList } = props;
  const signedRecord = recordList?.filter((v) => v.signStatus === TaskBidStatus.BID_SUCCESS)?.[0];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      width="320px"
      height="150px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        Sign Rewards
      </Text>
      <Box marginTop="20px">
        <Text fontSize={16} whiteSpace="nowrap" display="flex">
          <Text>Total Rewards：</Text>
          {signedRecord.totalCost} USDT
        </Text>
        <Text marginTop="10px" fontSize={16} whiteSpace="nowrap">
          Estimated Completion Time：{dayjs(+signedRecord.finishTime).format('YYYY/MM/DD')}
        </Text>
      </Box>
    </Box>
  );
}

import { Box, Text } from "@chakra-ui/react";
import styles from './index.module.scss'
import dayjs from 'dayjs'
export default function TaskSignedReward(props:{
  totalUsdt: string
  completeTime: number
}) {
  const { totalUsdt, completeTime} = props
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      width="300px"
      height="150px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">签约报酬</Text>
      <Box marginTop="20px">
        <Text fontSize={16} whiteSpace="nowrap" display="flex"><Text letterSpacing="5px">报  酬  合  计：</Text>{totalUsdt.toString()} USDT</Text>
        <Text marginTop="10px" fontSize={16} >预计完成时间：{dayjs(completeTime).format('YYYY/MM/DD')}</Text>
      </Box>
    </Box>
  )
}
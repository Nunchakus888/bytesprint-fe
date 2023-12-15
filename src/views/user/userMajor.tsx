
import { Avatar, Box,Button,Flex,Tag,Text } from "@chakra-ui/react";
import { IPath } from "utils/constant";
import styles from './index.module.scss'

export default function UserMajor(props: {
  from: IPath
}) {
  return <Box
  display="flex"
  flexDirection="column"
  alignItems="flex-start"
  justifyContent="flex-start"
  position="relative"
  marginTop="20px"
  paddingBottom="20px"
  height="50px"
  className={styles.container}
  >
    <Flex justifyContent="space-around" alignItems="center">
      <Box className={styles.numsIcon}><Text>10人以内</Text></Box>
      <Box className={styles.positionIcon}><Text>信息传输、软件和信息技术服务业 / 软件和信息技术服务业</Text></Box>
    </Flex>
  </Box>
}
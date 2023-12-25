
import { Avatar, Box,Button,Flex,Tag,Text } from "@chakra-ui/react";
import { IPath } from "utils/constant";
import styles from './index.module.scss'

export default function UserMajor(props: {
  from: IPath,
  isEngineer?: boolean
  isOperator?:boolean
}) {
  const {from="", isOperator, isEngineer} = props
  // const from = IPath.ENGINEERManage
  return <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-around"
    position="relative"
    marginTop="20px"
    paddingBottom="20px"
    height="150px"
    className={styles.container}
    >
    {/* Navigator */}
    {
      from.includes(IPath.OPERATOR) || isOperator && 
      <Flex justifyContent="space-around" alignItems="center" width="100%">
        <Box className={styles.numsIcon}><Text>10人以内</Text></Box>
        <Box className={styles.positionIcon}><Text>信息传输、软件和信息技术服务业 / 软件和信息技术服务业</Text></Box>
    </Flex>
    }

    {
      from.includes(IPath.ENGINEERManage) || isEngineer && 
      <Flex justifyContent="space-around" alignItems="center" width="100%" direction="row" className={styles.itemKeyInfo}>
        <Box className={styles.experience}>1年经验</Box>
        <Box className={styles.educational}>大专</Box>
        <Box className={styles.phone}>86+15195451161</Box>
        <Box className={styles.workTime}>lipeibina@outlook.com</Box>
        <Box className={styles.workPlace}>中国-江苏省-苏州市-姑苏区</Box>
      </Flex>
    }
  </Box>
}
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"
import { useCallback, useMemo } from "react"
import { shortAddress } from "utils"
import styles from './index.module.scss'
export default function TaskUserInfo(props:{
  title: string
  userInfo: any
}) {
  const {title, userInfo} = props
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      width="300px"
      paddingBottom="20px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">{title}</Text>
      <Box marginTop="20px">
        <Flex>
          <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' />
          <Flex direction="column" marginLeft="20px">
            <Text fontSize={16} >用户昵称A</Text>
            <Text marginTop="10px" fontSize={12} >{shortAddress('0xA8f6eEe0bC6b6cDB9eDE7B96b3c13f4BD6502C62')}</Text>
          </Flex>
        </Flex>
        <Text marginTop="20px" fontSize={16}>联系电话：15195451161</Text>
        {userInfo.email && <Text marginTop="10px" fontSize={16}>电子邮箱：lipeibina@outlook.com</Text>}
      </Box>
    </Box>
  )
}
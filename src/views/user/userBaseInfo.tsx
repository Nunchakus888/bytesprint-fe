import { Avatar, Box,Button,Flex,Link,Tag,Text } from "@chakra-ui/react";
import Copy from "components/copy";
import { useUserInfo } from "hooks/user";
import { Identification, IPath } from "utils/constant";
import styles from './index.module.scss'
export default function UserBaseInfo(props: {
  from: IPath,
  data: any, // 信息
  isEngineer?: boolean
  isOperator?: boolean
}) {
  const {from, isEngineer,isOperator} = props
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      gap="20px"
      className={styles.container}
      >
      <Avatar size="xl" name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' />
      <Flex alignItems="center" gap="10px">
        <Text fontSize={24} fontWeight="bold">上海奇石信息技术有限公司</Text>
        {from === IPath.PROFILE && <Link fontSize={16} color="#7551FF" fontWeight="bold" onClick={() => {}}>修改</Link>}
      </Flex>

      {/* Navigator 审核 */}
      {/* {from === IPath.OperatorCheck && <Box background="#7551FF" padding="10px 20px" color="#fff" borderRadius={4}>珍珠号 · 一年有效期</Box>} */}
      
      {/* 我的Navigator 详情 */}
      {/* {from === IPath.MYOPERATORDetail && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          Navigator
        </Tag>
        <Flex alignItems="center" justifyContent="center" gap="20px">
          <Box><Text>到期：2024/11/24</Text></Box>
          <Flex justifyContent="center" gap="10px">
            <Text>授权码：</Text>
            <Text color="#7551FF" marginLeft="10px">BTYD32423942</Text>
            <Copy text="BTYD32423942"></Copy>
          </Flex>
        </Flex>
        <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>珍珠号</Box>
      </>} */}
      
      {/* Tasker审核详情 */}
      {/* {from === IPath.ENGINEERCheck && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          Tasker
        </Tag>
        <Flex gap="20px">
        <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>前端开发工程师</Box>
        <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box>
        </Flex>
      </>} */}
      
      {/* TODO Tasker有3个等级 */}
      {/* 我的Tasker 详情 */}
      {/* {from === IPath.MYENGINEERDetail && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          Tasker
        </Tag>
        <Flex alignItems="center" justifyContent="center" gap="20px">
          <Box><Text>等级：Tasker</Text></Box>
          <Box><Text>Navigator：上海奇石信息技术有限公司</Text></Box>
        </Flex>
        <Flex gap="20px">
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>前端开发工程师</Box>
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box>
        </Flex>
      </>} */}
      
      {/* 用户中心 */}
      {from === IPath.PROFILE && <>
        <Tag size="lg" padding="10px 20px" variant='solid' background='rgba(255,255,255,0.05)'>  
          {isEngineer ? `Tasker`: isOperator ? `Navigator`: `Regular User`}
        </Tag>
        {/* Tasker */}
        {isEngineer && <>
        <Flex alignItems="center" justifyContent="center" gap="20px">
          <Box><Text>Level：Tasker</Text></Box>
          <Box><Text>Navigator：上海奇石信息技术有限公司</Text></Box>
        </Flex>
        <Flex gap="20px">
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>前端开发工程师</Box>
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box>
        </Flex>
        </>}
        {/* Navigator */}
        {/* {identification === Identification.OPERATOR && <Flex alignItems="center" justifyContent="center" gap="20px">
          <Box><Text>到期：2024/11/24</Text></Box>
          <Flex justifyContent="center" gap="10px">
            <Text>授权码：</Text>
            <Text color="#7551FF" marginLeft="10px">BTYD32423942</Text>
            <Copy text="BTYD32423942"></Copy>
          </Flex>
        </Flex>} */}

        {!(isEngineer || isOperator) && <Flex gap="20px">
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Tasker Certification</Box>
          {/* <Text>or</Text>
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box> */}
        </Flex>}
      </>}
    </Box>
  )
}
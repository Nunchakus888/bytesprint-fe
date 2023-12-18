import { Avatar, Box,Button,Flex,Tag,Text } from "@chakra-ui/react";
import Copy from "components/copy";
import { IPath } from "utils/constant";
import styles from './index.module.scss'
export default function UserBaseInfo(props: {
  from: IPath,
  data: any // 信息
}) {
  const {from} = props
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
      <Text fontSize={24} fontWeight="bold">上海奇石信息技术有限公司</Text>

      {/* 船长 审核 */}
      {from === IPath.OperatorCheck && <Box background="#7551FF" padding="10px 20px" color="#fff" borderRadius={4}>珍珠号 · 一年有效期</Box>}
      
      {/* 我的船长 详情 */}
      {from === IPath.MYOPERATORDetail && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          船长
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
      </>}
      
      {/* 水手审核详情 */}
      {from === IPath.ENGINEERCheck && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          水手
        </Tag>
        <Flex gap="20px">
        <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>前端开发工程师</Box>
        <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box>
        </Flex>
      </>}
      
      {/* TODO 水手有3个等级 */}
      {/* 我的水手 详情 */}
      {from === IPath.MYENGINEERDetail && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          水手
        </Tag>
        <Flex alignItems="center" justifyContent="center" gap="20px">
          <Box><Text>等级：水手</Text></Box>
          <Box><Text>船长：上海奇石信息技术有限公司</Text></Box>
        </Flex>
        <Flex gap="20px">
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>前端开发工程师</Box>
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box>
        </Flex>
      </>}
    </Box>
  )
}
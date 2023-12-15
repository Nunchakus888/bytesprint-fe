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
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      className={styles.container}
      >
      <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' />
      <Text fontSize={16} >上海奇石信息技术有限公司</Text>

      {/* 船长 审核 */}
      {from === IPath.OperatorCheck && <Button background="#7551FF" size='md' color="#fff">珍珠号 · 一年有效期</Button>}
      
      {/* 我的船长 详情 */}
      {from === IPath.MYOPERATORDetail && <>
        <Tag size="lg" padding="10px" variant='solid' background='rgba(255,255,255,0.05)'>  
          船长
        </Tag>
        <Flex>
          <Box><Text>到期：2024/11/24</Text></Box>
          <Box>
            <Text>授权码：</Text>
            <Text color="#7551FF" marginLeft="10px">BTYD32423942</Text>
            <Copy text="BTYD32423942"></Copy>
          </Box>
          <Button background="#7551FF" size='md' color="#fff">珍珠号</Button>
        </Flex>
      </>}
      
      {/* 水手审核详情 */}
      {from === IPath.ENGINEERCheck && <>
        <Tag size="lg" padding="10px" variant='solid' background='rgba(255,255,255,0.05)'>  
          水手
        </Tag>
        <Flex>
          <Button background="#7551FF" size='md' color="#fff">前端开发工程师</Button>
          <Button background="#7551FF" size='md' color="#fff">Java开发工程师</Button>
        </Flex>
      </>}
      
      {/* TODO 水手有3个等级 */}
      {/* 我的水手 详情 */}
      {from === IPath.ENGINEERCheck && <>
        <Tag size="lg" padding="10px" variant='solid' background='rgba(255,255,255,0.05)'>  
          水手
        </Tag>
        <Flex>
          <Box><Text>等级：水手</Text></Box>
          <Box><Text>船长：上海奇石信息技术有限公司</Text></Box>
        </Flex>
        <Flex>
          <Button background="#7551FF" size='md' color="#fff">前端开发工程师</Button>
          <Button background="#7551FF" size='md' color="#fff">Java开发工程师</Button>
        </Flex>
      </>}
    </Box>
  )
}
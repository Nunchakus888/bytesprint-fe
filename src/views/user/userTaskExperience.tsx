import { Box, Text, Flex,Image, Tag } from "@chakra-ui/react";
import styles from './index.module.scss'

export default function UserTaskExperience(props: {
  data: any[]
}) {
  const {data} = props
  return <Box
  display="flex"
  flexDirection="column"
  alignItems="flex-start"
  justifyContent="flex-start"
  position="relative"
  marginTop="20px"
  paddingBottom="20px"
  className={styles.container}
  >
    <Text fontSize={18} fontWeight="bold">任务经历</Text>
    <Box justifyContent="center" margin="20px 0" width="100%">
      {
        data.map((it, index) => {
          return (
          <Flex key={`task_ex_${index}`} justifyContent="flex-start" direction="column" gap="30px" background="rgba(255,255,255,0.05)" borderRadius={4} margin="10px 0" padding="30px 25px">
            <Flex justifyContent="space-between">
              <Text fontSize={16} fontWeight="bold">公司官网页面的搭建</Text>
              <Text fontSize={16}>2023/09/24 - 2023/11/12</Text>
            </Flex>
            <Flex><Box background="#7551FF" padding="5px 10px" color="#fff" borderRadius={4}>前端开发工程师</Box></Flex>
            
            {/* 换2行 */}
            <Box className={styles.itemContent}>
              办公网络信息系统、基础环境进行维护、参数调整、巡检、检修，高效、优质的服务，确保...办公网络信息系统、基础环境进行维护、参数调整、巡检、检修，高...
            </Box>
          </Flex>
          )
        })
      }
    </Box>
</Box>
}
import { Box, Text, Flex,Image, Tag } from "@chakra-ui/react";
import styles from './index.module.scss'

export default function UserExperience(props: {
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
    <Text fontSize={18} fontWeight="bold">Work and Education Experience</Text>
    <Box justifyContent="center" margin="20px 0" width="100%">
      {
        data.map((it, index) => {
          return (
          <Flex key={`ex_${index}`} justifyContent="flex-start" gap="30px" background="rgba(255,255,255,0.05)" borderRadius={4} margin="10px 0" padding="30px 25px">
            <Flex justifyContent="center" alignItems="center" width="60px" height="60px" borderRadius={4} background="#F2F2F2">
              <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' width="30px" height="30px"/>
            </Flex>
            <Flex width="45%" direction="column" gap="10px">
              <Box><Text>苏州有农网络技术有限公司</Text></Box>
              <Flex gap="10px"><Text>产品部门</Text> · <Text>产品经理</Text></Flex>
            </Flex>
            <Flex justifyContent="flex-end" alignItems="flex-start">
              2021年6月 - 至今
            </Flex>
          </Flex>
          )
        })
      }
    </Box>
</Box>
}
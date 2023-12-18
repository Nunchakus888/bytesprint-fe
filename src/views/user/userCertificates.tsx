import { Box, Text, Flex,Image, Tag } from "@chakra-ui/react";
import styles from './index.module.scss'

export default function UserCertificates(props: {
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
    <Text fontSize={18} fontWeight="bold">资格证书</Text>
    <Box justifyContent="center" margin="20px 0" width="100%">
      {
        data.map((it, index) => {
          return (
          <Flex key={`ce_${index}`} justifyContent="flex-start" gap="30px" margin="20px 0">
            <Flex justifyContent="flex-start" alignItems="center" width="50%">
              <Box className={styles.filename} position="relative"><i style={{width: '20px', height: '20px', marginTop: '-10px'}}></i>资格证书名称资格证书名称</Box>
            </Flex>
            
            <Flex justifyContent="flex-end" alignItems="flex-start">
              2023/08/08 至 2023/08/08
            </Flex>
          </Flex>
          )
        })
      }
    </Box>
</Box>
}
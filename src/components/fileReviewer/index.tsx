import { Box, Flex, Link } from "@chakra-ui/react"
import styles from './index.module.scss'


export default function FileReviewer(props: {
  fileList: any[]
}) {
  const {fileList} = props
  return (
    <Box display="flex" flexDirection="column">
      {
        fileList?.map((it, index) => {
          return (
          <Flex key={index} justify="space-between" background="rgba(255,255,255,0.05)" marginBottom="10px" padding="10px" fontSize="14px">
            <Box className={styles.filename} position="relative"><i></i>需求描述文件.pdf</Box>
            <Box>200kb</Box>
            <Link color="#7551FF" fontWeight="bold"><a href="#">预览</a></Link>
          </Flex>
          )
        })
      }
    </Box>
  )
}
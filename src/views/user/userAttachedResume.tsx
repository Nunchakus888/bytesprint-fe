import { Box, Text, Flex,Image, Tag, Link } from "@chakra-ui/react";
import styles from './index.module.scss'

export default function UserAttachedResume(props: {
  data: {}
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
    <Text fontSize={18} fontWeight="bold">Attached Resume</Text>
    <Box justifyContent="center" margin="20px 0" width="100%">
      <Link href="#" target="_blank" color="#F59A23" fontSize={36}>XXXX的附件简历.pdf</Link>
      <Text margin="20px 0">2023-08-08 10:12:12 Update</Text>
      <Link fontSize={18} color="#7551FF" fontWeight="bold" onClick={() => {}} position="absolute" top="20px" right="40px">Preview</Link>
    </Box>
</Box>
}
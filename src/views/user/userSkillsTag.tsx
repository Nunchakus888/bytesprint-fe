import { Box, Text, Flex,Image, Tag } from "@chakra-ui/react";
import styles from './index.module.scss'

export default function UserSkillsTag() {
  return <Box
  display="flex"
  flexDirection="column"
  alignItems="flex-start"
  justifyContent="flex-start"
  position="relative"
  marginTop="20px"
  paddingBottom="20px"
  height="150px"
  className={styles.container}
  >
    <Text fontSize={18} fontWeight="bold">Skills Tags</Text>
    <Flex justifyContent="center" margin="20px 0" gap="50px">
      <Tag size="lg" variant="solid" background="#7551FF">
      Skills Tags
      </Tag>
      <Tag size="lg" variant="solid" background="#7551FF">
      Skills Tags
      </Tag>
      <Tag size="lg" variant="solid" background="#7551FF">
      Skills Tags
      </Tag>
    </Flex>
</Box>
}
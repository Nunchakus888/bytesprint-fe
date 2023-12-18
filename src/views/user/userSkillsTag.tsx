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
    <Text fontSize={18} fontWeight="bold">技能标签</Text>
    <Flex justifyContent="center" margin="20px 0" gap="50px">
      <Tag size="lg" variant="solid" background="#7551FF">
        技能标签
      </Tag>
      <Tag size="lg" variant="solid" background="#7551FF">
        技能标签
      </Tag>
      <Tag size="lg" variant="solid" background="#7551FF">
        技能标签
      </Tag>
    </Flex>
</Box>
}
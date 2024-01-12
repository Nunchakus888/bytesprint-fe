import { Box, Button, Flex, Tag, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import Link from 'next/link';
import { shortAddress } from 'common/utils';
import { IPath } from 'common/constant';
import styles from './index.module.scss';
export default function MyEngineerItem(props: { item: any }) {
  return (
    <Box className={styles.itemContainer}>
      <Flex justify="space-between" width="100%" position="relative">
        <Flex justify="space-between">
          <Box className={styles.imgbox}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <Flex justifyContent="center" gap="10px">
              <Tag size="md" background="#7551FF" padding="8px 10px" color="#fff" borderRadius={4}>
                前端开发工程师
              </Tag>
              <Tag size="md" background="#7551FF" padding="8px 10px" color="#fff" borderRadius={4}>
                前端开发工程师
              </Tag>
            </Flex>
            <Text margin="10px 0" fontSize={20}>
              User Name {shortAddress('0xA8f6eEe0bC6b6cDB9eDE7B96b3c13f4BD6502C62')}
            </Text>
            <Flex
              justifyContent="flex-start"
              gap="30px"
              alignItems="center"
              width="100%"
              direction="row"
              className={styles.itemKeyInfo}
            >
              <Box className={styles.experience}>1年经验</Box>
              <Box className={styles.educational}>大专</Box>
            </Flex>

            <Box display="flex" justifyContent="space-between" marginTop="10px">
              <Flex gap="10px">
                <Tag size="lg" padding="10px" variant="solid" background="rgba(255,255,255,0.05)">
                  Java
                </Tag>
                <Tag size="lg" padding="10px" variant="solid" background="rgba(255,255,255,0.05)">
                  Skills Tags
                </Tag>
              </Flex>
            </Box>
          </Box>
        </Flex>

        <Flex justifyContent="center" direction="column" alignItems="flex-start" gap="10px">
          <Flex justifyContent="center" gap="10px">
            <Text>2023-至今</Text>
            <Text>上海奇石信息技术有限公司 · Java开发工程师</Text>
          </Flex>
          <Flex justifyContent="center" gap="10px">
            <Text>2023-至今</Text>
            <Text>苏州大学 · 信息工程</Text>
          </Flex>
        </Flex>

        <Flex alignItems="flex-end">
          <Button width="100px" background="#7551FF" size="md" color="#fff">
            <Link href={`/${IPath.MYENGINEER}/11`}>查看详情</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

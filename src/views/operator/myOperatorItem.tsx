import { Box, Button, Flex, Tag, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import Link from 'next/link';
import { shortAddress } from 'common/utils';
import { IPath } from 'common/constant';
import styles from './index.module.scss';
export default function MyOperatorItem(props: { item: any }) {
  return (
    <Box className={styles.itemContainer}>
      <Flex justify="space-between" width="100%" position="relative">
        <Flex justify="space-between">
          <Box className={styles.imgbox}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
          <Box display="flex" flexDirection="column">
            <Box>
              <Tag size="lg" variant="solid" background="#7551FF" marginRight="10px">
                10人以内
              </Tag>
              <Tag size="lg" variant="solid" background="#7551FF" marginRight="10px">
                BTYD32423942
              </Tag>
            </Box>
            <Text margin="20px 0" fontSize={24}>
              上海奇石信息技术有限公司
            </Text>
            <Box display="flex" justifyContent="space-between">
              <Flex gap="10px">
                <Tag size="lg" padding="10px" variant="solid" background="#1b1e24">
                  珍珠号·1年有效期
                </Tag>
              </Flex>
            </Box>
          </Box>
        </Flex>

        <Flex direction="column" justifyContent="space-between" alignItems="flex-end">
          {/* 过期：红色字体 */}
          <Box fontSize={20}>到期时间：2023/11/12 10:12:12</Box>
          <Button width="100px" background="#7551FF" size="md" color="#fff">
            <Link href={`/${IPath.OPERATOR}/${IPath.MYOPERATOR}/11`}> Details</Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

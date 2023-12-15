import { Box, Button, Flex, Tag,Text } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'
import Link from "next/link"
import { shortAddress } from "utils"
import { IPath } from "utils/constant"
import styles from './index.module.scss'
export default function OperatorItem(props: {
	item: any
}) {
	return (
		<Box className={styles.itemContainer}>
        <Flex justify="space-between" width="100%" position="relative">
          <Flex justify="space-between" >
            <Box className={styles.imgbox}><Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' /></Box>
            <Box display="flex" flexDirection="column">
              <Box>
                <Tag size="lg" variant='solid' background='#7551FF' marginRight="10px">
                  10人以内
                </Tag>
              </Box>
              <Text margin="20px 0">用户昵称 {shortAddress('0xA8f6eEe0bC6b6cDB9eDE7B96b3c13f4BD6502C62')}</Text>
              <Box display="flex" justifyContent="space-between">
                <Flex gap="10px">
                  <Tag size="lg" padding="10px" variant='solid' background='rgba(255,255,255,0.05)'>
                    上海奇石信息技术有限公司
                  </Tag>
                  <Tag size="lg" padding="10px" variant='solid' background='rgba(255,255,255,0.05)'>
                    珍珠号·1年有效期
                  </Tag>
                </Flex>
              </Box>
            </Box>
          </Flex>

          <Flex direction="column" justifyContent="space-between" alignItems="flex-end">
            <Box fontSize={20}>提交时间：2023/11/12 10:12:12</Box>
            <Button width="100px" background="#7551FF" size='md' color="#fff">
              <Link href={`/taskdetail/${IPath.TASKS}/11`}> 认证审核</Link>
            </Button>
          </Flex>
        </Flex>
			
		</Box>
	)
}
import { Box, Button, Flex, Tag } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'
import Link from "next/link"
import styles from './index.module.scss'
export default function TaskItem(props: {
	item: any
}) {
	return (
		<Box className={styles.itemContainer}>
			<Flex justify="space-between">
				<Box className={styles.imgbox}><Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' /></Box>
				<Box display="flex" flexDirection="column">
					<Box>
						<Tag size="lg" variant='solid' background='#7551FF' marginRight="10px">
							普通任务
						</Tag>
						<Tag size="lg" variant='solid' background='#7551FF'>
							竞标
						</Tag>
					</Box>
					<p className={styles.itemTitle}>公司官网页面的搭建</p>
					<p className={styles.itemContent}>
						办公网络信息系统、基础环境进行维护、参数调整、巡检、检修，高效、优质的服务，确保办公网络信息系统、基础环境进行维护、参数调整、巡检、检修，高效、优质的服务，确保办公网络信息系统、基础环境进行维护、参数调整、巡检、检修，高效、优质的服务，确保
					</p>
					<Box className={styles.btns} display="flex" justifyContent="space-between">
						<Tag size="lg" variant='solid' background='rgba(255,255,255,0.05)'>
							前端开发
						</Tag>
						<Button background="#7551FF" size='md' color="#fff">
							<Link href='/task/11'> 查看详情</Link>
						</Button>
					</Box>
				</Box>
			</Flex>
		</Box>
	)
}
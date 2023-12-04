import { Box, Button, Flex, Tag } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'
import Link from "next/link"
import styles from './index.module.scss'
export default function PersonTaskItem(props: {
	item: any
}) {
	return (
		<Box className={styles.personItemContainer}>
			<Flex justify="space-between">
				<Box className={styles.imgbox}><Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' /></Box>
				<Box display="flex" flexDirection="column" width="-webkit-fill-available">
					<Box>
						<Tag size="lg" variant='solid' background='#7551FF' marginRight="10px">
							普通任务
						</Tag>
						<Tag size="lg" variant='solid' background='#7551FF'>
							竞标
						</Tag>
					</Box>
					
					<Box display="flex" justifyContent="space-between">
						<Flex direction="column">
							<p className={styles.itemTitle}>Java 开发工程师</p>
							<Flex direction="row" className={styles.itemKeyInfo} gap="30px">
								<div className={styles.educational}>
									大专以上
								</div>
								<div className={styles.experience}>
									经验不限
								</div>
								<div className={styles.workPlace}>
									远程办公
								</div>
								<div className={styles.workTime}>
									一个月以上
								</div>
							</Flex>
						</Flex>
						<Box fontSize={20}>10 - 15 USDT/hr</Box>
					</Box>
					
					<Box className={styles.btns} display="flex" justifyContent="space-between">
						<Tag size="lg" variant='solid' background='rgba(255,255,255,0.05)'>
							技能标签
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
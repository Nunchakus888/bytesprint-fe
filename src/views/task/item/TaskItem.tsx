import { Box, Button, Flex, Tag } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'
import Link from "next/link"
import { IPath, RequirementStatus, TaskStatus } from "utils/constant"
import styles from './index.module.scss'
export default function TaskItem(props: {
	item: any
	isMine?: boolean
	from?: string
}) {
	const {item} = props
	return (
		<Box className={styles.itemContainer}>
			<Flex justify="space-between" position="relative">
				
				<Box className={styles.imgbox}><Image src={`https://picsum.photos/200/250?random=${Math.ceil(Math.random() * 100)}`} alt={item.categoryName} /></Box>
				<Box display="flex" flexDirection="column">
					<Box>
						<Tag size="lg" variant='solid' background='#7551FF' marginRight="10px">
							{item.categoryName}
						</Tag>
						<Tag size="lg" variant='solid' background='#7551FF'>
							{item.crowdsourcingName}
						</Tag>
					</Box>
					<p className={styles.itemTitle}>{item.name}</p>
					<p className={styles.itemContent}>
						{item.description}
					</p>
					<Box className={styles.btns} display="flex" justifyContent="space-between">
						<Tag size="lg" variant='solid' background='rgba(255,255,255,0.05)'>
							{item.positionName}
						</Tag>
						<Button background="#7551FF" size='md' color="#fff">
							<Link href={`/taskdetail/${props.from || IPath.TASKS}/${item.id}`}> Details</Link>
						</Button>
					</Box>
				</Box>
				{props.isMine && props.from === IPath.MYREQUIREMENT
					 && <Tag position="absolute" top="0" right="0" fontSize={16} color="#7551FF" border="1px solid #7551FF" boxShadow="none"  variant='outline' size="md">{RequirementStatus.filter(it => it.value === item.status)[0]?.label}</Tag>
					
				}
				{props.isMine && props.from === IPath.MYTASKS
					 && <Tag position="absolute" top="0" right="0" fontSize={16} color="#7551FF" border="1px solid #7551FF" boxShadow="none"  variant='outline' size="md">{TaskStatus.filter(it => it.value === item.status)[0]?.label}</Tag>
				}
			</Flex>
		</Box>
	)
}
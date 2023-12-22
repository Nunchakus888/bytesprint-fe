import { Box, Button } from "@chakra-ui/react"
import { useUserInfo } from "hooks/user"
import Link from "next/link"
import { Identification } from "utils/constant"
import styles from './index.module.scss'


export default function Auth() {
	const {identification } = useUserInfo()
	return (
		<>
			{identification !== Identification.ENGINEER && <Box className={styles.auth}>
				<p>认证水手后可查看更多任务</p>
				<Button background="#7551FF" size='md' color="#fff">
					<Link href="/">认证水手</Link>
				</Button>
			</Box>
			}
		</>
	)
}
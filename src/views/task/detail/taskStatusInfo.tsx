import { Box, Button, Text } from "@chakra-ui/react"
import { useCallback, useMemo } from "react"
import { IPath, IStatus, RequirementStatus, TaskStatus } from "utils/constant"
import styles from './index.module.scss'
export default function TaskStatusInfo(props: {
  taskStatus: IStatus
  from: string,
  openTask?: () => void,
  closeTask?: () => void,
  acceptTask?: () => void,
  scheduleTask?: () => void,
  submitAccept?: () => void,
  withdrawMyRewards?: () => void,
}) {
  const {from, taskStatus} = props
  const statusTitle = useMemo(() => {
    if (from === IPath.MYREQUIREMENT) {
      return RequirementStatus.filter(it => it.value === taskStatus)[0]?.label
    }
    else if (from === IPath.MYTASKS) {
      return TaskStatus.filter(it => it.value === taskStatus)[0]?.label
    }
  }, [from, taskStatus])

  const action = useCallback(() => {
    if (from === IPath.MYREQUIREMENT) {
      switch(taskStatus) {
        case IStatus.CLOSED:
          return <Button className={styles.statusbtn} onClick={props?.openTask}>任务开放</Button>
          break;
        case IStatus.EVALUATION:
        case IStatus.WAIT_SIGN:
          return <Button className={styles.statusbtn} onClick={props?.closeTask}>关闭任务</Button>
          break;
        case IStatus.SIGNED:
          return <Text className={styles.statustext}>等待水手完善任务计划</Text>
          break;
        case IStatus.CODEING:
          return <Text className={styles.statustext}>水手正在做任务中...</Text>
          break;
        case IStatus.WAIT_ACCEPT:
          return <Button className={styles.statusbtn} onClick={props?.acceptTask}>我已验收</Button>
          break;
        case IStatus.COMPLETE:
          return <Button className={styles.statusbtn} >我已完成</Button>
          break;
        default:
          return <></>
          break;
      }
    }
    else if (from === IPath.MYTASKS) {
      switch(taskStatus) {
        case IStatus.WAIT_SIGN:
          return <Text>等待货主签约</Text>
          break;
        case IStatus.UN_BID:
          return <Box className={styles.unbid}></Box>
          break;
        case IStatus.SIGNED:
          return <Button onClick={props?.scheduleTask}>任务排期</Button>
          break;
        case IStatus.CODEING:
          return <Button onClick={props?.submitAccept}>提交验收</Button>
          break;
        case IStatus.WAIT_ACCEPT:
          return <Text>等待货主验收</Text>
          break;
        case IStatus.COMPLETE:
          return <Button onClick={props?.withdrawMyRewards}>提取我的报酬</Button>
          break;
        default:
          return <></>
          break;
      }
    }
  }, [from, taskStatus])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      marginTop="20px"
      width="300px"
      height="186px"
      className={styles.container}
    >
      <Text fontSize={24}>任务状态：{statusTitle}</Text>
      <Box marginTop="30px">{action()}</Box>
    </Box>
  )
}
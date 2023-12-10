import { Box, Button, Code, Container, Flex, Tag } from "@chakra-ui/react"
import Back from "components/back";
import FileReviewer from "components/fileReviewer";
import Loading from "components/loading";
import { useTaskDetail } from "hooks/task";
import { useMyTaskDetail, useMyTaskDetailStatusAction } from "hooks/task/detai";
import { useUserInfo } from "hooks/user";
import AdminLayout from "layouts/admin"
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Identification, IPath, IStatus, TaskBidStatus } from "utils/constant";
import Auth from "views/task/Auth";
import TaskBaseInfo from "views/task/detail/taskBaseInfo";
import TaskBidRecords from "views/task/detail/taskBidRecords";
import TaskDescription from "views/task/detail/taskDescription";
import TaskMovement from "views/task/detail/taskMovement";
import TaskSignedReward from "views/task/detail/taskSignedReward";
import TaskStatusInfo from "views/task/detail/taskStatusInfo";
import TaskUserInfo from "views/task/detail/taskUserInfo";
import Evaluate from "views/task/Evaluate";
import styles from '../index.module.scss';

const TaskDetail = () => {
  const router = useRouter();
  const { id = null } = router.query;
  console.log("TaskDetail>>>")

  // detail
  const {data, isLoading } = useMyTaskDetail(id)
  const {identification } = useUserInfo()
  const [isOpenEvaluate, setIsOpenEvaluate] = useState(false)
  const { scheduleTask, submitAccept, withdrawMyRewards } = useMyTaskDetailStatusAction(id)
  const isShowExtendTaskInfo = useMemo(() => {
    if ([IStatus.SIGNED, IStatus.CODEING,IStatus.WAIT_ACCEPT, IStatus.COMPLETE].includes(data.taskStatus)) {
      return true
    }
    return false
  }, [data.taskStatus])
  return (
    <AdminLayout>
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }} className={identification === Identification.VISITOR ? styles.visitor: ''}>
        <Back />
        {isLoading ? <Loading /> :
        <Box display="flex" gap="20px">
          <Flex direction="column">
            <TaskBaseInfo from={IPath.MYTASKS} setIsOpenEvaluate={setIsOpenEvaluate} />
            {/* TODO 待签约-我的投标； 其他： 投标记录 */}
            <TaskBidRecords from={IPath.MYTASKS} recordList={[{bidStatus: TaskBidStatus.BID_FAIL, id:"1"},{bidStatus: null, id:"2"}]} taskStatus={data.taskStatus} openRecordDetail={()=>{}}/>
            <TaskDescription />
          </Flex>
          <Flex direction="column">
            <TaskStatusInfo from={IPath.MYTASKS} taskStatus={data.taskStatus} scheduleTask={scheduleTask} submitAccept={submitAccept} withdrawMyRewards={withdrawMyRewards}/>
            {data.taskStatus !== IStatus.WAIT_SIGN && <TaskSignedReward totalUsdt={"1000.00"} completeTime={Date.now()}/>}
            <TaskUserInfo title="我的信息" userInfo={{}}/>
            <TaskMovement movementList={[{time: Date.now(), taskStatus: IStatus.CLOSED},{time: Date.now(), taskStatus: IStatus.EVALUATION},{time: Date.now(), taskStatus: IStatus.WAIT_SIGN},{time: Date.now(), taskStatus: IStatus.CLOSED}]}/>
          </Flex>
        </Box>
        }
        <Auth />
      </Box>

      {isOpenEvaluate && <Evaluate isOpen={isOpenEvaluate} onClose={() => setIsOpenEvaluate(false)}></Evaluate>}
    </AdminLayout>
  )
}

export default TaskDetail
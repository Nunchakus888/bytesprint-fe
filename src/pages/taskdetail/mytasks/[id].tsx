import { Box, Button, Code, Container, Flex, Tag } from "@chakra-ui/react"
import Back from "components/back";
import FileReviewer from "components/fileReview";
import Loading from "components/loading";
import { useMyTaskDetail, useMyTaskDetailStatusAction } from "hooks/mytasks/detail";
import { useTaskDetail } from "hooks/task";
import { useTaskPlanList } from "hooks/task/detai";
import { useUserInfo } from "hooks/user";
import AdminLayout from "layouts/admin"
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Identification, IPath, IStatus, TaskBidStatus } from "utils/constant";
import Auth from "views/task/Auth";
import TaskBaseInfo from "views/task/detail/taskBaseInfo";
import TaskBidRecords from "views/task/detail/taskBidRecords";
import TaskDescription from "views/task/detail/taskDescription";
import TaskEvaluateDetail from "views/task/detail/taskEvaluateDetail";
import TaskMovement from "views/task/detail/taskMovement";
import TaskPlanList from "views/task/detail/taskPlanList";
import TaskSchedule from "views/task/detail/taskSchedule";
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
  const { scheduleTask, startTask, submitAccept, withdrawMyRewards, getTaskEvaluateInfo } = useMyTaskDetailStatusAction(id)
  // 打开任务排期
  const [openschedule, setSchedule] = useState(false)
  const [scheduledata, setScheduledata] = useState([])
  useEffect(() => {
    if (openschedule) {
      getTaskEvaluateInfo().then(res => {
        setScheduledata(res)
      })
    }
  }, [openschedule])

  const isShowExtendTaskInfo = useMemo(() => {
    if ([IStatus.CODEING,IStatus.WAIT_ACCEPT, IStatus.COMPLETE].includes(data.taskStatus)) {
      return true
    }
    return false
  }, [data.taskStatus])
  // 任务计划列表
  const {data: planList, refresh, 
    openRecordDetailId,
    handleOpenRecordDetail,
    closeRecordDetail} = useTaskPlanList(id as string, isShowExtendTaskInfo)
  const { completePlanItem } = useMyTaskDetailStatusAction(id)
  // 完成任务计划
  const completePlan = async (planId: string) => {
    await completePlanItem(planId)
    refresh()
  }
  
  return (
    <AdminLayout>
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }} className={identification === Identification.VISITOR ? styles.visitor: ''}>
        <Back />
        {isLoading ? <Loading /> :
        <Box display="flex" gap="20px">
          <Flex direction="column">
            <TaskBaseInfo from={IPath.MYTASKS} />
            {isShowExtendTaskInfo && <TaskPlanList from={IPath.MYTASKS} completePlan={completePlan} planlist={planList}/>}
            {/* 待签约-我的投标； 其他： 投标记录 */}
            <TaskBidRecords from={IPath.MYTASKS} recordList={[{bidStatus: TaskBidStatus.BID_FAIL, id:"1"},{bidStatus: TaskBidStatus.BID_SUCCESS, id:"2"}]} taskStatus={data.taskStatus} openRecordDetail={handleOpenRecordDetail}/>
            <TaskDescription />
          </Flex>
          <Flex direction="column">
            <TaskStatusInfo from={IPath.MYTASKS} taskStatus={data.taskStatus} scheduleTask={() => setSchedule(true)} submitAccept={submitAccept} withdrawMyRewards={withdrawMyRewards}/>
            {data.taskStatus !== IStatus.WAIT_SIGN && <TaskSignedReward totalUsdt={"1000.00"} completeTime={1702545889368}/>}
            <TaskUserInfo title="我的信息" userInfo={{}}/>
            <TaskMovement movementList={[{time: 1702545889368, taskStatus: IStatus.CLOSED},{time: 1702545889368, taskStatus: IStatus.EVALUATION},{time: 1702545889368, taskStatus: IStatus.WAIT_SIGN},{time: 1702545889368, taskStatus: IStatus.CLOSED}]}/>
          </Flex>
        </Box>
        }
        <Auth />
        {openschedule && scheduledata.length && <TaskSchedule onClose={() => setSchedule(false)} taskId={id as string} scheduleTask={scheduleTask} startTask={startTask} scheduledata={scheduledata}/>}
        {openRecordDetailId && <TaskEvaluateDetail from={IPath.MYTASKS} recordId={openRecordDetailId} onClose={closeRecordDetail}/>}
      </Box>
    </AdminLayout>
  )
}

export default TaskDetail
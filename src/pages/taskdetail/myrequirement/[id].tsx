import { Box, Button, Code, Container, Flex, Tag } from "@chakra-ui/react"
import Back from "components/back";
import FileReviewer from "components/fileReview";
import Loading from "components/loading";
import { useMyRequirementDetail, useMyRequirementDetailStatusAction } from "hooks/myrequirements/detail";
import { useTaskDetail } from "hooks/task";
import { useTaskPlanList } from "hooks/task/detai";
import { useUserInfo } from "hooks/user";
import AdminLayout from "layouts/admin"
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Identification, IPath, IStatus, TaskBidStatus } from "utils/constant";
import Auth from "views/task/Auth";
import TaskBaseInfo from "views/task/detail/taskBaseInfo";
import TaskBidRecords from "views/task/detail/taskBidRecords";
import TaskDescription from "views/task/detail/taskDescription";
import TaskEvaluateDetail from "views/task/detail/taskEvaluateDetail";
import TaskMovement from "views/task/detail/taskMovement";
import TaskPlanList from "views/task/detail/taskPlanList";
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
  const {data, isLoading } = useMyRequirementDetail(id)
  const {identification } = useUserInfo()
  const [isOpenEvaluate, setIsOpenEvaluate] = useState(false)
  const { openTask, closeTask,
    acceptTask, signBid,unSignBid, openRecordDetail  } = useMyRequirementDetailStatusAction(id)
  
  const isShowExtendTaskInfo = useMemo(() => {
    if ([IStatus.SIGNED, IStatus.CODEING,IStatus.WAIT_ACCEPT, IStatus.COMPLETE].includes(data.taskStatus)) {
      return true
    }
    return false
  }, [data.taskStatus])
  // 任务计划列表
  const {data: planList,openRecordDetailId,
    handleOpenRecordDetail,
    closeRecordDetail} = useTaskPlanList(id as string, isShowExtendTaskInfo)
  return (
    <AdminLayout>
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }} className={identification === Identification.VISITOR ? styles.visitor: ''}>
        <Back />
        {isLoading ? <Loading /> :
          <Box display="flex" gap="20px">
            <Flex direction="column">
              <TaskBaseInfo from={IPath.MYREQUIREMENT} setIsOpenEvaluate={setIsOpenEvaluate}/>
              {isShowExtendTaskInfo && <TaskPlanList from={IPath.MYREQUIREMENT} planlist={planList}/>}
              <TaskBidRecords from={IPath.MYREQUIREMENT} recordList={[{bidStatus: TaskBidStatus.BID_FAIL, id:"1"},{bidStatus: null, id:"2"}]} taskStatus={data.taskStatus} signBid={signBid} unSignBid={unSignBid} openRecordDetail={handleOpenRecordDetail}/>
              <TaskDescription />
            </Flex>
            <Flex direction="column">
              <TaskStatusInfo from={IPath.MYREQUIREMENT} taskStatus={data.taskStatus} openTask={openTask} closeTask={closeTask} acceptTask={acceptTask}/>
              {isShowExtendTaskInfo && <TaskSignedReward totalUsdt={"1000.00"} completeTime={Date.now()}/>}
              <TaskUserInfo title="我的信息" userInfo={{}}/>
              {isShowExtendTaskInfo && <TaskUserInfo title="签约水手信息" userInfo={{email: '133'}} /> }
              <TaskMovement movementList={[{time: Date.now(), taskStatus: IStatus.CLOSED},{time: Date.now(), taskStatus: IStatus.EVALUATION},{time: Date.now(), taskStatus: IStatus.WAIT_SIGN},{time: Date.now(), taskStatus: IStatus.CLOSED}]}/>
            </Flex>
          </Box>
        }
        <Auth />
      </Box>

      {isOpenEvaluate && <Evaluate isOpen={isOpenEvaluate} onClose={() => setIsOpenEvaluate(false)}></Evaluate>}
      {openRecordDetailId && <TaskEvaluateDetail from={IPath.MYREQUIREMENT} recordId={openRecordDetailId} onClose={closeRecordDetail}/>}
    </AdminLayout>
  )
}

export default TaskDetail
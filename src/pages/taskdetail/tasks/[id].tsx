import { Box, Button, Code, Container, Portal, Tag } from "@chakra-ui/react"
import Back from "components/back";
import FileReviewer from "components/fileReview";
import Loading from "components/loading";
import { useTaskDetail } from "hooks/task";
import { useUserInfo } from "hooks/user";
import AdminLayout from "layouts/admin"
import { useRouter } from "next/router";
import { useState } from "react";
import { Identification, IPath } from "utils/constant";
import Auth from "views/task/Auth";
import TaskBaseInfo from "views/task/detail/taskBaseInfo";
import TaskDescription from "views/task/detail/taskDescription";
import Evaluate from "views/task/Evaluate";
import Test from "views/task/Test";
import styles from '../index.module.scss';
import Navbar from 'components/navbar/NavbarAdmin';
const TaskDetail = () => {
  const router = useRouter();
  const { id = null } = router.query;
  console.log("TaskDetail>>>")

  // detail
  const {data, isLoading } = useTaskDetail(id)
  const {identification } = useUserInfo()
  const [isOpenEvaluate, setIsOpenEvaluate] = useState(false)

  return (
    <AdminLayout>
      <Portal>
        <Box>
          <Navbar
            paths={[{path: '#', name: '众包管理'}, {path: `/${IPath.TASKS}`, name: '任务大厅'}, {path: '#', name: '任务详情'}]}
          />
        </Box>
      </Portal>
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }} className={identification === Identification.VISITOR ? styles.visitor: ''}>
        <Back />
        {isLoading ? <Loading /> :
          <>
          <TaskBaseInfo from={IPath.TASKS} setIsOpenEvaluate={setIsOpenEvaluate}/>
          <TaskDescription />
          </>
        }
        <Auth />
      </Box>
      {/* {isOpenEvaluate && <Test></Test>} */}
      {isOpenEvaluate && <Evaluate isOpen={isOpenEvaluate} onClose={() => setIsOpenEvaluate(false)}></Evaluate>}
    </AdminLayout>
  )
}

export default TaskDetail
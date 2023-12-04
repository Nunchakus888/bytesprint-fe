import { Box, Button, Code, Container, Tag } from "@chakra-ui/react"
import FileReviewer from "components/fileReviewer";
import Loading from "components/loading";
import { useTaskDetail } from "hooks/task";
import { useUserInfo } from "hooks/user";
import AdminLayout from "layouts/admin"
import { useRouter } from "next/router";
import { useState } from "react";
import { Identification } from "utils/constant";
import Auth from "views/task/Auth";
import Evaluate from "views/task/Evaluate";
import styles from './index.module.scss';

const TaskDetail = () => {
  const router = useRouter();
  const { id = null } = router.query;
  console.log("TaskDetail>>>")

  // const isLoading = false
  // detail
  const {data, isLoading } = useTaskDetail(id)

  const {identification } = useUserInfo()

  const [isOpenEvaluate, setIsOpenEvaluate] = useState(false)

  return (
    <AdminLayout>
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }} className={identification === Identification.VISITOR ? styles.visitor: ''}>
        <Button background="rgba(255,255,255,0.05)" size='sm' borderRadius={4} onClick={() => router.back()}>
          Back
        </Button>
        {isLoading ? <Loading /> :
          <>
          <Box display="flex" flexDirection="column" position="relative" marginTop="20px" className={styles.detail}>
            <Box >
              <Tag size="lg" variant='solid' background='#7551FF' marginRight="10px">
                普通任务
              </Tag>
              <Tag size="lg" variant='solid' background='#7551FF'>
                竞标
              </Tag>
            </Box>
            <p className={styles.itemTitle}>公司官网页面的搭建</p>
            <Box className={styles.btns} display="flex" justifyContent="space-between">
              <Tag size="lg" variant='solid' background='rgba(255,255,255,0.05)'>
                前端开发
              </Tag>
            </Box>
            {
              identification === Identification.ENGINEER && 
              <Button position="absolute" right="40px" top="40px" background="#7551FF" fontSize="20px" size='lg' width="150px" height="50px" borderRadius="30px" onClick={() => setIsOpenEvaluate(true)}>
                参与评估
              </Button>
            }
				  </Box>

          <Box display="flex" flexDirection="column" position="relative" marginTop="20px" className={styles.detail}>
            <p className={styles.itemTitle}>任务描述</p>
            <Container width="70%" padding="0" margin="0">
              熟练使用阿里云，亚马逊等云服务维护模式。

              2、有一定的cloudflare使用经验，对其配置有一定经验

              3、熟练使用docker，并能根据不同应用构建、更新镜像。

              4、熟练掌握windows、Linux操作系统，熟悉Linux操作系统的参数设置、性能调优、故障定位等处理经验。

              5、熟练使用mysql、SQLserver的部署与操作。

              6、精通mysql数据库管理、监控和备份、主从搭建配置等，熟悉Nosql数据库。

              7、精通Linux操作系统以及服务集群（nginx、java、node）的搭建、设置和维护、网络的安全监控（zabbix\prometheus\grafana等）、系统性能管理和调试、网络性能管理。
            </Container>

            {/* 文件 */}
            <Box width="70%" marginTop="30px">
              <FileReviewer fileList={[1,2,3]}/>
            </Box>
          </Box>
  </>
        }
        <Auth />
      </Box>

      {isOpenEvaluate && <Evaluate isOpen={isOpenEvaluate} onClose={() => setIsOpenEvaluate(false)}></Evaluate>}
    </AdminLayout>
  )
}

export default TaskDetail
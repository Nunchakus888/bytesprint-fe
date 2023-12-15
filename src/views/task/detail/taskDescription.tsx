import { Box, Container, Flex, Link } from "@chakra-ui/react";
// import FileReview from "components/fileReview";
import ModalDialog from "components/modal";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from './index.module.scss'

const FileReview = dynamic(() => import("../../../components/fileReview"), { ssr: false });
export default function TaskDescription(){

  const description = "<p><strong>1、熟练使用阿里云，亚马逊等云服务维护模式。</strong></p><p><strong>2、有一定的cloudflare使用经验，对其配置有一定经验</strong></p><p><strong>3、熟练使用docker，并能根据不同应用构建、更新镜像。</strong></p><p><strong>4、熟练掌握windows、Linux操作系统，熟悉Linux操作系统的参数设置、性能调优、故障定位等处理经验。</strong></p><p><strong>5、熟练使用mysql、SQLserver的部署与操作。</strong></p><p><strong>6、精通mysql数据库管理、监控和备份、主从搭建配置等，熟悉Nosql数据库。</strong></p><p><strong>7、精通Linux操作系统以及服务集群（nginx、java、node）的搭建、设置和维护、网络的安全监控（zabbix\prometheus\grafana等）、系统性能管理和调试、网络性能管理。</strong></p>"
  const fileList=[{}, {}, {}]

  // 是否预览
  const [isReviewer, setIsReviewer] = useState(false)
  const [reviewFile, setReviewFile] = useState({url: '', name: ''})
  const handleClick = ({url, name}: {url: string, name: string}) => {
    setIsReviewer(true)
    setReviewFile({url, name})
  }
  const handleCloseReviewer = () => {
    setIsReviewer(false)
    setReviewFile({url: '', name: ''})
  }
  console.log("isReviewer", isReviewer, reviewFile)
  return (
    <Box display="flex" flexDirection="column" position="relative" marginTop="20px" className={styles.container}>
      <p className={styles.itemTitle}>任务描述</p>
      <Box dangerouslySetInnerHTML={{__html: description}}></Box>

      {/* 文件 */}
      <Box width="70%" marginTop="30px">
        {/* <FileReview fileList={[1,2,3]}/> */}
        <Box display="flex" flexDirection="column">
          {
            fileList?.map((it, index) => {
              return (
              <Flex key={index} justify="space-between" background="rgba(255,255,255,0.05)" marginBottom="10px" padding="10px" fontSize="14px">
                <Box className={styles.filename} position="relative"><i></i>需求描述文件.pdf</Box>
                <Box>200kb</Box>
                <Link color="#7551FF" fontWeight="bold" onClick={() => handleClick({url: "https://temp3.admin.ec2.gamemag.link/pwa%E6%95%99%E7%A8%8B.pptx", name: '需求描述'})}><a href="#">预览</a></Link>
              </Flex>
              )
            })
          }
        </Box>
      </Box>
      {/* <ModalDialog 
        title={reviewFile.name}
        isOpen={isReviewer}
        onClose={handleCloseReviewer}
        onSure={handleCloseReviewer}
      >
        
      </ModalDialog> */}
      {reviewFile.url && <FileReview url={reviewFile.url}/>}
    </Box>
  )
}
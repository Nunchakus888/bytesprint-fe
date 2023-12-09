import { Box, Container } from "@chakra-ui/react";
import FileReviewer from "components/fileReviewer";
import styles from './index.module.scss'
export default function TaskDescription(){

  const description = "<p><strong>1、熟练使用阿里云，亚马逊等云服务维护模式。</strong></p><p><strong>2、有一定的cloudflare使用经验，对其配置有一定经验</strong></p><p><strong>3、熟练使用docker，并能根据不同应用构建、更新镜像。</strong></p><p><strong>4、熟练掌握windows、Linux操作系统，熟悉Linux操作系统的参数设置、性能调优、故障定位等处理经验。</strong></p><p><strong>5、熟练使用mysql、SQLserver的部署与操作。</strong></p><p><strong>6、精通mysql数据库管理、监控和备份、主从搭建配置等，熟悉Nosql数据库。</strong></p><p><strong>7、精通Linux操作系统以及服务集群（nginx、java、node）的搭建、设置和维护、网络的安全监控（zabbix\prometheus\grafana等）、系统性能管理和调试、网络性能管理。</strong></p>"
  return (
    <Box display="flex" flexDirection="column" position="relative" marginTop="20px" className={styles.container}>
      <p className={styles.itemTitle}>任务描述</p>
      <Box dangerouslySetInnerHTML={{__html: description}}></Box>

      {/* 文件 */}
      <Box width="70%" marginTop="30px">
        <FileReviewer fileList={[1,2,3]}/>
      </Box>
    </Box>
  )
}
import { Box, Button, Tag } from "@chakra-ui/react";
import classNames from "classnames";
import { useUserInfo } from "hooks/user";
import { useState } from "react";
import { Identification, IPath } from "utils/constant";
import styles from './index.module.scss'
export default function TaskBaseInfo(props:{
  from?: string
  setIsOpenEvaluate?: (val: boolean) => void
}) {
  const {identification } = useUserInfo()
  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      marginTop="20px"
      className={classNames(styles.detail, styles.container)}
    >
      <Box>
        <Tag size="lg" variant="solid" background="#7551FF" marginRight="10px">
          普通任务
        </Tag>
        <Tag size="lg" variant="solid" background="#7551FF">
          竞标
        </Tag>
      </Box>
      <p className={styles.itemTitle}>公司官网页面的搭建</p>
      <Box className={styles.btns} display="flex" justifyContent="space-between">
        <Tag size="lg" variant="solid" background="rgba(255,255,255,0.05)">
          前端开发
        </Tag>
      </Box>
      {/* 来自任务大厅且是水手，可以进行评估 */}
      {identification === Identification.ENGINEER && props.from === IPath.TASKS && (
        <Button
          position="absolute"
          right="40px"
          top="40px"
          background="#7551FF"
          fontSize="20px"
          size="lg"
          width="150px"
          height="50px"
          borderRadius="30px"
          onClick={() => setIsOpenEvaluate(true)}
        >
          参与评估
        </Button>
      )}
    </Box>
  );
}

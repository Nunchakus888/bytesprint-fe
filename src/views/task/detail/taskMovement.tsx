import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"
import { useCallback, useMemo } from "react"
import styles from './index.module.scss'
import dayjs from 'dayjs'
import { IStatus, RequirementStatus, TaskStatus } from "utils/constant"
export default function TaskMovement(props:{
  movementList: {time: number, taskStatus: IStatus}[]
}) {
  const {movementList} = props
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      width="300px"
      paddingBottom="20px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">需求动态</Text>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Flex direction="column" height="100%" justifyContent="space-around">
          {movementList.map(it => {
            const t = dayjs(it.time).format('HH:mm')
            const date = dayjs(it.time).format('YYYY/MM/DD')
            return (
              <Box marginTop="30px" key={it.time} className={styles.movementTime} display="flex" flexDirection="column" alignItems="center">
                <Text fontSize={16}>{t}</Text>
                <Text fontSize={12}>{date}</Text>
              </Box>
            )
          })}
        </Flex>
        
        <Flex direction="column"  height="100%" justifyContent="space-around" className={styles.bubles}>
          {/* <Box display="flex" justifyItems="center" width="1px" height="100%"><Box className={styles.line}></Box></Box> */}
          <Box className={styles.line} overflow="hidden"></Box>
          {movementList.map(it => {
            return (
              <Box marginTop="30px"  key={`${it.time}_buble`} className={styles.buble}>
              </Box>
            )
          }
          )}
          
        </Flex>

        <Flex direction="column" height="100%" justifyContent="space-around">
          {movementList.map(it => {
            return (
              <Box display="flex" alignItems="center" marginTop="30px"  key={`${it.time}_${it.taskStatus}`}>
                {/* @ts-ignore */}
                <Text>{[...TaskStatus, ...RequirementStatus].filter(ts => ts.value === it.taskStatus)[0]?.label}</Text>
              </Box>
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}
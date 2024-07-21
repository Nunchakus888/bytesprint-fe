import styles from './index.module.scss';

import { Box, Button, Flex, Tag } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import Link from 'next/link';
import {
  IPath,
  ProfessionTypes,
  ProTypes,
  RequirementStatus,
  Tabs,
  TaskStatus,
  TaskTypes,
} from 'common/constant';
import classNames from 'classnames';
import TaskStatusBadge from "components/TaskStatusBadge";

export default function TaskItem(props: { item: any; isMine?: boolean; from?: string }) {
  const { item } = props;
  return (
    <Box className={styles.itemContainer} position="relative" margin="10px 0">
      <Flex justify="space-between">
        <Flex gap="10px" width="40%" display="flex" alignItems="center" justify="space-between">
          
          <Flex gap="10px" width="40%" display="flex" alignItems="center">
            <Tag background="#7551FF" marginRight="10px" marginBottom="10px">
              {Tabs.filter((v) => v.value === item.categoryType)[0]?.label}-
              {ProTypes.filter((v) => v.value === item.crowdsourcingType)[0]?.label}
            </Tag>
            <div className={classNames(styles.itemTitle, 'ellipsis')}>{item.name}</div>
          </Flex>
        </Flex>
        <Box display="flex" alignItems="center" justifyContent="flex-start" width="20%">
          {/* 职位类型 */}
          {ProfessionTypes.find((v) => v.value === item.positionType).label}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-start" width="20%">
          {props.isMine && props.from === IPath.MYREQUIREMENT && (
            <TaskStatusBadge>
              {
                RequirementStatus.find((it) => it.value === item.status)?.label
              }
            </TaskStatusBadge>
          )}
          {props.isMine && props.from === IPath.MYTASKS && (
            <Tag
              fontSize={16}
              color="#7551FF"
              border="1px solid #7551FF"
              boxShadow="none"
              variant="outline"
              size="md"
            >
              {TaskStatus.filter((it) => it.value === item.status)[0]?.label}
            </Tag>
          )}
        </Box>
        <Box display="flex" alignItems="center" width="10%">
          {/* 详情 */}
          <Link
            href={`/taskdetail/${props.from || IPath.TASKS}/${item.id}`}
            className={styles.primaryBtn}
          >
            Details {' >'}
          </Link>
        </Box>
      </Flex>
      <Box className={styles.tasktypes}>
        {/* 任务类型 */}
        {TaskTypes.filter((v) => v.value === item.categoryType)[0]?.label}
      </Box>
    </Box>
  );
}

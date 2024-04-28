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

export default function TaskItem(props: { item: any; isMine?: boolean; from?: string }) {
  const { item } = props;
  return (
    <Box className={styles.itemContainer} position="relative" margin="10px 0">
      <Flex justify="space-between">
        <Box gap="10px" width="40%">
          <Tag background="#7551FF" marginRight="10px" marginBottom="10px">
            {Tabs.filter((v) => v.value === item.categoryType)[0]?.label}-
            {ProTypes.filter((v) => v.value === item.crowdsourcingType)[0]?.label}
          </Tag>
          {/* 名称 */}
          <div className={classNames(styles.itemTitle, 'ellipsis')}>{item.name}</div>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-start" width="20%">
          {/* 职位类型 */}
          {ProfessionTypes.filter((v) => v.value === item.positionType)[0]?.label}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-start" width="20%">
          {props.isMine && props.from === IPath.MYREQUIREMENT && (
            <Tag
              fontSize={16}
              color="#7551FF"
              border="1px solid #7551FF"
              boxShadow="none"
              variant="outline"
              size="md"
            >
              {RequirementStatus.filter((it) => it.value === item.status)[0]?.label}
            </Tag>
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

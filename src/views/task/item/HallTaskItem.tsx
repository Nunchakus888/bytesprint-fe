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
// 任务大厅
export default function HallTaskItem(props: { item: any; isMine?: boolean; from?: string }) {
  const { item } = props;
  return (
    <Box className={styles.hallContainer}>
      <Flex direction="column" position="relative">
        <Box display="flex" width="100%">
          <Tag size="lg" variant="solid" className="task-tag">
            {/* 众包方式 */}
            {ProTypes.filter((v) => v.value === item.crowdsourcingType)[0]?.label}
          </Tag>
        </Box>
        <Box display="flex" flexDirection="column">
          {/* 名称 */}
          <div className={classNames(styles.itemTitle, 'ellipsis')}>{item.name}</div>
          {/* 介绍 */}
          <Box
            className={classNames(styles.itemContent, 'h-[50px]')}
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Box>
          <Box className={styles.btns} display="flex" justifyContent="space-between">
            {/* 职位类型 */}
            <span className="tag-primary-light">
              {ProfessionTypes.filter((v) => v.value === item.positionType)[0]?.label}
            </span>
            {/* 详情 */}
            <Button color="#fff" className="btn-primary" width={105}>
              <Link href={`/taskdetail/${props.from || IPath.TASKS}/${item.id}`}>
                Details {' >'}
              </Link>
              {/* Test */}
              {/* <Link href={`/taskdetail/${props.from || IPath.TASKS}/202401082128568241`}> Details</Link> */}
            </Button>
          </Box>
        </Box>
      </Flex>

      {/* 任务类型 */}
      <Tag size="lg" variant="solid" className={styles.hallTaskType}>
        {TaskTypes.filter((v) => v.value === item.categoryType)[0]?.label}
      </Tag>
    </Box>
  );
}

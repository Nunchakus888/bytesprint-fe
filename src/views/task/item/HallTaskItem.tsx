import styles from './index.module.scss';

import { Box, Button, Flex, Tag, Text } from '@chakra-ui/react';
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
        <Box display="flex" flexDirection="column" padding="0 10px">
          {/* 名称 */}
          <div className={classNames(styles.itemTitle, 'ellipsis')}>{item.name}</div>
          {/* 职位类型 */}
          <Flex direction="column">
            <span className="font-14 opacity-80">
              {ProfessionTypes.filter((v) => v.value === item.positionType)[0]?.label}
            </span>
            <span className="font-14 text-[#999]">Select job type</span>
          </Flex>
          {/* 介绍 */}
          <Box
            className={classNames(styles.itemContent, 'h-[50px]')}
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Box>
        </Box>
        <Box
          className={styles.btns}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            color="#7551ff"
            background="#23295D"
            padding="0 5px"
            lineHeight="30px"
            height="30px"
            borderRadius="4px"
          >
            {/* 众包方式 */}
            {ProTypes.filter((v) => v.value === item.crowdsourcingType)[0]?.label}
          </Text>
          {/* 详情 */}
          <Link
            href={`/taskdetail/${props.from || IPath.TASKS}/${item.id}`}
            className="flex items-center"
          >
            {/* 任务类型 */}
            {TaskTypes.filter((v) => v.value === item.categoryType)[0]?.label}
            <Text color="#7551ff" paddingLeft="10px" fontSize="28">
              {' >'}
            </Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

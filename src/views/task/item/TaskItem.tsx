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
    <Box className={styles.itemContainer}>
      <Flex justify="space-between" position="relative">
        <Box className={styles.imgbox} display="flex" alignItems="center" justifyContent="center">
          {Tabs.filter((v) => v.value === item.categoryType)[0]?.label}
        </Box>
        <Box display="flex" flexDirection="column" width="100%">
          <Box className="flex items-center justify-between">
            <div className={classNames(styles.itemTitle, 'ellipsis')}>{item.name}</div>
            <Box className="flex items-center gap-2">
              <Tag size="lg" variant="solid" className="task-tag">
                {TaskTypes.filter((v) => v.value === item.categoryType)[0]?.label}
              </Tag>
              <Tag size="lg" variant="solid" className="task-tag">
                {ProTypes.filter((v) => v.value === item.crowdsourcingType)[0]?.label}
              </Tag>
            </Box>
          </Box>

          <Box
            className={styles.itemContent}
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Box>
          <Box className={styles.btns} display="flex" justifyContent="space-between">
            <span className="tag-primary">
              {ProfessionTypes.filter((v) => v.value === item.positionType)[0]?.label}
            </span>
            <Button color="#fff" className="btn-primary" width={105}>
              <Link href={`/taskdetail/${props.from || IPath.TASKS}/${item.id}`}>
                Details {' >'}
              </Link>
              {/* Test */}
              {/* <Link href={`/taskdetail/${props.from || IPath.TASKS}/202401082128568241`}> Details</Link> */}
            </Button>
          </Box>
        </Box>
        {props.isMine && props.from === IPath.MYREQUIREMENT && (
          <Tag
            position="absolute"
            top="0"
            right="0"
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
            position="absolute"
            top="0"
            right="0"
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
      </Flex>
    </Box>
  );
}

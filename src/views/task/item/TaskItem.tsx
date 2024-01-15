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
import styles from './index.module.scss';
export default function TaskItem(props: { item: any; isMine?: boolean; from?: string }) {
  const { item } = props;
  return (
    <Box className={styles.itemContainer}>
      <Flex justify="space-between" position="relative">
        <Box
          className={styles.imgbox}
          background="#7551FF"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="30px"
        >
          {/* <Image
            src={`https://picsum.photos/200/250?random=${Math.ceil(Math.random() * 100)}`}
            alt={item.categoryName}
          /> */}
          {Tabs.filter((v) => v.value === item.categoryType)[0]?.label}
        </Box>
        <Box display="flex" flexDirection="column" width="100%">
          <Box>
            <Tag size="lg" variant="solid" background="#7551FF" marginRight="10px">
              {TaskTypes.filter((v) => v.value === item.categoryType)[0]?.label}
            </Tag>
            <Tag size="lg" variant="solid" background="#7551FF">
              {ProTypes.filter((v) => v.value === item.crowdsourcingType)[0]?.label}
            </Tag>
          </Box>
          <p className={styles.itemTitle}>{item.name}</p>
          <Box
            className={styles.itemContent}
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Box>
          <Box className={styles.btns} display="flex" justifyContent="space-between">
            <Tag size="lg" variant="solid" background="#242537">
              {ProfessionTypes.filter((v) => v.value === item.positionType)[0]?.label}
            </Tag>
            <Button background="#7551FF" size="md" color="#fff">
              <Link href={`/taskdetail/${props.from || IPath.TASKS}/${item.id}`}> Details</Link>
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

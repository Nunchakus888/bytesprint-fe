import styles from './index.module.scss';

import { Box, Button, Tag } from '@chakra-ui/react';
import classNames from 'classnames';
import { useUserInfo } from 'hooks/user';
import { Identification, IPath, ProfessionTypes, ProTypes, TaskTypes } from 'common/constant';
import { onWarmToast } from 'common/utils/toast';

export default function TaskBaseInfo(props: {
  from?: string;
  setIsOpenEvaluate?: (val: boolean) => void;
  data?: any;
  isEvaluate?: boolean;
}) {
  const { identification } = useUserInfo();
  const { data, setIsOpenEvaluate, isEvaluate } = props;

  const handClick = () => {
    if (identification !== Identification.ENGINEER) {
      onWarmToast('Participate after Tasker Certification');
      return;
    }

    setIsOpenEvaluate(true);
  };

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
          {TaskTypes.filter((v) => v.value === data.categoryType)[0]?.label}
        </Tag>
        <Tag size="lg" variant="solid" background="#7551FF">
          {ProTypes.filter((v) => v.value === data.crowdsourcingType)[0]?.label}
        </Tag>
      </Box>
      <p className={styles.itemTitle}>{data.name}</p>
      <Box className={styles.btns} display="flex" justifyContent="space-between">
        <Tag size="lg" variant="solid" background="#1b1e24">
          {ProfessionTypes.filter((v) => v.value === data.positionType)[0]?.label}
        </Tag>
      </Box>
      {/* 来自Task Hall且是Tasker，可以进行评估 */}
      {props.from === IPath.TASKS && !isEvaluate && (
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
          onClick={handClick}
        >
          Join
        </Button>
      )}
    </Box>
  );
}

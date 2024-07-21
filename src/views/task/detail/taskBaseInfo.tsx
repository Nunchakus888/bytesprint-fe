import styles from './index.module.scss';

import { Box, Button, Tag } from '@chakra-ui/react';
import classNames from 'classnames';
import { useUserInfo } from 'hooks/user';
import {Identification, IPath, ProfessionTypes, ProTypes, RequirementStatus, TaskTypes} from 'common/constant';
import { onWarmToast } from 'common/utils/toast';
import { useAccount } from 'wagmi';
import useConnect from 'hooks/useConnect';
import { useRouter } from 'next/router';
import TaskStatusBadge from "components/TaskStatusBadge";

export default function TaskBaseInfo(props: {
  from?: string;
  setIsOpenEvaluate?: (val: boolean) => void;
  data?: any;
  isEvaluate?: boolean;
  projectId?: string;
}) {
  const { identification, userInfo } = useUserInfo();
  const { data, setIsOpenEvaluate, isEvaluate, projectId } = props;
  const account = useAccount();
  const { connect } = useConnect();
  const router = useRouter();
  const handClick = () => {
    if (!userInfo.address) {
      connect();
      return false;
    }
    if (identification !== Identification.ENGINEER) {
      onWarmToast('Participate after Tasker Certification');
      return;
    }

    setIsOpenEvaluate(true);
  };
  // 进入我的任务详情页
  const handJoinedClick = () => {
    router.push(`/taskdetail/mytasks/${projectId}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      marginTop="20px"
      className={classNames(styles.detail, styles.container)}
    >
      <div className="flex items-center gap-2 justify-between" >
        
        <div className="flex items-center gap-2" >
          <Tag size="lg" variant="solid" background="#7551FF" >
            {TaskTypes.filter((v) => v.value === data.categoryType)[0]?.label}
          </Tag > <Tag size="lg" variant="solid" background="#7551FF" >
          {ProTypes.filter((v) => v.value === data.crowdsourcingType)[0]?.label}
        </Tag >
        
        </div >
        
        <div className="pr-[18px]">
          <TaskStatusBadge >{RequirementStatus.find((it) => it.value === data?.status)?.label}</TaskStatusBadge >
        </div>
      
      
      </div >
      
      <div className="flex items-center justify-between" >
        
        <p className={styles.itemTitle} >{data.name}</p >
        
        {/* 已签约、进行中、待验收、已完成状态未参与此任务的用户从任务大厅中点击查看任务详情，只显示任务状态，不能进行操作 */}
        {/* 来自Task Hall且是Tasker，可以进行评估 */} {props.from === IPath.TASKS &&
        (isEvaluate ? (
          <Button
            background="#7551FF"
            opacity={0.5}
            fontSize="20px"
            size="lg"
            width="150px"
            height="50px"
            borderRadius="30px"
            onClick={handJoinedClick}
          > Joined </Button >
        ) : (
          <Button
            background="#7551FF"
            fontSize="20px"
            size="lg"
            width="150px"
            height="50px"
            borderRadius="30px"
            onClick={handClick}
          > Join </Button >
        ))}
      </div >
      
      
      <div className="flex items-center justify-between" >
        <Box className={styles.btns} display="flex" justifyContent="space-between" >
        <span className="tag-primary" >
          {ProfessionTypes.filter((v) => v.value === data.positionType)[0]?.label}
        </span > </Box >
      </div >
    </Box >
  );
}

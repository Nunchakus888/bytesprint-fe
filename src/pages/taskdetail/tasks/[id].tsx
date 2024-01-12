import { Box, Button, Code, Container, Portal, Tag } from '@chakra-ui/react';
import Back from 'components/back';
import FileReviewer from 'components/fileReview';
import Loading from 'components/loading';
import { useTaskDetail } from 'hooks/task';
import { useUserInfo } from 'hooks/user';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Identification, IPath } from 'common/constant';
import Auth from 'views/task/Auth';
import TaskBaseInfo from 'views/task/detail/taskBaseInfo';
import TaskDescription from 'views/task/detail/taskDescription';
import Evaluate from 'views/task/Evaluate';
import Test from 'views/task/Test';
import styles from '../index.module.scss';
import Navbar from 'components/navbar/Navbar';

const TaskDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log('TaskDetail>>>');
  const { userInfo } = useUserInfo();
  // detail
  const { data, isLoading, refresh } = useTaskDetail(id, userInfo.address);
  const { identification } = useUserInfo();
  const [isOpenEvaluate, setIsOpenEvaluate] = useState(false);
  console.log('data>>>>', data);

  // 是否已评估
  const isEvaluate = useMemo(() => {
    if (data) {
      const { assetRecordList } = data;
      return assetRecordList?.some((it: any) => it.uid === userInfo.uid);
    }
    return false;
  }, [userInfo, data]);

  return (
    <>
      <Box>
        <Navbar
          paths={[
            { path: '#', name: 'Crowdsourcing Management ' },
            { path: `/${IPath.TASKS}`, name: 'Task Hall' },
            { path: '#', name: 'Task Details' },
          ]}
        />
      </Box>
      <Box className={identification === Identification.VISITOR ? styles.visitor : ''}>
        <Back />
        {!data ? (
          <Loading />
        ) : (
          <>
            <TaskBaseInfo
              isEvaluate={isEvaluate}
              data={data?.projectRawInfo}
              from={IPath.TASKS}
              setIsOpenEvaluate={setIsOpenEvaluate}
            />
            <TaskDescription
              description={data?.projectRawInfo?.description}
              fileList={data?.fileList}
            />
          </>
        )}
        <Auth from={IPath.TASKS} />
      </Box>
      {/* {isOpenEvaluate && <Test></Test>} */}
      {isOpenEvaluate && (
        <Evaluate
          projectId={id as string}
          isOpen={isOpenEvaluate}
          onClose={() => setIsOpenEvaluate(false)}
          onSuccess={refresh}
        ></Evaluate>
      )}
    </>
  );
};

export default TaskDetail;

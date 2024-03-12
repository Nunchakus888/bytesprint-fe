import { Box, Button, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IPath, IStatus, RequirementStatus, TaskStatus } from 'common/constant';
import styles from './index.module.scss';
import ModalDialog from 'components/modal';
export default function TaskStatusInfo(props: {
  taskStatus: IStatus;
  from: string;
  openTask?: () => void;
  closeTask?: () => void;
  acceptTask?: () => void;
  scheduleTask?: () => void;
  submitAccept?: () => void;
  withdrawMyRewards?: (item: any) => Promise<boolean>;
  data?: any;
  buttonLoading?: boolean;
  withdrawLoding?: boolean;
}) {
  const { from, taskStatus, data, buttonLoading, withdrawLoding } = props;
  const statusTitle = useMemo(() => {
    if (from === IPath.MYREQUIREMENT) {
      return RequirementStatus.filter((it) => it.value === taskStatus)[0]?.label;
    } else if (from === IPath.MYTASKS) {
      return TaskStatus.filter((it) => it.value === taskStatus)[0]?.label;
    }
  }, [from, taskStatus]);

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  // 再次确认
  const confirmRef = useRef({
    content: '',
    onSure: () => {},
  });
  // 提取报酬 TODO
  const handleWithDraw = async () => {
    debugger;
    const projectId = String(data.projectRawInfo.id);
    const isSuccess = await props?.withdrawMyRewards({ projectId });
    if (isSuccess) {
      window.location.reload();
    }
  };
  const action = useCallback(() => {
    if (from === IPath.MYREQUIREMENT) {
      switch (taskStatus) {
        case IStatus.CLOSED:
          return (
            // <Button
            //   className={styles.statusbtn}
            //   onClick={() => {
            //     setIsOpenConfirm(true);
            //     confirmRef.current.content = `Are you sure open the Task?`;
            //     confirmRef.current.onSure = () => {
            //       setIsOpenConfirm(false);
            //       props?.openTask();
            //     };
            //   }}
            //   isLoading={buttonLoading}
            // >
            //   Open Task
            // </Button>
            <Text className={styles.statustext}>task closed</Text>
          );
          break;
        case IStatus.EVALUATION:
        case IStatus.WAIT_SIGN:
          return (
            <Button
              className={styles.statusbtn}
              onClick={() => {
                setIsOpenConfirm(true);
                confirmRef.current.content = `Are you sure close the Task?`;
                confirmRef.current.onSure = () => {
                  setIsOpenConfirm(false);
                  props?.closeTask();
                };
              }}
              isLoading={buttonLoading}
            >
              Close Task
            </Button>
          );
          break;
        case IStatus.SIGNED:
          return <Text className={styles.statustext}>Waiting completed plan</Text>;
          break;
        case IStatus.CODEING:
          return <Text className={styles.statustext}>On a task...</Text>;
          break;
        case IStatus.WAIT_ACCEPT:
          return (
            <Button
              className={styles.statusbtn}
              onClick={() => {
                setIsOpenConfirm(true);
                confirmRef.current.content = `Are you sure you have completed the acceptance?`;
                confirmRef.current.onSure = () => {
                  setIsOpenConfirm(false);
                  props?.acceptTask();
                };
              }}
              isLoading={buttonLoading}
            >
              I have accepted
            </Button>
          );
          break;
        case IStatus.COMPLETE:
          // return <Button className={styles.statusbtn}>I have completed</Button>;
          return <Text className={styles.statustext}>Completed</Text>;
          break;
        default:
          return <></>;
          break;
      }
    } else if (from === IPath.MYTASKS) {
      switch (taskStatus) {
        case IStatus.WAIT_SIGN:
          return <Text className={styles.statustext}>Waiting signed</Text>;
          break;
        case IStatus.UN_BID:
          return <Box className={styles.unbid}></Box>;
          break;
        case IStatus.SIGNED:
          return (
            <Button
              className={styles.statusbtn}
              onClick={props?.scheduleTask}
              isLoading={buttonLoading}
            >
              Task scheduling
            </Button>
          );
          break;
        case IStatus.CODEING:
          return (
            <Button
              className={styles.statusbtn}
              onClick={() => {
                setIsOpenConfirm(true);
                confirmRef.current.content = `Are you sure you want to submit the task?`;
                confirmRef.current.onSure = () => {
                  setIsOpenConfirm(false);
                  props?.submitAccept();
                };
              }}
              isLoading={buttonLoading}
            >
              Submit for acceptance
            </Button>
          );
          break;
        case IStatus.WAIT_ACCEPT:
          return <Text className={styles.statustext}>Waiting accepted</Text>;
          break;
        case IStatus.COMPLETE:
          return (
            <Button
              className={styles.statusbtn}
              onClick={handleWithDraw}
              isLoading={withdrawLoding}
            >
              Withdraw my rewards
            </Button>
          );
          break;
        default:
          return <></>;
          break;
      }
    }
  }, [from, taskStatus, buttonLoading, withdrawLoding]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        marginTop="20px"
        width="320px"
        height="186px"
        className={styles.container}
      >
        <Text fontSize={18} whiteSpace="nowrap">
          Task Status：{statusTitle}
        </Text>
        <Box marginTop="30px">{action()}</Box>
      </Box>

      {isOpenConfirm && (
        <ModalDialog
          title="Confirm"
          isOpen={isOpenConfirm}
          onClose={() => {
            setIsOpenConfirm(false);
            confirmRef.current.content = '';
          }}
          onSure={confirmRef.current.onSure}
          width="400px"
        >
          <Box>{confirmRef.current.content}</Box>
        </ModalDialog>
      )}
    </>
  );
}

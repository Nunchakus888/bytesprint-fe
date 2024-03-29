import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
// import FileReview from "components/fileReview";
import ModalDialog from 'components/modal';
import useConnect from 'hooks/useConnect';
import { useUserInfo } from 'hooks/user';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import styles from './index.module.scss';

// const FileReview = dynamic(() => import("../../../components/fileReview"), { ssr: false });
export default function TaskDescription(props: { description?: string; fileList?: any[] }) {
  const { description, fileList } = props;
  // 是否预览
  // const [isReviewer, setIsReviewer] = useState(false)
  // const [reviewFile, setReviewFile] = useState({url: '', name: ''})
  // const handleClick = ({url, name}: {url: string, name: string}) => {
  //   setIsReviewer(true)
  //   setReviewFile({url, name})
  // }
  // const handleCloseReviewer = () => {
  //   setIsReviewer(false)
  //   setReviewFile({url: '', name: ''})
  // }
  // console.log("isReviewer", isReviewer, reviewFile)
  const { userInfo } = useUserInfo();
  const account = useAccount();
  const { connect } = useConnect();
  // 判断是否登录
  const handleViewClick = useCallback(
    (e: any) => {
      if (!userInfo.address) {
        connect();
        e.preventDefault();
        return false;
      }
    },
    [connect, userInfo]
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      marginTop="20px"
      className={styles.container}
    >
      {/* <p className={styles.itemTitle}>Task Description</p> */}
      <Text fontSize={18} fontWeight="bold">
        Task Description
      </Text>
      <Box margin="10px 0" dangerouslySetInnerHTML={{ __html: description }}></Box>

      {/* 文件 */}
      <Box width="70%" marginTop="30px">
        {/* <FileReview fileList={[1,2,3]}/> */}
        <Box display="flex" flexDirection="column">
          {fileList?.map((it, index) => {
            return (
              <Flex
                key={index}
                justify="space-between"
                background="#1b1e24"
                marginBottom="10px"
                padding="10px"
                fontSize="14px"
              >
                <Box className={styles.filename} position="relative">
                  <i></i>
                  {it.fileName}
                </Box>
                {/* <Box>200kb</Box> */}
                <Link color="#7551FF" fontWeight="bold">
                  <a href={it.fileUrl} target="_blank" rel="noreferrer" onClick={handleViewClick}>
                    View
                  </a>
                </Link>
              </Flex>
            );
          })}
        </Box>
      </Box>
      {/* <ModalDialog 
        title={reviewFile.name}
        isOpen={isReviewer}
        onClose={handleCloseReviewer}
        onSure={handleCloseReviewer}
      >
        
      </ModalDialog> */}
      {/* {reviewFile.url && <FileReview url={reviewFile.url}/>} */}
    </Box>
  );
}

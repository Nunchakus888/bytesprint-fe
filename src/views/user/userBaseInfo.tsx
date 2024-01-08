import { Avatar, Box, Button, Flex, Input, Link, Tag, Text } from '@chakra-ui/react';
import Copy from 'components/copy';
import { useUserInfo } from 'hooks/user';
import { useState } from 'react';
import { Identification, IPath, USER_LEVEL } from 'utils/constant';
import styles from './index.module.scss';
import { GrCheckmark } from 'react-icons/gr';
import { GrClose } from 'react-icons/gr';
import API_ROUTERS from 'api';
import { Post } from 'utils/axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'slice/commonSlice';
import _ from 'lodash';
import { setItem } from 'utils';
import nextLink from 'next/link';

export default function UserBaseInfo(props: {
  from: IPath;
  userInfo: any; // 信息
  isEngineer?: boolean;
  isOperator?: boolean;
}) {
  const { from, isEngineer, isOperator, userInfo } = props;
  const data = userInfo?.data;
  const [modify, setModify] = useState(false);
  const [modifyText, setModifyText] = useState('');
  const dispatch = useDispatch();
  const handleChangeText = (e: any) => {
    setModifyText(e.target.value);
  };

  const handleModify = async () => {
    const txt = modifyText.trim();
    if (txt) {
      const res = await Post(API_ROUTERS.users.USER_UPDATE, { nickname: txt });
      setModify(false);
      // 更新获取用户的信息
      const newUserInfo = _.cloneDeep(userInfo);
      newUserInfo.data.nickname = modifyText;
      dispatch(setUserInfo(newUserInfo));
      setItem('userInfo', newUserInfo);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      gap="20px"
      className={styles.container}
    >
      <Avatar size="xl" name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole" />
      <Flex alignItems="center" gap="10px">
        {modify && (
          <Flex alignItems="center" gap="10px">
            <Input
              variant="unstyled"
              fontSize="sm"
              color="#fff"
              fontWeight="500"
              className={styles.modify_input}
              defaultValue={data?.nickname}
              onChange={(e) => handleChangeText(e)}
            />
            <Box cursor="pointer">
              <GrCheckmark fontSize={28} onClick={handleModify} />
            </Box>
            <Box cursor="pointer">
              <GrClose fontSize={28} onClick={() => setModify(false)} />
            </Box>
          </Flex>
        )}
        {!modify && (
          <>
            <Text fontSize={24} fontWeight="bold">
              {data?.nickname}
            </Text>
            {from === IPath.PROFILE && (
              <Link fontSize={16} color="#7551FF" fontWeight="bold" onClick={() => setModify(true)}>
                修改
              </Link>
            )}
          </>
        )}
      </Flex>

      {/* Navigator 审核 */}
      {/* {from === IPath.OperatorCheck && <Box background="#7551FF" padding="10px 20px" color="#fff" borderRadius={4}>珍珠号 · 一年有效期</Box>} */}

      {/* 我的Navigator 详情 */}
      {/* {from === IPath.MYOPERATORDetail && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          Navigator
        </Tag>
        <Flex alignItems="center" justifyContent="center" gap="20px">
          <Box><Text>到期：2024/11/24</Text></Box>
          <Flex justifyContent="center" gap="10px">
            <Text>授权码：</Text>
            <Text color="#7551FF" marginLeft="10px">BTYD32423942</Text>
            <Copy text="BTYD32423942"></Copy>
          </Flex>
        </Flex>
        <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>珍珠号</Box>
      </>} */}

      {/* Tasker审核详情 */}
      {/* {from === IPath.ENGINEERCheck && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          Tasker
        </Tag>
        <Flex gap="20px">
        <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>前端开发工程师</Box>
        <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box>
        </Flex>
      </>} */}

      {/* TODO Tasker有3个等级 */}
      {/* 我的Tasker 详情 */}
      {/* {from === IPath.MYENGINEERDetail && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='rgba(255,255,255,0.05)'>  
          Tasker
        </Tag>
        <Flex alignItems="center" justifyContent="center" gap="20px">
          <Box><Text>等级：Tasker</Text></Box>
          <Box><Text>Navigator：上海奇石信息技术有限公司</Text></Box>
        </Flex>
        <Flex gap="20px">
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>前端开发工程师</Box>
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box>
        </Flex>
      </>} */}

      {/* 用户中心 */}
      {from === IPath.PROFILE && (
        <>
          <Tag size="lg" padding="10px 20px" variant="solid" background="rgba(255,255,255,0.05)">
            {isEngineer ? `Tasker` : isOperator ? `Navigator` : `Regular User`}
          </Tag>
          {/* Tasker */}
          {isEngineer && (
            <>
              <Flex alignItems="center" justifyContent="center" gap="20px">
                {/* @ts-ignore */}
                <Box>
                  <Text>Level：{USER_LEVEL[+data?.level]}</Text>
                </Box>
                {/* <Box><Text>Navigator：上海奇石信息技术有限公司</Text></Box> */}
              </Flex>
              <Flex gap="20px">
                <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>
                  前端开发工程师
                </Box>
                <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>
                  Java开发工程师
                </Box>
              </Flex>
            </>
          )}
          {/* Navigator */}
          {/* {identification === Identification.OPERATOR && <Flex alignItems="center" justifyContent="center" gap="20px">
          <Box><Text>到期：2024/11/24</Text></Box>
          <Flex justifyContent="center" gap="10px">
            <Text>授权码：</Text>
            <Text color="#7551FF" marginLeft="10px">BTYD32423942</Text>
            <Copy text="BTYD32423942"></Copy>
          </Flex>
        </Flex>} */}

          {!(isEngineer || isOperator) && (
            <Flex gap="20px">
              <Link href={`/authentication/tasker`}>
                <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>
                  Tasker Certification
                </Box>
              </Link>
              {/* <Text>or</Text>
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box> */}
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}

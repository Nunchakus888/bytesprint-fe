import { Avatar, Box, Button, Flex, Input, Link, Tag, Text } from '@chakra-ui/react';
import Copy from 'components/copy';
import { useUserInfo } from 'hooks/user';
import { useEffect, useState } from 'react';
import { Identification, IPath, ProfessionTypes, USER_LEVEL } from 'common/constant';
import styles from './index.module.scss';
import { GrCheckmark } from 'react-icons/gr';
import { GrClose } from 'react-icons/gr';
import API_ROUTERS from 'api';
import { Post } from 'common/utils/axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'common/slice/commonSlice';
import _ from 'lodash';
import { setItem } from 'common/utils';
import WalletAvatar from 'components/WalletAvatar';
import { MdArrowForward } from 'react-icons/md';
import { shortAddress } from 'common/utils';
import { RiEdit2Fill } from 'react-icons/ri';
import { onSuccessToast } from 'common/utils/toast';
import { useRouter } from 'next/router';

export default function UserBaseInfo(props: {
  from?: IPath;
  userInfo?: any; // 信息
  isEngineer?: boolean;
  isOperator?: boolean;
  data?: any;
}) {
  const { from, isEngineer, isOperator, userInfo } = props;
  const data = userInfo?.data;
  const [modify, setModify] = useState(false);
  const [modifyText, setModifyText] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChangeText = (e: any) => {
    setModifyText(e.target.value);
  };

  const [nickName, setNickName] = useState(data?.nickname);
  useEffect(() => {
    setNickName(data?.nickname);
  }, [data]);

  const handleModify = async () => {
    const txt = modifyText.trim();
    if (txt) {
      const res = await Post(API_ROUTERS.users.USER_UPDATE, { nickname: txt });
      setModify(false);
      // 更新获取用户的信息
      const newUserInfo = _.cloneDeep(userInfo);
      newUserInfo.data.nickname = txt;
      dispatch(setUserInfo(newUserInfo));
      setItem('userInfo', newUserInfo);
      setNickName(txt);
      // 新增提示
      onSuccessToast('Successfully');
    }
  };

  return (
    <Box className={styles.baseinfoContainer}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div className="flex gap-4">
          <WalletAvatar value={userInfo?.address || ''} size={100} />
          <div>
            <Flex alignItems="center" gap="10px" mb={2}>
              {modify && (
                <Flex alignItems="center" gap="10px">
                  <Input
                    variant="unstyled"
                    fontSize="sm"
                    color="#fff"
                    fontWeight="500"
                    className={styles.modify_input}
                    defaultValue={nickName}
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
                    {shortAddress(nickName)}
                  </Text>
                  {from === IPath.PROFILE && (
                    <RiEdit2Fill
                      className="cursor-pointer"
                      fontSize="22"
                      onClick={() => setModify(true)}
                    />
                  )}
                </>
              )}
            </Flex>
            {/* 用户中心 */}
            {from === IPath.PROFILE && (
              <div>
                <span className="tag-primary" style={{ maxWidth: 120 }}>
                  {isEngineer ? `Tasker` : isOperator ? `Navigator` : `Regular User`}
                </span>
                {/* Tasker */}
                {isEngineer && (
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                  >
                    <Flex alignItems="center" justifyContent="center" gap="20px">
                      {/* @ts-ignore */}
                      <Box>
                        <Text>
                          Level：
                          {
                            //@ts-ignore
                            USER_LEVEL[+data?.level]
                          }
                        </Text>
                      </Box>
                      {/* <Box><Text>Navigator：上海奇石信息技术有限公司</Text></Box> */}
                    </Flex>
                    <Flex gap="20px">
                      {userInfo?.data?.engineer?.position?.map((positionType: number) => {
                        return (
                          // <Box
                          //   key={`positiontype_${positionType}`}
                          //   background="#7551FF"
                          //   padding="8px 20px"
                          //   color="#fff"
                          //   borderRadius={4}
                          // >
                          //   {ProfessionTypes.filter((v) => v.value === positionType)[0]?.label}
                          // </Box>
                          <span key={`positiontype_${positionType}`} className="tag-primary">
                            {ProfessionTypes.filter((v) => v.value === positionType)[0]?.label}
                          </span>
                        );
                      })}
                    </Flex>
                  </Box>
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
              </div>
            )}
          </div>
        </div>

        {/* Navigator 审核 */}
        {/* {from === IPath.OperatorCheck && <Box background="#7551FF" padding="10px 20px" color="#fff" borderRadius={4}>珍珠号 · 一年有效期</Box>} */}

        {/* 我的Navigator 详情 */}
        {/* {from === IPath.MYOPERATORDetail && <>
        <Tag size="lg" padding="15px 30px" variant='solid' background='#1b1e24'>  
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
        <Tag size="lg" padding="15px 30px" variant='solid' background='#1b1e24'>  
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
        <Tag size="lg" padding="15px 30px" variant='solid' background='#1b1e24'>  
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
      </div>

      {!(isEngineer || isOperator) && (
        <Flex gap="20px">
          <Link
            onClick={() => router.push(`/certification/tasker`)}
            className="flex items-center underline"
          >
            <Text fontSize={16} fontWeight="600">
              Tasker Certification{' '}
            </Text>
            <MdArrowForward className="ml-2" />
          </Link>
          {/* <Text>or</Text>
          <Box background="#7551FF" padding="8px 20px" color="#fff" borderRadius={4}>Java开发工程师</Box> */}
        </Flex>
      )}
    </Box>
  );
}

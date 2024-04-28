import { Avatar, Box, Button, Flex, Image, Input, Link, Tag, Text } from '@chakra-ui/react';
import Copy from 'components/copy';
import { useUserInfo } from 'hooks/user';
import { useEffect, useMemo, useState } from 'react';
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
import UserMajor from './userMajor';

export default function UserBaseInfo(props: {
  from?: IPath;
  userInfo?: any; // 信息
  isEngineer?: boolean;
  isOperator?: boolean;
  data?: any;
  identification: Identification;
}) {
  const { from, isEngineer, isOperator, userInfo, identification } = props;
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

  // 头像
  const avatar = useMemo(() => {
    if (identification === Identification.VISITOR) {
      return [`img/employer.png`, 'Employer'];
    } else if (identification === Identification.ENGINEER) {
      return [`img/tasker.png`, 'Tasker'];
    } else if (identification === Identification.OPERATOR) {
      return [`img/navigator.png`, 'Navigator'];
    } else {
      return [`img/employer.png`, 'Employer'];
    }
  }, [identification]);

  return (
    <Box className={styles.baseinfoContainer}>
      <Flex width="100%" mb="40px">
        <Flex width="70%" gap="30px">
          <Box position="relative" height="120px">
            <Image src={avatar[0]} alt="" width="120px" height="100%" borderRadius="50%" />
            <Tag
              position="absolute"
              bottom="-10px"
              left="10px"
              color="#fff"
              // backgroundColor="rgba(255,255,255,0.9)"
              width="100px"
              justifyContent="center"
            >
              {avatar[1]}
            </Tag>
          </Box>
          <Box>
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
                    <GrCheckmark fontSize={16} onClick={handleModify} />
                  </Box>
                  <Box cursor="pointer">
                    <GrClose fontSize={16} onClick={() => setModify(false)} />
                  </Box>
                </Flex>
              )}
              {!modify && (
                <>
                  <Text fontSize={20} fontWeight="bold">
                    {shortAddress(nickName)}
                  </Text>
                  {from === IPath.PROFILE && (
                    <RiEdit2Fill
                      className="cursor-pointer"
                      color="#7551ff"
                      fontSize="16"
                      onClick={() => setModify(true)}
                    />
                  )}
                </>
              )}
            </Flex>
            {!(isEngineer || isOperator) && (
              <Box width="50%">
                <Flex gap="10px" alignItems="center">
                  <Button
                    onClick={() => router.push(`/certification/tasker`)}
                    className="flex items-center"
                    border="1px dotted #7551ff"
                    color="#7551ff"
                    borderRadius="5px"
                    padding="0 10px"
                    _hover={{
                      border: '1px dotted #7551ff',
                      background: 'rgba(255,255,255,0.06)',
                    }}
                    height="30px"
                  >
                    <Text fontSize={16}>Tasker Certification </Text>
                  </Button>
                  Or
                  <Button
                    className="flex items-center"
                    border="1px dotted #7551ff"
                    color="#7551ff"
                    borderRadius="5px"
                    padding="0 10px"
                    _hover={{
                      border: '1px dotted #7551ff',
                      background: 'rgba(255,255,255,0.06)',
                    }}
                    disabled
                    height="30px"
                  >
                    <Text fontSize={16}>Navigator Certification </Text>
                  </Button>
                </Flex>
                <Text color="red.300" mt="20px">
                  Note: <br />
                  After the user enters the platform, it defaults to Employer, Tasker and Navigator
                  can only choose one authentication option
                </Text>
              </Box>
            )}
            {/* 用户中心 */}
            {isEngineer && (
              <Box>
                <Text display="flex">
                  Grade：
                  <Text color="#7551ff">
                    {
                      //@ts-ignore
                      USER_LEVEL[+data?.level]
                    }
                  </Text>
                </Text>
                <Flex gap="10px" mt="20px">
                  {userInfo?.data?.engineer?.position?.map((positionType: number) => {
                    return (
                      <Tag key={`positiontype_${positionType}`} backgroundColor="#7551ff">
                        {ProfessionTypes.filter((v) => v.value === positionType)[0]?.label}
                      </Tag>
                    );
                  })}
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
        {/* TODO balance */}
        <Box width="30%">1000</Box>
      </Flex>

      {/* engineer major */}
      {/* 水手展示个人信息 */}
      {isEngineer && <UserMajor from={IPath.PROFILE} isEngineer={isEngineer} userInfo={userInfo} />}
    </Box>
  );
}

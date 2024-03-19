import API_ROUTERS from 'api';
import { useUserInfo } from 'hooks/user';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { Post } from 'common/utils/axios';
import { IRequirement, RequirementType } from 'common/constant';
import { getNextTaskId, publishTask } from 'common/contract/lib/bytd';
import { useAccount } from 'wagmi';
import useConnect from 'hooks/useConnect';
import { useToast } from '@chakra-ui/react';

export const requirementTypes = [
  {
    type: 'single',
    value: RequirementType.Single,
    title: 'Single Task',
    desc: 'For example: I have a front-end development requirement.',
  },
  {
    type: 'person',
    value: RequirementType.Person,
    title: 'Personnel Requirement',
    desc: 'For example: I need a front-end developer.',
  },
  {
    type: 'global',
    value: RequirementType.Global,
    title: 'Whole Project',
    desc: 'For example: I need to develop an office system.',
  },
];

export const useAddRequirement = () => {
  const router = useRouter();
  const toast = useToast();
  const currentRequire = useMemo(() => {
    const { requireType = '' } = router.query;
    console.log(
      'requireType>>>',
      requireType,
      requirementTypes.filter((it) => it.type === requireType)[0]
    );
    // @ts-ignore
    return requirementTypes.filter((it) => it.type === requireType)[0];
  }, [router]);
  const { userInfo } = useUserInfo();
  const account = useAccount();
  const { connect } = useConnect();
  const [buttonLoading, setButtonLoading] = useState(false);
  // 保存需求
  const saveRequirement = useCallback(
    async (data: any) => {
      setButtonLoading(true);
      if (!account.address) {
        connect();
        setButtonLoading(false);
        return false;
      }

      // 执行合约
      const projectId = await getNextTaskId();
      const res1 = await publishTask({ projectId: 4 });
      if (!res1) {
        setButtonLoading(false);
        return false;
      }
      const projectInfo = {
        projectId,
        name: data.projectName,
        categoryType: currentRequire?.value,
        positionType: +data.professionType,
        crowdsourcingType: +data.crowSourcingMethod,
        description: data.description,
      };
      const contactInfo = {
        phoneNumber: data.contactInfo,
      };
      const _params = {
        projectInfo,
        contactInfo,
        ownerAddress: userInfo.address,
        fileList: data.fileList,
      };
      console.log('publish _params>>>', _params);
      const res = await Post(API_ROUTERS.tasks.PROJECT_SUBMIT, _params).finally(() => {
        setButtonLoading(false);
      });
      toast({
        title: `SuccessFully`,
        status: `success`,
        isClosable: false,
      });
      return true;
    },
    [currentRequire, userInfo.address]
  );
  return {
    currentRequire,
    saveRequirement,
    router,
    buttonLoading,
  };
};

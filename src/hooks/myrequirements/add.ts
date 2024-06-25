import API_ROUTERS from 'api';
import { useUserInfo } from 'hooks/user';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { Post } from 'common/utils/axios';
import { IRequirement, RequirementType } from 'common/constant';
import { getNextTaskId, publishTask } from 'common/contract/lib/bytd';
import { sepolia, useAccount, useChainId, useNetwork } from 'wagmi';
import useConnect from 'hooks/useConnect';
import { useToast } from '@chakra-ui/react';
import useCheckChain from 'hooks/useCheckChain';

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
  const { connect } = useConnect();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { chain } = useNetwork();
  const { checkChain, switchChain } = useCheckChain(chain?.id);
  // 保存需求
  const saveRequirement = useCallback(
    async (data: any) => {
      setButtonLoading(true);
      if (!userInfo.address) {
        connect();
        setButtonLoading(false);
        return false;
      }
      const isCorrectChain = await checkChain();
      if (!isCorrectChain) {
        const isSwitch = await switchChain();
        if (!isSwitch) {
          setButtonLoading(false);
          return false;
        }
      }

      // 执行合约
      const projectId = await getNextTaskId();
      const res1 = await publishTask({ projectId });
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
      if (res?.result?.code !== 0) {
        return false;
      }
      toast({
        title: `Success`,
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

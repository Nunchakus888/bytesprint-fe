import API_ROUTERS from 'api';
import { useUserInfo } from 'hooks/user';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { Post } from 'common/utils/axios';
import { IRequirement, RequirementType } from 'common/constant';
import { publishTask } from 'common/contract/lib/bytd';
import { useAccount, useConnect } from 'wagmi';

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

  // 保存需求 TODO upload
  const saveRequirement = useCallback(
    async (data: any) => {
      if (!account.address) {
        connect();
        return false;
      }

      // {
      //   "projectName": "bella test",
      //   "professionType": "3",
      //   "crowSourcingMethod": "1",
      //   "contactInfo": "15533334444",
      //   "description": "<p><strong>bella test </strong></p><p><br></p><p>The days feel long,</p><p>The weeks even longer,</p><p>But the months seem to fly by.</p><p>One day you’re 6,</p><p>Then next you’re 16.</p><p>Time is fleeting</p><p>As if you're drifting out to sea</p><p>Yet you always manage to stay afloat, even when it's hard.</p><p>You make it to the next:</p><p>Month, season, and year</p><p>Before having to return to the beginning again.</p>"
      // }

      const projectInfo = {
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
      const res = await Post(API_ROUTERS.tasks.PROJECT_SUBMIT, _params);
      // 执行合约
      const res1 = await publishTask({ projectId: res.projectId });
      // 任务类型，根据身份匹配
      return res1;
    },
    [currentRequire, userInfo.address]
  );
  return {
    currentRequire,
    saveRequirement,
    router,
  };
};

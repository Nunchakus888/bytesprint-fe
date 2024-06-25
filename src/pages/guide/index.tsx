import { Button, Image } from '@chakra-ui/react';
import classNames from 'classnames';
import styles from '../../views/common.module.scss';
import useConect from '../../hooks/useConnect';
import { useEffect, useState } from 'react';
import { useUserInfo } from 'hooks/user';
import { useRouter } from 'next/router';
import { Identification } from 'common/constant';
import { onSuccessToast, onWarmToast } from 'common/utils/toast';
import { useAccount } from 'wagmi';

enum EClickType {
  Employer,
  Tasker,
  Navigator,
}

export default function Guide() {
  const { connect } = useConect();
  const [loading, setLoading] = useState(false);
  const { isDisconnected, isConnected } = useAccount();
  // 点击按钮类型
  const [clickType, setClickType] = useState<EClickType>();
  const router = useRouter();

  const { userInfo, identification } = useUserInfo();

  // 判断是否登录成功了
  useEffect(() => {
    if (userInfo?.address) {
      if (clickType === EClickType.Employer) {
        router.replace('/publish');
      } else if (clickType === EClickType.Tasker) {
        // 若已经是工程师，则跳转到任务大厅；
        if (identification === Identification.ENGINEER) {
          router.replace('/tasks');
        } else {
          router.replace('/certification/tasker');
        }
      } else {
        // 若已经是工程师，则跳转到任务大厅；
        if (identification === Identification.ENGINEER) {
          router.replace('/tasks');
        }
      }
    }
  }, [userInfo, clickType]);

  const handleClick = (type: EClickType) => {
    if (isDisconnected || isConnected) {
      if (type === EClickType.Navigator) {
        onWarmToast(`comming soon`);
        return false;
      }
      setClickType(type);
      connect();
    }
  };

  const user_role_guidelines = {
    title: 'User Role Guidelines',
    data: [
      {
        title: 'Employer',
        img: 'img/employer.png',
        data: [
          'Crowdsourcing requirements can bereleased at any time',
          'Can participate in BTYD token pledgeto obtain wealth management income;',
          'New hires can be recommended to enjoy second-generation benefits',
        ],
        button: 'Publish Requirement',
        clickType: EClickType.Employer,
      },
      {
        title: 'Tasker',
        img: 'img/tasker.png',
        data: [
          'Enjoy the same rights and interests asmembers',
          'Participate in task quotations for corresponding positions at any time;',
          'Complete the task and receive USDT rewards and token rewards cerrwsponding to the quotation',
        ],
        button: 'Tasker Certification',
        clickType: EClickType.Tasker,
      },
      {
        title: 'Navigator',
        img: 'img/navigator.png',
        data: [
          'Enjoy the same rights and interests asmembers',
          'Gain from token pledge',
          'Obtain full package project benefits and token rewards',
          'Obtain compensation for product relatedtasks',
          'Obtain withdrawal fees from promotionengineers',
        ],
        button: 'Navigator Certification',
        clickType: EClickType.Navigator,
      },
    ],
  };
  return (
    <div className="w-full flex flex-col justify-center text-center px-4 md:px-20">
      <h1 className="text-2xl md:text-4xl font-bold text-white my-10">
        {user_role_guidelines.title}
      </h1>
      <div className="flex flex-row flex-wrap justify-between items-baseline gap-4">
        {user_role_guidelines.data.map((item: any) => (
          <div
            key={item.title}
            className="grow md:basis-1/4 bg-[rgba(255,255,255,0.06)] p-4 md:p-8 rounded-lg flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold text-white flex items-center gap-[20px]">
              <Image src={item.img} alt="" width="48px" height="48px" />
              {item.title}
            </h2>
            <div className="flex flex-col items-start gap-2 grow md:h-72">
              {item.data.map((i: any) => (
                <h2
                  key={i}
                  className={classNames(
                    'text-base text-gray-300 text-left relative my-[5px]',
                    styles.filename
                  )}
                >
                  <i style={{ top: '5px', marginTop: '0px' }} /> {i}
                </h2>
              ))}
            </div>
            <div className="flex justify-center ">
              <Button
                color="#fff"
                className="btn-primary text-base text-gray-300 text-left"
                onClick={() => handleClick(item.clickType)}
              >
                {item.button}
              </Button>
            </div>
            {/* <p className="text-base text-gray-300 text-left">{item.button}</p> */}
          </div>
        ))}
      </div>
      <p className="mt-[30px]">
        Note: After the user enters the platform, it defaults to Employer, Tasker and Navigator can
        only choose one authentication option
      </p>
    </div>
  );
}

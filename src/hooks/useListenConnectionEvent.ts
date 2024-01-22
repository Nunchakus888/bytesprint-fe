import API_ROUTERS from 'api';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIdentification, setLoginLoading, setUserInfo } from 'common/slice/commonSlice';
import { getItem, parseJson, removeItem, setItem } from 'common/utils';
import { Get, Post } from 'common/utils/axios';
import { Identification } from 'common/constant';
import getSigner from 'common/contract/lib/getSigner';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { useCookies } from 'react-cookie';
import useConnect from './useConnect';

const useListenConnectionEvent = () => {
  const { address, isDisconnected } = useAccount();
  // const { disconnects } = useConnect();
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const { userInfo } = useSelector((state: any) => state.common);

  //切换账户，刷新页面
  // useEffect(() => {
  //   const localAddress = localStorage.getItem("address") || "";
  //   if (ethers.utils.isAddress(localAddress) && address && localAddress !== address) {
  //     window.location.reload();
  //   }
  // }, [address]);

  //监听到登录退出
  useEffect(() => {
    // const userInfo = localStorage?.getItem("userInfo") || {};
    //@ts-ignore
    if (userInfo.address && isDisconnected) {
      disconnect();
    }
    if (isDisconnected) {
      removeItem('authorization');
      dispatch(setUserInfo({}));
      removeItem('userInfo');
    }
  }, [isDisconnected, disconnect, userInfo.address, dispatch]);

  useEffect(() => {
    const checkLogin = async () => {
      dispatch(setLoginLoading(true));
      let userInfo = getItem('userInfo') || {};
      //判断当前地址，是否在本地记录了签名信息（主要为了避免重复登录请求签名接口）
      // 新增时间检验，超过了4小时的设置，直接设置为空
      if (userInfo.timestamp + 4 * 60 * 60 * 1000 < Date.now()) {
        userInfo = {};
      }
      if (
        userInfo?.address !== address || //地址不一样
        (userInfo?.address === address && !userInfo?.signature) //地址一样，但是没有签过名
      ) {
        // 签名
        let signature;
        //获取签名信息
        const { sign: message } = await Post(API_ROUTERS.users.SIG_STATUS, {
          loginType: 1,
          walletAddress: address,
        });
        try {
          const signer = await getSigner();
          signature = await signer?.signMessage(message);
        } catch (error) {
          dispatch(setLoginLoading(false));
          disconnect();
          return;
        }
        if (!signature) {
          await sleep(2000);
          dispatch(setLoginLoading(false));
          checkLogin();
          return false;
        }
        const params = {
          loginType: 1,
          walletAddress: address,
          sign: signature,
        };
        // @ts-ignore
        const res = await Post(API_ROUTERS.users.LOGIN, params);
        const { authorization } = res || {};
        setItem('authorization', authorization);
        const userData = await Get(API_ROUTERS.users.USER_INFO({ uid: '' }));

        // const authorization = "2fa26c094c0f4ffca0a9fccf9975af83"
        // setItem("authorization",authorization)
        // const userData = {userType: 1}
        // test
        userData.engineer = {
          position: [1, 3],
          experience: 3,
          skillList: ['java', ' javascript', 'react', 'vue', ''],
          jobList: [
            {
              companyName: 'shf1fho1',
              department: 'dssdfs',
              position: 'rwer',
              startTime: '2024-01-07T16:00:00.000Z',
              endTime: '2024-01-23T16:00:00.000Z',
            },
          ],
          educationList: [
            {
              school: 'wwerwer24',
              startTime: '2023-12-31T16:00:00.000Z',
              endTime: '2024-01-30T16:00:00.000Z',
              education: 5,
              major: 'erwewr2',
            },
          ],
          authorizeCode: '',
          address: 'hangzhou',
          phone: '18879479324',
          email: 'bella@gmail.com',
        };
        dispatch(setLoginLoading(false));
        let newuseInfo: any = {};
        newuseInfo.signature = signature;
        newuseInfo.address = address;
        newuseInfo.uid = userData.uid;
        newuseInfo.authorization = authorization;
        newuseInfo.data = userData;
        newuseInfo.timestamp = Date.now();
        dispatch(setUserInfo(newuseInfo));
        setItem('userInfo', newuseInfo);
      } else {
        dispatch(setLoginLoading(false));
        dispatch(setUserInfo(userInfo));
        setItem('authorization', userInfo.authorization);
      }
    };
    // console.log("checkLogin address>>>>", address);
    const localAddress = localStorage.getItem('address') || '';
    if (address !== undefined && ethers.utils.isAddress(address)) {
      localStorage.setItem('address', address);
      checkLogin();
    }
  }, [address, chain?.id]);
};

function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export default useListenConnectionEvent;

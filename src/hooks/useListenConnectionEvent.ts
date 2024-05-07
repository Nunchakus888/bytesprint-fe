import API_ROUTERS from 'api';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginLoading, setUserInfo } from 'common/slice/commonSlice';
import { getItem, removeItem, setItem } from 'common/utils';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { useCheckLogin } from './useCheckLogin';
import { useRouter } from 'next/router';
import useConect from './useConnect';
const useListenConnectionEvent = () => {
  const { address, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { disconnects } = useConect();
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const { userInfo } = useSelector((state: any) => state.common);
  const { checkLogin } = useCheckLogin();
  const route = useRouter();
  //监听到登录退出
  useEffect(() => {
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
    const localAddress = localStorage.getItem('address') || '';
    console.log('address>>>>', address);
    // 若没有address （未登录）
    if (!address) {
      route.replace('/guide');
      return;
    }
    if (localAddress && address !== localAddress) {
      route.push('/');
      disconnects();
    } else if (address !== undefined && ethers.utils.isAddress(address)) {
      localStorage.setItem('address', address);
      // 检测login后,如果换了address 直接进入到大厅
      checkLogin();
    }
  }, [address]);
};

export default useListenConnectionEvent;

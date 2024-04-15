import API_ROUTERS from 'api';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginLoading, setUserInfo } from 'common/slice/commonSlice';
import { getItem, removeItem, setItem } from 'common/utils';
import { Get, Post } from 'common/utils/axios';
import getSigner from 'common/contract/lib/getSigner';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { useCheckLogin } from './useCheckLogin';
import { useRouter } from 'next/router';
import _ from 'lodash';

const useListenConnectionEvent = () => {
  const { address, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
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
    if (address !== undefined && ethers.utils.isAddress(address)) {
      localStorage.setItem('address', address);
      checkLogin();
    }
  }, [address]);
};

export default useListenConnectionEvent;

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "slice/commonSlice";
import { removeItem } from "utils";


const useCustomConnect = () => {
  const dispatch = useDispatch();
  const { userInfo, loginLoading } =
    useSelector((state: any) => state.common);
  
  const disconnectFn = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const connectEth = useCallback(() => {
    openConnectModal?.();
  }, [openConnectModal]);

  const disconnectEth = useCallback(() => {
    disconnectFn.disconnect();
    dispatch(setUserInfo({}));
    removeItem('address');
    dispatch(setUserInfo({}));
    removeItem("userInfo");
    removeItem("authorization");
  }, [disconnectFn, dispatch]);


  // 判断是否登录，当有链id存在时，根据链的id不同，进行对应的钱包判断
  const isLogin = useCallback(
    (chainId?: string) => {
      return !!userInfo?.address;
    },
    [userInfo?.address]
  );
  
  return {
    loginLoading,
    userInfo,
    disconnectEth,
    connectEth,
    isLogin
  };
};

export default useCustomConnect;

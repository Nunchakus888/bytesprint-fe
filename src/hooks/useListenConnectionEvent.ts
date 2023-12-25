import API_ROUTERS from "api";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdentification, setLoginLoading, setUserInfo } from "slice/commonSlice";
import { removeItem, setItem } from "utils";
import { Get, Post } from "utils/axios";
import { Identification } from "utils/constant";
import getSigner from "utils/getSigner";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import {useCookies} from 'react-cookie'
import useConnect from "./useConnect";

const useListenConnectionEvent = () => {
  const { address, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const { userInfo } = useSelector((state: any) => state.common);
  const [cookies, setCookie, removeCookie] = useCookies();
  //切换账户，刷新页面
  // useEffect(() => {
  //   const localAddress = localStorage.getItem("address") || "";
  //   if (ethers.utils.isAddress(localAddress) && address && localAddress !== address) {
  //     window.location.reload();
  //   }
  // }, [address]);

  //监听到登录退出
  // useEffect(() => {
  //   // const userInfo = localStorage?.getItem("userInfo") || {};
  //   //@ts-ignore
  //   if (userInfo.address && isDisconnected) {
  //     disconnect();
  //     removeItem('address');
  //     removeItem('network');
  //     dispatch(setUserInfo({}));
  //     removeItem("userInfo");
  //     // TODO setIdentification
  //     dispatch(setIdentification(""))
  //   }
  // }, [isDisconnected, disconnect]);

  useEffect(() => {
    const checkLogin = async () => {
      dispatch(setLoginLoading(true));
      // let userInfo = getItem("userInfo") || {};

      // 判断用户身份
      // 判断当前地址，是否在本地记录了签名信息（主要为了避免重复登录请求签名接口）
      if (
        userInfo?.address !== address || //地址不一样
        (userInfo?.address === address && !userInfo?.isSigned) //地址一样，但是没有签过名
      ) {
        //判断签名状态，没有签名需要签名
        const sign = await Post(API_ROUTERS.users.SIG_STATUS({loginType: 1, walletAddress: address}));

        //获取签名信息
        // const result = await Get(API_ROUTERS.users.LOGIN_MESSAGE(address));
        const message = `welcome to ByteSprint!`
        let signature;

        if (!sign) {
          try {
            const signer = await getSigner();
            signature = await signer?.signMessage(message);
          } catch (error) {
            dispatch(setLoginLoading(false));
            disconnect();
            return;
          }
        }
        const params = {
          loginType: 1,
          walletAddress: address,
          sign
        };
        // @ts-ignore
        const res = await Post(API_ROUTERS.users.LOGIN, params);
        const { authorization } = res?.result || {};
        const userData = await Get(API_ROUTERS.users.USER_INFO())

        dispatch(setLoginLoading(false));
        let newuseInfo: any = {};
        newuseInfo.isSigned = sign;
        newuseInfo.address = address;
        newuseInfo.authorization = authorization;
        newuseInfo.data = userData
        dispatch(setUserInfo(newuseInfo));
        setItem("userInfo", newuseInfo);
      } else {
        dispatch(setLoginLoading(false));
        // dispatch(setUserInfo(userInfo));
      }

      // let newuseInfo: any = {};
      //   newuseInfo.is_allowed = true;
      //   newuseInfo.isSigned = true;
      //   newuseInfo.address = address || '0xA8f6eEe0bC6b6cDB9eDE7B96b3c13f4BD6502C62';
      //   newuseInfo.token = '1111';
      //   dispatch(setUserInfo(newuseInfo));
      //   setItem("userInfo", newuseInfo);
      //   // TODO setIdentification
      //   dispatch(setIdentification(Identification.ENGINEER))
      //   setCookie("identification", Identification.ENGINEER)
    };
    // console.log("checkLogin address>>>>", address);
    if (address !== undefined && ethers.utils.isAddress(address)) {
      localStorage.setItem("address", address);
      checkLogin();
    }
  }, [address]);
};

export default useListenConnectionEvent;
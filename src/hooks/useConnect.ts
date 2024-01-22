import { useCallback } from 'react';
import { removeItem } from 'common/utils';
import { useDisconnect } from 'wagmi';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'common/slice/commonSlice';
import API_ROUTERS from 'api';
import { Post } from 'common/utils/axios';

const useConnect = () => {
  const { disconnect: dis } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const dispatch = useDispatch();

  const connect = useCallback(() => {
    typeof openConnectModal === 'function' && openConnectModal();
  }, [openConnectModal]);

  const disconnects = useCallback(
    async function () {
      dis();
      await Post(API_ROUTERS.users.LOGOUT);
      removeItem('address');
      removeItem('network');
      removeItem('authorization');
      dispatch(setUserInfo({}));
      removeItem('userInfo');
    },
    [dis, dispatch]
  );

  return { isConnected, address, connect, disconnects };
};

export default useConnect;

import { useCallback, useContext } from 'react';
import { removeItem } from 'common/utils';
import { useDisconnect } from 'wagmi';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useListenConnectionEvent from './useListenConnectionEvent';
import { useDispatch } from 'react-redux';
import { setIdentification, setUserInfo } from 'common/slice/commonSlice';
import API_ROUTERS from 'api';

const useConnect = () => {
  const { disconnect: dis } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const dispatch = useDispatch();
  useListenConnectionEvent();
  const connect = useCallback(() => {
    typeof openConnectModal === 'function' && openConnectModal();
  }, [openConnectModal]);

  const disconnects = useCallback(
    async function () {
      dis();
      await API_ROUTERS.users.LOGOUT();
      removeItem('address');
      removeItem('network');
      removeItem('authorization');
      dispatch(setUserInfo({}));
      removeItem('userInfo');
    },
    [dispatch]
  );

  return { isConnected, address, connect, disconnects };
};

export default useConnect;

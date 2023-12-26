import { useCallback, useContext } from 'react';
import { removeItem } from 'utils';
import { useDisconnect } from 'wagmi';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useListenConnectionEvent from './useListenConnectionEvent';
import { useDispatch } from 'react-redux';
import { setIdentification, setUserInfo } from 'slice/commonSlice';
import API_ROUTERS from 'api';

const useConnect = () => {
  const disconnectFn = useDisconnect();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const dispatch = useDispatch();
  useListenConnectionEvent()
  const connect = useCallback(() => {
    typeof openConnectModal === 'function' && openConnectModal();
  }, [openConnectModal]);

  const disconnect = useCallback(
    async function () {
      disconnectFn.disconnect();
      await API_ROUTERS.users.LOGOUT()
      removeItem('address');
      removeItem('network');
      removeItem('authorization');
      dispatch(setUserInfo({}));
      removeItem("userInfo");
    },
    [disconnectFn, dispatch]
  );

  return { isConnected, address, connect, disconnect };
};

export default useConnect;

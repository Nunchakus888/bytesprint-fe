import { useCallback, useContext } from 'react';
import { removeItem } from 'utils';
import { useDisconnect } from 'wagmi';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const useConnect = () => {
  const disconnectFn = useDisconnect();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const connect = useCallback(() => {
    typeof openConnectModal === 'function' && openConnectModal();
  }, [openConnectModal]);

  const disconnect = useCallback(
    async function () {
      disconnectFn.disconnect();

      removeItem('address');
      removeItem('network');
    },
    [disconnectFn]
  );

  return { isConnected, address, connect, disconnect };
};

export default useConnect;

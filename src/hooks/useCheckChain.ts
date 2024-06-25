import { useCallback } from 'react';
import { arbitrum, sepolia } from 'wagmi/chains';

const useCheckChain = (visitChainId: number) => {
  //  检查链
  const checkChain = useCallback(async () => {
    if (
      String(visitChainId) === String(sepolia.id) ||
      String(visitChainId) === String(arbitrum.id)
    ) {
      return true;
    }
    return false;
  }, [visitChainId]);

  //  切换链
  const switchChain = () => {
    const decimalNumber = Number(sepolia.id);
    const hexString = '0x' + decimalNumber.toString(16);

    const p =
      window.ethereum &&
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: hexString || '0x1',
          },
        ],
      });
    if (p) {
      return p
        .then(() => {
          return true;
        })
        .catch(() => false);
    } else {
      return false;
    }
  };

  return {
    checkChain,
    switchChain,
  };
};

export default useCheckChain;

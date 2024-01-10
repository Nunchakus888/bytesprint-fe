import { useAccount, useBalance, useNetwork } from 'wagmi';
import { toLowerCase } from '../common/utils';
//TODO 多资产
export default function useAcountBalance() {
  const { chain } = useNetwork();
  const chainId = chain?.id || 1;

  const { address, ...rest } = useAccount();
  const data = useBalance({
    address,
    chainId,
  });

  return {
    data: data?.data,
    //@ts-ignore
    formatted: data?.data?.formatted || '0',
    ...rest,
  };
}

import { useAccount, useBalance, useNetwork } from 'wagmi';

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

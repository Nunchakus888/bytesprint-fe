import { balanceFormat } from 'common/contract/lib/bytd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import useConect from '../hooks/useConnect';
export default function useAcountBalance() {
  const account = useAccount();
  const { connect } = useConect();
  const { userInfo } = useSelector((state: any) => state.common);
  const [balance, setBalance] = useState<any>(); // 余额
  // 获取余额
  useEffect(() => {
    if (account) {
      balanceFormat({ account }).then((data) => {
        setBalance(data);
      });
    }
  }, [userInfo?.address]);

  // 处理余额
  const refresh = () => {
    if (!account?.address) {
      connect();
      return false;
    }
    balanceFormat({ account }).then((data) => {
      setBalance(data);
    });
  };

  return {
    balance,
    refresh,
  };
}

import styles from './index.module.scss';

import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { useAccount } from 'wagmi';
import classnames from 'classnames';
//@ts-ignore
import { maxDecimal, transferNum } from 'common/utils';
import { Box, Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react';
import WalletAvatar from 'components/WalletAvatar';
import useConect from 'hooks/useConnect';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/loading';
import useAcountBalance from 'hooks/useAcountBalance';

const CustomConnectButton = () => {
  const { isConnecting } = useAccount();
  const { disconnects } = useConect();
  const { loginLoading, userInfo } = useSelector((state: any) => state.common);
  const { balance, refresh } = useAcountBalance(); // 余额
  useEffect(() => {
    if (userInfo?.address && !balance?.symbol) {
      refresh();
    }
  }, [balance, refresh, userInfo]);
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected || isConnecting) {
                return (
                  <Button
                    id="connect-btn"
                    className={classnames(styles.connect_btn, 'theme-button')}
                    onClick={openConnectModal}
                  >
                    Connect
                  </Button>
                );
              }
              if (loginLoading) {
                return (
                  <Button className={classnames(styles.connect_btn)}>
                    <Loading />
                  </Button>
                );
              }
              // if (chain.unsupported) {
              //   return (
              //     <Button
              //       size="small"
              //       style={{ background: "#ff494a" }}
              //       onClick={openChainModal}
              //       className="font-12"
              //     >
              //       Wrong network
              //     </Button>
              //   );
              // }

              return (
                <Popover trigger="hover">
                  {/* @ts-ignore */}
                  <PopoverTrigger>
                    <Box
                      borderRadius={'8px'}
                      className="overflow-hidden flex items-center"
                      bgColor={'transparent'}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '8px 12px',
                          borderRadius: '8px',
                        }}
                        className={classnames(
                          'display-item display-text cursor-pointer',
                          styles.address_wrap
                        )}
                      >
                        <span>
                          {/* {maxDecimal(account?.balanceFormatted || 0)} {account?.balanceSymbol} */}
                          {transferNum(balance?.data.toFixed(0) || 0, 0)} {balance?.symbol}
                        </span>
                        <Box className="px-1" color={'#3a3a3a'}>
                          |
                        </Box>
                        <span> {account.displayName}</span>
                        <div className="w-6 h-6 ml-2">
                          <WalletAvatar value={account?.address} />
                        </div>
                      </span>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent
                    w={'200px'}
                    p={1}
                    bgColor="#000"
                    className="cursor-pointer flex flex-col gap-1 rounded-md h-full bg-white/0 backdrop-blur-[4px]"
                  >
                    {/* <Button
                      h={'36px'}
                      as={Box}
                      bgColor="transparent"
                      color="white"
                      border="none"
                      borderRadius={4}
                      fontSize={'14px'}
                      px={1}
                      onClick={() => {
                        // goTo('/portfolio');
                      }}
                      style={{ display: 'flex', justifyContent: 'flex-start' }}
                    >
                      Portfolio
                    </Button> */}
                    <Button
                      h={'36px'}
                      as={Box}
                      bgColor="transparent"
                      color="white"
                      border="none"
                      borderRadius={4}
                      fontSize={'14px'}
                      px={1}
                      onClick={disconnects}
                      style={{ display: 'flex', justifyContent: 'flex-start' }}
                    >
                      Disconnect
                    </Button>
                  </PopoverContent>
                </Popover>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const WalletAvatar = (props) => {
  return <Jazzicon diameter={props?.size || 24} seed={jsNumberForAddress(props?.value)} />;
};

export default WalletAvatar;

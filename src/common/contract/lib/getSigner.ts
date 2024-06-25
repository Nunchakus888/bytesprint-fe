import { fetchSigner } from "@wagmi/core";

const getSigner = async () => {
  const wagmiSigner = await fetchSigner();
  if (!wagmiSigner) {
    console.error("please connect a wallet first");
    return;
  }
  return wagmiSigner;
};

export default getSigner;
